/*

Title: Nirvana JavaScript API

	*Pure JavaScript API For JavaScript/HTML5 Clients*

	The Nirvana JavaScript API is intended to be simple to use, while being sufficiently comprehensive to accommodate
	a range of application requirements and infrastructures.
	Though the full API is extensive, its ease of use for typical use cases should be clear from the
	following simple example, which in only a few lines of code, sets up a <Session>, subscribes to a <Channel>, and receives,
	processes and publishes <Events>:

	(start code)

		var session = Nirvana.createSession();
		var channel = session.getChannel("/demo/channel");

		function demoHandler(event) {
			if (event.getDictionary().get("demoMessage") == "ping") {
				newEvent = Nirvana.createEvent();
				newEvent.getDictionary().putString("demoMessage", "pong");
				channel.publish(newEvent);
			}
		}

		session.start();

		channel.on(Nirvana.Observe.DATA, demoHandler);
		channel.subscribe();

	(end code)

	Nirvana streams events to web clients asynchronously, without the requirement for any additional technology components
	or plugins on client browsers.
	The API will automatically detect client capabilities and make use of the optimum underlying transport driver in each case.
	See <Nirvana.Driver> for more details of the many available Web Socket and Comet drivers.


About: Version & Support

	JavaScript API Version _VERSION_MAJOR_._VERSION_MINOR_ (Build 11318) EA2.
	Released July 13 2012.
	For support, please contact support@my-channels.com.


About: Copyright & License

	Copyright 2012 Software AG, Darmstadt, Germany and/or Software AG USA
	Inc., Reston, United States of America, and/or their licensors.

    In the event that you should download or otherwise use this software
    ( the "Software" ) you hereby acknowledge and agree to the terms at
    http://www.my-channels.com/company/terms.html#legalnotices


*/
if (typeof JSON == 'undefined'){
    var tmp = document.createElement('script');
    tmp.type = 'text/javascript';
    var scriptTags = document.getElementsByTagName('script');
    for(var i=0;i<scriptTags.length;i++){
        if(scriptTags[i].src.lastIndexOf("nirvana.js")>0){
            tmp.src = scriptTags[i].src.replace("nirvana.js","json2.js");
            break;
        }
    }
    document.getElementsByTagName('head')[0].appendChild(tmp);
}
(function (window, undefined) {

/*
   Namespace: Nirvana

   <Nirvana> is the API namespace which provides a number of static methods and properties for creating
   Nirvana <Sessions>, <Events>, and <EventDictionaries> along with definitions of constants used throughout.


   Constants: Observe

   <Nirvana.Observe> defines constants which identify observable events that, when fired, notify interested listeners
   (see the on() and removeListener() methods in the <Nirvana>, <Session>, <Channel>, <Queue> and <TransactionalQueue> objects).


   Observable Events for <Nirvana>:

   Nirvana.Observe.ERROR        -   Fires when an unexpected error occurs. Two parameters are passed to all listeners:
                                    the relevant <Session> object, and an exception with details of the error.

   Observable Events for <Session>:

   Nirvana.Observe.START        -   Fires when the <Session> successfully starts.
                                    The <Session> object itself is passed as a parameter to all listeners.

   Nirvana.Observe.STOP         -   Fires when the <Session> is cleanly closed.
                                    The <Session> object itself is passed as a parameter to all listeners.

   Nirvana.Observe.DISCONNECT   -   Fires when the <Session> is disconnected and automatically attempts to reconnect.
                                    The <Session> object itself is passed as a parameter to all listeners.

   Nirvana.Observe.RECONNECT    -   Fires when the <Session> has successfully automatically reconnected following temporary disconnection.
                                    The <Session> object itself is passed as a parameter to all listeners.

   Nirvana.Observe.DATA         -   Fires when a Nirvana <Event> is received by a DataStream-enabled <Session>.
                                    The Nirvana <Event> is passed as a parameter to all listeners.

   Nirvana.Observe.DRIVER_CHANGE-   Fires when the <Session's> transport driver changes for any reason.
                                    Two parameters are passed to all listeners:
                                    the <Session> object itself, and a string representing the name of the new driver (See <Nirvana.Driver>).

   Nirvana.Observe.ERROR        -   Fires when an unexpected error occurs. Two parameters are passed to all listeners:
                                    the <Session> object itself, and an exception with details of the error.


   Observable Events for Resource Objects (<Channels>, <Queues> and <TransactionalQueues>):

   Nirvana.Observe.SUBSCRIBE    -   Fires when a subscription to a resource such as a <Channel> or a <Queue> is successfully started.
                                    The resource itself is passed as a parameter to all listeners.

   Nirvana.Observe.DATA         -   Fires when a Nirvana <Event> is received by a <Channel>, <Queue> or <TransactionalQueue> resource.
                                    The Nirvana <Event> is passed as a parameter to all listeners.

   Nirvana.Observe.UNSUBSCRIBE  -   Fires when a subscription to a resource such as a <Channel> or a <Queue> is ended.
                                    The resource object itself is passed as a parameter to all listeners.

   Nirvana.Observe.PUBLISH      -   Fires when an event is successfully published to a resource such as a <Channel> or a <Queue>.
                                    Two parameters are passed to all listeners:
                                    the resource object itself, and a string representing the server's response.

   Nirvana.Observe.ERROR        -   Fires when an unexpected error occurs.
                                    Two parameters are passed to all listeners:
                                    the resource object itself, and an exception with details of the error.



   Additional Observable Events <TransactionalQueues>:

   Nirvana.Observe.COMMIT       -   Fires when a transactional read is successfully committed to the server.
                                    Two parameters are passed to all listeners: The <TransactionalQueue> itself, and the response status.

   Nirvana.Observe.ROLLBACK     -   Fires when a transactional read is rolled back on the server.
                                    Two parameters are passed to all listeners: The <TransactionalQueue> itself, and the response status.



   Observable Events on <Transactions>:

   Nirvana.Observe.COMMIT       -   Fires when a transactional publish is successfully committed to the server.
                                    Two parameters are passed to all listeners: The <Transaction> itself, and the response status.



   Example Usage:

		> function myHandler(evt) {
		>   console.log(evt.getEID());
		> }
		> myChannel.on(Nirvana.Observe.DATA, myHandler);
		> myChannel.subscribe();


	Note that the above example uses a *named listener*, _myHandler_, in the call to <Channel.on()>.
	This allows a developer to make a corresponding call to <Channel.removeListener()> when desired.

	It is also possible to use an anonymous function as a listener.

		> myChannel.on(Nirvana.Observe.DATA, function(evt) {
		>   console.log(evt.getEID());
        > });
		> myChannel.subscribe();

	Use of an anonymous function as a listener is *not recommended*, however, as the lack of a reference
	to the anonymous function makes it impossible for a developer to remove the listener via <removeListener()>.
	It is almost always better to use a named listener as in the first example above.

	See Also:

	<Nirvana.on()>, <Session.on()>, <Channel.on()>, <Queue.on()>, <TransactionalQueue.on()>, <Transaction.on()>


	Constants: Driver

	<Nirvana.Driver> defines the names of all available transport drivers that may be used by a <Session>.
	By default, a client will attempt to use all drivers in the order defined below, settling on the first driver that allows it to initialize a <Session>.

	WEBSOCKET						- Streaming driver for browsers supporting HTML5 Web Sockets.
	XHR_STREAMING_CORS				- Streaming driver for browsers supporting XMLHTTPRequest with CORS (Cross-Origin Resource Sharing).
	XDR_STREAMING					- Streaming driver for browsers supporting XDomainRequest (Microsoft Internet Explorer 8+).
	IFRAME_STREAMING_POSTMESSAGE	- Streaming driver for browsers supporting the cross-window postMessage API (per https://developer.mozilla.org/en/DOM/window.postMessage).
	XHR_LONGPOLL_CORS				- Longpoll driver for browsers supporting XMLHTTPRequest with CORS (Cross-Origin Resource Sharing).
	XDR_LONGPOLL					- Longpoll driver for browsers supporting (Microsoft Internet Explorer 8+).
	XHR_LONGPOLL_POSTMESSAGE		- Longpoll driver for browsers supporting the cross-window postMessage API.
	JSONP_LONGPOLL					- Longpoll driver for older browsers relying on DOM manipulation only.
	NOXD_IFRAME_STREAMING			- Legacy non-cross domain streaming driver for older clients requiring streaming from the realm that serves the application itself.

	More about Drivers:

	Developers may override which transport drivers are available for use by specifying a _drivers_ key
	(whose value is an array of driver names in order of preference) in the optional configuration object passed
	to <Nirvana.createSession()> - see example usage below.

	Additional drivers may be included in future versions of this API (potentially including _EVENTSOURCE_STREAMING_POSTMESSAGE_,
	a streaming driver for browsers which support both EventSource and the cross-window postMessage API).

	Note that streaming drivers are, in general, to be preferred over longpoll drivers for many reasons.
	Some clients, however, may be restricted by intermediate infrastructure (such as poorly configured proxy servers)
	which may prevent them from successfully using a streaming driver. The various longpoll drivers provide a fallback for
	such clients.

	All drivers, except the legacy _NOXD_IFRAME_STREAMING_ driver, are *fully cross domain*.

   Example Usage:

	>	var session = Nirvana.createSession({
	>		drivers : [
	>			Nirvana.Driver.WEBSOCKET,
	>			Nirvana.Driver.XHR_STREAMING_CORS,
	>			Nirvana.Driver.XHR_LONGPOLL_CORS
	>		]
	>	});
	>
	>	session.start();
	>	var driverName = session.getCurrentDriver();

	See Also:

	<Nirvana.createSession()>, <Session.getCurrentDriver()>



	Constants: VERSION_NUMBER
	<Nirvana.VERSION_NUMBER> is an integer constant representing the API version number.


	Constants: BUILD_NUMBER
	<Nirvana.BUILD_NUMBER> is an integer constant representing the API build number.


    Constants: BUILD_DATE
    <Nirvana.BUILD_DATE> defines the API build date.


    Constants: CHANNEL_RESOURCE
    <Nirvana.CHANNEL_RESOURCE> is an integer constant representing a <Channel's> type.

    See Also:
    <Channel.getResourceType()>


    Constants: QUEUE_RESOURCE
    <Nirvana.QUEUE_RESOURCE> is an integer constant representing a <Queue's> type.

    See Also:
    <Queue.getResourceType()>


    Constants: TRANSACTIONAL_QUEUE_RESOURCE
    <Nirvana.TRANSACTIONAL_QUEUE_RESOURCE> is an integer constant representing a <TransactionalQueue's> type.

    See Also:
    <TransactionalQueue.getResourceType()>

*/


    var Nirvana = (function () {
        /** @namespace window.Nirvana */

        var PrivateConstants = {
            SESSION_START:1,
            RESOURCE_SUBSCRIBE:2,
            KEEP_ALIVE:3,
            BATCH_SUBSCRIBE:5,
            PACKET_RECEIVE:7,
            EVENT_RECEIVE:8,
            SET_RESOURCE_ALIAS:10,
            RESOURCE_PUBLISH:14,
            RESOURCE_UNSUBSCRIBE:15,
            QUEUE_COMMIT:16,
            QUEUE_ROLLBACK:17,
            TX_PUBLISH:20,
            TX_IS_COMMITTED:24,
            CLIENT_CLOSE:30
        };

        var CallbackConstants = {
            "START":1,
            "STOP":2,
            "DISCONNECT":3,
            "RECONNECT":4,
            "ERROR":5,
            "DATA":6,
            "DRIVER_CHANGE":7,
            "SUBSCRIBE":8,
            "UNSUBSCRIBE":9,
            "COMMIT":10,
            "ROLLBACK":11,
            "PUBLISH":13
        };

        var DriverDomObjectsContainerID = '_Nirvana_Driver_DOM_Objects_Container'; // Anything we add to the DOM should go in here.
        var ListenerManagers = {};

        var lm = null;


        /*
         *  ************************************************************************************
         *  Utils is a private class:
         *  ************************************************************************************
         */

        var Utils = (function () {

            var debugLevel = 9;
            var loggingEnabled = true;
            var _console;

            var Logger = (function () {
                var logs = [];
                var maxLogLength = 10000;
                var debugConsoleOpened = false;

                var logFunction = function () {};

                //	9 OFF | 8 SEVERE | 7 WARNING | 6 INFO | 5 CONFIG | 4 TRANSPORT META | 3 REQUEST/REPONSE | 2 TRANSPORT DETAILED | 1 DRIVERCOMMS | 0 ALL

                function log(severity, msg) {
                    if (debugLevel <= severity) {
                        var msgArgs = Array.prototype.slice.call(arguments);
                        msgArgs.unshift(new Date());
                        var logMessage = msgArgs.join(" ");
                        if (debugConsoleOpened) _console.document.writeln(logMessage + "<br/>");
                        if (logs.length > maxLogLength) {
                            logs.shift();
                        }
                        logs.push(logMessage);
                        logFunction(logMessage);
                    }
                }

                function logException(severity, ex) {
                    var msg = "EXCEPTION: " + ex.name + " - " + ex.message;
                    log(severity, msg);
                }

                function setLogger(fn) {
                    logFunction = fn;
                }

                function debuggerKeyListener(e) {
                    if (!e) { //for IE
                        e = window.event;
                    }
                    if ((e.keyCode == 68) && e.ctrlKey && e.altKey) {
                        showDebugConsole();
                    }
                }

                function showDebugConsole() {
                    if (!debugConsoleOpened || (_console && _console.closed)) {
                        _console = window.open("", "Console", "width=600,height=300,scrollbars=yes,resizable");
                        _console.document.open();
                        _console.document.writeln("<style> { font-size: 10px; font-family: verdana, lucida sans, courier new, courier, sans-serif ; }</style>");
                        for (var i = 0; i < logs.length; i++) {
                            _console.document.writeln(logs[i] + "<br/>");
                        }
                        debugConsoleOpened = true;
                    } else {
                        _console.focus();
                    }
                }

                // Press Ctrl-Alt-d to launch a debug window:
                try {
                    if (window.addEventListener) {
                        window.addEventListener('keydown', debuggerKeyListener, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('onkeydown', debuggerKeyListener);
                    } else {
                        document.addEventListener("keydown", debuggerKeyListener, true);
                    }
                } catch (ex) {
                    // this browser will not support key listener
                }

                return {
                    setLogger:setLogger,
                    log:log,
                    logException:logException
                };
            }());

            var isLoggingEnabled = function () {
                return loggingEnabled;
            };

            var setDebugLevel = function (level) {
                debugLevel = level;
                loggingEnabled = debugLevel < 9;
            };

            var HTTPRequestFactory = function () {

                var requestBuilder = [];

                var buildCommonParameters = function (command) {
                    command.requestID = Transport.getRequestCount();
                    if (Transport.getCookie() !== undefined) {
                        return "&Connection-Type=JR&" + Transport.getCookie() + "&R=" + Transport.getRequestCount();
                    } else { //Websocket Connection
                        return "&R=" + Transport.getRequestCount();
                    }
                };

                var buildEvent = function (event) {
                    var request = "";

                    if (event.hasTag()) {
                        request = request + "&T=" + Utils.base64Encode(event.getTag());
                    }

                    if (event.hasData()) {
                        request = request + "&D=" + event.getData(true);
                    }

                    if (event.hasDictionary()) {
                        request = request + "&J=" + buildEventDictionary(event.getDictionary());
                    }

                    request = request + "&L=" + event.getTTL() + buildEventAttributes(event.getEventAttributes());

                    return request;
                };

                var buildEventDictionary = function (dictionary) {
                    var keys = dictionary.getKeys();
                    var keyLength = keys.length;

                    var obj = "";
                    for (var i = 0; i < keyLength; i++) {
                        if (i > 0) {
                            obj += ",";
                        }
                        var key = keys[i];
                        var type = dictionary.getType(key);
                        obj += encodeURIComponent(key) + "," + type;
                        if (type === EventDictionary.ARRAY) {
                            type = dictionary.getArrayType(key);
                            var val = dictionary.get(key);
                            if(type === EventDictionary.STRING || type === EventDictionary.CHARACTER){
                                var tmp = [];
                                for(var x=0;x<val.length; x++){
                                    tmp[x]= encodeURIComponent(val[x]);
                                }
                                val =tmp;
                            }
                            obj += "," + type + "," + val.length + "," + val.join(",");
                        } else if (type === EventDictionary.DICTIONARY) {
                            obj += "," + buildEventDictionary(dictionary.get(key));
                        } else {
                            if(type === EventDictionary.STRING || type === EventDictionary.CHARACTER){
                                obj += "," + encodeURIComponent(dictionary.get(key));
                            }   else{
                                obj += "," + dictionary.get(key);
                            }
                        }
                    }

                    return obj;
                };

                var buildEventAttributes = function (attributes) {
                    var headerHash = 0;
                    var headerValues = [];

                    var headerKeys = EventAttributes.HEADER_KEYS;
                    var headerKeyLength = headerKeys.length;
                    for (var headIdx = 0; headIdx < headerKeyLength; headIdx++) {
                        var attribute = attributes.getAttribute(headerKeys[headIdx]);
                        if (attribute) {
                            headerHash = headerHash + (1 << headIdx);
                            headerValues.push(encodeURIComponent(attribute));
                        }
                    }


                    if (attributes.getMessageType() > -1 && attributes.getMessageType() < 6) {
                        var jmsKeys = EventAttributes.JMS_HEADER_KEYS;
                        var jmsHeaderLength = jmsKeys.length;
                        for (var jmsIdx = 0; jmsIdx < jmsHeaderLength; jmsIdx++) {
                            var jmsAttribute = attributes.getAttribute(jmsKeys[jmsIdx]);
                            if (jmsAttribute) {
                                headerHash = headerHash + (1 << (headerKeyLength + jmsIdx));
                                headerValues.push(encodeURIComponent(jmsAttribute));
                            }
                        }
                    }

                    if (headerHash > 0) {
                        return "&K=" + headerHash + "&H=" + headerValues.join(",");
                    }

                    return "";
                };

                requestBuilder[PrivateConstants.SESSION_START] = function (command) {
                    var session = command.session;
                    command.requestID = Transport.getRequestCount();
                    return ["F=" + PrivateConstants.SESSION_START +
                        "&Connection-Type=JC&Y=7"+
                        "&V=" + navigator.appName.replace(' ', '-') +
                        "&P=" + Transport.Drivers.WireProtocol[Transport.getCurrentDriver()] +
                        "&W=" + Nirvana.BUILD_NUMBER.replace(' ', '-') +
                        "&X=" + Nirvana.BUILD_DATE.replace(' ', '-') +
                        "&Z=" + navigator.platform.toString().replace(' ','_') +
                        "&S=" + encodeURIComponent(session.getUsername()) +
                        "&A=" + encodeURIComponent(session.getConfig().applicationName) +
                        "&C=" + Utils.isLoggingEnabled() +
                        "&D=" + (session.isDataStreamEnabled() ? "T" : "F") +
                        "&R=" + Transport.getRequestCount(), ""];
                };

                requestBuilder[PrivateConstants.CLIENT_CLOSE] = function (command) {
                    return ["F=" + PrivateConstants.CLIENT_CLOSE + buildCommonParameters(command), ""];
                };

                requestBuilder[PrivateConstants.KEEP_ALIVE] = function (command) {
                    return ["F=" + PrivateConstants.KEEP_ALIVE + buildCommonParameters(command), ""];
                };

                requestBuilder[PrivateConstants.BATCH_SUBSCRIBE] = function (command) {
                    var param = "";
                    var resources = command.resources;
                    var resourceLength = resources.length;
                    for (var i = 0; i < resourceLength; i++) {
                        var resource = resources[i];
                        var resourceType = resource.getResourceType();
                        if (i > 0) {
                            param += ",";
                        }
                        param += resource.getName();

                        // Add additional information based on resource type
                        if (resourceType === Nirvana.CHANNEL_RESOURCE) {
                            if(resource.getCurrentEID() >= 0){
                                param += "," + resource.getCurrentEID()+1;
                            } else {
                                param += "," + resource.getStartEID();
                            }
                            param += "," + encodeURIComponent(resource.getFilter());
                            param += ",F";
                        } else if (resourceType === Nirvana.QUEUE_RESOURCE) {
                            param += ",0";
                            param += "," + encodeURIComponent(resource.getFilter());
                            param += ",T";
                        } else if (resourceType === Nirvana.TRANSACTIONAL_QUEUE_RESOURCE) {
                            param += "," + resource.getWindowSize();
                            param += "," + encodeURIComponent(resource.getFilter());
                            param += ",T";
                        } else {
                            param += ",0";
                            param += "," + encodeURIComponent(resource.getFilter());
                            param += ",F";
                        }
                    }

                    return ["F=" + PrivateConstants.BATCH_SUBSCRIBE + buildCommonParameters(command), "E=" + resourceLength + "&N=" + param ];

                };

                requestBuilder[PrivateConstants.RESOURCE_SUBSCRIBE] = function (command) {
                    command.resources = [command.resource];
                    return requestBuilder[PrivateConstants.BATCH_SUBSCRIBE](command);
                };

                requestBuilder[PrivateConstants.RESOURCE_PUBLISH] = function (command) {
                    var resource = command.resource;
                    var event = command.event;

                    return ["F=" + PrivateConstants.RESOURCE_PUBLISH + buildCommonParameters(command), "N=" + resource.getName() + buildEvent(event)];
                };

                requestBuilder[PrivateConstants.RESOURCE_UNSUBSCRIBE] = function (command) {
                    var resource = command.resource;
                    var resourceType = resource.getResourceType();
                    var request = ["F=" + PrivateConstants.RESOURCE_UNSUBSCRIBE + buildCommonParameters(command), "N=" + resource.getName()];

                    if (resourceType === Nirvana.QUEUE_RESOURCE || resourceType === Nirvana.TRANSACTIONAL_QUEUE_RESOURCE) {
                        request[1] = request[1] + "&Q=T";
                    }

                    return request;
                };

                requestBuilder[PrivateConstants.QUEUE_COMMIT] = function (command) {
                    var resource = command.resource;
                    var event = command.event;

                    return ["F=" + PrivateConstants.QUEUE_COMMIT + buildCommonParameters(command), "N=" + resource.getName() + "&E=" + event.getEID()];
                };

                requestBuilder[PrivateConstants.QUEUE_ROLLBACK] = function (command) {
                    var resource = command.resource;
                    var event = command.event;

                    return ["F=" + PrivateConstants.QUEUE_ROLLBACK + buildCommonParameters(command), "N=" + resource.getName() + "&E=" + event.getEID()];
                };

                requestBuilder[PrivateConstants.TX_PUBLISH] = function (command) {
                    /** Command Object:
                     *      resource
                     *      transaction
                     *      event
                     */
                    var resource = command.resource;
                    var transaction = command.transaction;
                    var event = command.event;

                    return ["F=" + PrivateConstants.TX_PUBLISH + buildCommonParameters(command), "N=" + resource.getName() + "&X=" + transaction.getTxID() + buildEvent(event)];
                };

                requestBuilder[PrivateConstants.TX_IS_COMMITTED] = function (command) {
                    /** Command Object:
                     *      transaction
                     */
                    var transaction = command.transaction;

                    return ["F=" + PrivateConstants.TX_IS_COMMITTED + buildCommonParameters(command), "X=" + transaction.getTxID()];
                };


                var buildRequest = function (command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Request Factory] Building Request from Command " + command.requestType);
                    }
                    return (requestBuilder[command.requestType](command));
                };

                return {
                    buildRequest:buildRequest
                };
            };

            var HTTPResponseFactory = function (parentSession) {
                var responseHandlers = [];

                var buildEvent = function (rawEvent, resource, resourceName) {

                    /** @namespace rawEvent.Data */
                    /** @namespace rawEvent.h */
                    /** @namespace rawEvent.EID */
                    /** @namespace rawEvent.Tag */
                    /** @namespace rawEvent.Dictionary */
                    var dictionary;
                    if (rawEvent.Dictionary) {
                        dictionary = buildEventDictionary(rawEvent.Dictionary);
                    }

                    var attributes = new EventAttributes(rawEvent.h);

                    var tag;
                    if(rawEvent.Tag) {
                        tag = Utils.base64Decode(rawEvent.Tag);
                    }


                    return new Event(parentSession, rawEvent.EID, resource, resourceName, attributes,rawEvent.Data, tag, dictionary);
                };

                var buildEventDictionary = function (rawDictionary) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Building Event Dictionary ", rawDictionary);
                    }
                    for (var key in rawDictionary) {
                        if (rawDictionary.hasOwnProperty(key)) {
                            var entry = rawDictionary[key];
                            if (entry[0] === EventDictionary.STRING || entry[0] === EventDictionary.CHARACTER) {
                                entry[1] = decodeURIComponent(entry[1]);
                            } else if (entry[0] === EventDictionary.DICTIONARY) {
                                entry[1] = buildEventDictionary(entry[1]);
                            } else if (entry[0] === EventDictionary.ARRAY) {
                                if (entry[1] === EventDictionary.STRING || entry[1] === EventDictionary.CHARACTER) {
                                    var strings = entry[2];
                                    var stringsLength = strings.length;
                                    for (var i = 0; i < stringsLength; i++) {
                                        strings[i] = decodeURIComponent(strings[i]);
                                    }
                                } else if (entry[1] === EventDictionary.DICTIONARY) {
                                    var dictionaries = entry[2];
                                    var dictionariesLength = dictionaries.length;

                                    for (var j = 0; j < dictionariesLength; j++) {
                                        dictionaries[j] = buildEventDictionary(dictionaries[j]);
                                    }
                                }
                            }
                        }
                    }
                    return new EventDictionary(rawDictionary);
                };

                responseHandlers[PrivateConstants.SESSION_START] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(6, "[HTTP Response Factory] Received Session Start Response for Command " + command.requestType, response, command);
                    }
                    parentSession.setSessionID(response[2]);
                    Transport.onConnect(response[4]);

                    // Notify listeners
                    if (command.reconnect) {
                        parentSession.notifyListeners(CallbackConstants.RECONNECT, parentSession, response[3]);
                    } else {
                        parentSession.notifyListeners(CallbackConstants.START, parentSession, response[3]);
                    }
                };

                responseHandlers[PrivateConstants.BATCH_SUBSCRIBE] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Received Batch Subscribe Callback for Command " + command.requestType, response, command);
                    }
                    var resources = command.resources;
                    var callbacks = response.slice(1);
                    var isResubscribe = command.resubscribe;

                    var resourceCount = resources.length;
                    for (var i = 0; i < resourceCount; i++) {
                        var resource = resources[i];
                        var callback = callbacks[i];

                        var success = Boolean(callback[1]);
                        resource.setSubscribed(success);
                        if (success) {
                            resource.setAlias(callback[2]);
                            if (!isResubscribe) { // Only notify on initial subscription
                                resource.notifyListeners(Nirvana.Observe.SUBSCRIBE, resource, "OK");
                            }
                        } else {
                            var errorMessage = callback[2];
                            var error;
                            if (errorMessage) {
                                if (errorMessage.indexOf("SECURITY") !== -1) {
                                    error = new SecurityException(errorMessage);
                                } else if (errorMessage.indexOf("Channel Not Found") !== -1) {
                                    error = new MissingResourceException(resource.getName(), errorMessage);
                                } else {
                                    error = new GenericException(errorMessage);
                                }
                            }

                            if (!error) {
                                error = new GenericException("Unknown Error Occurred");
                            }

                            resource.notifyListeners(Nirvana.Observe.ERROR, resource, error);
                        }
                    }
                };

                responseHandlers[PrivateConstants.KEEP_ALIVE] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Processing KA Response " + response.toString());
                    }
                };

                responseHandlers[PrivateConstants.RESOURCE_PUBLISH] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Received Publish Callback for Command " + command.requestType, response, command);
                    }
                    var resource = command.resource;
                    var success = response[1];
                    if(success) {
                        resource.notifyListeners(CallbackConstants.PUBLISH, resource, success);
                    } else {
                        var reason = response[2];
                        var ex;
                        if(reason && reason.indexOf("SECURITY") !== -1) {
                            ex = new SecurityException(reason);
                        } else {
                            ex = new GenericException(reason);
                        }
                        resource.notifyListeners(CallbackConstants.ERROR, resource, ex);
                    }
                };

                responseHandlers[PrivateConstants.RESOURCE_UNSUBSCRIBE] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Received Resource unsubscribe Callback for Command " + command.requestType);
                    }
                    var resource = command.resource;
                    resource.setSubscribed(false);
                    resource.notifyListeners(CallbackConstants.UNSUBSCRIBE, resource, "OK");
                };

                responseHandlers[PrivateConstants.PACKET_RECEIVE] = function (data) {
                    if(parentSession.getLongPollRequestID()+1 == data[1]){
                        parentSession.setLongPollRequestID(data[1]);
                    } else{
                        Transport.onError("Data received out of order, reset required.");
                    }
                };

                responseHandlers[PrivateConstants.EVENT_RECEIVE] = function (data) {
                    /** @namespace rawEvent.CNAME */
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Received Event", data);
                    }

                    var rawEvent = data[1];
                    var isDataGroup = rawEvent.dg === "1";

                    // Look up resource
                    var resource;
                    var resourceType;
                    var name;
                    if (!isDataGroup) {
                        resource = parentSession.getResourceByAlias(rawEvent.CNAME);
                        resourceType = resource.getResourceType();
                        name = resource.getName();
                    } else {
                        resource = parentSession;
                        resourceType = -1;
                        name = parentSession.getGroupName(rawEvent.CNAME);
                    }

                    var newEvent = buildEvent(rawEvent, resource, name);
                    if (resource) {
                        if(resourceType === Nirvana.CHANNEL_RESOURCE) {
                            resource.setCurrentEID(newEvent.getEID());
                        }
                        resource.notifyListeners(CallbackConstants.DATA, newEvent);
                    }
                };

                responseHandlers[PrivateConstants.SET_RESOURCE_ALIAS] = function (data) {
                    /** Data:
                     *      setResourceAlias
                     *      Resource Type (1-3)(Channel, Queue, DataGroup)
                     *      Resource Name
                     *      Resource Alias
                     */
                    var type = data[1];
                    var name = data[2];
                    var alias = data[3];

                    if (type == "3") {
                        parentSession.setGroupAlias(name, alias);
                    } else {
                        parentSession.setResourceAlias(name, alias);
                    }
                };

                responseHandlers[PrivateConstants.QUEUE_COMMIT] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Received Queue Commit Response", response, command);
                    }
                    var resource = command.resource;
                    resource.notifyListeners(CallbackConstants.COMMIT, resource, response[1]);
                };

                responseHandlers[PrivateConstants.QUEUE_ROLLBACK] = function (response, command) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Received Queue Rollback Response", response, command);
                    }
                    var resource = command.resource;
                    resource.notifyListeners(CallbackConstants.ROLLBACK, resource, response[1]);
                };

                responseHandlers[PrivateConstants.TX_PUBLISH] = function (response, command) {
                    /** Response:
                     *      requestType
                     *      Commit Status (T/F) OR "No Such Channel"
                     */
                    var commitStatus = response[1];

                    /** Command Object:
                     *      requestType
                     *      resource
                     *      transaction
                     *      event
                     */

                    var transaction = command.transaction;
                    if (commitStatus) {
                        transaction.notifyListeners(CallbackConstants.COMMIT, transaction, true);
                        transaction.setIsCommitted(true);
                    } else {
                        transaction.notifyListeners(CallbackConstants.COMMIT, transaction, false);
                        transaction.notifyListeners(CallbackConstants.ERROR, transaction, response[2]);
                        transaction.setIsCommitted(false);
                    }
                };

                responseHandlers[PrivateConstants.TX_IS_COMMITTED] = function (response, command) {
                    /** Response:
                     *       requestType
                     *       Commit Status (T/F)
                     */

                    /** Command Object:
                     *       requestType
                     *       transaction
                     */
                    var transaction = command.transaction;
                    transaction.notifyListeners(CallbackConstants.COMMIT, transaction, response[1]);
                    transaction.setIsCommitted(true);
                };

                function dispatchResponse(response) {
                    /** @namespace response.d */
                    /** @namespace response.r */
                    var responseData = response.d;
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[HTTP Response Factory] Dispatching response code " + responseData[0]);
                    }
                    var messageID = responseData[0];
                    if(messageID === PrivateConstants.EVENT_RECEIVE || messageID === PrivateConstants.PACKET_RECEIVE || messageID === PrivateConstants.SET_RESOURCE_ALIAS){
                        responseHandlers[messageID](responseData);
                    }else{
                        var command = OutboundEngine.dequeueCommand(response.r);
                        if (command === null && messageID !== PrivateConstants.KEEP_ALIVE) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(6, "[HTTP Response Factory] Command is null");
                            }
                        }else{
                            try{
                                responseHandlers[messageID](responseData, command);
                            }finally{
                                OutboundEngine.setReady(true);
                            }
                        }
                    }
                }

                return {
                    "dispatchResponse":dispatchResponse
                };
            };

            /*
             *  ************************************************************************************
             *  CrossDomainProxy is an XHR, ForeverIFrame and SSE replacement that works via postMessage()
             *	This works in Chrome at the moment but will need minor workarounds for IE8/9.
             *	See:	http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
             *			http://stevesouders.com/misc/test-postmessage.php
             *  ************************************************************************************
             */

            function CrossDomainProxy(session, driverName, proxyRealm, initCallback, errorCB) {
                this.session = session;
                this.proxyWin = null;
                this.initialized = false;
                this.initCallback = initCallback;
                this.proxyRealm = proxyRealm;
                this.proxyID = driverName + postMessageProxies.counter++;
                this.proxyIFrame = createIFrame(proxyRealm + session.getConfig().crossDomainPath + "/crossDomainProxy.html" +
                    "?proxyID=" + this.proxyID +
                    "&sessionID=" + Utils.generateUniqueID() +
                    "&validOrigins=" + encodeURIComponent(session.getConfig().currentDomain + "," + session.getConfig().realms.join(",")), errorCB);
                this.readyState = 0;
                this.responseText = "";
                this.status = 0;
                postMessageProxies.collection[this.proxyID] = this;
            }

            CrossDomainProxy.prototype.proxyRequest = function (op, arg) {
                if (this.proxyWin === null) this.proxyWin = this.proxyIFrame.contentWindow;
                this.proxyWin.postMessage(JSON.stringify([this.proxyID, op].concat(Array.prototype.slice.call(arg, 0))), this.proxyRealm); // only postMessage to a valid realm
            };

            CrossDomainProxy.prototype.open = function (method, url, asynch) {
                // All requests will be asynch.
                this.proxyRequest("open", arguments);
            };
            CrossDomainProxy.prototype.send = function () {
                this.proxyRequest("send", arguments);
            };
            CrossDomainProxy.prototype.setRequestHeader = function () {
                this.proxyRequest("setRequestHeader", arguments);
            };
            CrossDomainProxy.prototype.abort = function () {
                this.proxyRequest("abort", arguments);
            };

            CrossDomainProxy.prototype.destroy = function () {
                postMessageProxies.collection[this.proxyID] = null;
            };


            /*
             *  ************************************************************************************
             *  FormSubmitter is used by JSONP_LONGPOLL Driver to send commands to the server.
             *  ************************************************************************************
             */

            function FormSubmitter() {
                this.id = Utils.generateUniqueID();
                var containerID = "container" + this.id;

                // Create a DOM Element for storing the script:
                var scriptContainer = document.createElement('div');
                scriptContainer.style.display = 'none';
                scriptContainer.setAttribute('id', containerID);
                document.getElementById(DriverDomObjectsContainerID).appendChild(scriptContainer);
                var isIE = navigator.appName == "Microsoft Internet Explorer";

                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(2, "[FormSubmitter] Creating new FormSubmitter: " + this.id);
                }

                this.send = function(url, data){
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(2, "[FormSubmitter] Sending " + url + "?" + data[0] + "&" + data[1]);
                    }
                    cleanNode(scriptContainer,isIE);
                    var form = document.getElementById(DriverDomObjectsContainerID + "FormSubmitter");
                    if (form === null) {
                        form = document.createElement("form");
                        form.style.display = 'none';
                        form.style.position = 'absolute';
                        form.method = 'POST';
                        form.enctype = 'application/x-www-form-urlencoded';
                        form.acceptCharset = "UTF-8";
                        document.getElementById(DriverDomObjectsContainerID).appendChild(form);
                    }
                    var iFrame;
                    try {
                        iFrame = document.createElement('<iframe name="' + this.id + '">');
                    } catch (x) {
                        iFrame = document.createElement('iframe');
                        iFrame.name = this.id;
                    }

                    iFrame.id = this.id;
                    iFrame.style.display = 'none';
                    form.appendChild(iFrame);
                    form.target = this.id;
                    form.action = url + "?" + data[0];
                    try {
                        var components = data[1].split("&");
                        for (var i = 0; i < components.length; i++) {
                            var keyval = components[i].indexOf("=");
                            if (keyval > -1) {
                                var key = components[i].substring(0, keyval);
                                var val = components[i].substring(keyval + 1, components[i].length);
                                var area = document.createElement('input');
                                area.name = key;
                                area.value = val;
                                form.appendChild(area);
                            }
                        }
                    } catch (ex) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(2, "[FormSubmitter] Exception: " + ex.message);
                        }
                    }
                    scriptContainer.appendChild(form);
                    form.submit();
                };

                this.destroy = function () {
                    cleanNode(scriptContainer);
                    document.getElementById(DriverDomObjectsContainerID).removeChild(scriptContainer);
                };
            }


            /*
             *  ************************************************************************************
             *  JSONP_Poller is used by JSONP_LONGPOLL Driver to receive data from the server.
             *  ************************************************************************************
             */

            function JSONP_Poller(errorCB) {

                this.id = Utils.generateUniqueID();

                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(2, "[JSONP_Poller] Creating new longpoller: " + this.id);
                }

                var containerID = "container" + this.id;
                var errorCount = 0;
                var scriptContainer = null;
                var hasInitialised = false;
                var isIE = navigator.appName == "Microsoft Internet Explorer";

                this.send = function (url, data) {

                    if (scriptContainer === null) {
                        // Create a DOM Element for storing the script:
                        scriptContainer = document.createElement('div');
                        scriptContainer.style.display = 'none';
                        scriptContainer.setAttribute('id', containerID);
                        document.getElementById(DriverDomObjectsContainerID).appendChild(scriptContainer);
                    }

                    var scriptSrc = url + "?" + data[0] + "&" + data[1];

                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(2, "[JSONP_Poller] Sending " + scriptSrc);
                    }
                    try {
                        if (hasInitialised) {
                            cleanNode(scriptContainer, isIE);
                        }else{
                            hasInitialised = true;
                        }
                        var newScript = document.createElement('script');
                        newScript.type = "text/javascript";
                        newScript.src = scriptSrc;
                        newScript.onerror = errorCB;
                        scriptContainer.appendChild(newScript);
                        errorCount = 0;
                    } catch (ex) {
                            if (errorCount++ == 5) errorCB("[JSONP_Poller] Exception: " + ex.message);
                    }
                };

                this.destroy = function () {
                    cleanNode(scriptContainer);
                    document.getElementById(DriverDomObjectsContainerID).removeChild(scriptContainer);
                };
            }

            function cleanNode(scriptContainer, isIE){
                if(isIE){
                    while (scriptContainer.hasChildNodes()) {
                        scriptContainer.removeChild(scriptContainer.lastChild);
                    }
                } else{
                    while (scriptContainer.hasChildNodes()) {
                        var tmp = scriptContainer.removeChild(scriptContainer.lastChild);
                        for (var prop in tmp) {
                            delete tmp[prop];
                        }
                    }
                }
            }

            function initXMLHTTP(name) {
                // If IE7, Mozilla, Safari, etc: Use native object
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(2, "[initXMLHTTP] for " + name);
                }
                var thisXMLHttp = false;
                if (typeof window.XMLHttpRequest != 'undefined' && window.XMLHttpRequest) {
                    try {
                        thisXMLHttp = new XMLHttpRequest();
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(2, "initXMLHTTP : Constructed XMLHttpRequest for [" + name + "]");
                        }
                        return thisXMLHttp;
                    } catch (anex) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(2, "initXMLHTTP : Error constructing XMLHttpRequest for [" + name + "]. error=" + anex.message);
                        }
                        thisXMLHttp = false;
                    }
                } else if (typeof window.ActiveXObject != 'undefined' && window.ActiveXObject) {
                    // try the activeX control for IE5 and IE6
                    var vers = ["MSXML2.XMLHttp", "Microsoft.XMLHttp", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0"];
                    for (var a = 0; a < vers.length; a++) {
                        try {
                            thisXMLHttp = new ActiveXObject(vers[a]);
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(2, "initXMLHTTP : Constructed ActiveXObject XMLHttpRequest using [" + vers[a] + "] for [" + name + "]");
                            }
                            return thisXMLHttp;
                        } catch (anotherex) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(2, "initXMLHTTP : Error constructing ActiveXObject XMLHttpRequest :" + vers[a] + " for [" + name + "]. error=" + anotherex.message);
                            }
                            thisXMLHttp = false;
                        }
                    }
                } else {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(2, "initXMLHTTP : Failed to construct xmlHTTP object for [" + name + "]");
                    }
                    thisXMLHttp = false;
                }
                return thisXMLHttp;
            }


            /*
             *  ************************************************************************************
             *  Instantiate a single, generic listener for messages received via postMessage():
             *  ************************************************************************************
             */

            if (!window.addEventListener) {
                // IE doesn't have addEventListener(), but has its own API's attachEvent(). So we make a wrapper for it:
                window.addEventListener = function (type, listener, useCapture) {
                    attachEvent('on' + type, function () {
                        listener(event);
                    });
                };
            }

            window.addEventListener("message", function (e) {
                // Do we trust the sender of this message?
                if (!isTrustedPostMessageSender(getCanonicalOrigin(e.origin))) {
                    ListenerManagers[window.Nirvana].notifyListeners(Nirvana.Observe.ERROR, null, // since this message is not associated with any session.
                        new DriverSecurityException("CrossDomainProxy", "PostMessage Event Origin " + e.origin + " does not equal any proxied realm origin " + getPostMessageProxyRealms())
                    );
                    return;
                }

                var dataArray = JSON.parse(e.data);

                var proxyAlias = dataArray[0];
                var action = dataArray[2];

                var XHR = postMessageProxies.collection[proxyAlias];

                if (action == "init") {
                    XHR.initialized = true;
                    XHR.initCallback("initialized");
                }

                if (action == "change") {
                    XHR.responseText = dataArray[3];
                    XHR.readyState = dataArray[4];
                    XHR.status = dataArray[5];
                    XHR.onreadystatechange();
                }

                if (action == "iframe") {
                    Transport.c(JSON.parse(dataArray[3]));
                }

                if (action == "sse") {
                    Transport.c(JSON.parse(dataArray[3]));
                }


            }, false);

            /*
             *  ************************************************************************************
             *  Utility functions to support lookup of any postMessageProxy IFrames:
             *  ************************************************************************************
             */

            var postMessageProxies = {
                counter:0,
                collection:{}
            };

            function isTrustedPostMessageSender(origin) {
                for (var proxyAlias in postMessageProxies.collection) {
                    if (postMessageProxies.collection.hasOwnProperty(proxyAlias))
                        if (getCanonicalOrigin(postMessageProxies.collection[proxyAlias].proxyRealm) == origin) return true;
                }
                return false;
            }

            function getPostMessageProxyRealms() {
                var origins = [];
                for (var proxyAlias in postMessageProxies.collection) {
                    if (postMessageProxies.collection.hasOwnProperty(proxyAlias))
                        origins.push(getCanonicalOrigin(postMessageProxies.collection[proxyAlias].proxyRealm));
                }
                return origins.join(",");
            }

            function createIFrame(url, errorCB) {
                var iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.style.display = 'none';
                iframe.style.position = 'absolute';
                iframe.onerror = errorCB;
                //window.document.body.appendChild(iframe);
                try {
                    document.getElementById(DriverDomObjectsContainerID).appendChild(iframe);
                } catch (ex) {
                    errorCB("IFrame Exception: " + ex.message);
                }
                return iframe;
            }


            function createForeverIFrame(url, onMessageCB, onErrorCB) {
                // This is for same-domain communications only. It is used by the NOXD_IFRAME_STREAMING driver.
                var iFrame;
                if (document.createElement) {
                    var element = document.getElementById("NVLSubFrame");
                    if (element) {
                        element.setAttribute("src", url);
                        iFrame = element;
                    } else {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(2, "Iframe does not exist, so creating new one");
                        }
                        //the onload below allows firefox to know when a iframe is dead
                        var iframeSubHTML = "<iframe id=\"NVLSubFrame\" onload=\"errorCB()\" src=\"" + url + "\" style=\"";
                        iframeSubHTML += 'border:1px;';
                        iframeSubHTML += 'width:0px;';
                        iframeSubHTML += 'height:0px;';
                        iframeSubHTML += '"><\/iframe>';

                        if (window.ActiveXObject) {
                            this.htmlfile = new ActiveXObject('htmlfile');
                            this.htmlfile.open();
                            this.htmlfile.write('<html></html>');
                            this.htmlfile.close();

                            // set our various callbacks:
                            this.htmlfile.parentWindow.onMessage = onMessageCB;
                            this.htmlfile.parentWindow.errorCB = onErrorCB;

                            var iframeC = this.htmlfile.createElement('div');
                            this.htmlfile.body.appendChild(iframeC);
                            iframeC.innerHTML += iframeSubHTML;
                            iFrame = this.htmlfile;
                        } else {
                            document.getElementById(DriverDomObjectsContainerID).innerHTML += iframeSubHTML;
                            iFrame = {};
                            iFrame.document = {};
                            iFrame.document.location = {};
                            iFrame.document.location.iframe = document.getElementById('NVLSubFrame');
                            iFrame.document.location.replace = function (location) {
                                this.iframe.src = location;
                            };
                        }
                    }
                }
                return iFrame;
            }

			/**
			*
			*  Base64 encode / decode
			*  http://www.webtoolkit.info/
			*
			**/
            // If possible use the native implementation of b64 encode, as this will be much faster
            var base64Encode;
            if (typeof btoa === "undefined") {
				base64Encode = function (input) {
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;
                    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

                    var utf8_encode = function (string) {
                        string = string.replace(/\r\n/g, "\n");
                        var utftext = "";

                        for (var n = 0; n < string.length; n++) {

                            var c = string.charCodeAt(n);

                            if (c < 128) {
                                utftext += String.fromCharCode(c);
                            } else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                            } else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
					}

				  }

                        return utftext;
                    };

                    input = utf8_encode(input);

                    while (i < input.length) {

                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
					}

                        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);

				  }

                    return output;
				};
            } else {
                base64Encode = function (data) {
                    return btoa(data);
                };
            }

            // if possible use the native implementation of b64 decode, as this will be much faster
            var base64Decode;
            if (typeof atob === "undefined") {
                base64Decode = function (input) {
                    var output = "";
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

                    var utf8_decode = function (utftext) {
                        var string = "";
                        var i = 0;
                        var c2 = 0;
                        var c3 = 0;
                        var c = 0;

                        while (i < utftext.length) {

                            c = utftext.charCodeAt(i);

                            if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                            } else if ((c > 191) && (c < 224)) {
                                c2 = utftext.charCodeAt(i + 1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                            } else {
                                c2 = utftext.charCodeAt(i + 1);
                                c3 = utftext.charCodeAt(i + 2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
				  }
                        }
                        return string;
				};

                    input = input.replace(/[^A-Za-z0-9\+\/=]/g, "");

                    while (i < input.length) {

                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                    }

                    output = utf8_decode(output);

                    return output;
                };
            } else {
                base64Decode = function (data) {
                    return atob(data);
                };
            }

            var lastTxID = 0;

            function generateTransactionID() {
                return lastTxID++;
            }

            function generateUniqueID() {
                var S4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            }

            function getOrigin(url) {
                return url.match(/https?:\/\/[^\/]+/)[0];
            }

            function getUrlProtocol(url) {
                return url.match(/^([a-z]+):\/\//)[0];
            }

            function getCanonicalOrigin(url) {
                url = getOrigin(url);
                if (!url.match(/:[0-9]+$/)) {
                    if (url.match(/^https:/)) {
                        url += ":443";
                    } else {
                        url += ":80";
                    }
                }
                return url;
            }

            function getCanonicalResourceName(resourceName) {
                resourceName = resourceName.replace(/[^a-z0-9\/]+/gi, '');
                if (resourceName.match(/^[^\/].*?\//)) {
                    resourceName = "/" + resourceName;
                }

                return resourceName;
            }

            return {
                "Logger":Logger,
                "isLoggingEnabled":isLoggingEnabled,
                "setDebugLevel":setDebugLevel,
                "HTTPRequestFactory":HTTPRequestFactory,
                "HTTPResponseFactory":HTTPResponseFactory,
                "createIFrame":createIFrame,
                "createForeverIFrame":createForeverIFrame,
                "initXMLHTTP":initXMLHTTP,
                "base64Encode":base64Encode,
                "base64Decode":base64Decode,
                "getCanonicalResourceName":getCanonicalResourceName,
                "getCanonicalOrigin":getCanonicalOrigin,
                "getUrlProtocol":getUrlProtocol,
                "generateTransactionID":generateTransactionID,
                "generateUniqueID":generateUniqueID,
                "CrossDomainProxy":CrossDomainProxy,
                "FormSubmitter":FormSubmitter,
                "JSONP_Poller":JSONP_Poller
            };
        }());

        /*
         *  ************************************************************************************
         *  Transport is a private class:
         *  ************************************************************************************
         */

        var Transport = (function () {
            /** @namespace d.isClientSupported() */
            /** @namespace sessionConfig.drivers */
            /** @namespace driver.usesKeepAlive */
            var keepAliveTimeoutID;
            var inRequest = false;
            var resetTimeoutID = null;
            var requestCount = 0;
            var driver;
            var cookie = null;
            var currentSession;
            var sessionConfig;

            // Values used for Reconnection
            var realmRecoveryAttemptCount = 0;
            var currentDriverFailureCount = 0;
            var currentDriverIndex = 0;
            var currentRealmIndex = 0;
            var lastConnectTime = 0;

            var BACKOFF_INCREMENT_MS = 2000;
            var MAX_DRIVER_FAILURES_BEFORE_CHANGE = 3;

            var keepAliveEveryMs = 60000;

            function setPreferredDrivers(userDriverArray) {
                if (preferredDrivers.length) {
                    return;
                }
                if (typeof userDriverArray == "undefined") {
                    preferredDrivers = defaultDrivers;
                } else {
                    var sanitizedDriverArray = [];
                    for (var i = 0; i < userDriverArray.length; i++) {
                        var userDriverName = userDriverArray[i];
                        if (typeof Nirvana.Driver[userDriverName] != "undefined") {
                            sanitizedDriverArray.push(userDriverName);
                        } else {
                            ListenerManagers[window.Nirvana].notifyListeners(Nirvana.Observe.ERROR, currentSession, new InvalidDriverException(userDriverName));
                        }
                    }
                    if (sanitizedDriverArray.length) {
                        preferredDrivers = sanitizedDriverArray;
                    } else {
                        preferredDrivers = defaultDrivers;
                    }
                }
                currentDriverIndex = preferredDrivers.length - 1; // make it the last in the array as we increment when creating a driver.
            }

            function useNextDriver() {
                currentDriverIndex = (currentDriverIndex + 1) % preferredDrivers.length;
                currentSession.notifyListeners(Nirvana.Observe.DRIVER_CHANGE, currentSession, preferredDrivers[currentDriverIndex]);
                currentDriverFailureCount = 0;
            }

            function initializeDriver() {
                if (preferredDrivers.length) {
                    var d = Drivers.createDriver(preferredDrivers[currentDriverIndex]);
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(6, "[Transport] Attempting to use Driver: " + d.name);
                    }
                    if (!d.isClientSupported()) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(7, "[Transport] Driver not supported: " + d.name);
                        }
                        preferredDrivers.splice(currentDriverIndex, 1);
                        if (preferredDrivers.length < currentDriverIndex) currentDriverIndex = 0;
                        if (!preferredDrivers.length) {
                            alert("This client does not support any of the currently configured drivers.");
                        }
                        return initializeDriver();
                    } else {
                        return d;
                    }
                } else {
                    return null;
                }
            }

            function supportsDriver(driverName) {
                return Drivers.createDriver(driverName).isClientSupported();
            }

            function setUp(session) {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(6, "[Transport] Setting Up");
                }
                currentSession = session;
                sessionConfig = session.getConfig();
                setPreferredDrivers(sessionConfig.drivers);
                useNextDriver();
            }

            function open() {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(6, "[Transport] Opening Driver to " + sessionConfig.realms[currentRealmIndex]);
                }
                driver = Transport.initializeDriver();
                if (driver !== null) {
                    driver.open();
                    scheduleReset("driver.open",sessionConfig.openDriverTimeout); // in case driver does not open.
                } else {
                    var nvde = new NoValidDriversException();
                    currentSession.notifyListeners(Nirvana.Observe.ERROR, currentSession, nvde);
                    ListenerManagers[window.Nirvana].notifyListeners(Nirvana.Observe.ERROR, currentSession, nvde);
                }
            }

            function tearDown() {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(6, "[Transport] Tearing Down Driver");
                }
                if (driver !== null) {
                    OutboundEngine.setReady(false);
                    clearTimeout(keepAliveTimeoutID); // Since the next driver may not support keep alive.
                    clearTimeout(resetTimeoutID);
                    driver.close();
                    driver = null;
                    currentSession.setLongPollRequestID(-1);

                    // Need to ensure that we only notify the listener once
                    if (currentSession.getStatus() === "CONNECTED") {
                        currentSession.notifyListeners(Nirvana.Observe.DISCONNECT, currentSession, "Session Disconnected");
                    }
                }
            }

            function getCurrentDriver() {
                return preferredDrivers[currentDriverIndex];
            }

            function getCurrentRealm() {
                return sessionConfig.realms[currentRealmIndex];
            }

            function getCurrentSession() {
                return currentSession;
            }

            function getConfig() {
                return sessionConfig;
            }

            function getRequestCount() {
                return requestCount;
            }

            function getCookie() {
                return cookie;
            }

            function setCookie(cookieIn) {
                cookie = cookieIn;
            }

            function onConnect(cookieIn) {
                setCookie(cookieIn);
                currentDriverFailureCount = 0;
                lastConnectTime =  new Date();
            }

            function onOpen() {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(4, "[Transport] Received Driver OnOpen Callback");
                }
                OutboundEngine.setReady(true);
            }

            function onError(errorMsg) {
                // This gets invoked when a driver closes itself after a failure. Note this happens on an explicit session close too (thus not an error on this case)
                currentDriverFailureCount++;
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(4, "[Transport] Received Driver OnError Callback with error: " + errorMsg);
                }
                if (currentSession.getStatus() === "STOPPED") {
                    tearDown();
                } else {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[Transport] Driver failure count: " + currentDriverFailureCount);
                    }
                    if (currentDriverFailureCount >= MAX_DRIVER_FAILURES_BEFORE_CHANGE) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(3, "[Transport] Driver failure reached maximum permitted count: " + MAX_DRIVER_FAILURES_BEFORE_CHANGE);
                        }
                        useNextDriver();
                    }
                    resetSession("Driver Error: " + errorMsg);
                }
            }

            function onClose() {
                // This gets invoked when we explicitly call close() on a driver.
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(6, "[Transport] Received Driver OnClose Callback");
                }
            }

            function cancelScheduledReset() {
                if (resetTimeoutID !== undefined) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(2, "[Transport] Clearing resetTimeoutID : " + resetTimeoutID);
                    }
                    clearTimeout(resetTimeoutID);
                    resetTimeoutID = null;
                }
            }

            function scheduleReset(request, timeout) {
                cancelScheduledReset();
                resetTimeoutID = setTimeout(function () {
                    onError("Request Timed Out, " + request);
                }, timeout);
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(2, "[Transport] Setting resetTimeoutID  : " + resetTimeoutID);
                }
            }

            function send(command) {
                if(driver === null){
                    return;
                }
                var request = currentSession.requestFactory.buildRequest(command);
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(3, "[Transport] Sending request number " + requestCount + " for Command " + command.requestType + " " + request);
                }
                if (driver && driver.usesKeepAlive()) {
                    scheduleKeepAlive(command.session);
                }
                scheduleReset(request,sessionConfig.sendResponseTimeout);
                driver.send(command, request);
                requestCount++;
                inRequest = true;
            }

            function receive(data) {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(2, "[Transport] Receiving Data: " + data);
                }
                cancelScheduledReset();
                inRequest = false;

                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        currentSession.responseFactory.dispatchResponse(data[i]);
                    }
                }
            }

            function receiveJSON(data) {
                if(data.length>0){
                	var jsonData = null;
					//Adding Try catch for avoiding Parse errors while creating Session.
                	try{
                		jsonData = JSON.parse(data);
                		receive(jsonData);
                	}catch(err){
						//Do Nothing...
                	}
                }
            }

            function scheduleKeepAlive(session) {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(2, "[Transport] (Re)Scheduling KeepAlive to occur in 10 Seconds");
                }
                clearTimeout(keepAliveTimeoutID);
                keepAliveTimeoutID = setTimeout(function () {
                    sendKeepAlive(session);
                }, keepAliveEveryMs);
            }

            function sendKeepAlive(session) {
                if (inRequest) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(2, "[Transport] Currently inRequest.");
                    }
                    scheduleKeepAlive(session);
                } else {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[Transport] Sending KeepAlive");
                    }
                    OutboundEngine.prioritizeCommand({
                        "requestType":PrivateConstants.KEEP_ALIVE,
                        "session":session
                    });
                }
            }

            function resetSession(reason) {
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(7, "[Transport] Resetting the Session. Reason: " + reason);
                }
                tearDown(); // tearDown the driver and notify client of disconnect
                /**
                 * We decide what we must do to reset the session based on the reconnection state we are in
                 *      - If we have not connected yet before we will cycle drivers (State = CONNECTING)
                 *      - If we have connected before with a driver we keep trying to connect (State = CONNECTED or State = RECONNECTING)
                 *      - If this is the first reconnection attempt (State = RECONNECTING), we queue a new init command
                 *      - If we cannot connect X times to a realm we cycle the realm
                 */
                var sessionStatus = currentSession.getStatus();

                // Here we already have a command on the queue, so we only need to cycle the driver and start the session again
                if (sessionStatus === "CONNECTING") {
                    realmRecoveryAttemptCount++;
                    setTimeout(open, BACKOFF_INCREMENT_MS * realmRecoveryAttemptCount); // recreate the driver which will trigger the outbound engine and send the init request
                }

                // We only queue the command on the first reconnection request
                if (currentSession.getStatus() === "CONNECTED") {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(4, "[Transport] Adding Restart Request to Outbound Engine");
                    }
                    if(lastConnectTime+10000 < new Date()){
                        realmRecoveryAttemptCount = 0; // Reset recovery count here as its the first time we are recovering since disconnection
                    }
                    currentSession.setStatus("RECONNECTING");

                    // If the top command on the queue is a keep alive then remove it
                    // This fixes a problem with Streaming to LongPoll switch
                    var queuedCommand = OutboundEngine.peek();
                    if (queuedCommand && queuedCommand.requestType === PrivateConstants.KEEP_ALIVE) {
                        OutboundEngine.dequeueCommand(queuedCommand.requestID);
                    }

                    // Build resubscribe command and push to the front
                    var subscribedResources = [];
                    var resources = currentSession.getResources();
                    var resourceLength = resources.length;
                    for (var i = 0; i < resourceLength; i++) {
                        if (resources[i].isSubscribed()) {
                            subscribedResources.push(resources[i]);
                        }
                    }
                    if (subscribedResources.length > 0) {
                        var subscribeCommand = {
                            "requestType":PrivateConstants.BATCH_SUBSCRIBE,
                            "session":currentSession,
                            "resources":subscribedResources,
                            "resubscribe":true
                        };
                        OutboundEngine.prioritizeCommand(subscribeCommand);
                    }

                    // Build init command and push to the front
                    var initCommand = {
                        "requestType":PrivateConstants.SESSION_START,
                        "session":currentSession,
                        "reconnect":true
                    };
                    OutboundEngine.prioritizeCommand(initCommand);
                }

                if (currentSession.getStatus() === "RECONNECTING") {
                    var queuedCommandCheck = OutboundEngine.peek();
                    if (queuedCommandCheck === null || queuedCommandCheck === undefined || queuedCommandCheck.requestType !== PrivateConstants.SESSION_START) {
                        OutboundEngine.prioritizeCommand({
                            "requestType":PrivateConstants.SESSION_START,
                            "session":currentSession,
                            "reconnect":true
                        });
                    }
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(6, "[Transport] Recreating Driver");
                    }
                    setTimeout(open, BACKOFF_INCREMENT_MS * realmRecoveryAttemptCount); // recreate the driver which will trigger the outbound engine and send the init request
                    if(realmRecoveryAttemptCount <30){
                        realmRecoveryAttemptCount++;
                    }
                }

                // If we have exhausted a set number of attempts to reconnect to a realm we need to switchover to a new one
                if (realmRecoveryAttemptCount % 5 === 0) {
                    var newIndex = (currentRealmIndex+1) % sessionConfig.realms.length;
                    if(currentRealmIndex != newIndex){
                        currentRealmIndex =newIndex;
                        realmRecoveryAttemptCount = 0;
                    }
                }
            }

            var Drivers = (function () {

                var Names = {
                    "WEBSOCKET":"WEBSOCKET",
                    "XHR_STREAMING_CORS":"XHR_STREAMING_CORS",
                    "XDR_STREAMING":"XDR_STREAMING",
                    "IFRAME_STREAMING_POSTMESSAGE":"IFRAME_STREAMING_POSTMESSAGE",
                    "EVENTSOURCE_STREAMING_POSTMESSAGE":"EVENTSOURCE_STREAMING_POSTMESSAGE",
                    "XDR_LONGPOLL":"XDR_LONGPOLL",
                    "XHR_LONGPOLL_CORS":"XHR_LONGPOLL_CORS",
                    "XHR_LONGPOLL_POSTMESSAGE":"XHR_LONGPOLL_POSTMESSAGE",
                    "JSONP_LONGPOLL":"JSONP_LONGPOLL",
                    "NOXD_IFRAME_STREAMING":"NOXD_IFRAME_STREAMING"
                };

                var WireProtocols = {
                    "WEBSOCKET":"nws",
                    "XHR_STREAMING_CORS":"ncc",
                    "XDR_STREAMING":"ncc",
                    "IFRAME_STREAMING_POSTMESSAGE":"nsc",
                    "EVENTSOURCE_STREAMING_POSTMESSAGE":"nsse",
                    "XDR_LONGPOLL":"nlpc",
                    "XHR_LONGPOLL_CORS":"nlpc",
                    "XHR_LONGPOLL_POSTMESSAGE":"nlp",
                    "JSONP_LONGPOLL":"nlpj",
                    "NOXD_IFRAME_STREAMING":"nsc"
                };

                function createDriver(name) {
                    return new DriverImplementations[name](name);
                }

                var DriverImplementations = {};

                /*
                 *  ************************************************************************************
                 *  WEBSOCKET Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.WEBSOCKET] = function (driverName) {

                    var isClosed = true;
                    var currentSocket;
                    this.name = driverName;

                    this.isClientSupported = function () {
                        return ("WebSocket" in window || "MozWebSocket" in window);
                    };

                    this.usesKeepAlive = function () {
                        return true;
                    };

                    this.open = function () {
                        isClosed = false;

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        // Location manipulation for URL
                        var wsurl;
                        var loc = document.createElement('a'); // try Utils.getUrlProtocol(Transport.getCurrentRealm())
                        loc.href = Transport.getCurrentRealm();
                        if (loc.protocol === "http:") {
                            wsurl = "ws://" + loc.host;
                        } else {
                            wsurl = "wss://" + loc.host;
                        }

                        // Check to instantiate correct websocket driver...
                        if ("WebSocket" in window) {
                            currentSocket = new WebSocket(wsurl);
                        } else if ("MozWebSocket" in window) {
                            currentSocket = new MozWebSocket(wsurl);
                        } else {
                            return false;
                        }

                        var onErrorClose = function (parameter) {
                            if (isClosed) {
                                Transport.onClose();
                            } else {
                                Transport.onError(parameter);
                            }
                        };

                        // Assign callbacks up to transport layer
                        currentSocket.onopen = Transport.onOpen;
                        currentSocket.onclose = onErrorClose;
                        currentSocket.onerror = onErrorClose;
                        currentSocket.onmessage = function (messageEvent) {
                            if (messageEvent.data) {
                                Transport.d(messageEvent.data);
                            }
                        };
                    };

                    this.send = function (command, data) {
                        currentSocket.send(data[0] + "&" + data[1]);
                    };

                    this.close = function () {
                        isClosed = true;
                        currentSocket.close();
                    };
                };


                /*
                 *  ************************************************************************************
                 *  XHR_STREAMING_CORS Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.XHR_STREAMING_CORS] = function (driverName) {

                    this.name = driverName;

                    var receiver, sender, rname = null;
                    var currentChunkPosition = 2000;
                    var isClosed = false;
                    var maxStreamLength = Transport.getCurrentSession().getConfig().maxStreamLengthStreamingCors;

                    this.isClientSupported = function () {
                        return (( !!window.XMLHttpRequest) && typeof (new XMLHttpRequest()).withCredentials != "undefined");
                    };

                    this.usesKeepAlive = function () {
                        return true;
                    };

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rname = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = new XMLHttpRequest();
                        receiver.onreadystatechange = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Receiver] " + this.readyState + " : " + this.responseText);
                            }
                            if (this.readyState == 3) {
                                currentChunkPosition = DriverUtils.processResponseChunk(this.responseText, currentChunkPosition);
                                if(this.responseText.length >= maxStreamLength){
                                    Transport.onError("Reached max stream length "+maxStreamLength+", resetting.");
                                }
                            } else if (this.readyState == 4) {
                                Transport.onError("Receiver Connection Closed = " + this.status);
                            }
                        };

                        sender = new XMLHttpRequest();
                        sender.onreadystatechange = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Sender] " + this.readyState + " : " + this.responseText);
                            }
                            if (this.readyState == 4 && this.status != 200) {
                                Transport.onError("Sender Connection Status = " + this.status);
                            } else if (this.readyState > 3) {
                                Transport.c(this.responseText);
                            }
                        };
                        Transport.onOpen();
                    };

                    this.send = function (command, data) {
                        if (command.requestType === PrivateConstants.SESSION_START) {
                            receiver.open("GET", rname + "?" + data[0]);
                            receiver.send();
                        } else {
                            sender.open("POST", rname + "?" + data[0]);
                            sender.setRequestHeader("Content-Type", "text/plain");
                            sender.send(data[1]);
                        }
                    };

                    this.close = function () {
                        if (!isClosed) {
                            isClosed = true;
                            receiver.abort();
                            receiver = null;
                            sender.abort();
                            sender = null;
                            Transport.onClose();
                        }
                    };

                };


                /*
                 *  ************************************************************************************
                 *  XDR_STREAMING Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.XDR_STREAMING] = function (driverName) {

                    this.name = driverName;

                    var receiver, sender, rname = null;
                    var currentChunkPosition = 2000;
                    var isClosed = false;
                    var maxStreamLength = Transport.getCurrentSession().getConfig().maxStreamLengthStreamingCors;

                    this.isClientSupported = function () {
                        return ( !!window.XDomainRequest);
                    };

                    this.usesKeepAlive = function () {
                        return true;
                    };

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rname = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = new XDomainRequest();
                        receiver.onprogress = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Receiver] " + this.responseText);
                            }
                            currentChunkPosition = DriverUtils.processResponseChunk(this.responseText, currentChunkPosition);
                            if(this.responseText.length >= maxStreamLength){
                                Transport.onError("Reached max stream length "+maxStreamLength+", resetting.");
                            }
                        };

                        receiver.onerror = function (err) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Receiver] ERROR = " + err);
                            }
                            Transport.onError(err);
                        };

                        sender = new XDomainRequest();
                        sender.onload = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Sender] " + this.responseText);
                            }
                            Transport.c(this.responseText);
                        };

                        sender.onerror = function (err) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Sender] ERROR = " + err);
                            }
                            Transport.onError(err);
                        };

                        Transport.onOpen();
                    };

                    this.send = function (command, data) {
                        if (command.requestType === PrivateConstants.SESSION_START) {
                            receiver.open("GET", rname + "?" + data[0]);
                            receiver.send();
                        } else {
                            sender.open("POST", rname + "?" + data[0]);
                            sender.send(data[1]);
                        }
                    };

                    this.close = function () {
                        if (!isClosed) {
                            isClosed = true;
                            receiver.abort();
                            receiver = null;
                            sender.abort();
                            sender = null;
                            Transport.onClose();
                        }
                    };
                };


                /*
                 *  ************************************************************************************
                 *  IFRAME_STREAMING_POSTMESSAGE Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.IFRAME_STREAMING_POSTMESSAGE] = function (driverName) {

                    this.name = driverName;
                    var self = this;

                    var receiver, sender, rname = null;

                    this.isClientSupported = function () {
                        var konqueror = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;
                        return ((typeof window.postMessage === 'function' || typeof window.postMessage === 'object') && (!konqueror));
                    };

                    this.usesKeepAlive = function () {
                        return true;
                    };

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rname = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = sender = new Utils.CrossDomainProxy(Transport.getCurrentSession(), this.name, Transport.getCurrentRealm(), Transport.onOpen, Transport.onError);
                        sender.onreadystatechange = function () {
                            // This gets called after sending a command, but this.responseText should be empty as server sends data down iframe instead:
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Sender] " + this.readyState + " : " + this.responseText);
                            }
                            //Transport.c(this.responseText);
                        };

                    };

                    function connectStreamingReceiver(data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + " Receiver] " + Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data);
                        }
                        receiver.proxyRequest("createForeverIFrame", Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data);
                        self.send = sendCommand;
                    }

                    function sendCommand(command, data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + " Sender] " + Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data);
                        }
                        sender.open("POST", rname + "?" + data[0]);
                        sender.send(data[1]);
                    }

                    this.send = function (command, data) {
                        connectStreamingReceiver(data[0] + "&" + data[1]);
                    };

                    this.close = function () {
                        sender = null;
                        receiver = null;
                        Transport.onClose();
                    };
                };

                /*
                 *  ************************************************************************************
                 *  EVENTSOURCE_STREAMING_POSTMESSAGE Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.EVENTSOURCE_STREAMING_POSTMESSAGE] = function (driverName) {

                    this.name = driverName;

                    var self = this;

                    var receiver, sender = null;

                    this.isClientSupported = function () {
                        //return false; // alpha
                        if (!("EventSource" in window)) return false;
                        var konqueror = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;
                        return ((typeof window.postMessage === 'function' || typeof window.postMessage === 'object') && (!konqueror));
                    };

                    this.usesKeepAlive = function () {
                        return true;
                    };

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        receiver = sender = new Utils.CrossDomainProxy(Transport.getCurrentSession(), this.name, Transport.getCurrentRealm(), Transport.onOpen, Transport.onError);

                        sender.onreadystatechange = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + " Sender] " + this.readyState + " : " + this.responseText);
                            }
                            if (this.readyState == 4 && this.status != 200) {
                                Transport.onError(driverName + " sender status " + this.status);
                            }
                        };

                    };

                    function connectStreamingReceiver(data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + " Receiver] " + Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data);
                        }
                        receiver.proxyRequest("createEventSource", Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data);
                        self.send = sendCommand;
                    }

                    function sendCommand(command, data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + " Sender] " + Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data);
                        }
                        sender.open("POST", Transport.getCurrentRealm() + "/sv/nvLite" + "?" + data[0], true);
                        sender.send(data[1]);
                    }

                    this.send = function (command, data) {
                        connectStreamingReceiver(data[0] + "&" + data[1]);
                    };

                    this.close = function () {
                        sender = null;
                        receiver = null;
                        Transport.onClose();
                    };

                };

                /*
                 *  ************************************************************************************
                 *  XDR_LONGPOLL Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.XDR_LONGPOLL] = function (driverName) {

                    this.name = driverName;

                    var receiver, sender, rName = null;
                    var isClosed = false;

                    this.isClientSupported = function () {
                        return ( !!window.XDomainRequest);
                    };

                    this.usesKeepAlive = function () {
                        return false;
                    };

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rName = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = new XDomainRequest();
                        receiver.onload = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] receiver: " + this.responseText);
                            }
                            if (this.responseText) {
                                Transport.d(this.responseText);
                            }
                            setTimeout(DriverUtils.longpoll, 1);
                        };

                        receiver.onerror = function (err) {
                            Transport.onError(driverName + " receiver error " + err);
                        };

                        sender = new XDomainRequest();
                        sender.onload = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] sender: " + this.responseText);
                            }
                            if (this.responseText) {
                                Transport.d(this.responseText);
                                DriverUtils.longpoll();
                            }
                        };

                        receiver.onerror = function (err) {
                            Transport.onError(driverName + " sender error " + err);
                        };

                        Transport.onOpen();
                    };

                    this.send = function (command, data) {
                        if (command.requestType === PrivateConstants.KEEP_ALIVE || command.requestType === PrivateConstants.SESSION_START) {
                            if (receiver !== null) {
                                receiver.open("GET", rName + "?" + data[0]);
                                receiver.send();
                            }
                        } else {
                            if (sender !== null) {
                                sender.open("POST", rName + "?" + data[0]);
                                sender.send(data[1]);
                            }
                        }
                    };

                    this.close = function () {
                        if (!isClosed) {
                            isClosed = true;
                            DriverUtils.cancelLongpollTimeout();
                            try {
                                receiver.onreadystatechange = null;
                                sender.onreadystatechange = null;
                                receiver.abort();
                                sender.abort();
                            } catch (ex) {
                                if (Utils.isLoggingEnabled()) {
                                    Utils.Logger.log(1, "[" + driverName + "] exception on close(): " + ex.message);
                                }
                            }
                            receiver = null;
                            sender = null;
                            Transport.onClose();
                        }
                    };

                };

                /*
                 *  ************************************************************************************
                 *  XHR_LONGPOLL_CORS Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.XHR_LONGPOLL_CORS] = function (driverName) {

                    this.name = driverName;

                    var receiver, sender, rName = null;
                    var isClosed = false;

                    this.isClientSupported = function () {
                        return (( !!window.XMLHttpRequest) && typeof (new XMLHttpRequest()).withCredentials != "undefined");
                    };

                    this.usesKeepAlive = function () {
                        return false;
                    };

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rName = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = new XMLHttpRequest();
                        receiver.onreadystatechange = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] receiver (" + this.readyState + ") : " + this.responseText);
                            }
                            if (this.readyState == 4) {
                                if (this.status != 200) {
                                    Transport.onError(driverName + " receiver status " + this.status);
                                } else {
                                    Transport.d(this.responseText);
                                    setTimeout(DriverUtils.longpoll, 0);  // for firefox 3.6
                                }
                            }
                        };

                        sender = new XMLHttpRequest();
                        sender.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                if (this.status != 200) {
                                    Transport.onError(driverName + " sender status " + this.status);
                                } else if (this.responseText) {
                                    Transport.d(this.responseText);
                                    DriverUtils.longpoll();
                                }
                            }
                        };

                        Transport.onOpen();
                    };

                    this.send = function (command, data) {
                        if (command.requestType === PrivateConstants.KEEP_ALIVE || command.requestType === PrivateConstants.SESSION_START) {
                            receiver.open("GET", rName + "?" + data[0] + "&" + data[1]);
                            receiver.send();
                        } else {
                            sender.open("POST", rName + "?" + data[0]);
                            sender.setRequestHeader("Content-Type", "text/plain");
                            sender.send(data[1]);
                        }
                    };

                    this.close = function () {
                        if (!isClosed) {
                            isClosed = true;
                            DriverUtils.cancelLongpollTimeout();
                            try {
                                receiver.onreadystatechange = null;
                                sender.onreadystatechange = null;
                                receiver.abort();
                                sender.abort();
                            } catch (ex) {
                                if (Utils.isLoggingEnabled()) {
                                    Utils.Logger.log(1, "[" + driverName + "] exception on close(): " + ex.message);
                                }
                            }
                            receiver = null;
                            sender = null;
                            Transport.onClose();
                        }
                    };

                };

                /*
                 *  ************************************************************************************
                 *  XHR_LONGPOLL_POSTMESSAGE Driver
                 *  For browsers that don't support CORS, but do support XHR and postMessage().
                 *  ************************************************************************************
                 */


                DriverImplementations[Names.XHR_LONGPOLL_POSTMESSAGE] = function (driverName) {

                    this.name = driverName;

                    var receiver, sender, rname = null;
                    var isClosed = false;

                    this.isClientSupported = function () {
                        var konqueror = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;
                        return ((typeof window.postMessage === 'function' || typeof window.postMessage === 'object') && (!konqueror));
                    };

                    this.usesKeepAlive = function () {
                        return false;
                    };


                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rname = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = new Utils.CrossDomainProxy(Transport.getCurrentSession(), driverName, Transport.getCurrentRealm(), notifyTransportOpenWhenReady, Transport.onError);
                        receiver.onreadystatechange = function () {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] receiver: (" + this.readyState + ") : " + this.responseText);
                            }
                            if (this.readyState == 4) {
                                if (this.status != 200) {
                                    Transport.onError(driverName + " receiver status " + this.status);
                                } else {
                                    Transport.d(this.responseText);
                                    DriverUtils.longpoll();
                                }
                            }
                        };

                        sender = new Utils.CrossDomainProxy(Transport.getCurrentSession(), driverName, Transport.getCurrentRealm(), notifyTransportOpenWhenReady, Transport.onError);
                        sender.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                if (this.status != 200) {
                                    Transport.onError(driverName + " sender status " + this.status);
                                } else if (this.responseText) {
                                    Transport.d(this.responseText);
                                    DriverUtils.longpoll();
                                }
                            }
                        };

                        function notifyTransportOpenWhenReady() {
                            if (!!receiver && !!sender && receiver.initialized && sender.initialized) {
                                Transport.onOpen();
                            }
                        }

                    };

                    this.send = function (command, data) {
                        if (command.requestType === PrivateConstants.KEEP_ALIVE) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] receiver requesting: " + data);
                            }
                            receiver.open("GET", rname + "?" + data[0]);
                            receiver.send();
                        } else {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] sender requesting: " + data);
                            }
                            sender.open("POST", rname + "?" + data[0]);
                            sender.send(data[1]);
                        }
                    };

                    this.close = function () {
                        if (!isClosed) {
                            isClosed = true;
                            DriverUtils.cancelLongpollTimeout();
                            receiver.onreadystatechange = null;
                            sender.onreadystatechange = null;
                            receiver.abort();
                            sender.abort();
                            receiver = null;
                            sender = null;
                            Transport.onClose();
                        }
                    };

                };

                /*
                 *  ************************************************************************************
                 *  JSONP_LONGPOLL Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.JSONP_LONGPOLL] = function (driverName) {

                    this.name = driverName;

                    var receiver, sender, rname = null;
                    var isClosed = false;

                    this.id = Utils.generateUniqueID();

                    this.isClientSupported = function () {
                        // "All" clients "should" support this basic driver.
                        return true;
                    };

                    this.usesKeepAlive = function () {
                        return false;
                    };

                    function senderResponseHandler(data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + "] senderReponseHandler: " + data);
                        }
                        if (data) {
                            Transport.c(data);
                            DriverUtils.longpoll();
                        }
                    }

                    function receiverResponseHandler(data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + "] receiverResponseHandler: " + data);
                        }
                        Transport.c(data);
                        DriverUtils.longpoll();
                    }

                    this.open = function () {

                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }

                        rname = Transport.getCurrentRealm() + "/sv/nvLite";

                        receiver = new Utils.JSONP_Poller(Transport.onError);
                        sender = new Utils.FormSubmitter();

                        window.readyStateCB = senderResponseHandler;
                        window.LPReadyStateCB = receiverResponseHandler;

                        Transport.onOpen();
                    };

                    this.send = function (command, data) {
                        if (command.requestType === PrivateConstants.KEEP_ALIVE || command.requestType === PrivateConstants.SESSION_START) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] Receiver Req: " + data[0]);
                            }
                            receiver.send(rname, data);
                        } else {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] Sender Req: " + data[0] + "&" + data[1]);
                            }
                            sender.send(rname, data);
                        }
                    };

                    this.close = function () {
                        if (!isClosed) {
                            isClosed = true;
                            DriverUtils.cancelLongpollTimeout();
                            receiver = null;
                            sender = null;
                            Transport.onClose();
                        }
                    };

                };


                /*
                 *  ************************************************************************************
                 *  NOXD_IFRAME_STREAMING Driver
                 *  ************************************************************************************
                 */

                DriverImplementations[Names.NOXD_IFRAME_STREAMING] = function (driverName) {

                    this.name = driverName;
                    var self = this;
                    var receiver, sender, rname = null;
                    var errorCountXHR = 0;

                    this.isClientSupported = function () {
                        if (!currentSession) {
                            return true;
                        }
                        var realms = currentSession.getConfig().realms;
                        var realmLength = realms.length;
                        var host = location.host;
                        var rexp = new RegExp("https?://" + host + "/?");
                        for (var i = 0; i < realmLength; i++) {
                            var realm = Utils.getCanonicalOrigin(realms[i]);
                            if (rexp.test(realm)) {
                                return true;
                            }
                        }
                        return false;
                    };

                    this.usesKeepAlive = function () {
                        return true;
                    };

                    function receiverCB(data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + "] receiverCB: " + typeof data + " " + data);
                        }
                        if (data) {
                            Transport.c(data);
                        }
                    }

                    function senderCB(data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + "] senderCB: " + typeof data + " " + data);
                        }
                        if (data) {
                            Transport.d(data);
                        }
                    }

                    function errorCB(error){
                        Transport.onError(error);
                    }

                    function connectStreamingReceiver(data) {
                        receiver = Utils.createForeverIFrame(rname + "?" + data, receiverCB, errorCB);
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + " Receiver] " + rname + "?" + data);
                        }
                        self.send = sendRequest;
                    }

                    function sendRequest(command, data) {
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + " Sender] " + rname + "?" + data);
                        }
                        var asyncFlag = (command.requestType === PrivateConstants.CLIENT_CLOSE);
                        sender.open("POST", rname + "?" + data[0], asyncFlag);
                        //sender.open("POST", rname, asyncFlag);
                        sender.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        try {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] XHR POST: " + data);
                            }
                            sender.send(data[1]);
                            return true;
                        } catch (ex) {
                            return false;
                        }
                    }

                    function readyStateCB() {

                        var thisStateChange = sender.readyState;
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driverName + "] statechangecb: State now changed to " + thisStateChange);
                        }
                        if (thisStateChange !== 4) {
                            return;
                        }
                        // Some gecko browsers throw an exception on accessing the status code
                        var statusCode;
                        try {
                            statusCode = sender.status;
                        } catch (error) {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] statechangecb : failed to read status code");
                            }
                        }

                        if (statusCode === 200 || statusCode === 0) {
                            senderCB(sender.responseText);
                        } else {
                            if (Utils.isLoggingEnabled()) {
                                Utils.Logger.log(1, "[" + driverName + "] statechangecb - status of " + statusCode + " forcing session reset");
                            }
                            errorCountXHR++;
                            Transport.onError("Error transports has been closed");
                        }
                        var tmp = document.getElementById('NVLSubFrame');
                        if (tmp) {
                            while (tmp.hasChildNodes()) {
                                tmp.removeChild(tmp.lastChild);
                            }
                        }
                    }


                    this.open = function () {
                        if (!this.isClientSupported()) {
                            Transport.onError(this.name + " driver not supported by client");
                            return;
                        }
                        rname = Transport.getCurrentRealm() + "/sv/nvLite";
                        sender = Utils.initXMLHTTP("xmlhttp");
                        sender.onreadystatechange = readyStateCB;
                        window.onMessage = receiverCB;
                        window.errorCB = errorCB;
                        Transport.onOpen();
                        return true;
                    };

                    this.send = function (command, data) {
                        connectStreamingReceiver(data[0] + "&" + data[1]);
                    };

                    this.close = function () {
                        sender = null;
                        receiver = null;
                        Transport.onClose();
                    };
                };


                /*
                 *  ************************************************************************************
                 *  Utility functions used by various drivers:
                 *  ************************************************************************************
                 */

                var DriverUtils = (function () {

                    // Functions for invoking longpolls:
                    var longpollTimeoutID = null;

                    function longpoll() {
                        if(driver === null){
                            cancelLongpollTimeout();
                            return;
                        }
                        if (Utils.isLoggingEnabled()) {
                            Utils.Logger.log(1, "[" + driver.name + "] longpoll() sending request number " + requestCount);
                        }
                        cancelLongpollTimeout();
                        var command = {
                            "requestType":PrivateConstants.KEEP_ALIVE
                        };
                        var request = currentSession.requestFactory.buildRequest(command);
                        driver.send(command, request);
                        requestCount++;
                        scheduleLongpollTimeout(driver.name);
                    }

                    function scheduleLongpollTimeout(driverName) {
                        longpollTimeoutID = setTimeout(function () {
                            Transport.onError(driverName + " Longpoll Timeout");
                        }, Transport.getConfig().sessionTimeoutMs);
                    }

                    function cancelLongpollTimeout() {
                        if (longpollTimeoutID !== null) clearTimeout(longpollTimeoutID);
                    }

                    // Functions for processing chunked responses:
                    function processResponseChunk(responseChunk, currentPosition) {
                        if (currentPosition > responseChunk.length) {
                            return currentPosition;
                        }
                        var newPosition;
                        do {
                            newPosition = responseChunk.indexOf("];[", currentPosition) + 2;
                            if (newPosition === 1) {
                                if (responseChunk.charAt(responseChunk.length - 1) != ";" && responseChunk.charAt(responseChunk.length - 2) != "]") {
                                    return currentPosition;
                                }
                                newPosition = responseChunk.length;
                            }
                            Transport.d(responseChunk.substring(currentPosition, newPosition-1));
                            currentPosition = newPosition;
                        } while (newPosition != responseChunk.length);
                        return currentPosition;
                    }

                    return {
                        "longpoll":longpoll,
                        "cancelLongpollTimeout":cancelLongpollTimeout,
                        "processResponseChunk":processResponseChunk
                    };

                }());


                return {
                    "Names":Names,
                    "WireProtocol":WireProtocols,
                    "createDriver":createDriver
                };

            }());


            // Transport's Default Driver Order Preferences:
            var preferredDrivers = [];

            var defaultDrivers = [
                Drivers.Names.WEBSOCKET,
                Drivers.Names.XHR_STREAMING_CORS,
                Drivers.Names.XDR_STREAMING,
                Drivers.Names.IFRAME_STREAMING_POSTMESSAGE,
                Drivers.Names.EVENTSOURCE_STREAMING_POSTMESSAGE,
                Drivers.Names.XDR_LONGPOLL,
                Drivers.Names.XHR_LONGPOLL_CORS,
                Drivers.Names.XHR_LONGPOLL_POSTMESSAGE,
                Drivers.Names.NOXD_IFRAME_STREAMING,
                Drivers.Names.JSONP_LONGPOLL
            ];

            return {
                "Drivers":Drivers,
                "initializeDriver":initializeDriver,
                "supportsDriver":supportsDriver,
                "setUp":setUp,
                "open":open,
                "tearDown":tearDown,
                "getCurrentDriver":getCurrentDriver,
                "getCurrentRealm":getCurrentRealm,
                "getCurrentSession":getCurrentSession,
                "getConfig":getConfig,
                "getRequestCount":getRequestCount,
                "getCookie":getCookie,
                "onConnect":onConnect,
                "onOpen":onOpen,
                "onError":onError,
                "onClose":onClose,
                "send":send,
                "c":receive,
                "d":receiveJSON
            };
        }());

        var OutboundEngine = (function () {
            var isReady = false;
            var outboundQueue = [];
            var pushToTransportTimer = null;

            function pushToTransport() {
                if (pushToTransportTimer !== null) {
                    clearTimeout(pushToTransportTimer);
                    pushToTransportTimer = null;
                }
                if (isReady && outboundQueue.length > 0) {
                    isReady = false;
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(3, "[Outbound Engine] Sending Command to Transport Layer", peek().requestType);
                    }
                    Transport.send(peek());
                }
            }

            function setReady(readyValue) {
                isReady = readyValue;
                if(!isReady){
                    if (pushToTransportTimer !== null) {
                        clearTimeout(pushToTransportTimer);
                        pushToTransportTimer = null;
                    }
                }else{
                    if (pushToTransportTimer === null) {
                        pushToTransportTimer = setTimeout(pushToTransport, 0);
                    }
                }
            }

            function queueCommand(command) {
                outboundQueue.push(command);
                /*if (Utils.isLoggingEnabled()) {
                 Utils.Logger.log(3, "[Outbound Engine] Queueing Command " + command.requestType, command);
                 }*/
                if (pushToTransportTimer === null) {
                    pushToTransportTimer = setTimeout(pushToTransport, 0);
                }
            }

            function prioritizeCommand(command) {
                outboundQueue.unshift(command);
                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(3, "[Outbound Engine] Prioritizing Command " + command.requestType, command);
                }
                if (pushToTransportTimer === null) {
                    pushToTransportTimer = setTimeout(pushToTransport, 0);
                }
            }

            function dequeueCommand(requestID) {
                if (Utils.isLoggingEnabled()) {
                    var command = peek();
                    if(command !== undefined){
                        Utils.Logger.log(3, "[Outbound Engine] Dequeueing Command " + command.requestType, command, requestID);
                    }
                }
                var len = outboundQueue.length;
                for (var i = 0; i < len; i++) {
                    if (outboundQueue[i].requestID == requestID) {
                        return outboundQueue.splice(i, 1)[0];
                    }
                }
                return null;
            }

            function peek() {
                return outboundQueue[0];
            }

            return {
                "setReady":setReady,
                "queueCommand":queueCommand,
                "prioritizeCommand":prioritizeCommand,
                "dequeueCommand":dequeueCommand,
                "peek":peek
            };
        }());

        var CurrentSession;

        function createListenerManager() {

            var listenerStore = [];
            var isNotifying = false;

            var on = function (observable, listener) {

                var typedListenerStore = listenerStore[observable];

                if (!listenerStore[observable]) {
                    typedListenerStore = [];
                    listenerStore[observable] = typedListenerStore;
                }

                var length = typedListenerStore.length;
                for (var i = 0; i < length; i++) {
                    if (listener == typedListenerStore[i]) return;
                }

                // If we are in notifyListener call stack we need to do a copy before we modify the structure
                if (isNotifying) {
                    typedListenerStore = typedListenerStore.slice(0);
                    listenerStore[observable] = typedListenerStore;
                }

                typedListenerStore.push(listener);
            };

            var removeListener = function (observable, listener) {
                var typedListenerStore = listenerStore[observable];

                if (!typedListenerStore) {
                    return;
                }

                // If user passes "true" delete ALL listeners for this action:
                if (listener === true) {
                    typedListenerStore = [];
                    listenerStore[observable] = typedListenerStore;
                }

                // If we are in notifyListener call stack we need to do a copy before we modify the structure
                if (isNotifying) {
                    typedListenerStore = typedListenerStore.slice(0);
                    listenerStore[observable] = typedListenerStore;
                }

                var length = typedListenerStore.length;
                for (var i = 0; i < length; i++) {
                    if (listener == typedListenerStore[i]) {
                        typedListenerStore.splice(i, 1);
                        return;
                    }
                }
            };

            var notifyListeners = function (observable, obj, data) {
                var typedListenerStore = listenerStore[observable];
                if (!typedListenerStore) {
                    return;
                }
                isNotifying = true;
                var length = typedListenerStore.length;
                for (var i = 0; i < length; i++) {
                    var listener = typedListenerStore[i];
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(0, "[NotifyListeners] " + listener + " : " + data);
                    }
                    listener(obj, data);
                }
                isNotifying = false;
            };

            return {
                "on":on,
                "removeListener":removeListener,
                "notifyListeners":notifyListeners
            };
        }

        function registerListenerManager(obj, listenerManager) {
            ListenerManagers[obj] = listenerManager;
        }

        /*
         *  ************************************************************************************
         *  Exceptions
         *  ************************************************************************************
         */

        function AlreadySubscribedException(resourceName) {
            this.name = "AlreadySubscribedException";
            if (typeof resourceName != "undefined" && resourceName !== null) this.message = "Already subscribed to " + resourceName;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function InvalidDriverException(driverName) {
            this.name = "InvalidDriverException";
            if (typeof driverName != "undefined" && driverName !== null) this.message = driverName + " is not a valid driver name";
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function NoValidDriversException() {
            this.name = "NoValidDriversException";
            this.message = "This client does not support any of the currently configured drivers";
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(8, "[" + this.name + "] " + this.message);
            }
        }

        function DriverSecurityException(driverName, securityMessage) {
            this.name = "DriverSecurityException";
            if (typeof driverName != "undefined" && driverName !== null) this.message = driverName + " - " + securityMessage;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function AlreadyCommittedException(resourceName, txID) {
            this.name = "AlreadyCommittedException";
            this.message = "Already Committed Transaction " + txID + " to resource " + resourceName;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function SessionException(sessionName, message) {
            this.name = "SessionException";
            if (typeof sessionName != "undefined" && sessionName !== null) this.message = sessionName + " - " + message;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function SecurityException(message) {
            this.name = "SecurityException";
            this.message = message;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function MissingResourceException(resource, message) {
            this.name = "MissingResourceException";
            this.resourceName = resource;
            this.message = message;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.message);
            }
        }

        function GenericException(message) {
            this.name = "GenericException";
            if (message) this.errorMessage = message;
            if (Utils.isLoggingEnabled()) {
                Utils.Logger.log(7, "[" + this.name + "] " + this.errorMessage);
            }
        }

		/*
         *  ************************************************************************************
         *  Session
         *  This is the foundation for interacting with a Channel or Queue. It is an EventDispatcher, too.
         *  ************************************************************************************
         */


		/*

		Function: createSession()

			Creates and initializes (but does not start) a session object for communication with a Nirvana Realm Server.

        Optional Parameter:

			config - An optional <Session> configuration object containing key/value value pairs. Any key/value pair in this configuration object is also optional.

		Configuration Object Keys (Optional):

			drivers - An array of communication Drivers, in order of preference. Defaults to
			_[Nirvana.Driver.WEBSOCKET, Nirvana.Driver.XDR_STREAMING, Nirvana.Driver.XDR_LONGPOLL, Nirvana.Driver.LONGPOLL]_

			applicationName - Defaults to "GenericJSClient".

			sessionName - Defaults to "GenericJSSession".

			username - Will be generated randomly if not supplied.

			realms - An array of (optionally clustered) realms, each specified as "protocol://fqdn/port".
			For example: _["https://realm1.my-channels.com:443, https://realm2.my-channels.com:443"]_
			If a client fails to connect to the current realm using any of the user-specified drivers
			(or the default drivers, if none are specified), then it will move on to the next realm in the array,
			repeating at the end of the array.

			debugLevel - 0 to 9, where 0 is maximum debug output and 9 is no debug output.
			Defaults to 9. A commonly used value in development might be 4.

			serverLogging - True or false. Defaults to false.

			verboseKeepAlives - True or false. Defaults to false.

			enableDataStreams - True or false. Defaults to true.

			sessionTimeoutMs - Time with no communication with server before session times out and resets.
			Defaults to 120000 (ms) = 2 Minutes.

            sendResponseTimeout - Time with no response from a request.
            Defaults to 5000 (ms) = 5 seconds.

			maxStreamLengthStreamingCors -  Maximum streaming response content-length in bytes for XHR_STREAMING_CORS and XDR_STREAMING
			As with all other keys in this object, maxStreamLengthStreamingCors is optional, but is useful for clients which have high
			data throughput or are long running as memory will be consumed due to browser implementation of responseText growing without
			cleaning up. Defaults to 50000000 (approximately 50mb).

		Returns:

			An object representing a Nirvana session.

        Example Usage:

			> var session = Nirvana.createSession();
			> session.start();
			> session.stop();

			A session can be customized by passing in a configuration object containing keys
			which override default values, as follows:

			> var session = Nirvana.createSession({
			>   realms : [ "https://showcase.my-channels.com:443" ],
			>   debugLevel : 4
			> });

		See Also:

			<Session.start()>

         */
        function createSession(config) {

            if (CurrentSession) {
                lm.notifyListeners(Nirvana.Observe.ERROR, CurrentSession,
                    { name:"SessionExistsException",
                        message:"Cannot Create Session: Session Already Exists"});
                return undefined;
            }

            CurrentSession = new Session(sanitizeConfiguration(config));

            return CurrentSession;

            function sanitizeConfiguration(config) {

                function sanitizeBoolean(value, defaultValue) {
                    if (typeof value == "undefined" || value === null) {
                        return defaultValue;
                    }
                    return !!value;
                }

                function sanitizeInteger(value, defaultValue) {
                    value = parseInt(value, 10);
                    if(isNaN(value)){
                        value = defaultValue;
                    }
                    return value;
                }

                if (typeof config == "undefined" || config === null) config = {};

                config.debugLevel = sanitizeInteger(config.debugLevel, 9);
                Utils.setDebugLevel(config.debugLevel);

                if (typeof config.applicationName == "undefined")
                    config.applicationName = "GenericJSClient";

                if (typeof config.sessionName == "undefined")
                    config.sessionName = "GenericJSSession";

                if (typeof config.username == "undefined")
                    config.username = "JSUser_" + Utils.generateUniqueID();

                if (typeof config.crossDomainPath == "undefined")
                    config.crossDomainPath = "/lib/js";

                if (typeof config.realms == "undefined") {
                    var realm = document.location.protocol + "//" + document.location.hostname;
                    if (document.location.host.match(/:[0-9]+$/)) {
                        realm += ":" + document.location.port;
                    } else {
                        realm = Utils.getCanonicalOrigin(realm);
                    }
                    config.realms = [realm];
                }
                var currentDomain = document.location.protocol + "//" + document.location.hostname;
                if (document.location.host.match(/:[0-9]+$/)) {
                    currentDomain += ":" + document.location.port;
                } else {
                    currentDomain = Utils.getCanonicalOrigin(currentDomain);
                }
                config.currentDomain = currentDomain;
                config.serverLogging = sanitizeBoolean(config.serverLogging, false);
                config.verboseKeepalives = sanitizeBoolean(config.verboseKeepalives, false);
                config.enableDataStreams = sanitizeBoolean(config.enableDataStreams, true);
                config.sessionTimeoutMs = sanitizeInteger(config.sessionTimeoutMs, 120000);
                config.sendResponseTimeout = sanitizeInteger(config.sendResponseTimeout, 5000);
                config.openDriverTimeout = 2000;

                config.maxStreamLengthStreamingCors = sanitizeInteger(config.maxStreamLengthStreamingCors, 50000000);

                if (Utils.isLoggingEnabled()) {
                    var summary = "";
                    for (var name in config) {
                        if (config.hasOwnProperty(name)) {
                            var val = config[name];
                            summary += name + ":\t";
                            if (val.constructor == Array) {
                                summary += val.join("\n\t\t");
                            } else {
                                summary += val;
                            }
                            summary += "\n";
                        }
                    }
                    Utils.Logger.log(5, "[Session] Configuration:\n" + summary);
                }

                return config;
            }

        }

		/*

		Function: createEvent()

			Factory method to create a new, empty Nirvana <Event> (typically for subsequent publishing
			to a resource such as a <Channel> or <Queue>).

        Returns:

			A new, empty <Event>.

        Example Usage:

			> var myEvent = Nirvana.createEvent();
			> var myDict = myEvent.getDictionary();
			> myDict.putString("message", "Hello World");
			> myChannel.publish(myEvent);

		See Also:

			<Event>, <Event.getDictionary()>

         */

        function createEvent() {
            return new Event(undefined, -1,undefined,undefined,undefined,undefined,undefined,undefined);
        }

		/*

		Function: createDictionary()

			Factory method to create a new, empty <EventDictionary> (typically for subsequent addition to an existing
			<EventDictionary> using <EventDictionary.putDictionary()>).

		Returns:

			A new, empty <EventDictionary>.

		Example Usage:

			> var myEvent = Nirvana.createEvent();
			> var myDict = myEvent.getDictionary();
			> var newDict = Nirvana.createDictionary();
			> newDict.putString("message", "Hello World");
			> myDict.putDictionary("aNestedDictionary", newDict);
			> myChannel.publish(myEvent);

		See Also:

			<EventDictionary.putDictionary()>

         */

        function createDictionary() {
            return EventDictionary.createDictionary();
        }

		/*
         *  ************************************************************************************
         *  "public" add / remove listener functions for window.Nirvana:
         *  ************************************************************************************
         */

		/*
			Function: on()

				Registers a single event listener on the <Nirvana> object for observable events of the specified type
				(see <Nirvana.Observe> for a list of applicable observables).

				To register more than one observable listener for the same type, invoke <on()> with a
				different listener function as many times as needed.

			Parameters:

				observable - the type of observable event in which the listener is interested.
				listener - the listener function you have implemented, which should handle the parameters associated with the relevant observable event as defined in <Nirvana.Observe>.

			Returns:

				The <Nirvana> object (making this a chainable method).

			Example Usage:

				> function myErrorHandler(session, exception) {
				>   // This will receive errors such as total transport driver failures
				> }
				> Nirvana.on(Nirvana.Observe.ERROR, myErrorHandler);
				>
				> // we can now also un-assign this listener any time we want to:
				> Nirvana.removeListener(Nirvana.Observe.ERROR, myErrorHandler);

			See Also:

				<Nirvana.removeListener()>, <Nirvana.Observe>

		*/

        function on(observable, listener) {
            if (lm === null) {
                lm = createListenerManager();
                registerListenerManager(window.Nirvana, lm);
            }
            lm.on(observable, listener);
        }

		/*
			Function: removeListener()

				Removes a specific listener for observable events of the specified type
				(see <Nirvana.Observe> for a list of applicable observables).

			Parameters:

				observable - the type of observable event in which the listener was interested.
				listener - the listener function originally assigned with <on()>, and which should now be removed.

			Returns:

				The <Nirvana> object (making this a chainable method).

			Example Usage:

				> Nirvana.removeListener(Nirvana.Observe.ERROR, myErrorHandler);

				Notice that a reference to the listener is required if you wish to remove it. See the note about
				named and anonymous functions in the <Nirvana.Observe> Example Usage section.

			See Also:

				<Nirvana.on()>, <Nirvana.Observe>

		*/

        function removeListener(observable, listener) {
            lm.removeListener(observable, listener);
        }


		/*
			Class: Session

				A <Session> object is returned by a call to <Nirvana.createSession()>.
				All <Session> objects are created with this factory method;
				<Session> has no built-in public constructor method.

				This version of the API expects only one <Session> to be instantiated in any application.
				It is possible that future versions of the API will support concurrent <Sessions>.
		*/

        function Session(configuration) {

            var Statuses = {
                "NOTSTARTED":"NOTSTARTED",
                "CONNECTING":"CONNECTING",
                "CONNECTED":"CONNECTED",
                "RECONNECTING":"RECONNECTING",
                "STOPPED":"STOPPED"
            };

            var client;

            var self = this;
            var lm = createListenerManager();

            var config = configuration;
            var sessionID = "-1";
            var status = Statuses.NOTSTARTED;
            var longPollRequestID = -1;

            var resources = [];
            var dataGroups = {};
            dataGroups.g1 = "";

            registerListenerManager(self, lm);

			/*
				Function: start()

					Starts the <Session>. This will launch the first preferred transport driver and attempt to contact
					the first preferred realm to initialize a session. If the <Session> initializes successfully as a result
					of this call to <Session.start()>, then any listeners of the _Nirvana.Observe.START_ observable event
					will be invoked with the new session as a parameter.

					Note that there is no requirement that the developer wait for the
					_Nirvana.Observe.START_ observable event to fire before attempting to interact with the <Session>;
					any such interactions will be transparently queued until the session has successfully initialized.

				Returns:

                The <Session> object on which <Session.start()> was invoked (making this a chainable method).

                Example Usage:

                Starting a <Session> can be
                very simple:

                    > var mySession = Nirvana.createSession();
                    > mySession.start();

                    <Sessions> support arbitrary orders of interaction (transparently queueing commands
                    until realm server communication is possible). It is possible to start a session and subscribe
                    to a channel as follows:

					> var mySession = Nirvana.createSession();
					> mySession.start();
					> mySession.subscribe(mySession.getChannel("/some/channel"));

					The placement of the <Session.start()> call is flexible.
					The following would work just as well, for instance:

					> var mySession = Nirvana.createSession();
					> mySession.subscribe(mySession.getChannel("/some/channel"));
					> mySession.start();

					Client code can be asynchronously notified of the actual session initialization. To do this,
					simply assign a listener to the <Session's> _Nirvana.Observe.START_ observable event:

					> function sessionStarted(s) {
					>   console.log("Session started with ID " + s.getSessionID());
					> }
                    > mySession.on(Nirvana.Observe.START, sessionStarted);
                    > mySession.start();

                See Also:

                <Nirvana.Observe>, <Nirvana.createSession()>

			*/


            this.start = function () {

                if (!(status === Statuses.NOTSTARTED || status === Statuses.STOPPED)) {
                    ListenerManagers[window.Nirvana].notifyListeners(Nirvana.Observe.ERROR, client,
                        new SessionException("Nirvana Session", "start() can only be invoked on a new or stopped session")
                    );
                    return client;
                }

                if (document.getElementById(DriverDomObjectsContainerID) === null) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.log(1, "[Nirvana] Waiting for DOM to be ready");
                    }
                    setTimeout(self.start, 15);
                    return client;
                }

                if (Utils.isLoggingEnabled()) {
                    Utils.Logger.log(6, "[Session] Creating Session");
                }
                status = Statuses.CONNECTING;
                var command = {
                    "session":self,
                    "requestType":PrivateConstants.SESSION_START,
                    "listenerManager":lm
                };

                OutboundEngine.prioritizeCommand(command);
                Transport.setUp(self);
                Transport.open();

                window.onbeforeunload = function () {
                    self.stop(true);
                };
                return client;
            };

			/*
				Function: stop()

					Stops the <Session>.
					This will close the connection with the realm server, and set the <Session's> status to STOPPED.

				Returns:

                    The <Session> object on which <Session.stop()> was invoked (making this a chainable method).

                Example Usage:

                    > mySession.stop();

					If a developer wishes to be asynchronously notified when the session has stopped, they
					can assign a listener to the <Session's> _Nirvana.Observe.STOP_ observable event.

                    > function sessionStopped(session) {
                    >   console.log("Session " + session.getSessionID() + " explicitly stopped");
                    > }
                    > mySession.on(Nirvana.Observe.STOP, sessionStopped);
                    > mySession.stop();

                See Also:

                    <Nirvana.Observe>

			*/

            this.stop = function (forceClose) {
                if (status === Statuses.STOPPED) {
                    return client;
                }

                var command = {
                    "requestType":PrivateConstants.CLIENT_CLOSE
                };
                if (forceClose) {
                    OutboundEngine.prioritizeCommand(command);
                } else {
                    OutboundEngine.queueCommand(command);
                }
                status = Statuses.STOPPED;

                lm.notifyListeners(CallbackConstants.STOP, client, true);
                return client;
            };


			/*
				Function: subscribe()

					Batch-subscribes to multiple <Channel>, <Queue> and/or <TransactionalQueue> resources
					with a single call to the server.

					*If attempting to subscribe to more than one resource at a time, this is considerably
					more efficient than using the resource-level subscription methods such as <Channel.subscribe()>.*

					This method may be used in place of resource-level subscription methods such as <Channel.subscribe()>
					even if intending to subscribe only to a single resource; either approach is a matter of developer preference.

					Each successful subscription or failure will fire an observable event both on the respective
                    <Channel>, <Queue>, and/or <TransactionalQueue> resource object, *and* on the <Session>.

				Parameters:

					resourceArray - an array of <Channel>, <Queue>, and/or <TransactionalQueue> resource objects.

				Returns:

                    The <Session> object on which <Session.subscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > var myChannel = mySession.getChannel("/some/channel");
                    > var myChannel2 = mySession.getChannel("/some/other/channel");
                    > var myQueue = mySession.getQueue("/some/queue");
                    > mySession.subscribe([myChannel, myChannel2, myQueue]);

					If a developer wishes to be asynchronously notified when a resource subscription is successful
					(or if a subscription error occurs), they can assign appropriate listeners to the respective resource,
					as shown below:

                    > function subscriptionCompleteHandler(resource) {
                    >   // subscription to this resource was successful
                    > }
                    >
                    > function errorHandler(resource, ex) {
                    >	if (ex instanceof MissingResourceException) {
                    >		console.log("Resource " + resource.getName() + " not found: " + ex.message);
                    >	}
                    >	else if (ex instanceof AlreadySubscribedException) {
                    >		console.log("Already subscribed to " + resource.getName());
                    >	}
                    >	else if (ex instanceof SecurityException) {
                    >		console.log("ACL error for " + resource.getName() + ": " + ex.message);
                    >	}
                    > }
                    >
                    > function eventHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    >
                    > myChannel.on(Nirvana.Observe.SUBSCRIBE, subscriptionCompleteHandler);
                    > myChannel.on(Nirvana.Observe.ERROR, errorHandler);
                    > myChannel.on(Nirvana.Observe.DATA, eventHandler);
                    > mySession.subscribe([myChannel, myChannel2, myQueue]);

                See Also:

                    <Nirvana.Observe>, <Channel.subscribe()>, <Queue.subscribe()>, <TransactionalQueue.subscribe()>

			*/

            this.subscribe = function (resourceArray) {
                try {
                    var apiResources = [];
                    for (var i = 0; i < resourceArray.length; i++) {
                        var clientResource = resourceArray[i];
                        if (clientResource.isSubscribed()) {
                            var ase = new AlreadySubscribedException(clientResource.getName());
                            clientResource.notifyListeners(Nirvana.Observe.ERROR, clientResource, ase);
                            lm.notifyListeners(Nirvana.Observe.ERROR, client, ase);
                            ListenerManagers[window.Nirvana].notifyListeners(Nirvana.Observe.ERROR, client, ase);
                        } else {
                            apiResources.push(self.getResourceByName(clientResource.getName()));
                        }
                    }
                    if (resourceArray.length) {
                        var command = self.prepareCommand(PrivateConstants.BATCH_SUBSCRIBE);
                        command.resources = apiResources;
                        OutboundEngine.queueCommand(command);
                    }
                } catch (ex) {
                    if (Utils.isLoggingEnabled()) {
                        Utils.Logger.logException(8, ex);
                    }
                    ListenerManagers[window.Nirvana].notifyListeners(Nirvana.Observe.ERROR, client, ex);
                }
                return client;
            };


			/*
				Function: getChannel()

					Returns the <Channel> object for the supplied channel name.
					Note that a valid object will be returned irrespective of whether this resource actually exists on the realm server.

				Parameters:

					channelName - a string representation of the fully qualified channel name (e.g. "/some/channel").

				Returns:

                    A <Channel> object for the supplied channel name.

                Example Usage:

                    > var myChannel = mySession.getChannel("/some/channel");

			*/

            this.getChannel = function (channelName) {
                channelName = Utils.getCanonicalResourceName(channelName);
                var channel = self.getResourceByName(channelName);
                if (!channel) {
                    var listenerManager = createListenerManager();
                    channel = new Channel(channelName, listenerManager, self);
                    registerListenerManager(channel, listenerManager);
                } else {
                    return channel.getClientResource();
                }
                return channel;
            };

			/*
				Function: getQueue()

					Returns the <Queue> or <TransactionalQueue> object for the supplied queue name.
					If the optional second parameter is not supplied (or has a false value), then a <Queue> is returned.
					If the value of the second parameter is true, then a <TransactionalQueue> is returned.
					Note that a valid object will be returned irrespective of whether this resource actually exists on the realm server.

				Parameters:

					queueName - a string representation of the fully qualified channel name (e.g. "/some/queue").
					isTransactionalReader - a boolean representing whether this should be a transactional reader.

				Returns:

                    A <Queue> or <TransactionalQueue> object for the supplied queue name.

                Example Usage:

                    > var myQueue = mySession.getQueue("/some/queue");

			*/

            this.getQueue = function (queueName, isTransactionalReader) {
                queueName = Utils.getCanonicalResourceName(queueName);
                var queue = self.getResourceByName(queueName);
                if (!queue) {
                    var listenerManager = createListenerManager();
                    if (isTransactionalReader) {
                        queue = new TransactionalQueue(queueName, listenerManager, self);
                    } else {
                        queue = new Queue(queueName, listenerManager, self);
                    }
                    registerListenerManager(queue, listenerManager);
                } else {
                    return queue.getClientResource();
                }
                return queue;
            };

            this.notifyListeners = function (observable, obj, data) {
                lm.notifyListeners(observable, obj, data);
            };

			/*
				Function: on()

					Registers a single event listener on the <Session> for observable events of the specified type
					(see <Nirvana.Observe> for a list of applicable observables).

					To register more than one observable listener for the same type, invoke <on()> with a
					different listener function as many times as needed.

				Parameters:

					observable - the type of observable event in which the listener is interested.
					listener - the listener function you have implemented, which should handle the parameters associated with the relevant observable event as defined in <Nirvana.Observe>.

				Returns:

                    The <Session> object on which <Session.on()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >   // do something with the evt passed to us as a parameter
                    > }
                    > session.on(Nirvana.Observe.DATA, myHandler);
                    >
                    > // we can now also un-assign this listener any time we want to:
                    > session.removeListener(Nirvana.Observe.DATA, myHandler);

                See Also:

                    <Session.removeListener()>, <Nirvana.Observe>

			*/

            this.on = function (observable, listener) {
                lm.on(observable, listener);
                return client;
            };


			/*
				Function: removeListener()

					Removes a specific listener for observable events of the specified type
					(see <Nirvana.Observe> for a list of applicable observables).

				Parameters:

					observable - the type of observable event in which the listener was interested.
					listener - the listener function originally assigned with <on()>, and which should now be removed.

				Returns:

                    The <Session> object on which <Session.removeListener()> was invoked (making this a chainable method).

                Example Usage:

                    > session.removeListener(Nirvana.Observe.DATA, myHandler);

                    Notice that a reference to the listener is required if you wish to remove it. See the note about
                    named and anonymous functions in the <Nirvana.Observe> Example Usage section.

                See Also:

                    <Session.on()>, <Nirvana.Observe>

			*/

            this.removeListener = function (observable, listener) {
                lm.removeListener(observable, listener);
                return client;
            };

			/*
				Function: getUsername()

					Returns the username used in this <Session>.
					A username can be optionally set when invoking <Nirvana.createSession()> with a suitable configuration object parameter.

				Returns:

                    The <Session>'s username.

                Example Usage:

                    > var username = mySession.getUsername();

                See Also:

                    <Nirvana.createSession()>

			*/

            this.getUsername = function () {
                return config.username;
            };

			/*
				Function: getCurrentDriver()

					Returns the name of the <Session>'s current transport driver.
					This will be one of the names defined in <Nirvana.Driver>, and, if the call to
					<Nirvana.createSession()> included a configuration object parameter with a "drivers" key,
					will be restricted to one of the user-specified drivers.

				Returns:

                    The name of the <Session>'s current transport driver.

                Example Usage:

                    > var driverName = mySession.getCurrentDriver();

                See Also:

                    <Nirvana.Driver>, <Nirvana.createSession()>

			*/

            this.getCurrentDriver = function () {
                return Transport.getCurrentDriver();
            };

			/*
				Function: getCurrentRealm()

					Returns the RNAME (in _protocol://host:port_ format) of the realm server to which the <Session> is currently connected.
					This will be one of the RNAMEs defined in the _realms_ value in the configuration object passed into
					<Nirvana.createSession()>, or, if not configured, willbe derived from the protocol, host and port
					of the server which served the application itself.

				Returns:

                    The name of the realm to which the <Session> is connected.

                Example Usage:

                    > var rname = mySession.getCurrentRealm();

                See Also:

                    <Nirvana.createSession()>

			*/

            this.getCurrentRealm = function () {
                return Transport.getCurrentRealm();
            };

            this.pushResource = function (resource) {
                resources.push(resource);
            };

            this.setGroupAlias = function (groupName, groupAlias) {
                dataGroups[groupAlias] = groupName;
            };

            this.getGroupName = function (resourceAlias) {
                return dataGroups[resourceAlias];
            };

            this.getResources = function () {
                return resources;
            };

            this.getResourceByName = function (resourceName) {
                var length = resources.length;
                for (var i = 0; i < length; i++) {
                    var resource = resources[i];
                    if (resource.getName() == resourceName) {
                        return resource;
                    }
                }
            };

            this.setResourceAlias = function (resourceName, resourceAlias) {
                var length = resources.length;
                for (var i = 0; i < length; i++) {
                    var resource = resources[i];
                    if (resource.getName() === resourceName) {
                        resource.setAlias(resourceAlias);
                        return;
                    }
                }
            };

            this.getResourceByAlias = function (resourceAlias) {
                var length = resources.length;
                for (var i = 0; i < length; i++) {
                    var resource = resources[i];
                    if (resource.getAlias() === resourceAlias) {
                        return resource;
                    }
                }
            };

            this.setSessionID = function (newID) {
                sessionID = "" + newID;
                status = Statuses.CONNECTED;
            };

            this.getLongPollRequestID = function(){
                return longPollRequestID;
            };

            this.setLongPollRequestID = function(id){
                longPollRequestID = id;
            };

			/*
				Function: getSessionID()

					Returns the <Session>'s current sessionID.
					This will be a string, generated and assigned by the realm server after a successful session start or reconnection.

				Returns:

                    A string representing the <Session>'s current sessionID.

                Example Usage:

                    > var sessionID = mySession.getSessionID();

                See Also:

                    <Session.start()>

			*/

            this.getSessionID = function () {
                return sessionID;
            };

			/*
				Function: getConfig()

					Returns the configuration object for the <Session>. Its key/value pairs will be affected by any user-specified
					values in the optional configuration object if passed as a parameter to <Nirvana.createSession()>. Some
					such values (such as the _drivers_ value) may have changed over time, depending on client capabilities.

				Returns:

                    The configuration object for the <Session>.

                Example Usage:

                    > var config = mySession.getConfig();
                    > var myRealmArray = config.realms;

                See Also:

                    <Nirvana.createSession()>

			*/

            this.getConfig = function () {
                return config;
            };

            this.setStatus = function (newStatus) {
                status = newStatus;
            };

			/*
				Function: getStatus()

					Returns the <Session>'s current status, which describes whether it is, for example, not yet started,
					connected, disconnected, or stopped. The actual status value is represented by of the following string constants:

					NOTSTARTED - <Session.start()> has not yet been invoked.
					CONNECTING - <Session.start()> has been invoked, but the <Session> has not yet been initialized with a sessionID.
					CONNECTED - The <Session> is successfully connected, and a sessionID has been assigned.
					RECONNECTING - The <Session> has been temporarily disconnected and is automatically attempting to reconnect.
					STOPPED - <Session.stop()> has been invoked and the <Session> is disconnected.

				Returns:

                    A string representing the <Session>'s current status.

                Example Usage:

                    > var status = mySession.getStatus();

			*/

            this.getStatus = function () {
                return status;
            };

			/*
				Function: isDataStreamEnabled()

					Returns true or false, depending on whether the <Session> was configured to be DataStream-enabled
					(via setting of the _dataStreamEnabled_ key in the configuration object passed as an optional parameter
					to <Nirvana.createSession()>.

				Returns:

                    A boolean value of true or false.

                Example Usage:

                    > if ( mySession.isDataStreamEnabled() ) {
                    >	console.log("This DataStream session receives events from any DataGroup of which it is a member.");
                    > }

                See Also:

                    <Nirvana.createSession()>

			*/

            this.isDataStreamEnabled = function () {
                return config.enableDataStreams;
            };

            // Private Functions:
            this.prepareCommand = function (type) {
                return {
                    "session":this,
                    "requestType":type
                };
            };

            this.requestFactory = Utils.HTTPRequestFactory();
            this.responseFactory = Utils.HTTPResponseFactory(self);

            /*
             *  ************************************************************************************
             *  Public interface to Session:
             *  ************************************************************************************
             */

            client = {
                "on":this.on,
                "removeListener":this.removeListener,
                "isDataStreamEnabled":this.isDataStreamEnabled,
                "getConfig":this.getConfig,
                "getStatus":this.getStatus,
                "getChannel":this.getChannel,
                "getQueue":this.getQueue,
                "getUsername":this.getUsername,
                "getSessionID":this.getSessionID,
                "getCurrentRealm":this.getCurrentRealm,
                "getCurrentDriver":this.getCurrentDriver,
                "start":this.start,
                "stop":this.stop,
                "subscribe":this.subscribe
            };

            return client;
        }

        /*
          Ends Scope of "Session"
         */

        /*
         *  ************************************************************************************
         *  Channel
         *  ************************************************************************************
         */

		/*
			Class: Channel
			A <Channel> object is returned by any call to <Session.getChannel()>.
			All <Channel> objects are created with this factory method;
			<Channel> has no built-in public constructor method.
		*/

        function Channel(channelName, listenerManager, parentSession) {

            // API and Client Objects
            var self = this;
            var client;

            var lm = listenerManager;
            var subscribed = false;
            var startEID = 0;
            var filter = "";
            var alias;
            var currentEID =-1;

            this.getClientResource = function () {
                return client;
            };

			/*
				Function: subscribe()

					Subscribes to the <Channel>, and begins receiving events.

					Each successful subscription or failure will fire an observable event both on the respective
                    <Channel> resource object, *and* on the <Session> (see <Nirvana.Observe> for applicable observables).

				Returns:

                    The <Channel> object on which <Channel.subscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > var myChannel = mySession.getChannel("/some/channel");
                    >
                    > function eventHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    >
                    > myChannel.on(Nirvana.Observe.DATA, eventHandler);
                    > myChannel.subscribe();

                Additional Information:

                    For more information on assignment of listeners for subscription success or failure and for
                    receipt of individual events, please see <Session.subscribe()>, as the techniques and caveats
                    discussed there also apply.

                See Also:

                    <Nirvana.Observe>

			*/

            this.subscribe = function () {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_SUBSCRIBE,
                    "session":parentSession,
                    "resource":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*
				Function: unsubscribe()

					Unsubscribes from the <Channel>, and stops receiving events.

					A successful or failed unsubscription attempt will fire an observable event on the <Channel>
					(see <Nirvana.Observe> for applicable observables).

				Returns:

                    The <Channel> object on which <Channel.unsubscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > function unsubscribeHandler(resource) {
                    >	console.log("Unsubscribed from: " + resource.getName());
                    > }
                    >
                    > myChannel.on(Nirvana.Observe.UNSUBSCRIBE, unsubscribeHandler);
                    > myChannel.unsubscribe();

                See Also:

                    <Channel.subscribe()>, <Session.subscribe()>, <Nirvana.Observe>

			*/

            this.unsubscribe = function () {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_UNSUBSCRIBE,
                    "session":parentSession,
                    "resource":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

            this.getAlias = function () {
                return alias;
            };

            this.setAlias = function (newAlias) {
                alias = newAlias;
            };

            this.setSubscribed = function (subscribeState) {
                subscribed = subscribeState;
                if(subscribed === false){
                    currentEID=-1;
                }
            };

			/*
				Function: isSubscribed()

				Returns true or false, depending on whether a subscription exists for the <Channel>.

				Returns:

                    A boolean value of true or false.

                Example Usage:

                    > if ( !myChannel.isSubscribed() ) {
                    >	myChannel.subscribe();
                    > }

                See Also:

                    <Channel.subscribe()>, <Session.subscribe()>

			*/

            this.isSubscribed = function () {
                return subscribed;
            };

			/*

			Function: publish()

				Publishes a Nirvana <Event> to the <Channel>.

			Parameters:

				event - the Nirvana <Event> which is to be published to this <Channel>.

			Returns:

				The <Channel> object on which <Channel.publish()> was invoked (making this a chainable method).

			Example Usage:

				> var myEvent = Nirvana.createEvent();
				> var myDict = myEvent.getDictionary();
				> myDict.putString("message", "Hello World");
				> myChannel.publish(myEvent);

            */

            this.publish = function (event) {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_PUBLISH,
                    "session":parentSession,
                    "resource":self,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*

			Function: createTransaction()

				Factory method to create a new <Transaction> for use on the <Channel>.

			Returns:

				A new <Transaction> object.

			Example Usage:

				> var myTransaction = myChannel.createTransaction();

            */

            this.createTransaction = function () {
                var listenerManager = createListenerManager();
                var txID = parentSession.getSessionID() + Utils.generateTransactionID();
                return new Transaction(txID, listenerManager, self);
            };

			/*

			Function: getStartEID()

				Returns the <Event> ID (the "EID") from which an existing subscription to the <Channel> started,
				or from which a subsequent subscription to the <Channel> will start.
				This defaults to 0 unless it is set with <setStartEID()>.

			Returns:

				An integer representing the EID from which any subscription on the <Channel> will start.

			Example Usage:

				> var startEID = myChannel.getStartEID();

			See Also:

				<Channel.setStartEID()>, <Channel.subscribe()>, <Channel.getFilter()>, <Channel.setFilter()>

			*/

            this.getStartEID = function () {
                return startEID;
            };

			/*

			Function: setStartEID()

				Sets the <Event> ID (the "EID") from which a subsequent subscription to the <Channel> shall start.
                This defaults to 0 if not set explicitly.

			Parameters:

				eid - the <Event> ID (the "EID") from which any subsequent subscription to the <Channel> shall start.

			Returns:

				The <Channel> object on which <Channel.setStartEID()> was invoked (making this a chainable method).

			Example Usage:

				> var myChannel = mySession.getChannel("/some/channel");
				> myChannel.setStartEID(5106); // receive only events with EID 5016 or higher
				> myChannel.subscribe();

			See Also:

				<Channel.getStartEID()>, <Channel.subscribe()>, <Channel.getFilter()>, <Channel.setFilter()>

            */

            this.setStartEID = function (eid) {
                startEID = eid;
                return client;
            };

			/*

             Function: getCurrentEID()

             Returns the <Event> ID (the "EID") which an existing subscription to the <Channel> is at.
             This defaults to -1 before any events are received.

             Returns:

             An integer representing the EID which the subscription on the <Channel> is up to.

             Example Usage:

             > var currentEID = myChannel.getCurrentEID();

             See Also:

             <Channel.setCurrentEID()>, <Channel.subscribe()>, <Channel.getFilter()>, <Channel.setFilter()>

             */

            this.getCurrentEID = function () {
                return currentEID;
            };

            this.setCurrentEID = function(newEID) {
                currentEID = newEID;
            };

            /*
				Function: getFilter()

					Returns the SQL-style filter applied to an existing or subsequent subscription to the <Channel>.
					By default, no filter is used unless one is set with <setFilter()>.

				Returns:

                    A string representing the filter applied to an existing or subsequent subscription to the <Channel>.

                Example Usage:

                    > var filter = myChannel.getFilter();

                See Also:

                    <Channel.setFilter()>, <Channel.subscribe()>, <Channel.getStartEID()>, <Channel.setStartEID()>

			*/

            this.getFilter = function () {
                return filter;
            };

			/*

			Function: setFilter()

				Sets the SQL-style filter to be applied to a subsequent subscription to the <Channel>.
                No filter is applied to a subscription if one is not set explicitly using this method.

			Parameters:

				filter - the SQL-style filter to be applied to a subsequent subscription to the <Channel>.

			Returns:

				The <Channel> object on which <Channel.setFilter()> was invoked (making this a chainable method).

			Example Usage:

				> var myChannel = mySession.getChannel("/some/channel");
				> // receive only events matching the following filter:
				> myChannel.setFilter("currencypair = 'USDGBP' AND price < 0.6385");
				> myChannel.subscribe();

			See Also:

				<Channel.getFilter()>, <Channel.subscribe()>, <Channel.getStartEID()>, <Channel.setStartEID()>

            */

            this.setFilter = function (newFilter) {
                filter = newFilter;
                return client;
            };

			/*

			Function: getName()

				Returns the <Channel's> fully qualified name (e.g. "/some/channel").

			Returns:

				A string representing the <Channel's> fully qualified name.

			Example Usage:

				> var channelName = myChannel.getName();

			See Also:

				<Session.getChannel()>

			*/

            this.getName = function () {
                return channelName;
            };

			/*

			Function: getResourceType()

				Returns the constant <Nirvana.CHANNEL_RESOURCE>, which identifies this resource as a <Channel>.

			Returns:

				A integer constant equal to <Nirvana.CHANNEL_RESOURCE>.

			Example Usage:

				> if (myChannel.getResourceType() === Nirvana.CHANNEL_RESOURCE) {
				>	console.log("myChannel is a channel");
				> }

			*/

            this.getResourceType = function () {
                return Nirvana.CHANNEL_RESOURCE;
            };


			/*
				Function: on()

					Registers a single event listener on the <Channel> for observable events of the specified type
					(see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable -    the type of observable event in which the listener is interested.
					listener -      the listener function you have implemented, which should handle the parameters
									associated with the relevant observable event as defined in <Nirvana.Observe>.

				Returns:

                    The <Channel> object on which <Channel.on()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    > myChannel.on(Nirvana.Observe.DATA, myHandler);

                Additional Information:

                    For more information on assigning listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <Channel.removeListener()>, <Nirvana.Observe>

			*/

            this.on = function (observable, listener) {
                lm.on(observable, listener);
                return client;
            };

			/*
				Function: removeListener()

				Removes a specific listener for observable events of the specified type (see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable - the type of observable event in which the listener was interested.
					listener - the listener function originally assigned with <on()>, and which should now be removed.

				Returns:

                    The <Channel> object on which <Channel.removeListener()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >   // do something with the evt passed to us as a parameter
                    > }
                    > myChannel.on(Nirvana.Observe.DATA, myHandler);
                    >
                    > // when we want to, we can un-assign the listener:
                    > myChannel.removeListener(Nirvana.Observe.DATA, myHandler);

                Additional Information:

                    For more information on removing listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <Channel.on()>, <Nirvana.Observe>

			*/

            this.removeListener = function (observable, listener) {
                lm.removeListener(observable, listener);
                return client;
            };

            this.notifyListeners = function (observable, obj, data) {
                lm.notifyListeners(observable, obj, data);
            };

            // Set API and Client Versions
            parentSession.pushResource(self);
            client = {
                "on":this.on,
                "removeListener":this.removeListener,
                "subscribe":this.subscribe,
                "unsubscribe":this.unsubscribe,
                "isSubscribed":this.isSubscribed,
                "publish":this.publish,
                "createTransaction":this.createTransaction,
                "getStartEID":this.getStartEID,
                "setStartEID":this.setStartEID,
                "getFilter":this.getFilter,
                "setFilter":this.setFilter,
                "getName":this.getName,
                "getResourceType":this.getResourceType
            };

            return client;
        }

        /*
         *  ************************************************************************************
         *  Queue
         *  ************************************************************************************
         */

		/*
			Class: Queue
			A <Queue> object is returned by any call to <Session.getQueue()> when the
			optional second Queue, _isTransactionalReader_, is either *not supplied or is false*.

			If the optional second parameter is _true_, then a <TransactionalQueue> object is returned instead.

			All <Queue> objects are created with this factory method;
			<Queue> has no built-in public constructor method.

			See Also:

                <TransactionalQueue>
		*/

        function Queue(queueName, listenerManager, parentSession) {

            var self = this;
            var client;

            var lm = listenerManager;
            var subscribed = false;
            var filter = "";
            var alias;

            this.getClientResource = function () {
                return client;
            };

			/*
				Function: subscribe()

					Subscribes to the <Queue>, and begins receiving events.

					Each successful subscription or failure will fire an observable event both on the respective
                    <Queue> resource object, *and* on the <Session> (see <Nirvana.Observe> for applicable observables).

				Returns:

                    The <Queue> object on which <Queue.subscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > var myQueue = mySession.getChannel("/some/queue");
                    >
                    > function eventHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    >
                    > myQueue.on(Nirvana.Observe.DATA, eventHandler);
                    > myQueue.subscribe();

                Additional Information:

                    For more information on assignment of listeners for subscription success or failure and for
                    receipt of individual events, please see <Session.subscribe()>, as the techniques and caveats
                    discussed there also apply.

                See Also:

                    <Nirvana.Observe>

			*/

            this.subscribe = function () {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_SUBSCRIBE,
                    "session":parentSession,
                    "resource":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*
				Function: unsubscribe()

					Unsubscribes from the <Queue>, and stops receiving events.

					A successful or failed unsubscription attempt will fire an observable event on the <Queue>
					(see <Nirvana.Observe> for applicable observables).

				Returns:

                    The <Queue> object on which <Queue.unsubscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > function unsubscribeHandler(resource) {
                    >	console.log("Unsubscribed from: " + resource.getName());
                    > }
                    >
                    > myQueue.on(Nirvana.Observe.UNSUBSCRIBE, unsubscribeHandler);
                    > myQueue.unsubscribe();

                See Also:

                    <Queue.subscribe()>, <Session.subscribe()>, <Nirvana.Observe>

			*/

            this.unsubscribe = function () {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_UNSUBSCRIBE,
                    "session":parentSession,
                    "resource":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

            this.getAlias = function () {
                return alias;
            };

            this.setAlias = function (newAlias) {
                alias = newAlias;
            };

            this.setSubscribed = function (subscriptionState) {
                subscribed = subscriptionState;
            };


			/*
				Function: isSubscribed()

				Returns true or false, depending on whether a subscription exists for the <Queue>.

				Returns:

                    A boolean value of true or false.

                Example Usage:

                    > if ( !myQueue.isSubscribed() ) {
                    >	myQueue.subscribe();
                    > }

                See Also:

                    <Queue.subscribe()>, <Session.subscribe()>

			*/

            this.isSubscribed = function () {
                return subscribed;
            };

			/*

			Function: publish()

				Publishes a Nirvana <Event> to the <Queue>.

			Parameters:

				event - the Nirvana <Event> which is to be published to this <Queue>.

			Returns:

				The <Queue> object on which <Queue.publish()> was invoked (making this a chainable method).

			Example Usage:

				> var myEvent = Nirvana.createEvent();
				> var myDict = myEvent.getDictionary();
				> myDict.putString("message", "Hello World");
				> myQueue.publish(myEvent);

			*/

            this.publish = function (event) {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_PUBLISH,
                    "session":parentSession,
                    "resource":self,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*
				Function: getFilter()

					Returns the SQL-style filter applied to an existing or subsequent subscription to the <Queue>.
					By default, no filter is used unless one is set with <setFilter()>.

				Returns:

                    A string representing the filter applied to an existing or subsequent subscription to the <Queue>.

                Example Usage:

                    > var filter = myQueue.getFilter();

                See Also:

                    <Queue.setFilter()>, <Queue.subscribe()>

			*/

            this.getFilter = function () {
                return filter;
            };

			/*

			Function: setFilter()

				Sets the SQL-style filter to be applied to a subsequent subscription to the <Queue>.
                No filter is applied to a subscription if one is not set explicitly using this method.

			Parameters:

				filter - the SQL-style filter to be applied to a subsequent subscription to the <Queue>.

			Returns:

				The <Queue> object on which <Queue.setFilter()> was invoked (making this a chainable method).

			Example Usage:

				> var myQueue = mySession.getQueue("/some/queue");
				> // receive only events matching the following filter:
				> myQueue.setFilter("currencypair = 'USDGBP' AND price < 0.6385");
				> myQueue.subscribe();

			See Also:

				<Queue.getFilter()>, <Queue.subscribe()>

            */

            this.setFilter = function (newFilter) {
                filter = newFilter;
                return client;
            };

			/*

			Function: getName()

				Returns the <Queue's> fully qualified name (e.g. "/some/queue").

			Returns:

				A string representing the <Queue's> fully qualified name.

			Example Usage:

				> var queueName = myQueue.getName();

			See Also:

				<Session.getQueue()>

			*/

            this.getName = function () {
                return queueName;
            };

			/*

			Function: getResourceType()

				Returns the constant <Nirvana.QUEUE_RESOURCE>, which identifies this resource as a <Queue>.

			Returns:

				A integer constant equal to <Nirvana.QUEUE_RESOURCE>.

			Example Usage:

				> if (myQueue.getResourceType() === Nirvana.QUEUE_RESOURCE) {
				>	console.log("myQueue is a queue");
				> }

			*/

            this.getResourceType = function () {
                return Nirvana.QUEUE_RESOURCE;
            };


			/*
				Function: on()

					Registers a single event listener on the <Queue> for observable events of the specified type
					(see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable -    the type of observable event in which the listener is interested.
					listener -      the listener function you have implemented, which should handle the parameters
									associated with the relevant observable event as defined in <Nirvana.Observe>.

				Returns:

                    The <Queue> object on which <Queue.on()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    > myQueue.on(Nirvana.Observe.DATA, myHandler);

                Additional Information:

                    For more information on assigning listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <Queue.removeListener()>, <Nirvana.Observe>

			*/

            this.on = function (observable, listener) {
                lm.on(observable, listener);
                return client;
            };

			/*
				Function: removeListener()

				Removes a specific listener for observable events of the specified type (see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable - the type of observable event in which the listener was interested.
					listener - the listener function originally assigned with <on()>, and which should now be removed.

				Returns:

                    The <Queue> object on which <Queue.removeListener()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >   // do something with the evt passed to us as a parameter
                    > }
                    > myQueue.on(Nirvana.Observe.DATA, myHandler);
                    >
                    > // when we want to, we can un-assign the listener:
                    > myQueue.removeListener(Nirvana.Observe.DATA, myHandler);

                Additional Information:

                    For more information on removing listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <Queue.on()>, <Nirvana.Observe>

			*/

            this.removeListener = function (observable, listener) {
                lm.removeListener(observable, listener);
                return client;
            };

            this.notifyListeners = function (observable, obj, data) {
                lm.notifyListeners(observable, obj, data);
            };

            parentSession.pushResource(self);
            client = {
                "on":this.on,
                "removeListener":this.removeListener,
                "subscribe":this.subscribe,
                "unsubscribe":this.unsubscribe,
                "isSubscribed":this.isSubscribed,
                "publish":this.publish,
                "getFilter":this.getFilter,
                "setFilter":this.setFilter,
                "getName":this.getName,
                "getResourceType":this.getResourceType
            };

            return client;
        }

		/*
         *  ************************************************************************************
         *  TransactionalQueue (Queue with transactional read behaviour)
         *  ************************************************************************************
         */

		/*
			Class: TransactionalQueue

			A <TransactionalQueue> object is returned by any call to <Session.getQueue()> when the
			optional second parameter, _isTransactionalReader_, is *true*.

			If the optional second parameter is either not supplied or is false, then a basic <Queue> object is returned instead.

			All <TransactionalQueue> objects are created with this factory method;
			<TransactionalQueue> has no built-in public constructor method.

			A <TransactionalQueue> is a type of <Queue>, but with additional transactional read behaviour.
			It offers all of the methods of <Queue>, but also offers the following additional methods:

				- <TransactionalQueue.commit()>,
				- <TransactionalQueue.commitAll()>,
				- <TransactionalQueue.rollback()>,
				- <TransactionalQueue.setWindowSize()> and
				- <TransactionalQueue.getWindowSize()>.

			See Also:

				<Queue>

		*/


        function TransactionalQueue(queueName, listenerManager, parentSession) {

            var self = this;
            var client;

            var subscribed = false;
            var lm = listenerManager;
            var filter = "";
            var windowSize = 5;
            var alias;

            this.getClientResource = function () {
                return client;
            };

			/*
				Function: subscribe()

					Subscribes to the <TransactionalQueue>, and begins receiving events.

					Each successful subscription or failure will fire an observable event both on the respective
                    <TransactionalQueue> resource object, *and* on the <Session> (see <Nirvana.Observe> for applicable observables).

				Returns:

                    The <TransactionalQueue> object on which <TransactionalQueue.subscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > var myTransactionalQueue = mySession.getChannel("/some/queue");
                    >
                    > function eventHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    >
                    > myTransactionalQueue.on(Nirvana.Observe.DATA, eventHandler);
                    > myTransactionalQueue.subscribe();

                Additional Information:

                    For more information on assignment of listeners for subscription success or failure and for
                    receipt of individual events, please see <Session.subscribe()>, as the techniques and caveats
                    discussed there also apply.

                See Also:

                    <Nirvana.Observe>

			*/

            this.subscribe = function () {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_SUBSCRIBE,
                    "session":parentSession,
                    "resource":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*
				Function: unsubscribe()

					Unsubscribes from the <TransactionalQueue>, and stops receiving events.

					A successful or failed unsubscription attempt will fire an observable event on the <Queue>
					(see <Nirvana.Observe> for applicable observables).

				Returns:

                    The <TransactionalQueue> object on which <TransactionalQueue.unsubscribe()> was invoked (making this a chainable method).

                Example Usage:

                    > function unsubscribeHandler(resource) {
                    >	console.log("Unsubscribed from: " + resource.getName());
                    > }
                    >
                    > myTransactionalQueue.on(Nirvana.Observe.UNSUBSCRIBE, unsubscribeHandler);
                    > myTransactionalQueue.unsubscribe();

                See Also:

                    <TransactionalQueue.subscribe()>, <Session.subscribe()>, <Nirvana.Observe>

			*/

            this.unsubscribe = function () {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_UNSUBSCRIBE,
                    "session":parentSession,
                    "resource":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

            this.getAlias = function () {
                return alias;
            };

            this.setAlias = function (newAlias) {
                alias = newAlias;
            };

            this.setSubscribed = function (subscribedState) {
                subscribed = subscribedState;
            };

			/*
				Function: isSubscribed()

				Returns true or false, depending on whether a subscription exists for the <TransactionalQueue>.

				Returns:

                    A boolean value of true or false.

                Example Usage:

                    > if ( !myTransactionalQueue.isSubscribed() ) {
                    >	myTransactionalQueue.subscribe();
                    > }

                See Also:

                    <TransactionalQueue.subscribe()>, <Session.subscribe()>

			*/

            this.isSubscribed = function () {
                return subscribed;
            };

			/*

			Function: publish()

				Publishes a Nirvana <Event> to the <TransactionalQueue>.

			Parameters:

				event - the Nirvana <Event> which is to be published to this <TransactionalQueue>.

			Returns:

				The <TransactionalQueue> object on which <TransactionalQueue.publish()> was invoked (making this a chainable method).

			Example Usage:

				> var myEvent = Nirvana.createEvent();
				> var myDict = myEvent.getDictionary();
				> myDict.putString("message", "Hello World");
				> myTransactionalQueue.publish(myEvent);

			*/

            this.publish = function (event) {
                var command = {
                    "requestType":PrivateConstants.RESOURCE_PUBLISH,
                    "session":parentSession,
                    "resource":self,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*

			Function: commit()

				Commits the read of the supplied <Event> on the <TransactionalQueue>. If there are any <Event> objects
				which the client has previously received but not called commit on, they will be implicitly committed.

			Parameters:

				event - the Nirvana <Event> for which a read is to be committed on this <TransactionalQueue>.

			Returns:

				The <TransactionalQueue> object on which <TransactionalQueue.commit()> was invoked (making this a chainable method).

			Example Usage:

				> var dataCallback = function(event) {
				>   myQueue.commit(event); // commit every event we receive
				> }
				>
				> myQueue.on(Nirvana.Observe.DATA, dataCallback);

            */

            this.commit = function (event) {
                var command = {
                    "requestType":PrivateConstants.QUEUE_COMMIT,
                    "session":parentSession,
                    "resource":self,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*

			Function: commitAll()

				Commits the read of all received <Events> on the <TransactionalQueue>. This behaves the same as committing the
				most recent event received by the client.

			Returns:

				The <TransactionalQueue> object on which <TransactionalQueue.commitAll()> was invoked (making this a chainable method).

			Example Usage:

				> var dataCallback = function(event) {
				>   myQueue.commitAll(); // Same as doing myQueue.commit(event)
				> }
				>
				> myQueue.on(Nirvana.Observe.DATA, dataCallback);

            */

            this.commitAll = function () {
                var command = {
                    "requestType":PrivateConstants.QUEUE_COMMIT,
                    "session":parentSession,
                    "resource":self,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*

			Function: rollback()

                Performs a Roll back of the <TransactionalQueue> to the supplied <Event>. Any uncommitted events received after the
                given parameter will be added to the queue and redelivered to clients.

                Note that different clients may receive the redelivered events.

			Parameters:

				event - the Nirvana <Event> for which a read is to be rolled back from this <TransactionalQueue>.

			Returns:

				The <TransactionalQueue> object on which <TransactionalQueue.rollback()> was invoked (making this a chainable method).

			Example Usage:

				> var myEvents = [];
				>
				> var dataCallback = function(event) {
				>   myEvents.push(event);
				>
				>   if(myEvents.length === 5) {
				>       myQueue.rollback(myEvents[0]); // Rolls back myEvents[1] to myEvents[4]
				>   }
				>
				> }
				>
				> myQueue.on(Nirvana.Observe.DATA, dataCallback);

            */

            this.rollback = function (event) {
                var command = {
                    "requestType":PrivateConstants.QUEUE_ROLLBACK,
                    "session":parentSession,
                    "resource":self,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

			/*
				Function: getFilter()

					Returns the SQL-style filter applied to an existing or subsequent subscription to the <TransactionalQueue>.
					By default, no filter is used unless one is set with <setFilter()>.

				Returns:

                    A string representing the filter applied to an existing or subsequent subscription to the <TransactionalQueue>.

                Example Usage:

                    > var filter = myTransactionalQueue.getFilter();

                See Also:

                    <TransactionalQueue.setFilter()>, <TransactionalQueue.subscribe()>

			*/

            this.getFilter = function () {
                return filter;
            };

			/*
			Function: setFilter()

				Sets the SQL-style filter to be applied to a subsequent subscription to the <TransactionalQueue>.
                No filter is applied to a subscription if one is not set explicitly using this method.

			Parameters:

				filter - the SQL-style filter to be applied to a subsequent subscription to the <TransactionalQueue>.

			Returns:

				The <TransactionalQueue> object on which <TransactionalQueue.setFilter()> was invoked (making this a chainable method).

			Example Usage:

				> var myTransactionalQueue = mySession.getQueue("/some/queue");
				> // receive only events matching the following filter:
				> myTransactionalQueue.setFilter("currencypair = 'USDGBP' AND price < 0.6385");
				> myTransactionalQueue.subscribe();

			See Also:

				<TransactionalQueue.getFilter()>, <TransactionalQueue.subscribe()>

            */

            this.setFilter = function (newFilter) {
                filter = newFilter;
                return client;
            };

			/*
				Function: getWindowSize()

					Returns the window size for transactional reading on the <TransactionalQueue>.
					By default, its value is 5 unless changed with <TransactionalQueue.setWindowSize()>.

                    The window size for a <TransactionalQueue> indicates how many events will be delivered by
                    the server to the client before the client must call <TransactionalQueue.commit()> or
                    <TransactionalQueue.rollback()>.

				Returns:

                    An integer representing the window size of the current or future subscription to this <TransactionalQueue>.

                Example Usage:

                    > var windowSize = myTransactionalQueue.getWindowSize();

                See Also:

                    <TransactionalQueue.setWindowSize()>

			*/

            this.getWindowSize = function () {
                return windowSize;
            };

			/*

			Function: setWindowSize()

				Sets the window size for transactional reading on the <TransactionalQueue>.

				This defines the number of <Events> that can be read before the reads are committed with a call to
				<TransactionalQueue.commit(Event)> or <TransactionalQueue.rollback()>.

				If the window size is not explicitly set with a call to <TransactionalQueue.setWindowSize()>, then
				the default value is 5.

            Parameters:

                A positive integer, greater than 0. Representing the new window size of this <TransactionalQueue>.

			Returns:

				The <TransactionalQueue> object on which <TransactionalQueue.setWindowSize()> was invoked (making this a chainable method).

			Example Usage:

				> myTransactionalQueue.setWindowSize(10);

            See Also:

                <TransactionalQueue.getWindowSize()>

            */

            this.setWindowSize = function (newWindowSize) {
                windowSize = newWindowSize;
                return client;
            };


			/*

			Function: getName()

				Returns the <TransactionalQueue's> fully qualified name (e.g. "/some/queue").

			Returns:

				A string representing the <TransactionalQueue's> fully qualified name.

			Example Usage:

				> var transactionalQueueName = myTransactionalQueue.getName();

			See Also:

				<Session.getQueue()>

			*/

            this.getName = function () {
                return queueName;
            };

			/*

			Function: getResourceType()

				Returns the constant <Nirvana.TRANSACTIONAL_QUEUE_RESOURCE>, which identifies this resource as a <TransactionalQueue>.

			Returns:

				A integer constant equal to <Nirvana.TRANSACTIONAL_QUEUE_RESOURCE>.

			Example Usage:

				> if (myQueue.getResourceType() === Nirvana.TRANSACTIONAL_QUEUE_RESOURCE) {
				>	console.log("myQueue is a queue with a transactional reader");
				> }

			*/

            this.getResourceType = function () {
                return Nirvana.TRANSACTIONAL_QUEUE_RESOURCE;
            };


			/*
				Function: on()

					Registers a single event listener on the <TransactionalQueue> for observable events of the specified type
					(see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable -    the type of observable event in which the listener is interested.
					listener -      the listener function you have implemented, which should handle the parameters
									associated with the relevant observable event as defined in <Nirvana.Observe>.

				Returns:

                    The <TransactionalQueue> object on which <TransactionalQueue.on()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >	console.log("Received event from: " + evt.getResourceName());
                    > }
                    > myTransactionalQueue.on(Nirvana.Observe.DATA, myHandler);

                Additional Information:

                    For more information on assigning listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <TransactionalQueue.removeListener()>, <Nirvana.Observe>

			*/

            this.on = function (observable, listener) {
                lm.on(observable, listener);
                return client;
            };

			/*
				Function: removeListener()

				Removes a specific listener for observable events of the specified type (see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable - the type of observable event in which the listener was interested.
					listener - the listener function originally assigned with <on()>, and which should now be removed.

				Returns:

                    The <TransactionalQueue> object on which <TransactionalQueue.removeListener()> was invoked (making this a chainable method).

                Example Usage:

                    > function myHandler(evt) {
                    >   // do something with the evt passed to us as a parameter
                    > }
                    > myTransactionalQueue.on(Nirvana.Observe.DATA, myHandler);
                    >
                    > // when we want to, we can un-assign the listener:
                    > myTransactionalQueue.removeListener(Nirvana.Observe.DATA, myHandler);

                Additional Information:

                    For more information on removing listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <TransactionalQueue.on()>, <Nirvana.Observe>

			*/

            this.removeListener = function (observable, listener) {
                lm.removeListener(observable, listener);
                return client;
            };

            this.notifyListeners = function (observable, obj, data) {
                lm.notifyListeners(observable, obj, data);
            };


            parentSession.pushResource(self);

            client = {
                "on":this.on,
                "removeListener":this.removeListener,
                "subscribe":this.subscribe,
                "unsubscribe":this.unsubscribe,
                "isSubscribed":this.isSubscribed,
                "publish":this.publish,
                "commitAll":this.commitAll,
                "commit":this.commit,
                "rollback":this.rollback,
                "getFilter":this.getFilter,
                "setFilter":this.setFilter,
                "getWindowSize":this.getWindowSize,
                "setWindowSize":this.setWindowSize,
                "getName":this.getName,
                "getResourceType":this.getResourceType
            };

            return client;
        }

		/*
			Class: Event
			An <Event> object is returned by any call to <Nirvana.createEvent()>.
			All client-created <Event> objects are created with this factory method; <Event> has no built-in public constructor method.
			In addition, all messages received via a subscription to a resource such as a <Channel> or <Queue> are of type <Event>;
			these <Events> are passed to any subscribed resource's listeners of the <Nirvana.Observe>.DATA observable event.
		*/

        function Event(parentSession, eventID, resource, resourceName, eventAttributes, data, tag, dictionary) {
            this.parentSession = parentSession;
            this.dictionary = dictionary;
            this.eventAttributes = eventAttributes;
            this._data = data;
            this.tag = tag;
            this.ttl = 0;
            this.resource = resource;
            this.eventID = eventID;
            this.resourceName = resourceName;
        }

			/*

				Function: getSession()

					Returns the <Session> with which this <Event> is associated, or null if this is a new client-created <Event>.

					If an <Event> is received via a subscription to a resource such as a <Channel>, <Queue> or <TransactionalQueue>
					then this method will return the <Session> object with which the resource, and thus the <Event>, is associated.

					If an <Event> has been created locally with a call to <Nirvana.createEvent()>, then this method will return null.

				Returns:

					A <Session> object or null.

				Example Usage:

					> var s = evt.getSession();
					> if (s != null) {
					>	s.getChannel("/some/channel").publish(evt);
					> }

			*/

        Event.prototype.getSession = function getSession() {
            return this.parentSession;
        };

			/*
				Function: getResource()

					Returns the resource object from which the <Event> was received, or null if this is a new client-created <Event>.

					If this <Event> was received via a client-initiated subscription, then this method will return
					the corresponding <Channel>, <Queue> or <TransactionalQueue> object.

					If this <Event> was received as a result of DataGroup membership via a DataStream-enabled <Session>, this
					method will return a reference to the <Session> object.

					If an <Event> has been created locally with a call to <Nirvana.createEvent()>, then this method will return null.

				Returns:

					The resource from which the <Event> was received, or null if it is a new, locally-created <Event>.

				Example Usage:

					> var sourceChannel = evt.getResource(); // assuming evt came from a Channel subscription

			*/

        Event.prototype.getResource = function getResource() {
            return this.resource;
        };

			/*
				Function: getResourceName()

					Returns the name of the resource with which the <Event> is associated, or null if this is a new client-created <Event>.

					If an <Event> is received via a client-initiated subscription to a resource such as a <Channel>, <Queue> or <TransactionalQueue>
					then this method will return the name of the resource with which the <Event> is associated (e.g. "/some/channel").

					If this <Event> was received as a result of DataGroup membership via a DataStream-enabled <Session>, this
					method will return the name of the source DataGroup.

					If an <Event> has been created locally with a call to <Nirvana.createEvent()>, then this method will return null.

				Returns:

					A string representing the resource's fully qualified name, or null if it is a new, locally-created <Event>.

				Example Usage:

					> var channelName = evt.getResourceName(); // assuming evt came from a Channel subscription

			*/

        Event.prototype.getResourceName = function getResourceName() {
            return this.resourceName;
        };

			/*
				Function: getTTL()

					Returns the <Event's> TTL (Time-to-live) in milliseconds.

				Returns:

					An integer representing the <Event's> TTL in milliseconds.

				Example Usage:

					> var ttl = evt.getTTL();

				See Also:

					<Event.setTTL()>

			*/

        Event.prototype.getTTL = function getTTL() {
            return this.ttl;
        };

			/*
				Function: setTTL()

					Sets the <Event's> TTL (Time-to-live) in milliseconds.
					This is useful if you wish to publish an <Event> that will expire after a certain time.

				Parameters:

					newTTL - the TTL for this <Event>, in milliseconds.

				Returns:

					The <Event> object on which <Event.setTTL()> was invoked (making this a chainable method).

				Example Usage:

					> evt.setTTL(60000); // expire one minute after publishing
					> myChannel.publish(evt);

				See Also:

					<Event.getTTL()>

			*/

        Event.prototype.setTTL = function setTTL(newTTL) {
            this.ttl = newTTL;
            return this;
        };

			/*
				Function: getEID()

					Returns the <Event's> ID (the EID).

				Returns:

					An integer representing the <Event's> ID (EID).

				Example Usage:

					> var eid = evt.getEID();

			*/

        Event.prototype.getEID = function getEID() {
            return this.eventID;
        };

			/*
				Function: getData()

					Returns the <Event's> raw data, or _undefined_ if it has no data.

				Parameters:

					base64Encoded - optional boolean parameter; if true, the data will be returned in base64encoded form.

				Returns:

					The <Event's> raw data, or _undefined_ if it has no data.

				Example Usage:

					> evt.setData("Hello World");
					> evt.getData();		// returns "Hello World"
					> evt.getData(true);	// returns "SGVsbG8gV29ybGQ="

				See Also:

					<Event.setData()>, <Event.hasData()>

			*/

		Event.prototype.getData = function getData(base64Encoded) {
			if (!base64Encoded) {
				return Utils.base64Decode(this._data);
			} else {
				return this._data;
			}
		};

			/*
				Function: setData()

					Sets the <Event's> raw data.

				Parameters:

					data - the data; this is either the raw data or a base64-encoded representation of it.
					isBase64Encoded - optional boolean parameter; set this to true if the data is already base64-encoded.

				Returns:

					The <Event> object on which <Event.setData()> was invoked (making this a chainable method).

				Example Usage:

					> evt.setData("Hello World");
					> evt.getData();                // returns "Hello World"

					> evt.setData(Utils.base64Encode("Another Example"), true);
                    > evt.getData();                // returns "Another Example"

				See Also:

					<Event.getData()>, <Event.hasData()>

			*/

		Event.prototype.setData = function setData(data, isBase64Encoded) {
			if (isBase64Encoded) {
				this._data = data;
			} else {
				this._data = Utils.base64Encode(data);
			}
			return this;
		};

			/*
				Function: getTag()

					Returns the <Event's> tag, or _undefined_ if it has no data.

				Returns:

					The <Event's> tag, or _undefined_ if it has no data.

				Example Usage:

					> console.log(evt.getTag());

				See Also:

					<Event.setTag()>, <Event.hasTag()>

         */

        Event.prototype.getTag = function getTag() {
            return this.tag;
        };

			/*
				Function: setTag()

					Sets the <Event's> tag.

				Parameters:

					newTag - a  string representation of the tag for the <Event>.

				Returns:

					The <Event> object on which <Event.setTTL()> was invoked (making this a chainable method).

				Example Usage:

					> evt.setTag("sometag");

				See Also:

					<Event.getTag()>, <Event.hasTag()>

			*/

        Event.prototype.setTag = function setTag(newTag) {
            this.tag = newTag;
            return this;
        };

			/*
				Function: getDictionary()

					Returns the <Event's> <EventDictionary>. If the <Event> did not explicitly have an <EventDictionary>,
					then a new, empty <EventDictionary> is initialized for the <Event>.

					Note that the object returned is a reference to the <Event's> actual <EventDictionary>, not a copy.
					There is therefore no corresponding _setDictionary()_ method.

				Returns:

					An <EventDictionary> object.

				Example Usage:

					> var dict = evt.getDictionary();
					> dict.putString("message", "Hello World");
					> myChannel.publish(evt);

				See Also:

					<Nirvana.createDictionary()>, <EventDictionary>

			*/

        Event.prototype.getDictionary = function getDictionary() {
            if (!this.dictionary) {
                this.dictionary = new EventDictionary({});
            }
            return this.dictionary;
        };

			/*
				Function: getEventAttributes()

					Returns the <Event's> <EventAttributes>. If the <Event> did not explicitly have any <EventAttributes>,
					then a new, empty <EventAttributes> object is initialized for the <Event>.

					Note that the object returned is a reference to the <Event's> actual <EventAttributes>, not a copy.
					There is therefore no corresponding _setEventAttributes()_ method.

				Returns:

					An <EventAttributes> object.

				Example Usage:

					> var attribs = evt.getEventAttributes();
					> attribs.setPublisherName("John Doe");
					> myChannel.publish(evt);

				See Also:

					<Event.setTag()>, <Event.hasTag()>

			*/

        Event.prototype.getEventAttributes = function getEventAttributes() {
            if (!this.eventAttributes) {
                this.eventAttributes = new EventAttributes({});
            }
            return this.eventAttributes;
        };

			/*
				Function: hasData()

					Returns true if the <Event> has data, or false otherwise.

				Returns:

					A boolean value of true or false

				Example Usage:

					> if (evt.hasData()) {
					>   console.log(evt.getData());
					> }

				See Also:

					<Event.getData()>, <Event.setData()>, <Event.getEncodedData()>, <Event.setEncodedData()>

			*/

        Event.prototype.hasData = function hasData() {
            return this._data !== undefined;
        };

			/*
				Function: hasTag()

					Returns true if the <Event> has a tag, or false otherwise.

				Returns:

					A boolean value of true or false

				Example Usage:

					> if (evt.hasTag()) {
					>   console.log(evt.getTag());
					> }

				See Also:

					<Event.getTag()>, <Event.setTag()>

			*/

        Event.prototype.hasTag = function hasTag() {
            return this.tag !== undefined;
        };

			/*
				Function: hasDictionary()

					Returns true if the <Event> has an <EventDictionary>, or false otherwise.

				Returns:

					A boolean value of true or false

				Example Usage:

					> if (evt.hasDictionary()) {
					>	console.log(evt.getDictionary().getKeys());
					> }

				See Also:

					<Event.getDictionary()>

			*/

        Event.prototype.hasDictionary = function hasDictionary() {
            return this.dictionary !== undefined;
        };

		/*
			Class: EventDictionary
			An <EventDictionary> object is returned by any call to <Event.getDictionary()> or <Nirvana.createDictionary()>.
			All <EventAttributes> objects are created with these two methods;
			<EventAttributes> has no built-in public constructor method.


			Example Usage:

				It is very common to interact with the <EventDictionary> of an <Event> that may have been received through
				a subscription to a resource such as a <Channel> or a <Queue>:

				> var dict = evt.getDictionary();
				> console.log(dict.get("somekey"));

				It is also very common to manipulate an <Event's> <EventDictionary> before publishing the <Event> to
				such a resource:

				> var dict = evt.getDictionary();
				> dict.putString("message", "Hello World");
				> nestedDict = Nirvana.createDictionary();
				> nestedDict.putString("nestedmessage", "Hello again");
				> dict.putDictionary(nestedDict);
				> myChannel.publish(evt);

			Cross-API Data Types:

				Since JavaScript only supports a very basic set of data types, <EventDictionaries> include extra data
				type information for each key/value pair. This permits communication with Nirvana clients built with
				APIs in other languages that include more sophisticated data type support.
				A number of constants to represent these types are defined within <EventDictionary> (see below).


			Constants: STRING
			<EventDictionary.STRING> is an integer constant representing the *String* data type.

			See Also:
				<EventDictionary.putString()>, <EventDictionary.getType()>


			Constants: LONG
			<EventDictionary.LONG> is an integer constant representing the *Long* data type.

			See Also:
				<EventDictionary.putLong()>, <EventDictionary.getType()>

			Constants: DOUBLE
			<EventDictionary.DOUBLE> is an integer constant representing the *Double* data type.

			See Also:
				<EventDictionary.putDouble()>, <EventDictionary.getType()>

			Constants: BOOLEAN
			<EventDictionary.BOOLEAN> is an integer constant representing the *Boolean* data type.

			See Also:
				<EventDictionary.putBoolean()>, <EventDictionary.getType()>

			Constants: INTEGER
			<EventDictionary.INTEGER> is an integer constant representing the *Integer* data type.

			See Also:
				<EventDictionary.putInteger()>, <EventDictionary.getType()>

			Constants: FLOAT
			<EventDictionary.FLOAT> is an integer constant representing the *Float* data type.

			See Also:
				<EventDictionary.putFloat()>, <EventDictionary.getType()>

			Constants: CHARACTER
			<EventDictionary.CHARACTER> is an integer constant representing the *Character* data type.

			See Also:
				<EventDictionary.putChar()>, <EventDictionary.getType()>

			Constants: BYTE
			<EventDictionary.BYTE> is an integer constant representing the *Byte* data type.

			See Also:
				<EventDictionary.putByte()>, <EventDictionary.getType()>

			Constants: DICTIONARY
			<EventDictionary.DICTIONARY> is an integer constant representing the *<EventDictionary>* data type (useful for nested <EventDictionaries>).

			See Also:
				<EventDictionary.putDictionary()>, <EventDictionary.getType()>

			Constants: ARRAY
			<EventDictionary.ARRAY> is an integer constant representing the *Array* data type.

			See Also:
				<EventDictionary.putArray()>, <EventDictionary.getType()>, <EventDictionary.getArrayType()>
        */

        EventDictionary.STRING = 0;
        EventDictionary.LONG = 1;
        EventDictionary.DOUBLE = 2;
        EventDictionary.BOOLEAN = 3;
        EventDictionary.INTEGER = 4;
        EventDictionary.FLOAT = 5;
        EventDictionary.CHARACTER = 6;
        EventDictionary.BYTE = 7;
        EventDictionary.DICTIONARY = 9;
        EventDictionary.ARRAY = -1;

        EventDictionary.createDictionary = function () {
            return new EventDictionary({});
        };


        function EventDictionary(innerProperties) {
            this.innerProperties = innerProperties;
        }

			/*
				Function: getKeys()

					Returns an array of the keys contained in the <EventDictionary>.

				Returns:

					An array of key names.

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().getKeys(); // returns []
					>
					> evt.getDictionary().putString("message", "Hello World");
					> evt.getDictionary().getKeys(); // returns ["message"]

				See Also:

					<EventDictionary.get()>

			*/

        EventDictionary.prototype.getKeys = function () {
            var keys = [];
            for (var key in this.innerProperties) {
                if(this.innerProperties.hasOwnProperty(key)){
                    keys.push(key);
                }
            }
            return keys;
        };

			/*
				Function: get()

					Returns the value to which the <EventDictionary> maps the specified key.

				Parameters:

					key - a string representing the name of the key.

				Returns:

					The value to which this <EventDictionary> maps the specified key.

				Example Usage:

					> var evt = Nirvana.createEvent();
					> evt.getDictionary().putString("message", "Hello World");
					> evt.getDictionary().get("message"); // returns "Hello World"

					A common use case is to examine the values of <EventDictionary> entries after receiving an <Event>
					via a subscription to a resource:

					> function myHandler(evt) {
					>	console.log(evt.getDictionary().get("currencypair"));
					>	console.log(evt.getDictionary().get("price"));
					> }
					> myChannel.addHandler(Nirvana.Observe.DATA, myHandler);
					> myChannel.subscribe();

				See Also:

					<EventDictionary.getKeys()>, <EventDictionary.getType()>, <EventDictionary.getArrayType()>
                    along with the various type-specific *put* methods,
					<EventDictionary.get()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.get = function (key) {
            try {
                if(this.innerProperties[key].length>2){
                    return this.innerProperties[key][2];
                }
                return this.innerProperties[key][1];
            } catch (ex) {
                return null;
            }
        };

			/*
				Function: getType()

					Returns the *type* of the value to which the <EventDictionary> maps the specified key.

				Parameters:

					key - a string representing the name of the key.

				Returns:

					An integer constant representing the type. See <EventDictionary.Constants>.

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putString("message", "Hello World");
					> evt.getDictionary().getKeys(); // returns ["message"]

				See Also:

					<EventDictionary.Constants>, <EventDictionary.get()>, <EventDictionary.getArrayType()>

			*/

        EventDictionary.prototype.getType = function (key) {
            return this.innerProperties[key][0];
        };

			/*
				Function: getArrayType()

					Returns the *type of the entries* in the array value to which the <EventDictionary> maps the specified key.

				Parameters:

					key - a string representing the name of the key (mapping to a typed array value).
							See <EventDictionary.Constants>.

				Returns:

					An integer constant representing the type.

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putString("message", "Hello World");
					> evt.getDictionary().getKeys(); // returns ["message"]

				See Also:

					<EventDictionary.Constants>, <EventDictionary.get()>, <EventDictionary.getType()>

			*/

        EventDictionary.prototype.getArrayType = function (key) {
            return this.innerProperties[key][1];
        };

        EventDictionary.prototype.put = function (key, value, type) {
            this.innerProperties[key] = [type, value];
            return this;
        };

			/*
				Function: putString()

					Associates the specified String value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the String value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putString()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putString("message", "Hello World");
					> evt.getDictionary().get("message"); // returns "Hello World"

				See Also:

					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putString = function (key, value) {
            this.innerProperties[key] = [EventDictionary.STRING, value];
            return this;
        };

			/*
				Function: putLong()

					Associates the specified String value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Long value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putLong()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putLong("myLong", 42424242);
					> evt.getDictionary().get("myLong"); // returns 42424242
					> evt.getDictionary().getType("myLong") === EventDictionary.LONG; // true

				See Also:

					<EventDictionary.LONG>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putLong = function (key, value) {
            this.innerProperties[key] = [EventDictionary.LONG, value];
            return this;
        };

			/*
				Function: putDouble()

					Associates the specified <EventDictionary.DOUBLE> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Double value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putDouble()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putDouble("myDouble", 42.424242);
					> evt.getDictionary().get("myDouble"); // returns 42.424242
					> evt.getDictionary().getType("myDouble") === EventDictionary.DOUBLE; // true

				See Also:

					<EventDictionary.DOUBLE>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putDouble = function (key, value) {
            this.innerProperties[key] = [EventDictionary.DOUBLE, value];
            return this;
        };

			/*
				Function: putBoolean()

					Associates the specified <EventDictionary.BOOLEAN> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Boolean value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putBoolean()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putBoolean("myBoolean", true);
					> evt.getDictionary().get("myBoolean"); // returns true
					> evt.getDictionary().getType("myBoolean") === EventDictionary.BOOLEAN; // true

				See Also:

					<EventDictionary.BOOLEAN>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putBoolean = function (key, value) {
            this.innerProperties[key] = [EventDictionary.BOOLEAN, value];
            return this;
        };

			/*
				Function: putInteger()

					Associates the specified <EventDictionary.INTEGER> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Integer value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putInteger()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putInteger("myInt", 42);
					> evt.getDictionary().get("myInt"); // returns 42
					> evt.getDictionary().getType("myInt") === EventDictionary.INTEGER; // true

				See Also:

					<EventDictionary.INTEGER>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putInteger = function (key, value) {
            this.innerProperties[key] = [EventDictionary.INTEGER, value];
            return this;
        };

			/*
				Function: putFloat()

					Associates the specified <EventDictionary.FLOAT> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Float value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putFloat()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putFloat("myFloat", 1.234);
					> evt.getDictionary().get("myFloat"); // returns 1.234
					> evt.getDictionary().getType("myFloat") === EventDictionary.FLOAT; // true

				See Also:

					<EventDictionary.FLOAT>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putFloat = function (key, value) {
            this.innerProperties[key] = [EventDictionary.FLOAT, value];
            return this;
        };

			/*
				Function: putChar()

					Associates the specified <EventDictionary.CHARACTER> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Character value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putChar()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putChar("myCharVal", "x");
					> evt.getDictionary().get("myCharVal"); // returns "x"
					> evt.getDictionary().getType("myCharVal") === EventDictionary.CHARACTER; // true

				See Also:

					<EventDictionary.CHARACTER>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putChar = function (key, value) {
            this.innerProperties[key] = [EventDictionary.CHARACTER, value];
            return this;
        };

			/*
				Function: putByte()

					Associates the specified <EventDictionary.BYTE> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the Byte value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putByte()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putByte("myByteVal", myByteValue);
					> evt.getDictionary().getType("myByteVal") === EventDictionary.BYTE; // true

				See Also:

					<EventDictionary.BYTE>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putDictionary()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putByte = function (key, value) {
            this.innerProperties[key] = [EventDictionary.BYTE, value];
            return this;
        };

			/*
				Function: putDictionary()

					Associates the specified <EventDictionary> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the <EventDictionary> value to be added.

				Returns:

					The <EventDictionary> object on which <EventDictionary.putDictionary()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					> var dict = evt.getDictionary();
					> nestedDict = Nirvana.createDictionary();
					> nestedDict.putString("message", "This is in a nested EventDictionary");
					> dict.putDictionary("myNestedDictionary", nestedDict);
					> myChannel.publish(evt);
					> evt.getDictionary().getType("myNestedDictionary") === EventDictionary.DICTIONARY; // true


				See Also:

					<EventDictionary.DICTIONARY>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putArray()>

			*/

        EventDictionary.prototype.putDictionary = function (key, value) {
            this.innerProperties[key] = [EventDictionary.DICTIONARY, value];
            return this;
        };

			/*
				Function: putArray()

					Associates the specified <EventDictionary.ARRAY> value with the specified key in this <EventDictionary>.

				Parameters:

					key - a string representing the name of the key.
					value - the array of values to be added.
					arrType - the type of the values in the array (see <EventDictionary.Constants>).

				Returns:

					The <EventDictionary> object on which <EventDictionary.putArray()> was invoked (making this a chainable method).

				Example Usage:

					> var evt = Nirvana.createEvent();
					>
					> evt.getDictionary().putArray("myArray", ["Hello","World"], EventDictionary.STRING);
					> evt.getDictionary().get("myArray"); // returns ["Hello","World"]
					> evt.getDictionary().getType("myArray") === EventDictionary.ARRAY; // true
					> evt.getDictionary().getArrayType("myArray") === EventDictionary.STRING; // true

				See Also:

					<EventDictionary.ARRAY>,
					<EventDictionary.get()>,
					<EventDictionary.getType()>,
					<EventDictionary.getArrayType()>,
					<EventDictionary.putString()>,
					<EventDictionary.putLong()>,
					<EventDictionary.putDouble()>,
					<EventDictionary.putBoolean()>,
					<EventDictionary.putInteger()>,
					<EventDictionary.putFloat()>,
					<EventDictionary.putChar()>,
					<EventDictionary.putByte()>,
					<EventDictionary.putDictionary()>

			*/

        EventDictionary.prototype.putArray = function (key, value, arrType) {
            this.innerProperties[key] = [EventDictionary.ARRAY, arrType, value];
            return this;
        };

		/*
			Class: EventAttributes
			An <EventAttributes> object is returned by any call to <Event.getEventAttributes()>.
			All <EventAttributes> objects are created with this factory method;
			<EventAttributes> no built-in public constructor method.

			Example Usage:

				> var publisher = evt.getAttributes().getPublisherName();

                Developers will typically use specific getter/setter methods (such as <EventAttributes.getPublisherName()>)
                which exist for all default attributes. Alternatively, if they know the underlying attribute key name,
                they may use the generic <EventAttributes.getAttribute()> and <EventAttributes.setAttribute()> methods
                to accomplish the same thing:

                > var publisher = evt.getAttributes().getAttribute("pubName");

			Methods:

				For brevity, the many methods of <EventAttributes> have no extended documentation;
				their meanings and usage, however, should be reasonably self-explanatory.

		*/

        EventAttributes.HEADER_KEYS = ["_allowMerging", "pubHost", "pubName", "subHost", "subName", "subID", "messageType"];
        EventAttributes.SERVER_HEADER_KEYS = ["timeStamp", "_isDelta", "_isRedelivered", "_isRegistered", "deadEID", "deadEventChannel", "joinEID", "joinChannel", "joinRealm", "joinPath"];
        EventAttributes.JMS_HEADER_KEYS = ["messageID", "correlationID", "type", "expiration", "destination", "deliveryMode", "priority", "userID", "appID", "replyToName", "replyToType"];

        function EventAttributes(innerAttributes) {
            this.innerAttributes = innerAttributes;
        }

            /*********************************************************************
                Group: Getters/Setters
            **********************************************************************/


			/*
				Function: getSubscriberHost()

					Returns a string representing the subscriber host.

				See Also:

					<EventAttributes.setSubscriberHost()>, <EventAttributes.getPublisherHost()>
			*/
			EventAttributes.prototype.getSubscriberHost = function () {
					return this.innerAttributes.subHost;
				};

			/*
				Function: getSubscriberName()

					Returns a string representing the subscriber name.

				See Also:

					<EventAttributes.setSubscriberName()>, <EventAttributes.getPublisherName()>
			*/
			EventAttributes.prototype.getSubscriberName = function () {
					return this.innerAttributes.subName;
				};

			/*
				Function: getSubscriberID()

					Returns a string representing the subscriber ID.

				See Also:

					<EventAttributes.setSubscriberID()>
			*/
			EventAttributes.prototype.getSubscriberID = function () {
					return this.innerAttributes.subID;
				};

			/*
				Function: getPublisherHost()

					Returns a string representing the publisher host.

				See Also:

					<EventAttributes.setPublisherHost()>, <EventAttributes.getSubscriberHost()>
			*/
			EventAttributes.prototype.getPublisherHost = function () {
					return this.innerAttributes.pubHost;
				};

			/*
				Function: getPublisherName()

					Returns a string representing the publisher name.

				See Also:

					<EventAttributes.setPublisherName()>, <EventAttributes.getSubscriberName()>
			*/
			EventAttributes.prototype.getPublisherName = function () {
					return this.innerAttributes.pubName;
				};

			/*
				Function: setSubscriberHost()

					Sets the subscriber host.

				Returns:

                    The <EventAttributes> object on which <EventAttributes.setSubscriberHost()> was invoked (making this a chainable method).

				See Also:

					<EventAttributes.getSubscriberHost()>, <EventAttributes.setPublisherHost()>
			*/
			EventAttributes.prototype.setSubscriberHost = function (subscriberHost) {
					this.innerAttributes.subHost = subscriberHost;
					return this;
				};

			/*
				Function: setSubscriberName()

					Sets the subscriber name.

				Returns:

                    The <EventAttributes> object on which <EventAttributes.setSubscriberName()> was invoked (making this a chainable method).

				See Also:

					<EventAttributes.getSubscriberName()>, <EventAttributes.setPublisherName()>
			*/
			EventAttributes.prototype.setSubscriberName = function (subscriberName) {
					this.innerAttributes.subName = subscriberName;
					return this;
				};

			// Reserved for future use:

			EventAttributes.prototype.setSubscriberNames = function (subscriberNames) {
					this.innerAttributes.subName = subscriberNames;
					return this;
				};

			/*
				Function: setPublisherName()

					Sets the publisher name.

				Returns:

                    The <EventAttributes> object on which <EventAttributes.setPublisherName()> was invoked (making this a chainable method).

				See Also:

					<EventAttributes.getPublisherName()>, <EventAttributes.setSubscriberName()>
			*/
			EventAttributes.prototype.setPublisherName = function (publisherName) {
					this.innerAttributes.pubName = publisherName;
					return this;
				};

			/*
				Function: setPublisherHost()

					Sets the publisher host.

				Returns:

                    The <EventAttributes> object on which <EventAttributes.setPublisherHost()> was invoked (making this a chainable method).

				See Also:

					<EventAttributes.getPublisherHost()>, <EventAttributes.setSubscriberHost()>
			*/
			EventAttributes.prototype.setPublisherHost = function (publisherHost) {
					this.innerAttributes.pubHost = publisherHost;
					return this;
				};


            /*********************************************************************
                Group: Low-Level Getters/Setters
            **********************************************************************/

			/*
				Function: getAttribute()

					Returns the value to which the <EventAttributes> maps the specified name.

				See Also:

					<EventAttributes.setAttribute()>, <EventAttributes.getAttributeNames()>
			*/
			EventAttributes.prototype.getAttribute = function (name) {
					return this.innerAttributes[name];
				};

			/*
				Function: getAttributeNames()

					Returns an array of an attribute names in this <EventAttributes> object.

				See Also:

					<EventAttributes.getAttribute()>

			*/
			EventAttributes.prototype.getAttributeNames = function () {
					var attributes = [];
					for (var attribute in this.innerAttributes) {
                        if(this.innerAttributes.hasOwnProperty(attribute)){
						    attributes.push(attribute);
                        }
					}
					return attributes;
				};
			/*
				Function: setAttribute()

					Associates the specified value with the specified attribute name in this <EventAttributes> object.

				Parameters:

					attributeName - the name of the attribute.
					attributeValue - the value to be set.

				See Also:

					<EventAttributes.getAttribute()>, <EventAttributes.getAttributeNames()>
			*/
			EventAttributes.prototype.setAttribute = function (attributeName, attributeValue) {
					this.innerAttributes[attributeName] = attributeValue;
					return this;
				};


            /*********************************************************************
                Group: Read-Only methods accessing Immutable Server-Side Values
            **********************************************************************/

			/*
				Function: getTimeStamp()

					Returns the <Event's> publication timestamp as an integer value representing the number of milliseconds since 1 January 1970 00:00:00 UTC (Unix Epoch).
			*/
			EventAttributes.prototype.getTimeStamp = function () {
					return this.innerAttributes.timeStamp;
				};

			/*
				Function: getAllowMerge()

					Returns true if the <Event> can be merged, or false otherwise.
			*/
			EventAttributes.prototype.getAllowMerge = function () {
					return this.innerAttributes._allowMerging;
				};

			/*
				Function: isDelta()

					Returns true if the <Event> is a delta. Returns false if the <Event> is a standard event.

			*/
			EventAttributes.prototype.isDelta = function () {
                /** @namespace innerAttributes._isDelta */
					return this.innerAttributes._isDelta;
				};

			/*
				Function: isRedelivered()

					Returns true if the <Event> is redelivered. Returns false otherwise.

			*/
			EventAttributes.prototype.isRedelivered = function () {
                /** @namespace innerAttributes._isRedelivered */
					return this.innerAttributes._isRedelivered;
				};

			/*
				Function: isRegistered()

					Returns true if the <Event> is a "registered event", or false otherwise.
			*/
			EventAttributes.prototype.isRegistered = function () {
                /** @namespace innerAttributes._isRegistered */
					return this.innerAttributes._isRegistered;
				};


            /*********************************************************************
                Group: Join-Specific Functions

                Methods for working with <Events> received via *Joined Channels*.

                Learn more about Channel Joins at: http://www.my-channels.com/developers/nirvana/enterprisemanager/channeladmin/channeljoins.html
            **********************************************************************/

			/*
				Function: getJoinChannel()

					Returns a string representing the name of the <Channel> from which the <Event> originated.

			*/
			EventAttributes.prototype.getJoinChannel = function () {
					/** @namespace innerAttributes.joinChannel */
					return this.innerAttributes.joinChannel;
				};

			/*
				Function: getJoinEID()

					Returns an integer representing the EID of the original <Event> on the joined <Channel>.

			*/
			EventAttributes.prototype.getJoinEID = function () {
					/** @namespace innerAttributes.joinEID */
					return this.innerAttributes.joinEID;
				};

			/*
				Function: getJoinPath()

					Returns the names of all the <Channels> in the join path for the <Event>.

			*/
			EventAttributes.prototype.getJoinPath = function () {
					/** @namespace innerAttributes.joinPath */
					return this.innerAttributes.joinPath;
				};

			/*
				Function: getJoinRealm()

					Returns a string representing the details of the realm on which the joined <Channel> exists.

			*/
			EventAttributes.prototype.getJoinRealm = function () {
					/** @namespace innerAttributes.joinRealm */
					return this.innerAttributes.joinRealm;
				};


            /*********************************************************************
                Group: Dead-Event Functions
            **********************************************************************/

			/*
				Function: getDeadEID()

					Returns an integer representing the EID of the Dead <Event> (assuming it was consumed from a dead event store).
			*/
			EventAttributes.prototype.getDeadEID = function () {
					/** @namespace innerAttributes.deadEID */
					return this.innerAttributes.deadEID;
				};

			/*
				Function: getDeadEventStore()

					Returns a string representing the name of the Dead <Event's> dead event store (assuming it was consumed from a dead event store).
			*/
			EventAttributes.prototype.getDeadEventStore = function () {
					/** @namespace innerAttributes.deadEventChannel */
					return this.innerAttributes.deadEventChannel;
				};

            /*********************************************************************
                Group: JMS Functions
            **********************************************************************/

			/*
				Function: getApplicationID()

					Returns the application ID allocated to the <Event>.
			*/
			EventAttributes.prototype.getApplicationID = function () {
					return this.innerAttributes.appID;
				};


			/*
				Function: getCorrelationID()

					Returns the correlation ID allocated to the <Event>.
			*/
			EventAttributes.prototype.getCorrelationID = function () {
					return this.innerAttributes.correlationID;
				};

			/*
				Function: getDeliveryMode()

					Returns the delivery mode used for the <Event>.
			*/
			EventAttributes.prototype.getDeliveryMode = function () {
					return this.innerAttributes.deliveryMode;
				};

			/*
				Function: getDestination()

					Returns the destination allocated to the <Event>.
			*/
			EventAttributes.prototype.getDestination = function () {
					return this.innerAttributes.destination;
				};

			/*
				Function: getExpiration()

					Returns the expiration value allocated to the <Event>.
			*/
			EventAttributes.prototype.getExpiration = function () {
					return this.innerAttributes.expiration;
				};

			/*
				Function: getMessageID()

					Returns the message ID allocated to the <Event>.
			*/
			EventAttributes.prototype.getMessageID = function () {
					return this.innerAttributes.messageID;
				};

			/*
				Function: getMessageType()

					Returns an integer representing the message type of the <Event>.
			*/
			EventAttributes.prototype.getMessageType = function () {
					return this.innerAttributes.messageType;
				};

			/*
				Function: getPriority()

					Returns an integer representing the <Event> priority.
			*/
			EventAttributes.prototype.getPriority = function () {
					return this.innerAttributes.priority;
				};

			/*
				Function: getRedeliveredCount()

					Returns an integer representing the number of times the <Event> has been redelivered.
			*/
			EventAttributes.prototype.getRedeliveredCount = function () {
					/** @namespace innerAttributes.redeliveredCount */
					return this.innerAttributes.redeliveredCount;
				};

			/*
				Function: getReplyToName()

					Returns the "reply to" name allocated to the <Event>.
			*/
			EventAttributes.prototype.getReplyToName = function () {
					return this.innerAttributes.replyToName;
				};

			/*
				Function: getReplyType()

					Returns an integer representing the reply type of the <Event>.
			*/
			EventAttributes.prototype.getReplyType = function () {
					return this.innerAttributes.replyToType;
				};


			/*
				Function: getType()

					Returns the arbitrary type of the <Event>.
			*/
			EventAttributes.prototype.getType = function () {
					return this.innerAttributes.type;
				};

			/*
				Function: getUserID()

					Returns the user ID given to the <Event>.
			*/
			EventAttributes.prototype.getUserID = function () {
					return this.innerAttributes.userID;
				};

			/*
				Function: setAllowMerge()
			*/
			EventAttributes.prototype.setAllowMerge = function (mergeValue) {
					this.innerAttributes._allowMerging = mergeValue;
					return this;
				};

			/*
				Function: setApplicationID()
			*/
			EventAttributes.prototype.setApplicationID = function (applicationID) {
					this.innerAttributes.appID = applicationID;
					return this;
				};


			/*
				Function: setCorrelationID()
			*/
			EventAttributes.prototype.setCorrelationID = function (correlationID) {
					this.innerAttributes.correlationID = correlationID;
					return this;
				};

			/*
				Function: setDeliveryMode()
			*/
			EventAttributes.prototype.setDeliveryMode = function (deliveryMode) {
					this.innerAttributes.deliveryMode = deliveryMode;
					return this;
				};

			/*
				Function: setDestination()
			*/
			EventAttributes.prototype.setDestination = function (destination) {
					this.innerAttributes.destination = destination;
					return this;
				};

			/*
				Function: setExpiration()
			*/
			EventAttributes.prototype.setExpiration = function (expiration) {
					this.innerAttributes.expiration = expiration;
					return this;
				};

			/*
				Function: setMessageID()
			*/
			EventAttributes.prototype.setMessageID = function (messageID) {
					this.innerAttributes.messageID = messageID;
					return this;
				};

			/*
				Function: setMessageType()
			*/
			EventAttributes.prototype.setMessageType = function (messageType) {
					this.innerAttributes.messageType = messageType;
					return this;
				};

			/*
				Function: setPriority()
			*/
			EventAttributes.prototype.setPriority = function (priority) {
					this.innerAttributes.priority = priority;
					return this;
				};

			/*
				Function: setReplyToName()
			*/
			EventAttributes.prototype.setReplyToName = function (replyToName) {
					this.innerAttributes.replyToName = replyToName;
					return this;
				};

			/*
				Function: setReplyType()
			*/
			EventAttributes.prototype.setReplyType = function (replyType) {
					this.innerAttributes.replyToType = replyType;
					return this;
				};

			/*
				Function: setType()
			*/
			EventAttributes.prototype.setType = function (type) {
					this.innerAttributes.type = type;
					return this;
				};

			/*
				Function: setUserID()
			*/
			EventAttributes.prototype.setUserID = function (userID) {
					this.innerAttributes.userID = userID;
					return this;
				};

			/*
				Function: setSubscriberID()
			*/
			EventAttributes.prototype.setSubscriberID = function (subscriberID) {
					this.innerAttributes.subID = subscriberID;
					return this;
				};

		/*
			Class: Transaction

				A <Transaction> object is returned by any call to <Channel.createTransaction()>.
				All <Transaction> objects are created with this factory method;
				<Transaction> has no built-in public constructor method.
		*/
		function Transaction(txID, listenerManager, parentChannel) {

            var self = this;
            var client;

            var lm = listenerManager;

            var channel = parentChannel;
            var event;

            var isCommitted = false;
            var hasPublished = false;

            this.getTxID = function () {
                return txID;
            };

            /*
             Function: publishAndCommit()
             */
            this.publishAndCommit = function () {
                if (hasPublished) {
                    throw new AlreadyCommittedException(channel.getName(), txID);
                }
                var command = {
                    "requestType":PrivateConstants.TX_PUBLISH,
                    "transaction":self,
                    "resource":channel,
                    "event":event
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

            this.setIsCommitted = function (commitState) {
                isCommitted = commitState;
            };

            /*
             Function: checkCommitStatus()
             */
            this.checkCommitStatus = function (queryServer) {
                if (isCommitted || !queryServer) {
                    lm.notifyListeners(CallbackConstants.COMMIT, client, true);
                }
                var command = {
                    "requestType":PrivateConstants.TX_IS_COMMITTED,
                    "transaction":self
                };
                OutboundEngine.queueCommand(command);
                return client;
            };

            /*
             Function: setEvent()
             */
            this.setEvent = function (newEvent) {
                if (hasPublished) {
                    throw new AlreadyCommittedException(channel.getName(), txID);
                }
                event = newEvent;
                return client;
            };

			/*
				Function: on()

					Registers a single event listener on the <Transaction> for observable events of the specified type
					(see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable -    the type of observable event in which the listener is interested.
					listener -      the listener function you have implemented, which should handle the parameters
									associated with the relevant observable event as defined in <Nirvana.Observe>.

				Returns:

                    The <Transaction> object on which <Transaction.on()> was invoked (making this a chainable method).

                Example Usage:

                    > function myCommitCB(transaction, successFlag) {
                    >   if (successFlag) {
                    >		console.log("Commit was successful");
                    >	}
                    > }
                    > myTransaction.on(Nirvana.Observe.COMMIT, myCommitCB);

                Additional Information:

                    For more information on assigning listeners for _Nirvana.Observe.DATA_ or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

                    <Transaction.removeListener()>, <Nirvana.Observe>

			*/


            this.on = function (observable, listener) {
                lm.on(observable, listener);
                return client;
            };

			/*
				Function: removeListener()

				Removes a specific listener for observable events of the specified type (see <Nirvana.Observe> for applicable observables).

				Parameters:

					observable - the type of observable event in which the listener was interested.
					listener - the listener function originally assigned with <on()>, and which should now be removed.

				Returns:

                    The <Transaction> object on which <Transaction.removeListener()> was invoked (making this a chainable method).

                Example Usage:

                    > function myCommitCB(transaction, successFlag) {
                    >   if (successFlag) {
                    >		console.log("Commit was successful");
                    >	}
                    > }
                    > myTransaction.on(Nirvana.Observe.COMMIT, myCommitCB);
                    >
                    > // when we want to, we can un-assign the listener:
                    > myTransaction.removeListener(Nirvana.Observe.COMMIT, myCommitCB);

                Additional Information:

                    For more information on removing listeners for _Nirvana.Observe.COMMIT or any other observable event,
                    please see the <Nirvana.Observe> Example Usage section.

                See Also:

             <Transaction.on()>, <Nirvana.Observe>

			*/

            this.removeListener = function (observable, listener) {
                lm.removeListener(observable, listener);
                return client;
            };

            this.notifyListeners = function (observable, obj, data) {
                lm.notifyListeners(observable, obj, data);
            };

            client = {
                "on":this.on,
                "removeListener":this.removeListener,
                "checkCommitStatus":this.checkCommitStatus,
                "publishAndCommit":this.publishAndCommit,
                "setEvent":this.setEvent
            };
            return client;
        }

        function initialize() {
            var intervalID = setInterval(function () {
                try {
                    if (document.getElementById(DriverDomObjectsContainerID) === null) {
                        var elem = document.createElement('span');
                        elem.style.display = 'none';
                        elem.setAttribute('id', DriverDomObjectsContainerID);
                        var body = document.getElementsByTagName('body')[0];
                        body.appendChild(elem);
                        // elem is where we should create any iframes etc.
                        clearInterval(intervalID);
                    }
                } catch (e) {
                    // document evidently not ready.
                }
            }, 15);
        }


		/*
         *  ************************************************************************************
         *  Public interface to window.Nirvana:
         *  ************************************************************************************
         */

        return {

            VERSION_NUMBER:"_VERSION_MAJOR_._VERSION_MINOR_",
            BUILD_NUMBER:"Build 11318",
            BUILD_DATE:"July 13 2012",

            // Event Handler Callbacks
            Observe:CallbackConstants,

            // Resource Types
            CHANNEL_RESOURCE:1,
            QUEUE_RESOURCE:2,
            TRANSACTIONAL_QUEUE_RESOURCE:3,

            "Driver":Transport.Drivers.Names,
            "clientSupportsDriver":Transport.supportsDriver,

            // Framework Level Methods
            "initialize":initialize,
            "createSession":createSession,
            "createEvent":createEvent,
            "createDictionary":createDictionary,
            "on":on,
            "removeListener":removeListener,

            "Utils":{
                "isLoggingEnabled":Utils.isLoggingEnabled,
                "Logger":Utils.Logger
            },

            "EventDictionary":{
                "STRING":0,
                "LONG":1,
                "DOUBLE":2,
                "BOOLEAN":3,
                "INTEGER":4,
                "FLOAT":5,
                "CHARACTER":6,
                "BYTE":7,
                "DICTIONARY":9,
                "ARRAY":-1
            }
        };
    }());

    window.Nirvana = Nirvana; // Sorry, any pre-existing Nirvana object. We're here now!
    Nirvana.on(Nirvana.Observe.ERROR, function (session, error) {
        Nirvana.Utils.Logger.log(8, "System Error: " + error.message, session);
    });

    if (window.addEventListener) {
        window.addEventListener('load', Nirvana.initialize, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', Nirvana.initialize);
    }

}(window));