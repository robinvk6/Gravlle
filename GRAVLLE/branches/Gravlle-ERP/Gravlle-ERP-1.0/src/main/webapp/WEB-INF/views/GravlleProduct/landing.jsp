<!DOCTYPE html>
<html>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
    <jsp:param name="name" value="sos"/>
</jsp:include>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/plugins/select2/select2.css">
<link rel="stylesheet" type="text/css"
      href="${pageContext.request.contextPath}/resources/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css">

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
        /*margin: 1em;*/
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

    .vcenter {
        display: inline-block;
        vertical-align: middle;
        float: none;
    }

    .form-horizontal .form-group {
        margin-right: 15px;
        margin-left: 15px;
    }
</style>
<body>

<div class="page-content-wrapper">
<div class="page-content" style="min-height:1194px">
<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
<div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                Widget settings form goes here
            </div>
            <div class="modal-footer">
                <button type="button" class="btn blue">Save changes</button>
                <button type="button" class="btn default" data-dismiss="modal">Close</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->

<!-- BEGIN PAGE HEADER-->
<h3 class="page-title">
    Form Wizard
    <small>form wizard sample</small>
</h3>
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <i class="fa fa-home"></i>
            <a href="index.html">Home</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="#">Form Stuff</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="#">Form Wizard</a>
        </li>
    </ul>
    <div class="page-toolbar">
        <div class="btn-group pull-right">
            <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle" data-toggle="dropdown"
                    data-hover="dropdown" data-delay="1000" data-close-others="true">
                Actions <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu pull-right" role="menu">
                <li>
                    <a href="#">Action</a>
                </li>
                <li>
                    <a href="#">Another action</a>
                </li>
                <li>
                    <a href="#">Something else here</a>
                </li>
                <li class="divider">
                </li>
                <li>
                    <a href="#">Separated link</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->
<div class="row">
<div class="col-md-12">
<div class="portlet box blue" id="search_product_form_wizard">
<div class="portlet-title">
    <div class="caption">
        <i class="fa fa-gift"></i> Form Wizard - <span class="step-title">
								Step 1 of 4 </span>
    </div>
    <div class="tools hidden-xs">
        <a href="javascript:;" class="collapse">
        </a>
        <a href="#portlet-config" data-toggle="modal" class="config">
        </a>
        <a href="javascript:;" class="reload">
        </a>
        <a href="javascript:;" class="remove">
        </a>
    </div>
</div>
<div class="portlet-body form" style="">
<form action="#" class="form-horizontal" id="submit_form" method="POST" novalidate="novalidate">
<div class="form-wizard">
<div class="form-body">
<ul class="nav nav-pills nav-justified steps">
    <li class="active">
        <a href="#tab1" data-toggle="tab" class="step">
												<span class="number">
												1 </span>
												<span class="desc">
												<i class="fa fa-check"></i>Search Product</span>
        </a>
    </li>
    <li>
        <a href="#tab2" data-toggle="tab" class="step">
												<span class="number">
												2 </span>
												<span class="desc">
												<i class="fa fa-check"></i>Select Category</span>
        </a>
    </li>
    <li>
        <a href="#tab3" data-toggle="tab" class="step active">
												<span class="number">
												3 </span>
												<span class="desc">
												<i class="fa fa-check"></i>Add / Edit Product</span>
        </a>
    </li>
    <li>
        <a href="#tab4" data-toggle="tab" class="step">
												<span class="number">
												4 </span>
												<span class="desc">
												<i class="fa fa-check"></i> Confirm </span>
        </a>
    </li>
</ul>
<div id="bar" class="progress progress-striped" role="progressbar">
    <div class="progress-bar progress-bar-success" style="width: 25%;">
    </div>
</div>
<div class="tab-content">
<div class="alert alert-danger display-none">
    <button class="close" data-dismiss="alert"></button>
    You have some form errors. Please check below.
</div>
<div class="alert alert-success display-none">
    <button class="close" data-dismiss="alert"></button>
    Your form validation is successful!
