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

		<form class="form-horizontal" id="SavePassword" name="SavePassword"
			action="/Public/Register/SavePassword" method="post">
			<p>Please enter your new password.</p>
			<div class="control-group">
				<label class="control-label" for="emailAddress">Enter Email
					Address</label>
				<div class="controls">
				<input type="hidden" name="emailId" value="${email}">
					<span class="input-xlarge uneditable-input">${email}</span>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="password1">Enter Password</label>
				<div class="controls">
					<input type="password" id="password1" name="password"
						placeholder="Enter Password" data-required="true" data-validate="password1">
					<div id="pswd_info">
						<h4>Password must meet the following requirements:</h4>
						<ul>
							<li id="letter" class="invalid">At least <strong>one
									letter</strong></li>
							<li id="capital" class="invalid">At least <strong>one
									capital letter</strong></li>
							<li id="number" class="invalid">At least <strong>one
									number</strong></li>
							<li id="length" class="invalid">Be at least <strong>8
									characters</strong></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="password2">Re-Enter
					Password</label>
				<div class="controls">
					<input type="password" id="password2" data-required="true"
						placeholder="Re-Enter Password" data-conditional="confirmPassword" data-conditional="confirmPassword">
				</div>
			</div>

			<div class="control-group">


				<div class="modal-footer">
					<button type="submit" class="btn">Reset Password</button>
				</div>
			</div>
		</form>
	</div>
	<jsp:include page="/WEB-INF/views/Core/anonFooter.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>
	<script type="text/javascript"
		src="/resources/js/jquery.maskedinput.min.js"></script>
	<script type="text/javascript">

				/**
				 * Assign memberId to hidden input for form post
				 */
				function createAccountModal(memberID){
					$("#setMemberId").attr({
						"value": memberID
					});
				}

				$(document).ready(function() {

					$('#pswd_info').hide();

					$('#createAccount').validate({
						onChange : true,
						onKeyup : true,
						eachValidField : function() {
							$(this).closest('div.control-group').removeClass('error').addClass('success');
							$(this).find('.help-block').text('');
						},
						eachInvalidField : function() {
							$(this).closest('div.control-group').removeClass('success').addClass('error');
							$(this).find('.help-block').text('Incorrect value');
						},
						conditional : {
							confirmPassword : function() {
								return $(this).val() == $('#password1').val();
							},
							confirmEmail : function() {
								return $(this).val() == $('#emailAddress').val();
							}
						}
					});

					$('#password1').keyup(function() {
						// set password variable
						var pswd = $(this).val();

						if ( pswd.length < 8 ) {
							$('#length').removeClass('valid').addClass('invalid');
						} else {
							$('#length').removeClass('invalid').addClass('valid');
						}

						//validate letter
						if ( pswd.match(/[a-z]/) ) {
							$('#letter').removeClass('invalid').addClass('valid');
						} else {
							$('#letter').removeClass('valid').addClass('invalid');
						}

						//validate capital letter
						if ( pswd.match(/[A-Z]/) ) {
							$('#capital').removeClass('invalid').addClass('valid');
						} else {
							$('#capital').removeClass('valid').addClass('invalid');
						}

						//validate number
						if ( pswd.match(/(?=.*\d)/) ) {
							$('#number').removeClass('invalid').addClass('valid');
						} else {
							$('#number').removeClass('valid').addClass('invalid');
						}
					}).focus(function() {
						$('#pswd_info').show();
					}).blur(function() {
						$('#pswd_info').hide();
					});

				});

			</script>
                        <script type="text/javascript" src="/resources/js/registration.js" />

</body>
</html>
