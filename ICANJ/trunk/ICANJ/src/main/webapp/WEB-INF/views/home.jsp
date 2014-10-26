
<!DOCTYPE html>
<html lang="en">
<head>
<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>
<link href="/resources/css/FeedEk.css" rel="stylesheet">
</head>

<body>

	<div class="container-fluid">
		<div class="row-fluid">
			<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
				<jsp:param name="name" value="sos" />
			</jsp:include>

			
			<div class="span9" >
			<h3>Latest from The ICANJ Blog.</h3>
			<div id="feedRenderer"></div>
			</div>
			<!--/span-->
		</div>
		<!--/row-->

		<hr>

		<jsp:include page="/WEB-INF/views/Core/footer.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>

	</div>
	<!--/.fluid-container-->
	<script src="/resources/js/FeedEk.js"
	type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function () {  
    $('#feedRenderer').FeedEk({
        FeedUrl: 'http://home.icanj.org/category/blog/feed/',
        MaxCount : 10,
        ShowDesc : true,
        ShowPubDate:true,
        TitleLinkTarget:'_blank'
    });    
});

</script>

</html>
