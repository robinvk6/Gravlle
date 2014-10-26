
<!DOCTYPE html>
<html>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>
<link src="${pageContext.request.contextPath}/resources/css/bootstrap-wizard.css" rel="stylesheet">
<style type="text/css">
    .column ul li i {
        float: right;
    }
    .glyphicon glyphicon-chevron-right {
        background-position: -456px -72px;
    }
    [class^="icon-"], [class*=" icon-"] {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-top: 1px;
        line-height: 14px;
        vertical-align: text-top;
        background-image: url("../img/glyphicons-halflings.png");
        background-position: 14px 14px;
        background-repeat: no-repeat;
    }

    .column-view-container {
        margin: 1em;
    }
    .column-view-container {
        width: 900px;
        height: 300px;
        border: 1px solid #ccc;
        background: #FFF;
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
    }

    .column-view-composition {
        display: table;
        white-space: nowrap;
    }

    .column {
        display: table-cell;
        border-right: 1px solid #999;
    }

    .column ul {
        margin: 0;
        height: 300px;
        width: 250px;
        overflow-y: auto;
        list-style: none;
    }

    ol, ul {
        list-style: none;
    }

    .column ul li:hover, .column ul li.active {
        background: #999999;
        color: #FFFFFF;
    }
    .column ul li {
        margin: 0;
        padding: 10px;
        font-size: 15px;
    }

    .column:last-child {
        border-right: 0;
    }
    .column {
        display: table-cell;
        border-right: 1px solid #999;
    }
</style>
<body onload="loadWarehouseData()">

<div id="wrapper">


<div id="page-wrapper">
<div class="row">
<div class="col-lg-12">
<h1 class="page-header">Product Management</h1>
<div class="wizard" id="satellite-wizard" data-title="Create Server">