</div>
<div class="tab-pane active" id="tab1">
    <h3 class="block">Enter product ASIN / UPC to start search</h3>

    <div class="form-group">
        <div class="row search-form-default">
            <div class="col-md-4">
                <form action="#">
                    <div class="input-group">
                        <div class="input-cont">
                            <input type="text" onclick="" placeholder="Search..." id="search_input"
                                   class="form-control">
                        </div>
                            <span class="input-group-btn">
                            <button type="button" id="search_product" class="btn green-haze">
                                Search &nbsp; <i class="m-icon-swapright m-icon-white"></i>
                            </button>
                            </span>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div class="form-group">


        <div id="search_product_container" class="dataTables_wrapper no-footer" style="display: none;">
            <div class="table-toolbar">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group pull-right">
                            <button class="btn dropdown-toggle" data-toggle="dropdown">Tools <i
                                    class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="#">
                                        Print </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Save as PDF </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Export to Excel </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="dataTables_length" id="sample_1_length"><label> <select name="sample_1_length"
                                                                                        aria-controls="sample_1"
                                                                                        class="form-control input-xsmall input-inline">
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="-1">All</option>
                    </select> records</label></div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div id="sample_1_filter" class="dataTables_filter"><label>Filter Text:<input type="search"
                                                                                                  class="form-control input-medium input-inline"
                                                                                                  aria-controls="sample_1"
                                                                                                  placeholder='Example type "12oz" to filter'></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5 col-sm-12">
                    <div class="dataTables_info" role="status" aria-live="polite">Showing 1 to 5 of
                        25 entries
                    </div>
                </div>
                <div class="col-md-7 col-sm-12">
                    <div class="dataTables_paginate paging_bootstrap_full_number" id="sample_1_paginate">
                        <ul class="pagination" style="visibility: visible;">
                            <li class="prev disabled"><a href="#" title="First"><i class="fa fa-angle-double-left"></i></a>
                            </li>
                            <li class="prev disabled"><a href="#" title="Prev"><i class="fa fa-angle-left"></i></a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li class="next"><a href="#" title="Next"><i class="fa fa-angle-right"></i></a></li>
                            <li class="next"><a href="#" title="Last"><i class="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <table class="table table-striped table-bordered table-hover dataTable no-footer" id="sample_1"
                       role="grid" aria-describedby="sample_1_info">
                    <thead>
                        <tr role="row">
                            <!-- <th class="table-checkbox sorting_disabled" rowspan="1" colspan="1" aria-label="

								" style="width: 24px;">
                                <div class="checker"><span><input type="checkbox" class="group-checkable"
                                                                  data-set="#sample_1 .checkboxes"></span></div>
                            </th> -->
                            <th class="sorting_asc" tabindex="0" aria-controls="sample_1" rowspan="1" colspan="1"
                                aria-sort="ascending" aria-label="
									 Username
								: activate to sort column ascending" style="width: 287px;">
                                ASIN
                            </th>
                            <th class="sorting_asc" tabindex="0" aria-controls="sample_1" rowspan="1" colspan="1"
                                aria-sort="ascending" aria-label="
									 Username
								: activate to sort column ascending" style="width: 287px;">
                                Product Title
                            </th>
                            <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="
									 Email
								" style="width: 474px;">
                                Product Manufacturer
                            </th>
                            <th class="sorting" tabindex="0" aria-controls="sample_1" rowspan="1" colspan="1"
                                aria-label="
									 Joined
								: activate to sort column ascending" style="width: 245px;">
                                Product Category
                            </th>
                            <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="
									 Status
								" style="width: 276px;">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody id="search_product_table_body">
                        
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col-md-5 col-sm-12">
                    <div class="dataTables_info" role="status" aria-live="polite">Showing 1 to 5 of
                        25 entries
                    </div>
                </div>
                <div class="col-md-7 col-sm-12">
                    <div class="dataTables_paginate paging_bootstrap_full_number" id="sample_1_paginate">
                        <ul class="pagination" style="visibility: visible;">
                            <li class="prev disabled"><a href="#" title="First"><i class="fa fa-angle-double-left"></i></a>
                            </li>
                            <li class="prev disabled"><a href="#" title="Prev"><i class="fa fa-angle-left"></i></a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li class="next"><a href="#" title="Next"><i class="fa fa-angle-right"></i></a></li>
                            <li class="next"><a href="#" title="Last"><i class="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group" id="search_product_action" style="display: none;">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h4 class="block">Looks like we couldn't find any matching products. </h4>
                    <h4>Continue to category page and manually create the product.</h4>
                    <a href="javascript:;" class="btn blue button-next">
                        Create Product <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>


<div class="tab-pane" id="tab2">
    <h3 class="block">Select Product Category</h3>

    <div class="form-group">
        <div id="columns" class="column-view-container center-block"></div>

        <a href="javascript:;" id="next_product_detail_page" class="btn blue button-next" style="display: none;">
            Create Product <i class="m-icon-swapright m-icon-white"></i>
        </a>
    </div>

</div>


<div class="tab-pane" id="tab3">
    <h3 class="block">Provide your billing and credit card details</h3>

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

    <div class="form-group">

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
                        <input type="text" placeholder="Enter details about your product" class="form-control"
                               name="description">
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
                        <input type="text" placeholder="Enter details about your product" type="number" min="1"
                               class="form-control"
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
                        <input type="text" placeholder="Enter details about your product" class="form-control"
                               name="manufacturer">
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
</div>


