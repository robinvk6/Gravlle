var JPMM_MESSAGING = {
	//Holds Service Objects
	srvObjects : new JPMM_MAP(),

	//Holds Datagroup filter to Datagroup Callback Functions
	dgObjects : new JPMM_MAP(),

	//Holds Session to Service Mapping
	serviceLocateObjects : new JPMM_MAP(),
	
	//Holds Session to Application Mapping
	clusterToSessionObjects : new JPMM_MAP(),
	
	connectCallback : new JPMM_MAP(),
	
	/**
	 * @method getDGCallbacks(key)
	 * @param $key
	 * @info Returns Datagroup Callback functions for a given filter (key).
	 */
	getDGCallbacks : function(key){	
		return this.dgObjects.get(key);
	},

	 /**
	 * @method getSession(service)
	 * @param $service   Object that wraps the service details and the callback functions
	 * 
	 * Sample Service Object
	 * parent.getNirvanaSession({
			serviceId : 'application Id',
			dataGroupHandler : {
				                 callBackFn: dataGroupCallbackFn,
				                 filters: ['Array of Data group filters']
							   },
			sessionCallbackFn : sessCallback,  //nSession object is returned as a parameter to the session callback fn on successful session create.
			notificationCallback : notification  // All notification intended for the application and session related are delivered on this callback.
		});
		
	 * @info Session Initialization 
	 */
	getSession : function(service) {
		
		try {
			var locateJson = null;
			if(service.serviceId == null || service.serviceId == ''){
				throw "Service Id cannot be null/empty";
			}
			
			if(service.sessionCallbackFn == null){
				throw "Service Session Callback Function cannot be null/empty";
			}
			
			if(service.dataGroupHandler !=null){
				
				if(service.dataGroupHandler.callBackFn == null){
					throw "The Datagroup Callback Function cannot be null";
				}
				
				if(service.dataGroupHandler.filters == null || service.dataGroupHandler.filters.length < 1){
					throw "There must be atleast 1 Datagroup Filter defined";
				}				
			}
			
			// LOGIC 1 :  Cache Locate Responses
			/*if (this.serviceLocateObjects.get(service.serviceId) == null) {
				//Locate Request
				locateJson = JPMM_MESSAGING.locate(service.serviceId);
				this.serviceLocateObjects.set(service.serviceId, locateJson);
				
			} else {
				locateJson = this.serviceLocateObjects.get(service.serviceId);
			}*/
			
			//Logic 2 : Never Cache Locate Responses as application cluster mapping could change eventually 
			//          and the updated clusters will not be reflected in the cache
			
			locateJson = JPMM_MESSAGING.locate(service.serviceId);
			
			if(locateJson != null){
				//Register Service.Overwrite Service Configuration for State-less Applications.
				this.srvObjects.set(service.serviceId, service);

					for ( var i = 0; i < service.dataGroupHandler.filters.length; i++) {
						var filterJ = service.dataGroupHandler.filters[i];
						if(filterJ != null && filterJ != ''){
						this.dgObjects.set(filterJ,service.dataGroupHandler.callBackFn);
						}
					}	
			}
			
			var primaryClusters = locateJson.locateResponse.services[0].primaryCluster;
			var secondaryClusters = locateJson.locateResponse.services[0].secondaryCluster;
			
			if(primaryClusters.length == 0 && secondaryClusters.length == 0){
			throw "This Service is currently not available on any clusters";	
			}
			
			
			if (locateJson.locateResponse.services[0].latencySensitive == false) {
				if (!this.findSession(primaryClusters, secondaryClusters,
						service, false)) {
					this.findSession(primaryClusters, secondaryClusters,
							service, true);
				}
			} else {
				this.findSession(primaryClusters, secondaryClusters, service,
						true);
			}
		} catch (e) {
			this.JPMMLogger(e);
		}
			
	},
	
	 /**
	 * @method findSession()
	 * @param $primaryClusters
	 * @param $secondaryClusters
	 * @param $service
	 * @param $createIfAbsent
	 * @info Find/Create a session based on the service latencySensitive and regionalFailover attributes. 
	 * 		IF  latencySensitive == false Re-use a session if available
	 * 		IF  latencySensitive == True Create a new session or reuse the first Primary session available.
	 */
	findSession : function (primaryClusters,secondaryClusters,service,createIfAbsent){
		var sessionConnected = false;
			//Loop through Primary Clusters
			for ( var i = 0; i < primaryClusters.length; i++) {
				var clusterFrame = document.getElementById('cluster_' + primaryClusters[i].cluster);
				if (clusterFrame != null && this.clusterToSessionObjects.get(primaryClusters[i].cluster) !=null) {
						if (clusterFrame.contentWindow.getSession() != null && clusterFrame.contentWindow.getSession().getStatus() == "CONNECTED") {
							this.JPMMLogger("Reusing Existing Session for Primary Cluster Id "+ primaryClusters[i].cluster);
							this.registerSession(primaryClusters[i].cluster, service.serviceId);
							service.sessionCallbackFn(service.serviceId,clusterFrame.contentWindow.getSession());
							sessionConnected = true;
							break;
						}
				} else {
					if(createIfAbsent == true && clusterFrame==null){
					this.createNewSession(primaryClusters[i].cluster, service, primaryClusters[i].provisionUrl);
					sessionConnected = true;
					break;
					}
				}
			
			//Try Secondary Clusters
				if(i == primaryClusters.length -1 && service.regionalFailover == true){//If Last Primary Cluster	
					for ( var j = 0; j < secondaryClusters.length; j++) {
					var sclusterFrame = document.getElementById('cluster_' + secondaryClusters[j].cluster);
						if (sclusterFrame != null && this.clusterToSessionObjects.get(secondaryClusters[j].cluster) !=null) {
								if (sclusterFrame.contentWindow.getSession() != null && sclusterFrame.contentWindow.getSession().getStatus() == 'CONNECTED') {
									this.JPMMLogger("Reusing Existing Session for  Secondary Cluster Id "
											+ clusterId);
									this.registerSession(secondaryClusters[j].cluster, service.serviceId);
									service.sessionCallbackFn(service.serviceId,sclusterFrame.contentWindow.getSession());
									sessionConnected = true;
									break;
								}
						} else {
						if(createIfAbsent == true && clusterFrame==null){
							this.createNewSession(secondaryClusters[i].cluster, service, secondaryClusters[j].provisionUrl);
								sessionConnected = true;
								break;
							}	
						}
					}
				}
			}
			
			return sessionConnected;
		},
	
		 /**
		 * @method createNewSession()
		 * @param $clusterId
		 * @param $service
		 * @param $provisionUrl
		 * @info Create a new Session
		 */	
	createNewSession : function (clusterId,service,provisionUrl){
		this.JPMMLogger("Creating New Session for Cluster Id "+clusterId);
		
		//Connect Callback maintains the Callback Fns for a new session
		if(this.connectCallback.get(clusterId) == null){
			var callbacksFns = [];
			callbacksFns.push(service);
			this.connectCallback.set(clusterId, callbacksFns);
		}else{
			this.connectCallback.get(clusterId).push(service);
		}
		
		// create a new iframe in the connections div
		$('#connections')
				.append(
						"<iframe id='cluster_"
								+ clusterId
								+ "' style='visibility:hidden;display:none;' width='0px' height='0px'  tabindex='-1' src='connection.html?clusterId="
								+ clusterId + "&serviceId="
								+ service.serviceId + "&provisionUrl="
								+ provisionUrl + "'></iframe>");
	},

	 /**
	 * @method locate()
	 * @info Core Service locate Request
	 */
	locate : function(serviceId) {
		this.JPMMLogger("Core locate request for Service ID "+serviceId);
		// locate the service...
		var locateResponse = $.ajax({
			type : "GET",
			url : "/Core/locate?janus_user=r512276&service=" + serviceId,
			dataType : "application/json",
			async : false
		}).responseText;
		this.JPMMLogger("Core locate Response :"+JSON.stringify(locateResponse));
		return JSON.parse(locateResponse);
	},

	 /**
	 * @method provision()
	 * @info Core Service Provision Request
	 */
	provision : function(clusterId, provisionUrl) {
		this.JPMMLogger("Core Provision request for Cluster ID "+clusterId + " & Provision Url : "+ provisionUrl);
		// provision the user...
		var provisionResponse = $.ajax({
			type : "GET",
			url : provisionUrl + "?janus_user=r512276&clusterId=" + clusterId,
			dataType : "application/json",
			async : false
		}).responseText;
		
		this.JPMMLogger("Core Provision Response :"+JSON.stringify(provisionResponse));
		var provisionJson = JSON.parse(provisionResponse);
		
		if(provisionJson.provisionResponse == null || provisionJson.provisionResponse.messagingUserId == null || provisionJson.provisionResponse.messagingUserId == ''){
			throw "Exception provisioning user on cluster : " +clusterId;
		}

		var rname = provisionJson.provisionResponse.messagingRname;
		var AofRname = rname.replace(/nsp:/g, "http:").replace(/nhps:/g, "https:").split(";");		
		var messagingUserId = provisionJson.provisionResponse.messagingUserId;

		var mySession = Nirvana.createSession({
			realms : AofRname,
			debugLevel : 6,
			username : messagingUserId,
			sessionName : clusterId,
			sessionTimeoutMs : 10000,
			enableDataStreams : true,
			drivers : [ // an array of transport drivers in preferred order:
			            Nirvana.Driver.WEBSOCKET, 
			            Nirvana.Driver.XDR_STREAMING,
			            Nirvana.Driver.XHR_STREAMING_CORS/*,
						Nirvana.Driver.NOXD_IFRAME_STREAMING,
						Nirvana.Driver.NOXD_IFRAME_STREAMING,
						Nirvana.Driver.XDR_LONGPOLL,
						Nirvana.Driver.XHR_LONGPOLL_CORS,
						Nirvana.Driver.JSONP_LONGPOLL*/ ]
		});

		return mySession;
	},
	
	
	 /**
	 * @method registerSession()
	 * @info Register a new application on a session
	 */
	registerSession : function(clusterId, serviceId){
		
		if (this.clusterToSessionObjects.get(clusterId) != null) {
			this.clusterToSessionObjects.get(clusterId).push(serviceId);
		} else {
			
			var serviceArr = new Array();
			serviceArr.push(serviceId);
			this.clusterToSessionObjects.set(clusterId, serviceArr);
		}	
		this.JPMMLogger("Session Registered for app " + serviceId);
	},
	
	 /**
	 * @method sessionNotification()
	 * @info All Session related Notifications
	 */
	sessionNotification : function(type,sessionName){
		if (type == Nirvana.Observe.RECONNECT) {
			var appIds = this.clusterToSessionObjects
					.get(sessionName);
			for ( var i = 0; i < appIds.length; i++) {
				this.srvObjects.get(appIds[i]).notificationCallback(
						Nirvana.Observe.RECONNECT,
						sessionName);
			}
		} else if (type == Nirvana.Observe.DISCONNECT) {
			this.sessionDisconnectCleanup(sessionName);
		} 
		
	},
	
	
	 /**
	 * @method sessionDisconnectCleanup()
	 * @info Cleanup on Session Disconnect
	 */
	sessionDisconnectCleanup : function(sessionName){
		var appIds = this.clusterToSessionObjects.get(sessionName);
		for(var i=0 ;i<appIds.length;i++ ){
			this.srvObjects.get(appIds[i]).notificationCallback(Nirvana.Observe.DISCONNECT,sessionName);
			this.getSession(this.srvObjects.get(appIds[i]));
		}
		this.clusterToSessionObjects.deleteKey(sessionName);
	}, 
	
	 /**
	 * @method sessionStarted()
	 * @info Callback the application on Successful session create.
	 */
	sessionStarted : function(nSession) {	

		var services = this.connectCallback.get(nSession.getConfig().sessionName);
		for(var i=0; i< services.length;i++){
			var cb = services[i].sessionCallbackFn;
			if (cb != null) {
				cb(services[i].serviceId,nSession);
			}
		}
		this.connectCallback.deleteKey(nSession.getConfig().sessionName);		
	},
	
	JPMMLogger : function(message){
		if (typeof console == "object") {
			console.log(getFormattedDate() +" JPMM_MESSAGING_LOG: " + message);	
		}
		
		function getFormattedDate(){
			var date = new Date();
		    var str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		    return str;
		}
	}
};

/**
 * @info The Event Manager routes the events for a filter to the appropriate application DG callback function.
 */
function JPMM_EVENT_MANAGER() {
	this.pushEvent = function(event) {
		var cb = parent.JPMM_MESSAGING.getDGCallbacks(event.getTag());
		if (cb != null) {
			cb(event);
		}
	}
}

/**
  * @info Javascript Map Interface for holding Key value objects
 */
function JPMM_MAP() {
	this.serviceObj = {};
	this.get = function(key) {
		return this.serviceObj[key];
	},

	this.set = function(key, value) {
		this.serviceObj[key] = value;
	},

	this.keys = function() {
		var keys = [];
		for ( var i in this.serviceObj) {
			if (this.serviceObj.hasOwnProperty(i))
				keys.push(i);
		}
		return keys;
	},
	
	this.deleteKey = function(key){
		delete this.serviceObj[key];
	},

	this.getKeysSortedByValue = function() {
		var serviceObj = this.serviceObj;
		return this.keys().sort(function(a, b) {
			return serviceObj[a] > serviceObj[b];
		});
	}
}
