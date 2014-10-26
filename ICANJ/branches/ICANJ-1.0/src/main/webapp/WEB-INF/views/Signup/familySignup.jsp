<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Family Signup</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
				<div class="page-header">
					<h1>Family Signup Page</h1>
				</div>


			<c:if test="${not empty alert}">
				<div class="alert ${alert.cssAlertClass}" id="errorBox">
					<button type="button" class="close" data-dismiss="alert">×</button>
					${alert.message}
				</div>
			</c:if>

				<div class="pager">
					<div id="errorBox"></div>

					<form class="form-horizontal" id="familySignup" action="AddFamily.html" method="post">
						<div class="page-header">
							<h4 align="left">Enter Family Information</h4>
						</div>
						<div class="control-group">
							<label class="control-label" for="familyName">Family Name</label>
							<div class="controls">
								<div class="form-inline">
									<input type="text" name="familyNameF" placeholder="First"
										class="input-small" data-required="true"> <input type="text"
										name="familyNameM" placeholder="Middle" class="input-small">
									<input type="text" name="familyNameL" placeholder="Last"
										class="input-small" data-required="true">
								</div>
							</div>
						</div>

						<div class="control-group">
							<label class="control-label" for="emailAddress">Email
								Address</label>
							<div class="controls">
								<input type="text" id="emailAddress" name="emailAddress"
									placeholder="Primary Email Address"
									data-required="true"
									data-pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="homePhoneNumber">Home
								Phone Number</label>
							<div class="controls">
								<div class="form-inline">
									<input type="text" name="i1" class="input-small" maxlength="3"
										size="3" data-required="true"> <input type="text" name="i2"
										class="input-small" maxlength="3" size="3" data-required="true"> <input
										type="text" name="i3" class="input-small" maxlength="4"
										size="4"  data-required="true" data-required="true">
								</div>
							</div>
						</div>
						<div class="page-header">
							<h4 align="left">Enter Address Information</h4>
						</div>
						<div class="control-group">
							<label class="control-label" for="streetAddress">Street
								Address</label>
							<div class="controls">
								<input type="text" id="streetAddress" name="streetAddress"
									placeholder="Enter Street Address" data-required="true">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="city">City</label>
							<div class="controls">
								<input type="text" id="city" name="city"
									placeholder="Enter City" data-required="true">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="state">State</label>
							<div class="controls">
								<select id="state" name="state">
									<option value="NJ">New Jersey</option>
									<option value="NY">New York</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="country">Country</label>
							<div class="controls">
								<input type="text" id="country" name="country" value="USA"
									placeholder="Enter Country">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="parkingInfo">Parking
								Info Details</label>
							<div class="controls">
								<textarea rows="5" name="parkingInfo" maxlength="200"
									placeholder="Enter Parking information for church members"></textarea>
							</div>
						</div>
						<div class="form-actions">
							<button type="submit" class="btn btn-primary">Next</button>
							<button class="btn btn-primary" ONCLICK="history.go(-1)">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<jsp:include page="/WEB-INF/views/Core/footer.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>
		<script type="text/javascript" src="/resources/js/family-signup.js"></script>
	</div>
</body>
</html>