<div class="tab-pane" id="tab4">
    <h3 class="block">Confirm your account</h3>
    <h4 class="form-section">Account</h4>

    <div class="form-group">
        <label class="control-label col-md-3">Username:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="username">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Email:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="email">
            </p>
        </div>
    </div>
    <h4 class="form-section">Profile</h4>

    <div class="form-group">
        <label class="control-label col-md-3">Fullname:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="fullname">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Gender:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="gender">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Phone:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="phone">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Address:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="address">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">City/Town:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="city">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Country:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="country">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Remarks:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="remarks">
            </p>
        </div>
    </div>
    <h4 class="form-section">Billing</h4>

    <div class="form-group">
        <label class="control-label col-md-3">Card Holder Name:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="card_name">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Card Number:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="card_number">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">CVC:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="card_cvc">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Expiration:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="card_expiry_date">
            </p>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">Payment Options:</label>

        <div class="col-md-4">
            <p class="form-control-static" data-display="payment">
            </p>
        </div>
    </div>
</div>
</div>
</div>
</div>
<div class="form-actions" style="display: none;">
    <div class="row">
        <div class="col-md-offset-3 col-md-9">
            <a href="javascript:;" class="btn default button-previous disabled" style="display: none;">
                <i class="m-icon-swapleft"></i> Back </a>
            <a href="javascript:;" class="btn blue button-next">
                Continue <i class="m-icon-swapright m-icon-white"></i>
            </a>
            <a href="javascript:;" class="btn green button-submit" style="display: none;">
                Submit <i class="m-icon-swapright m-icon-white"></i>
            </a>
        </div>
    </div>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
<!-- END PAGE CONTENT-->
</div>
</div>


<jsp:include page="/WEB-INF/views/Core/footer.jsp">
    <jsp:param name="name" value="sos"/>
</jsp:include>

<script src="${pageContext.request.contextPath}/resources/js/chosen.jquery.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/parsley.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/core/gravlle-admin.js"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/select2/select2.min.js"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>


<script type="text/javascript">

	var search_results = null;	

    var SearchList = function () {
        return {
            init: function () {
                $()
            },

            buildDataTable: function (product) {
                var jsonSearchResult = product;
                var jsonKeysOptions = {
                    specification: "product",
                    page: "create"
                }

                // TODO: replace this with a call to
                var productSearchKeys = [];
                productSearchKeys = GRAVLLE_ERP.getJsonKeys(jsonKeysOptions);
                productSearchKeys = [
                    "attributes.title",
                    "attributes.manufacturer",
                    "attributes.productGroup"
                ];
                var productSearchObject = GRAVLLE_ERP.parseJsonForKeys(jsonSearchResult, productSearchKeys)
                if (productSearchObject) {
                    var productHtml = "";
                    var productSet = JSON.parse(jsonSearchResult);
                    for (var key in productSearchObject) {
                        oneProduct = productSearchObject[key];
                        productHtml += '<tr class="gradeX" role="row">' +
                                '<td>' +
                                key +
                                '</td>' +
                                '<td class="sorting_1">' +
                                oneProduct['attributes.title'] +
                                '</td>' +
                                '<td>' +
                                oneProduct['attributes.manufacturer'] +
                                '</td>' +
                                '<td>' +
                                oneProduct['attributes.productGroup'] +
                                '</td>' +
                                '<td>' +
                                '<a href="javascript:;" class="btn green button-submit">'+
                'Copy Product <i class="m-icon-swapright m-icon-white"></i>'+
            '</a>' +
                                '</td>' +
                                '</tr>';
                    }
                    $('#search_product_action').hide();
                    $('#search_product_container').show();
                    $('#search_product_table_body').html();
                    $('#search_product_table_body').html(productHtml);
                }
            }
        }
    }();

    var Search = function () {
        return {
            init: function () {
            	var foundProducts = false;
            	$('#search_product_container').hide();
            	$('#search_product_action').hide();
                $('#search_product').bind("click", function () {
                    var searchString = $('#search_input').val();
                    var searchOptions = {
                        searchString: searchString
                    };
                    var product = GRAVLLE_PRODUCT_SEARCH.searchProduct(searchOptions);
                	
                	
                    if(product && product != '{}'){
                     foundProducts = true;
                     SearchList.buildDataTable(product);
                     
                     
                      try {
                    	  search_results = jQuery.parseJSON(product);
                     } catch (e) {
                         var loggerOptions = {
                             message: "Product search with searchString: " + searchString + " was unsuccessful",
                             type: "info",
                             username: GRAVLLE_ERP.currentUserLoginVersion()
                         };
                         GRAVLLE_ERP.gravlleJavascriptLogger(loggerOptions);
                     } 
                    } else {
                        $('#search_product_action').show();
                        $('#search_product_container').hide();
                    }
                    
                    
                });
            }
        };
    }();

    Search.init();

    var CategoryTree = function(){
        return {
            init: function() {
                GRAVLLE_CATEGORY_TREE.initialize({
                    columnViewType: "category",
                    //columnViewContainer: "column-view-composition"
                    columnViewContainer: "column-view-container"
                });
            }
        };
    }();

    CategoryTree.init();



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


    function invokeProductDetailPage() {
        $('#next_product_detail_page').click();
    }


</script>


</body>

</html>
