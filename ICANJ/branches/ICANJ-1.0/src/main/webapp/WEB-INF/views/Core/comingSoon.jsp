<!DOCTYPE html>
<html lang="en">
  <head>
    <jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
	</jsp:include>

</head>

  <body>

    <div class="container-fluid">
      <div class="row-fluid">
  <jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>


        <div class="span9">
	<!-- body -->


        <div class="jumbotron">
            <h1>Coming Soon</h1>
            <p class="lead">Making tithing easier!</p>            
        </div>
        </div><!--/span-->
      </div><!--/row-->

      <hr>

	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>

    </div><!--/.fluid-container-->

  </body>
</html>
