</div> <%-- End Page Container, which started in sideNavbar.jsp --%>
<div class="page-footer">
    <div class="page-footer-inner">
        2014 © Metronic by keenthemes.
    </div>
    <div class="scroll-to-top" style="display: block;">
        <i class="icon-arrow-up"></i>
    </div>
</div>

<!--[if lt IE 9]>
<script src="${pageContext.request.contextPath}/resources/plugins/respond.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/excanvas.min.js"></script>
<![endif]-->

<script src="${pageContext.request.contextPath}/resources/plugins/jquery-1.11.0.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery-migrate-1.2.1.min.js"
        type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="${pageContext.request.contextPath}/resources/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/bootstrap/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery-slimscroll/jquery.slimscroll.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery.blockui.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery.cokie.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/uniform/jquery.uniform.min.js"
        type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
        type="text/javascript"></script>


<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/jquery-validation/js/additional-methods.min.js"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>


<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/plugins/select2/select2.min.js"></script>


<script src="${pageContext.request.contextPath}/resources/js/metronic.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/layout.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/quick-sidebar.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/demo.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/form-wizard.js"></script>

<script>
    jQuery(document).ready(function () {
        // initiate layout and plugins
        Metronic.init(); // init metronic core components
        Layout.init(); // init current layout
        QuickSidebar.init(); // init quick sidebar
        Demo.init(); // init demo features
        FormWizard.init();
    });
</script>

<span role="status" aria-live="polite" class="select2-hidden-accessible"></span>