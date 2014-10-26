
<!DOCTYPE html>
<html>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>
<link
	href="${pageContext.request.contextPath}/resources/css/plugins/formbuil
	der/formbuilder.css" 	rel="stylesheet">
<body>

	<div id="wrapper">


		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<h1 class="page-header">Create New Template</h1>
					<div class='fb-main'></div>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<!-- /.row -->
		</div>
		<!-- /#page-wrapper -->

	</div>


	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>
	<script	src="${pageContext.request.contextPath}/resources/js/plugins/formbuilder/vendor.js"></script>
	<script	src="${pageContext.request.contextPath}/resources/js/plugins/formbuilder/formbuilder.js"></script>
	<script type="text/javascript">
    $(function(){
      fb = new Formbuilder({
        selector: '.fb-main'
      });

      fb.on('save', function(payload){
        console.log(payload);
      })
    });
	</script>
</body>

</html>
