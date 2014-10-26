<!DOCTYPE html>
<html>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
    <jsp:param name="name" value="sos"/>
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

    .breadcrumb > li + li:before {
        content: "\003e" !important;
    }
</style>
<body onload="onPageLoad();">


<div id="wrapper">


<div id="page-wrapper">
<div class="row">


<div class="navbar">
    <div class="navbar-inner">
        <div class="container">
            <ul class="nav nav-pills nav-justified">
                <li class="disabled">
                    <a href="#tab1" data-toggle="tab">
                        <h5>1. Search Product</h5>
                    </a>
                </li>
                <li class="active">
                    <a href="#tab2" data-toggle="tab">
                        <h5>2. Select Category</h5>
                    </a>
                </li>
                <li class="disabled">
                    <a href="#tab3" data-toggle="tab">
                        <h5>3. Add Product</h5>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>



<div class="col-lg-8">
<div id="columns" class="column-view-container">

</div>

<div class="panel panel-default product-wizard hide">
<div class="panel-heading">
    Add/Edit Product
</div>

<!-- panel-heading -->
<div class="panel-body">

<!-- Nav tabs -->
<ul class="nav nav-tabs product-wizard-tab">
    <li class="active"><a href="#vitalinfo" data-toggle="tab">Vital Info</a>
    </li>
    <li class=""><a href="#productdetails" data-toggle="tab">Description</a>
    </li>
    <li class=""><a href="#media" data-toggle="tab">Media</a>
    </li>
    <li class=""><a href="#moreproductdetails" data-toggle="tab">More Details</a>
    </li>
</ul>

<ul class="breadcrumb bg-white b-a">
</ul>


<div class="tab-content">

    <div data-parsley-validate class="tab-pane fade active in col-lg-12" id="vitalinfo">

        <div class="form-group">
            <label class="control-label col-md-3">Title
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="title">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Description
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="description">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">MSRP
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" step="0.0001" class="form-control"
                       name="msrp">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Currency Code
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <select class="form-control" name="currenct_code">
                    <option value="">Select Currency</option>
                    <option value="usd">USD</option>
                    <option value="cad">CAD</option>
                </select>
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Max Order Quantity
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" type="number" min="1" class="form-control"
                       name="max_order_quantity">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Legal Disclaimer
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="legal_disclaimer">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Manufacturer
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="manufacturer">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">MFR Part Number
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="mfr_part_number">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Enabled
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="product_enabled">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Weight
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="weight">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Weight Unit of Measure
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <select class="form-control" name="weigh_unit_of_measure">
                    <option value="">Select Unit of Measure</option>
                    <option value="lbs" selected>LBS</option>
                    <option value="kg">KG</option>
                </select>
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Quantity
                <span class="required" aria-required="true">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="quantity">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Quantity
                <span class="not-required" aria-required="false">* </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="quantity">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Inventory
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control" name="inventory">
                <span class="help-block"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Product Attributes
                <span class="not-required" aria-required="false"> </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="product_attribute">
                <span class="help-block"></span>
            </div>
        </div>
        <button type="button" class="btn btn-default pull-left"
                onclick="GRAVLLE_PRODUCT_WIZARD.toggleCategoryProduct();">Select Category
        </button>
        <button type="button" class="btn btn-default pull-right" data-next-wizard-tab="productdetails"
                onclick="GRAVLLE_PRODUCT_WIZARD.validatePage(this);">Next
        </button>
    </div>
    <div data-parsley-validate class="tab-pane fade col-lg-12" id="productdetails">
        <div class="form-group">
            <label class="control-label col-md-3">Bullet Point 1 <span class="required" aria-required="true">
                                                        * </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="bullet_point_1">
                                                            <span class="help-block">
                                                            </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Bullet Point 2 <span class="not-required" aria-required="false">
                                                        </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="bullet_point_1">
                                                            <span class="help-block">
                                                            </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Bullet Point 3 <span class="not-required" aria-required="false">
                                                        </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="bullet_point_3">
                                                            <span class="help-block">
                                                            </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Bullet Point 4 <span class="not-required" aria-required="false">
                                                        </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="bullet_point_4">
                                                            <span class="help-block">
                                                            </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-3">Bullet Point 5 <span class="not-required" aria-required="false">
                                                        </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Enter details about your product" class="form-control"
                       name="bullet_point_5">
                                                            <span class="help-block">
                                                            </span>
            </div>
        </div>
    </div>
    <div data-parsley-validate class="tab-pane fade col-lg-12" id="media">
        <div class="form-group">
            <label class="control-label col-md-3">Media <span class="required" aria-required="true">
                                                        </span>
            </label>

            <div class="col-md-4">
                <input type="text" placeholder="Select an image form your computer" class="form-control"
                       name="picture_upload_1">
                                                            <span class="help-block">
                                                            </span>
            </div>
        </div>
    </div>
    <div data-parsley-validate class="tab-pane fade col-lg-12" id="moreproductdetails">
        <div class="form-group">
            <label class="control-label col-md-3">Payment Options <span class="required" aria-required="true">
                                                        * </span>
            </label>

            <div class="col-md-4">
                <div class="checkbox-list">
                    <label>
                        <div class="checker"><span><input type="checkbox" name="payment[]" value="1"
                                                          data-title="Auto-Pay with this Credit Card."></span></div>
                        Auto-Pay with this Credit Card </label>
                    <label>
                        <div class="checker"><span><input type="checkbox" name="payment[]" value="2"
                                                          data-title="Email me monthly billing."></span></div>
                        Email me monthly billing </label>
                </div>
                <div id="form_payment_error">
                </div>
            </div>
        </div>
    </div>

</div>

</div>

<!-- panel-default -->
</div>

<!-- col-lg-12 -->
</div>

<!-- row -->
</div>

<!-- page-wrapper -->
</div>

<!-- wrapper -->
</div>

<jsp:include page="/WEB-INF/views/Core/footer.jsp">
    <jsp:param name="name" value="sos"/>
</jsp:include>

<script src="${pageContext.request.contextPath}/resources/js/chosen.jquery.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/bootstrap-wizard/jquery.bootstrap.wizard.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/parsley.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/core/gravlle-admin.js"></script>


<script type="text/javascript">
    function onPageLoad() {

        GRAVLLE_CATEGORY_TREE.initialize({
            columnViewType: "category",
            //columnViewContainer: "column-view-composition"
            columnViewContainer: "column-view-container"
        });
    }

    function initProductWizard() {

        console.log("initializing product view");
        GRAVLLE_PRODUCT_WIZARD.initialize({
            productWizardContainer: "product-wizard"
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

        // $(".chzn-select").chosen();

        // wizard.show();
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
