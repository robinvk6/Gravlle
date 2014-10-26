<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html lang="en">

	<head>
		<jsp:include page="/WEB-INF/views/Core/header.jsp">
			<jsp:param name="name" value="sos" /></jsp:include>
			<link href="/resources/datepicker/css/datepicker.css" rel="stylesheet" media="screen">
		</head>

		<body>
			<div class="container-fluid">
				<div class="row-fluid">
				<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
					<jsp:param name="name" value="sos" /></jsp:include>
					<div class="span9">
						<!-- form -->
						<div>
						<h3>SouledOut Contacts Management</h3>
						<a class="btn pull-right" href="#addContactModal" role="button" data-toggle="modal"><i class="icon-plus-sign"></i>Add New Contact</a>
						</div>
					<c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>${alert.message}</div>
						</c:if>

					<table class="table table-bordered">
						<thead>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Date of Birth</th>
						<th>Phone Number</th>
						<th></th>
						</thead>
						<c:forEach items="${contacts}" var="contact" varStatus="idx">
							<tr>
								<td>${contact.firstName}</td>
								<td>${contact.lastName}</td>
								<td>${contact.email}</td>
								<td>
									<fmt:formatDate pattern="MM-dd-yyyy" value="${contact.dateOfBirth}" />
								</td>
								<td>${contact.cellPhoneNumber}</td>
								<td><a href="#editContactModal" role="button" onclick="editContact('${contact.memberId}','${contact.firstName}','${contact.lastName}','<fmt:formatDate pattern="MM-dd-yyyy" value="${contact.dateOfBirth}" />','${contact.email}','${contact.cellPhoneNumber}')"
                           data-toggle="modal"><i class="icon-edit"></i></a></td>
							</tr>
						</c:forEach>
					</table>
					<!-- Table End -->
					<!-- Modal Start -->
					<div id="addContactModal" class="modal hide fade">	
					<form action="/SouledOut/AddContact" method="post" id="addConatct">
					
					<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4>Add New Contact</h4>
                            </div>
					<div class="modal-body">
						<table class="table">
						<tr>
						<td>
						<div class="control-group">
							<label class="control-label" for="firstName">First Name</label>
							<div class="controls">
								<input  type="text" id="firstName" name="firstName"
												placeholder="Enter First Name" value="${contact.firstName}"
												required>
							</div>
						</div>
						</td>
						<td>
						<div class="control-group">
							<label class="control-label" for="lastName">Last Name</label>
							<div class="controls">
								<input  type="text" id="lastName" name="lastName"
												placeholder="Enter Last Name" value="${member.lastName}"
												required>
							</div>
						</div>
					</td>
					<td>
					<div class="control-group">
							<label class="control-label" for="dateOfBirth">Date of Birth</label>
							<div class="input-append date" id="member-dob" data-date-format="MM-dd-yyyy"
									 data-date="12-02-2012" data-date-viewmode="years">
								<input  type="text" id="dob" name="dob"
												placeholder="12-02-2012" value="<fmt:formatDate pattern="MM-dd-yyyy" type='date' value='${member.dateOfBirth}'/>"
												size="16" required >
								<span class="add-on">
									<i class="icon-calendar"></i>
								</span>
							</div>
						</div>
					</td>
						</tr>
						<tr>
						<td>
						<div class="control-group">
							<label class="control-label" for="email">Email</label>
							<div class="controls">
							<input  type="text" id="email" name="email" placeholder="Enter Email"
											value="${member.email}"
											data-pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" 
											data-required="true">
							</div>
						</div>
						</td>
						<td>
						<div class="control-group">
							<label class="control-label" for="cellPhoneNumber">Cell Phone Number</label>
							<div class="controls">
								<input  type="text" id="phoneNumber" name="phoneNumber"
												placeholder="Enter Phone Number" value="${member.cellPhoneNumber}"
												required>
							</div>
							</div>
							</td>
						</tr>
							
						</table>
						</div>
						<div class="modal-footer">
						<button class="btn btn-primary">Save changes</button>
						</div>
					</form>
					</div>
					<!-- Modal End -->
					
					<!-- Modal Start -->
					<div id="editContactModal" class="modal hide fade">	
					<form action="/SouledOut/UpdateContact" method="post" id="editContact">
					<input id="mMemberId" name ="mMemberId" type="hidden" >
					<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4>Edit Contact</h4>
                            </div>
					<div class="modal-body">
						<table class="table">
						<tr>
						<td>
						<div class="control-group">
							<label class="control-label" for="firstName">First Name</label>
							<div class="controls">
								<input  type="text" id="mfirstName" name="mfirstName"
												placeholder="Enter First Name"
												required>
							</div>
						</div>
						</td>
						<td>
						<div class="control-group">
							<label class="control-label" for="lastName">Last Name</label>
							<div class="controls">
								<input  type="text" id="mlastName" name="mlastName"
												placeholder="Enter Last Name" 
												required>
							</div>
						</div>
					</td>
					<td>
					<div class="control-group">
							<label class="control-label" for="dateOfBirth">Date of Birth</label>
							<div class="input-append date" id="member-dob" data-date-format="MM-dd-yyyy"
									  data-date-viewmode="years">
								<input  type="text" id="mdob" name="mdob">
								<span class="add-on">
									<i class="icon-calendar"></i>
								</span>
							</div>
						</div>
					</td>
						</tr>
						<tr>
						<td>
						<div class="control-group">
							<label class="control-label" for="email">Email</label>
							<div class="controls">
							<input  type="text" id="memail" name="memail" placeholder="Enter Email"
											data-pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" 
											data-required="true">
							</div>
						</div>
						</td>
						<td>
						<div class="control-group">
							<label class="control-label" for="cellPhoneNumber">Cell Phone Number</label>
							<div class="controls">
								<input  type="text" id="mphoneNumber" name="mphoneNumber"
												placeholder="Enter Phone Number"
												required>
							</div>
							</div>
							</td>
						</tr>
							
						</table>
						</div>
						<div class="modal-footer">
						<button class="btn btn-primary">Save changes</button>
						</div>
					</form>
					</div>
					<!-- Modal End -->
				</div>
				<!--/span-->
			</div>
			
			<script>
		function editContact(mMemberId,mfirstName,mlastName,mdob,memail,mphoneNumber){
			
			$("#mMemberId").attr({
				"value": mMemberId
			});
			
			$("#mfirstName").attr({
				"value": mfirstName
			});
			
			$("#mlastName").attr({
				"value": mlastName
			});
			
			$("#mdob").attr({
				"value": mdob.split(" ")[0]
			});
			
			$("#memail").attr({
				"value": memail
			});
			
			$("#mphoneNumber").attr({
				"value": mphoneNumber
			});
			
		}
		</script>
			<!--/row-->
			<jsp:include page="/WEB-INF/views/Core/footer.jsp">
				<jsp:param name="name" value="sos" /></jsp:include>
		</div>
		<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
			<script type="text/javascript" src="/resources/js/mobile.js"></script>
		<script type="text/javascript" src="/resources/js/jquery.maskedinput.min.js"></script>
		<script type="text/javascript" src="/resources/datepicker/js/bootstrap-datepicker.js"></script>
			<script type="text/javascript" src="/resources/js/member-details.js"></script>
	</body>

</html>