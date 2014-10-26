var GRAVLLE_ERP = {

    gravlleLogging: false,

    publishRequest: function (type, url, data, callbackFn) {
        url += "&t=" + (new Date()).getTime()
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            dataType: 'json',
            data: data,
            success: function (json) {
                if (callbackFn) {
                    callbackFn(json);
                }

            },
            error: function (e) {
                //throw "Exception obtaining Response " + JSON.Stringify(e);
            }
        });

        $('#loading-indicator').hide();
    },

    ifIsNull: function(value) {
        var state = false;
        if(value == undefined || value == "") {
            state = true;
        }
        return state;
    },

    ifIsObject: function(value) {
        var state = true;
        if(value == undefined || value == "" || typeof value != "object") {
            state = false;
        }
        return state;
    },

    wrapJson: function(option) {
        var keyPair = "";
        if( GRAVLLE_ERP.ifIsObject(option) ) {
            keyPair = '"' + option.key + '": ' + '"' + option.value + '"';
        }
        return keyPair;
    },

    wrapJsonObject: function(option) {
        var objJson = "";
        if( GRAVLLE_ERP.ifIsObject(option) ) {
            objJson = "{\n" + option.value + "\n}";
        }
        return objJson;
    },

    contains: function(str, s) {
        return str.indexOf(s) != -1;
    },

    parseJsonForKeys: function(jsonString, keysArr) {

        var jsonObj = jQuery.parseJSON(jsonString);
        
        var resultObj = {};
        var t = 737052079080;
        var objTree, key = "";
        var val = "";
        var index = 1;

        for( var k in jsonObj ) {
        	var tempObj = {};
            for( var kKey in keysArr ){
                key = keysArr[kKey];
                objTree = k + "." + key;
                val = GRAVLLE_ERP.getJsonObjByString(jsonObj, objTree);
                console.log( val );
                if(val){
                	tempObj[key]=val;
                }
            }
            tempObj['realObject']=jsonObj[k];
            resultObj[k]=tempObj;
            index++;
           // tempArr = [];
        }
        return resultObj;
    },


    getJsonObjByString : function(obj, str) {
        var keys, key;
        //make sure str is a string with length
        if (!str || !str.length || Object.prototype.toString.call(str) !== "[object String]") {
            return false;
        }
        if (obj !== Object(obj)) {
            return false;
        }
        keys = str.split(".");
        while (keys.length >= 1) {
            key = keys.shift();
            if (key in obj) {
                obj = obj[key];
            }
        }
        return obj;
    },

    setJsonObjByString : function(obj, str, val) {
        var keys, key;
        //make sure str is a string with length
        if (!str || !str.length || Object.prototype.toString.call(str) !== "[object String]") {
            return false;
        }
        if (obj !== Object(obj)) {
            //if it's not an object, make it one
            obj = {};
        }
        keys = str.split(".");
        while (keys.length > 1) {
            key = keys.shift();
            if (obj !== Object(obj)) {
                //if it's not an object, make it one
                obj = {};
            }
            if (!(key in obj)) {
                //if obj doesn't contain the key, add it and set it to an empty object
                obj[key] = {};
            }
            obj = obj[key];
        }
        return obj[keys[0]] = val;
    },


    /*
     User version will link back to a username which has specific
     entitlements associated with it. As entitlements are modified,
     they will be noted in an audit trail and the user version
     will also be updated. Hence any new entitlements added or
     removed from a user login will generate a new user version number
     */
    currentUserLoginVersion: function() {
        return "jmathew1.2"
    },

    /*
     Log client side errors and messages to central logger
     This should preferably on a different server. This will allow us
     to keep our main server responsive
     */
    gravlleJavascriptLogger: function(options) {
        return "";
        var sampleMessageStructure = {
            message : "Product search with searchString: " + searchString + " was unsuccessful",
            type : "info",
            username : GRAVLLE_ERP.currentUserLoginVersion()
        }
    },

    /*
     Based on the specification and page details, return the correct
     json key-value pair that needs to be queried from the result set

     This is dependent on a larger implementation where an admin page
     will be used to map the result set from amazon api and result set
      generated form gravlle api. This will ensure that any change to
      result set can be done without having to touch the code.
     */
    getJsonKeys: function(options) {

        return "";

        var search = options.product + "/" + options.page;
        var url = "/portal/services/catalog/category/tree/" + search;
        var type = "POST";

        var data = $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            dataType: 'json',
            async : false
        }).responseText;

        return data;
    },

    gravlleLogger: function(option) {

        if( option ) {
            return false;
        }
        var logType = this.gravlleLogging && option.logType || 'console';
        var message = option.message || "There was no message passed in";
        var callBack = option.callBack || false;

        switch (logType) {
            case 'general':
                // TOOD: Gravlle webservice call to log into global gravlle database
                break;

            case 'warning':
                break;

            case 'info':
                break;

            case 'exception':
                break;

            case 'fatal':
                break;

            case 'console':
                console.log("Log Type: " + logType + ", Message: " + JSON.stringify(message, null, 4));
                break;

        }

        return callBack;
    },

    ajaxCall: function(option){

        option || option.url || option.type ||
        GRAVLLE_ERP.gravlleLogger({logType: 'general', message: 'Incomplete parameters passed for ajax call'});
        var async = option.async || false;
        var data = $.ajax({
            type: option.type,
            url: option.url,
            contentType: "application/json",
            dataType: 'json',
            async : async
        }).responseText;

        GRAVLLE_ERP.gravlleLogger({type: 'info', message: data});

        return data;
    },

    getJavascriptObjectFromJsonByKey: function(option) {
        var searchKey = option.searchKey;
        var searchJson = option.searchJson;

        var jsonObject = jQuery.parseJSON(searchJson);
        for( var Key in jsonObject ) {
            if( Key == searchKey ) {
                return jsonObject[Key];
            }
        }
    },


    getJsonToFieldMappingByKey: function(mappingKey) {


        return {
            "attributes.title":"title",
            "attributes.binding":"Category",
            "attributes.manufacturer":"manufacturer",
            "attributes.partNumber":"mfr_part_number",
            "attributes.publisher":"product_attributes",
            "attributes.studio":"product_attributes",
            "attributes.brand":"product_attributes",
            "attributes.model":"product_attributes",
            "attributes.label":"product_attributes",
            "attributes.feature":"bullet_point_1"
        };

        // TODO remove hardcoded data once service is in place
        // TODO Service should return mapping of json fields with field input on screen
        var uniqueID = this.uniqueID || undefined;

        if( mappingKey != undefined ) {
            var url = "/portal/services/catalog/category/breadcrumb/" + uniqueID;
        }
        var type = "POST";

        return GRAVLLE_ERP.ajaxCall({type: type, url: url});
    }

};


