<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html lang="en">
	<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Member Details</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" ></script>
    <jsp:include page="/WEB-INF/views/Core/header.jsp">
			<jsp:param name="name" value="sos" />
    </jsp:include>
		<link href="/resources/datepicker/css/datepicker.css" rel="stylesheet" media="screen">

	</head>
	<script>
$(document).ready(function(){
	$("#relationship").val("${member.memberRelation}");
	$("#gender").val("${member.gender}");
});
</script>

	<body>
		<div class="container-fluid">
      <div class="row-fluid">
				<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
					<jsp:param name="name" value="sos" />
				</jsp:include>


        <div class="span9">
					<c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>
							<strong>Warning! :</strong>
							${alert.message}
						</div>
					</c:if>
					<h3>Member Detail</h3>
					<form action="/Directory/UpdateMember" method="post" id="memberDetail"
								name="memberDetail">

						<!--
						Personal Information
						-->
						<div class="page-header"><h4 align="left">Personal Information</h4></div>
						<input  type="hidden" id="memberId" name="memberId"
										value="${member.memberId}">
						<input  type="hidden" id="memberId" name="familyId"
										value="${member.familyId}">

						<div class="control-group">
							<label class="control-label" for="firstName">First Name</label>
							<div class="controls">
								<input  type="text" id="firstName" name="firstName"
												placeholder="Enter First Name" value="${member.firstName}"
												required>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="middleName">Middle Name</label>
							<div class="controls">
								<input  type="text" id="middleName" name="middleName"
												placeholder="Enter Middle Name" value="${member.middleName}">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="lastName">Last Name</label>
							<div class="controls">
								<input  type="text" id="lastName" name="lastName"
												placeholder="Enter Last Name" value="${member.lastName}"
												required>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="nickName">Nickname</label>
							<div class="controls">
								<input  type="text" id="nickname" name="nickName"
												placeholder="Enter Nickname" value="${member.nickName}">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="email">Email</label>
							<div class="controls">
							<input  type="text" id="email" name="email" placeholder="Enter Email"
											value="${member.email}"
											data-pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" 
											data-required="true">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="cellPhoneNumber">Cell Phone Number</label>
							<div class="controls">
								<input  type="text" id="phoneNumber" name="phoneNumber"
												placeholder="Enter Phone Number" value="${member.cellPhoneNumber}"
												required>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="workPhoneNumber">Work Phone Number</label>
							<div class="controls">
								<input  type="text" id="workPhoneNumber" name="workPhoneNumber"
												placeholder="Enter Phone Number" value="${member.workPhoneNumber}">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="dateOfBirth">Date of Birth</label>
							<div class="input-append date" id="member-dob" data-date-format="MM-dd-yyyy"
									 data-date="12-02-2012" data-date-viewmode="years">
								<input  type="text" id="dateOfBirth" name="dateOfBirth"
												placeholder="12-02-2012" value="<fmt:formatDate pattern="MM-dd-yyyy" type='date' value='${member.dateOfBirth}'/>"
												size="16" required >
								<span class="add-on">
									<i class="icon-calendar"></i>
								</span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="relationship">Relationship</label>
							<div class="controls">
								<select id="relationship" name="relationship" required>
									<option value="Father">Father</option>
									<option value="Mother">Mother</option>
									<option value="Daughter">Daughter</option>
									<option value="Son">Son</option>
									<option value="Grand Mother">Grand Mother</option>
									<option value="Grand Father">Grand Father</option>
									<option value="Other">Other</option>
								</select>
							</div>
						</div>
						<!-- Hidden till other is selected -->
						<div class="control-group other hide">
							<label class="control-label" for="other">Relationship</label>
							<div class="controls">
								<input  type="text" id="other" name="other"
												placeholder="Enter Relationship">
							</div>
						</div>
						<!-- Hidden till other is selected -->
						<div class="control-group gender">
							<label class="control-label" for="gender">Gender</label>
							<div class="controls">
								<select id="gender" name="gender">
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
						</div>

						<div class="form-actions">
							<button type="submit" class="btn btn-primary">Save changes</button>
							<a type="button" class="btn btn-primary" ONCLICK="history.go(-1)">Cancel</a>
						</div>
					</form>
				</div>
			</div>
		</div>



    <jsp:include page="/WEB-INF/views/Core/footer.jsp">
			<jsp:param name="name" value="sos" />
    </jsp:include>

		<script type="text/javascript" src="/resources/js/mobile.js"></script>
		<script type="text/javascript" src="/resources/js/jquery.maskedinput.min.js"></script>
		<script type="text/javascript" src="/resources/datepicker/js/bootstrap-datepicker.js"></script>
		<script type="text/javascript" src="/resources/js/member-details.js"></script>
	</body>
</html>