<!-- Step 1 Name & FQDN -->
<div class="wizard-card" data-cardname="name">
    <h3>Name & FQDN</h3>

    <div class="wizard-input-section">
        <div class="form-group">
            <div class="col-sm-6">
                <input type="text" class="form-control" id="label" name="label" placeholder="Server label" data-validate="validateServerLabel">
            </div>
        </div>
    </div>

    <div class="wizard-input-section">
        <p>
            Full Qualified Domain Name
        </p>

                        <div class="form-group">
                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="fqdn" name="fqdn" placeholder="FQDN" data-validate="validateFQDN" data-is-valid="0" data-lookup="0" />
                                    <span class="input-group-btn" id="btn-fqdn">
                                        <button class="btn btn-default" type="button" onclick='lookup();'>
                                            Lookup
                                        </button> </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="wizard-input-section">
                        <p>
                            Server ip.
                        </p>

                        <div class="form-group">
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="ip" name="ip" placeholder="IP" data-serialize="1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wizard-card" data-cardname="group">
                    <h3>Server Group</h3>

                    <div class="wizard-input-section">
                        <p>
                            Where would you like server <strong class="create-server-name"></strong>
                            to go?
                        </p>

                        <img class="wizard-group-list" src="img/groups.png" />
                    </div>
                </div>

                <div class="wizard-card wizard-card-overlay" data-cardname="services">
                    <h3>Service Selection</h3>

                    <div class="alert hide">
                        It's recommended that you select at least one
                        service, like ping.
                    </div>

                    <div class="wizard-input-section">
                        <p>
                            Please choose the services you'd like Panopta to
                            monitor.  Any service you select will be given a default
                            check frequency of 1 minute.
                        </p>

                        <select name="services" data-placeholder="Service List" style="width:350px;" class="chzn-select create-server-service-list form-control" multiple>

                            <option value=""></option>
                            <optgroup label="Basic">
                                <option selected value="icmp.ping">Ping</option>
                                <option selected value="tcp.ssh">SSH</option>
                                <option value="tcp.ftp">FTP</option>
                            </optgroup>
                            <optgroup label="Web">
                                <option selected value="tcp.http">HTTP</option>
                                <option value="tcp.https">HTTP (Secure)</option>
                                <option value="tcp.dns">DNS</option>
                            </optgroup>
                            <optgroup label="Email">
                                <option value="tcp.pop">POP</option>
                                <option value="tcp.imap">IMAP</option>
                                <option value="tcp.smtp">SMTP</option>
                                <option value="tcp.pops">POP (Secure)</option>
                                <option value="tcp.imaps">IMAP (Secure)</option>
                                <option value="tcp.smtps">SMTP (Secure)</option>
                                <option value="tcp.http.exchange">Microsoft Exchange</option>
                            </optgroup>
                            <optgroup label="Databases">
                                <option value="tcp.mysql">MySQL</option>
                                <option value="tcp.postgres">PostgreSQL</option>
                                <option value="tcp.mssql">Microsoft SQL Server</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div class="wizard-card wizard-card-overlay" data-cardname="location">
                    <h3>Monitoring Location</h3>

                    <div class="wizard-input-section">
                        <p>
                            We determined <strong>Chicago</strong> to be
                            the closest location to monitor
                            <strong class="create-server-name"></strong>
                            If you would like to change this, or you think this is
                            incorrect, please select a different
                            monitoring location.
                        </p>

                        <select name="location" data-placeholder="Monitor nodes" style="width:350px;" class="chzn-select form-control">
                            <option value=""></option>
                            <optgroup label="North America">
                                <option>Atlanta</option>
                                <option selected>Chicago</option>
                                <option>Dallas</option>
                                <option>Denver</option>
                                <option>Fremont, CA</option>
                                <option>Los Angeles</option>
                                <option>Miami</option>
                                <option>Newark, NJ</option>
                                <option>Phoenix</option>
                                <option>Seattle</option>
                                <option>Washington, DC</option>
                            </optgroup>

                            <optgroup label="Europe">
                                <option>Amsterdam, NL</option>
                                <option>Berlin</option>
                                <option>London</option>
                                <option>Milan, Italy</option>
                                <option>Nurnberg, Germany</option>
                                <option>Paris</option>
                                <option>Stockholm</option>
                                <option>Vienna</option>
                            </optgroup>

                            <optgroup label="Asia/Africa">
                                <option>Cairo</option>
                                <option>Jakarta</option>
                                <option>Johannesburg</option>
                                <option>Hong Kong</option>
                                <option>Singapore</option>
                                <option>Sydney</option>
                                <option>Tokyo</option>
                            </optgroup>

                        </select>

                    </div>
                </div>

                <div class="wizard-card wizard-card-overlay">
                    <h3>Notification Schedule</h3>

                    <div class="wizard-input-section">
                        <p>
                            Select the notification schedule to be used for outages.
                        </p>

                        <select name="notification" class="wizard-ns-select chzn-select form-control" data-placeholder="Notification schedule" style="width:350px;">
                            <option value=""></option>
                            <option>ALIS Production</option>
                            <option>ALIS Development &amp; Staging</option>
                            <option>Panopta Development &amp; Staging</option>
                            <option>Jira</option>
                            <option>QSC Enterprise Production</option>
                            <option>QSC Enterprise Development &amp; Staging</option>
                            <option>Panopta Production</option>
                            <option>Panopta Monitoring Nodes</option>
                            <option>Common</option>
                        </select>
                    </div>

                    <div class="wizard-ns-detail hide">
                        Also using <strong>ALIS Production</strong>:

                        <ul id="wizard-ns-detail-servers">
                            <li><img src="img/folder.png" />Corporate sites</li>
                            <li><img src="img/folder.png" />dt01.sat.medtelligent.com</li>
                            <li><img src="img/server_new.png" />alisonline.com</li>
                            <li><img src="img/server_new.png" />circa-db04.sat.medtelligent.com</li>
                            <li><img src="img/server_new.png" />circa-services01.sat.medtelligent.com</li>
                            <li><img src="img/server_new.png" />circa-web01.sat.medtelligent.com</li>
                            <li><img src="img/server_new.png" />heartbeat.alisonline.com</li>
                            <li><img src="img/server_new.png" />medtelligent.com</li>
                            <li><img src="img/server_new.png" />dt02.fre.medtelligent.com</li>
                            <li><img src="img/server_new.png" />dev03.lin.medtelligent.com</li>
                        </ul>img				</div>
                </div>

                <div class="wizard-card">
                    <h3>Agent Setup</h3>

                    <div class="wizard-input-section">
                        <p>The <a target="_blank" href="http://www.panopta.com/support/knowledgebase/support-questions/how-do-i-install-the-panopta-monitoring-agent/">Panopta Agent</a> allows
                            you to monitor local resources (disk usage, cpu usage, etc).
                            If you would like to set that up now, please download
                            and follow the <a target="_blank" href="http://www.panopta.com/support/knowledgebase/support-questions/how-do-i-install-the-panopta-monitoring-agent/">install instructions.</a>
                        </p>

                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Download<span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#">.rpm</a></li>
                                <li><a href="#">.deb</a></li>
                                <li><a href="#">.tar.gz</a></li>
                            </ul>
                        </div>
                    </div>


                    <div class="wizard-input-section">
                        <p>You will be given a server key after you install the Agent
                            on <strong class="create-server-name"></strong>.
                            If you know your server key now, please enter it
                            below.</p>

                        <div class="form-group">
                            <input type="text" class="create-server-agent-key form-control" placeholder="Server key (optional)" data-validate="">
                        </div>
                    </div>


                    <div class="wizard-error">
                        <div class="alert alert-error">
                            <strong>There was a problem</strong> with your submission.
                            Please correct the errors and re-submit.
                        </div>
                    </div>

                    <div class="wizard-failure">
                        <div class="alert alert-error">
                            <strong>There was a problem</strong> submitting the form.
                            Please try again in a minute.
                        </div>
                    </div>

                    <div class="wizard-success">
                        <div class="alert alert-success">
                            <span class="create-server-name"></span>Server Created <strong>Successfully.</strong>
                        </div>

                        <a class="btn btn-default create-another-server">Create another server</a>
                        <span style="padding:0 10px">or</span>
                        <a class="btn btn-success im-done">Done</a>
                    </div>
                </div>
            </div>



                    </div>

                </div>
                <!-- /.row -->
            </div>
            <!-- /#page-wrapper -->

        </div>
    </div>

	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>

	<script src="${pageContext.request.contextPath}/resources/js/plugins/bootstrap-wizard/chosen.jquery.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/plugins/bootstrap-wizard/bootstrap-wizard.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/core/gravlle-admin.js"></script>

	<script type="text/javascript">
        function onPageLoad() {
            GRAVLLE_CATEGORY_TREE.initiazlizeTree({
                columnViewType: "category",
                columnViewContainer: "column-view-composition"
            });
        }

        function buildForm() {
            $('#loading-indicator').show();
            var obj = {};
            obj = $('form#warehouse').serializeObject();
            obj.address = $('form#address').serializeObject();
            obj.warehouse_id = null;
            obj.stockLocations = null;
            console.log(JSON.stringify(obj));
            GRAVLLE_ERP.publishRequest("PUT", "${pageContext.request.contextPath}/services/catalog/warehouse/save", JSON.stringify(obj), onSuccessData);
        }

        function onSuccessData(data) {
            console.log(data);
            loadWarehouseData();
        }

        function loadWarehouseData() {
            //	GRAVLLE_ERP.publishRequest("GET","${pageContext.request.contextPath}/services/catalog/warehouse/list",null,onWarehouseData);
            var wizard = $('#satellite-wizard').wizard({
                keyboard: false,
                contentHeight: 400,
                contentWidth: 700,
                backdrop: 'static'
            });

            $(".chzn-select").chosen();

            wizard.show();
        }

        function onWarehouseData(warehouses) {
            if (warehouses) {
                var html = "<table class='table table-striped'><tr><th>Warehouse Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Open Time</th><th>Close Time</th></tr>";
                var rowshtml = "";
                for (var i = 0; i < warehouses.length; i++) {
                    rowshtml += "<tr><td>" + warehouses[i].name + "</td>" +
                            "<td>" + warehouses[i].phone + "</td>" +
                            "<td>" + warehouses[i].email + "</td>" +
                            "<td>" + warehouses[i].address.streetAddress + "," + warehouses[i].address.city + "</td>" +
                            "<td>" + warehouses[i].warehouseOpenTime + "</td>" +
                            "<td>" + warehouses[i].warehouseCloseTime + "</td></tr>";
                }
                html = html + rowshtml + "</table>";
                $('#warehouseList').html(html);

            }
        }
	</script>


</body>

</html>