/**
 *
 * @param divElementId
 *
 *  GRAVLLE_ERP.createTree({
         *  divElement:"categoryTree",
         *  onSelect : function(category){console.log(category)},
         *
         *  });
 */
var GRAVLLE_CATEGORY_TREE = {

    gravlleColumnViewTreeInstance : '',

    options : null,
    columnViewType : undefined,
    columnViewContainer : undefined,
    uniqueID : undefined,
    selectedCategoryId: undefined,

    initialize : function(option) {

        this.options = option;
        this.columnViewType  = option.columnViewType;
        this.columnViewContainer = option.columnViewContainer;
        this.selectedCategoryId = option.selectedCategoryId;

        return this.buildCategoryList();
    },

    // Get child category list by calling api with clicked category id
    onClickHandlr : function (obj) {
        // make an api call and see if it returns anything
        // var categoryList = ajax.call(categoryId);
        this.uniqueID = $(obj).attr('data-category-id');
        var parentUlElem = $(obj).parent('ul');
        var parentDivElem = $(obj).parents('div.column');
        $(parentDivElem).nextAll().remove();

        $(parentUlElem).children('li').removeClass('active');
        $(obj).attr('class', 'active');
        this.buildCategoryList();
        // remove columns on the side.
    },

    // query database and get list for column view
    getChildCategories : function() {

        var uniqueID = this.uniqueID || undefined;
        // url += "&t=" + (new Date()).getTime();
        if( uniqueID != undefined ) {
            var url = "/portal/services/catalog/category/tree/" + uniqueID;
        } else {
            var url = "/portal/services/catalog/category/tree";
        }
        var type = "POST";

        return GRAVLLE_ERP.ajaxCall({type: type, url: url});
    },

    // get parent category hierarchy for breadcrumb
    getParentCategories: function() {

        /* TEMP DATA, FOR TESTING ONLY*/
        // return [{"id":11,"name":"Category 11","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":{"id":1,"name":"Electronics","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":null,"rootCategory":true,"template":null},"rootCategory":false,"template":null},{"id":12,"name":"Category 12","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":{"id":1,"name":"Electronics","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":null,"rootCategory":true,"template":null},"rootCategory":false,"template":null},{"id":13,"name":"Category 13","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":{"id":1,"name":"Electronics","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":null,"rootCategory":true,"template":null},"rootCategory":false,"template":null},{"id":14,"name":"Category 14","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":{"id":1,"name":"Electronics","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":null,"rootCategory":true,"template":null},"rootCategory":false,"template":null},{"id":15,"name":"Category 15","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":{"id":1,"name":"Electronics","lastUpdatedBy":"test user","lastUpdatedAt":1408773111000,"parent":null,"rootCategory":true,"template":null},"rootCategory":false,"template":null}];
        return {
            "0":"Electronics",
            "1":"Category 11",
            "2":"Category 21"
        };

        var uniqueID = this.uniqueID || undefined;

        if( uniqueID != undefined ) {
            var url = "/portal/services/catalog/category/breadcrumb/" + uniqueID;
        }
        var type = "POST";

        return GRAVLLE_ERP.ajaxCall({type: type, url: url});
    },

    // build html category list with the passed in category list array
    buildCategoryList : function() {
        var categoryListArray = JSON.parse(this.getChildCategories());

        var startDivConst = '<div class="column">';
        var endDivConst = '</div>';
        var categoryListBody = "";

        if( categoryListArray.length != 0 ) {
            for (var Key in categoryListArray) {
                var categoryId = categoryListArray[Key].id;
                var label = categoryListArray[Key].name;
                var isRoot = categoryListArray[Key].rootCategory;

                var clickHandlr = !isRoot || GRAVLLE_ERP.ifIsNull(this.selectedCategoryId) ? 'GRAVLLE_CATEGORY_TREE.onClickHandlr(this);' : (isRoot && this.selectedCategoryId == categoryId ) ? 'GRAVLLE_CATEGORY_TREE.onClickHandlr(this);' : 'javascript:;';

                //*
                categoryListBody += '<li class="" data-category-id="' + categoryId + '" ' +
                    'onclick="' + clickHandlr + '">' +
                    label + '<i class="glyphicon glyphicon-chevron-right"></i>' +
                    '</li>';
                //*/

                /*
                categoryListBody += '<li class="" data-category-id="' + categoryId + '" ' +
                    'onclick="GRAVLLE_CATEGORY_TREE.onClickHandlr(this);">' +
                    label + '<i class="glyphicon glyphicon-chevron-right"></i>' +
                    '</li>';
                //*/
            }
            categoryListBody = '<ul>' + categoryListBody + '</ul>';
        } else {
            // categoryListBody = '<div class="vcenter"><a href="#" onclick="GRAVLLE_PRODUCT_WIZARD.toggleCategoryProduct();initProductWizard();" class="btn btn-lg green m-icon-big button-next">Create Product<i class="m-icon-big-swapright m-icon-white"></i></a></div>';
            categoryListBody = '<div class="form-group"><a href="javascript:;" class="btn blue button-next assign-category">Assign Category<i class="m-icon-swapright m-icon-white"></i></a></div>';
        }

        var FullColumnListView = startDivConst + categoryListBody + endDivConst;
        $('div.' + this.columnViewContainer).append(FullColumnListView);

        return function(){
            $('li[data-category-id="' + this.selectedCategoryId + '"]').click();
        };

    },

    hideCategory: function() {
        $('div.' + this.columnViewContainer).hide();
    },

    getCategoryIdByName: function(option) {
        if( !(option && option.categoryNameToSearch) ) {
            return GRAVLLE_ERP.gravlleLogger({message: 'Required paramaters missing'});
        }
        var categoryNameToSearch = option.categoryNameToSearch;
        var url = "/portal/services/catalog/category/tree";
        var type = "POST";

        var categoryTree = JSON.parse(this.getChildCategories());

        for( var key in categoryTree ) {
            var oneCategory = categoryTree[key];
            if (oneCategory.name == categoryNameToSearch) {
                return oneCategory.id;
            }
        }
    }
};


