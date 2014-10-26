<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title>Reset Password</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">

		<jsp:include page="/WEB-INF/views/Core/anonHeader.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>


	</head>
	<body>

		<div class="container span6 offset4">
			<div class="page-header">
				<h1>ICANJ Reset Password</h1>
			</div>

			<c:if test="${not empty alert}">
				<div class="alert ${alert.cssAlertClass}" id="errorBox">
					<button type="button" class="close" data-dismiss="alert">×</button>
					${alert.message}
				</div>
			</c:if>

			<form class="form-horizontal" id="resetPassword" name="resetPassword" action="Reset" method="post">
				<p>Please enter your email address to reset your password.</p>
				<div class="control-group">
							<label class="control-label" for="emailAddress">Enter
								Email Address</label>
							<div class="controls">
								<input type="text" id="emailId" name="emailId"
											 placeholder="Enter email address"
											 data-required="true"
											 data-conditional="confirmEmail"
											 data-pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$">
							</div>
				</div>

				<div class="control-group">


					<div class="modal-footer">
						<button type="submit" class="btn">Reset Password</button>
						<a href="/" type="button" class="btn btn-primary pull-left">Go Back to Login</a>
					</div>
				</div>
			</form>
		</div>
		<jsp:include page="/WEB-INF/views/Core/anonFooter.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>
		<script type="text/javascript" src="/resources/js/jquery.maskedinput.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {


//							$("#registrationForm").validate({
//								rules: {
//									phone: {
//										required: true,
//										phoneUS: true
//									}
//								}
//							});

							$("#reg-phone").mask("(999) 999-9999");

							$('#registrationForm').validate({
								onKeyup : true,
								eachValidField : function() {
									$(this).closest('div.control-group').removeClass('error').addClass('success');
								},
								eachInvalidField : function() {
									$(this).closest('div.control-group').removeClass('success').addClass('error');
								}
							});

							$('#resetPassword').validate({
								onChange : true,
								onKeyup : true,
								eachValidField : function() {
									$(this).closest('div.control-group').removeClass('error').addClass('success');
									$(this).find('.help-block').text('');
								},
								eachInvalidField : function() {
									$(this).closest('div.control-group').removeClass('success').addClass('error');
									$(this).find('.help-block').text('Incorrect value');
								}
							});



			});
		</script>
                <script type="text/javascript" src="/resources/js/registration.js"></script>
	</body>
</html>