var GRAVLLE_PRODUCT_WIZARD = {

    options : null,
    productWizardContainer : null,
    productState : "NEW",
    breadCrumb : "",

    initialize: function(option) {
        this.options = option;
        this.productWizardContainer = option.productWizardContainer;
        this.setProductState(option.productState);

        this.startProductWizard();
    },

    setProductState: function(productState) {
        this.productState = GRAVLLE_ERP.ifIsNull(productState) ? "NEW" : productState;
    },

    startProductWizard: function() {

        if(this.productState == "EXISTING") {
            this.populateProductData();
        } else {
            this.createNewProduct();
        }
    },

    // land at the new product page
    createNewProduct: function() {
        var productWizardHandle = $("div." + this.productWizardContainer);
        $(productWizardHandle).removeClass("hide");
    },

    // populate product info and disable all filled fields
    populateProductData: function() {

    },

    generateProductJson: function() {


    },

    validatePage: function(obj) {
        /*
        var currentFormHandle = $(obj).closest("form-vitalinfo");
        var nextWizardTab = $(obj).data("nextWizardTab");
        if( false === $(currentFormHandle).parsley.validate() ) {
            $("#" + nextWizardTab).click();
        }
        //*/
        if( true === $('form#form-vitalinfo').parsley().validate() ) {

            var controlType = "";
            var controlId = "";
            var productJson = "";
            var controlVal = "";
            var productJson = "";
            var option = {};
            // $('form#form-vitalinfo').children('input.formGroup').each( function(){
            $('div.form-group', $('form#form-vitalinfo')).each( function(){
                controlType = $(this).children('.form-control').prop('type');
                controlId = $(this).attr('id');

                switch(controlType) {
                    case "select-one":

                        controlVal = $(this).find(".form-control :selected").val();
                        break;
                    case "number":
                    case "text":

                            controlVal = $(this).find(".form-control").val();
                        break;
                    case "checkbox":

                        controlVal = $(this).find(".form-control").is(":checked") ? 'true' : 'false';
                        break;
                }

                option = {"key": controlId, "value": controlVal};
                productJson = productJson + ((GRAVLLE_ERP.ifIsNull(productJson)) ? ",\n" : "" ) + GRAVLLE_ERP.wrapJson(option);
            });

            option = {"value": productJson};
            productJson = GRAVLLE_ERP.wrapJsonObject(option);
            console.log(productJson);
        }
    },

    toggleCategoryProduct: function() {

        this.setProductWizardProgress();
        // $('.product-wizard').toggle();
        this.buildBreadCrumb();
        // $('.column-view-container').toggle();
    },

    buildBreadCrumb: function() {
        var breadCrumbData = GRAVLLE_CATEGORY_TREE.getParentCategories();
        var element = $('.breadcrumb');

        // clear the content and build new breadcrumb
        $(element).html('');
        var oneBreadCrumb = "";
        var breadCrumbHtml = "";
        for(var key in breadCrumbData) {
            oneBreadCrumb = breadCrumbData[key];
            if(GRAVLLE_ERP.ifIsNull(oneBreadCrumb)) {
                breadCrumbHtml += "<li><a href>" + oneBreadCrumb + "</a></li>";
            }
        }

        $(element).html(breadCrumbHtml);
    },

    setProductWizardProgress: function() {

        var categoryListArray = JSON.parse(this.getChildCategories());

        for (var Key in categoryListArray) {
            var tempalte = categoryListArray[Key];
            var label = categoryListArray[Key];

            /*
            categoryListBody += '<li class="" data-category-id="' + categoryId + '" '
                + 'onclick="GRAVLLE_CATEGORY_TREE.onClickHandlr(this);">'
                + label + '<i class="glyphicon glyphicon-chevron-right"></i>'
                + '</li>';
            //*/
        }

        if( $('.product-wizard').visible ) {
            $('.product-wizard-progress').data('add-product').parent().setAttr('class','active');
        } else if( $('.column-view-container').visible ) {
            $('.product-wizard-progress').data('add-product').parent().setAttr('class','active');
        } else {

        }
    },

    temp_processProdctJson: function(productJson) {


        var processedProduct = jQuery.parseJSON(productJson);
        for( var Key in processedProduct ) {
            processedProduct[Key]['id'] = Key;
        }
        return JSON.stringify(processedProduct);
    }

};


var GRAVLLE_FORM_BUILDER = {

    gravlleColumnViewTreeInstance : '',

    options : null,
    columnViewType : undefined,
    columnViewContainer : undefined,
    uniqueID : undefined,

    initialize : function(option) {

        this.options = option;
        this.columnViewType = option.columnViewType;
        this.columnViewContainer = option.columnViewContainer;

        this.buildColumnViewList();
    },

    buildTab: function() {

    },

    buildInput: function() {
        switch( this.options.inputType ) {
            case "checkbox":

                break;
            case "textbox":

                break;

            default:
                break

        }
    },

    buildSubmit: function() {
        var submitUrl = "/" + this.options.submitUrl + "/";
        // build the form with the submit path
        return submitUrl;
    }

};


var GRAVLLE_PRODUCT_SEARCH = {
	
    searchProduct: function(option) {

        var searchString = option.searchString;
        if( searchString != undefined ) {
            var url = document.location.origin + "/portal/services/catalog/product/lookup/UPC/" + searchString;
        }

        var type = "GET";

        var data = $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            dataType: 'json',
            async : false
        }).responseText;

        return data;
    }

};


