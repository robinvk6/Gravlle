<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html lang="en">

	<head>
		<link href="/resources/datepicker/css/datepicker.css" rel="stylesheet">
		<jsp:include page="/WEB-INF/views/Core/header.jsp">
			<jsp:param name="name" value="sos" /></jsp:include>
		</head>

		<body>
			<div class="container-fluid">
				<div class="row-fluid">
				<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
					<jsp:param name="name" value="sos" /></jsp:include>
					<div class="span9">
						<!-- form -->
						<h3>Search Tithe Transactions</h3>
					<c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>
							${alert.message}
						</div>
					</c:if>

					<form class="form-horizontal" method="get">
						<div class="control-group">
							<label class="control-label" for="inputMember">Search Member</label>
							<div class="controls">
								<input type="text" id="inputMember" placeholder="Search Member" onkeyup="showMember(this.value)">
							</div>
						</div>
						<div class="control-group">
						<div class="controls">	<span id="txtHint"></span>

							</div>
						</div>
					</form>
					<!-- Form End -->
					<!-- Table start -->
					<h3>Recent Transactions</h3>


					<table class="table table-bordered">
						<thead>
						<th>Transaction Id</th>
						<th>Full Name</th>
						<th>Check Date</th>
						<th>Amount</th>
						<th>Last Updated On</th>
						<th></th>
						</thead>
						<c:forEach items="${tithes}" var="tithe" varStatus="idx">
							<tr>
								<td>${tithe.transactionId}</td>
								<td>${tithe.memberID}</td>
								<td>
									<fmt:formatDate pattern="yyyy-MM-dd" value="${tithe.checkDate}" />
								</td>
								<td>$ ${tithe.amount}</td>
								<td>${tithe.lastUpdatedAt}</td>
								<td>
									<a href="/Admin/Tithe/EditReceipt/${tithe.transactionId}" type="button" data-toggle="modal" class="btn btn-info">Edit Data</a>
								</td>
							</tr>
						</c:forEach>
					</table>
					<!-- Table End -->
					<!-- Modal Start -->
					<form action="/Admin/Tithe/SearchTransactions" method="post" style="width:1000px" >
						<div id="titheModal" class="modal hide fade">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								<h3>Find Member/Family Transactions</h3>

							</div>
							<div class="modal-body">
								<div class="control-group">
									<div class="controls">
										<input id="setMemberId" name="memberId" type="hidden">
										<input id="setFamilyId" name="familyId" type="hidden">
									</div>
								</div>
								<table class="table">
									<tr>
										
										<td>
											<div class="control-group">
												<label class="control-label" for="paymentType">Search Type</label>
												<div class="controls">
													<select id="searchType" name="searchType">
														<option value="member">By Member</option>
														<option value="family">By Family</option>
													</select>
												</div>
											</div>
										</td>
										
									</tr>
									<tr>
										<td>
											<div class="control-group">
												<label class="control-label" for="rcvdDate">Start Date</label>
												<div class="controls input-append date" id="rcvdDateControl" data-date-format="yyyy-mm-dd"
														 data-date="2013-01-01" >
													<input  type="text" id="startDate" name="startDate" placeholder="Enter Start Date"  required >
													<span class="add-on">
														<i class="icon-calendar"></i>
													</span>
												</div>
											</div>

										</td>
										<td>
											<div class="control-group">
												<label class="control-label" for="checkDate">End Date</label>
												<div class="controls input-append date" id="checkDateControl" data-date-format="MM-dd-yyyy"
														 data-date-format="yyyy-mm-dd" data-date="2013-01-01" >
													<input type="text" name="endDate" id="endDate" placeholder="Enter end Date" >
													<span class="add-on">
														<i class="icon-calendar"></i>
													</span>
												</div>
											</div>
										</td>
										<td></td>
									</tr>
								</table>

							</div>
							<div class="modal-footer">
								<button class="btn btn-primary">Search Transactions</button>
							</div>
						</div>
					</form>
					<!-- Modal End -->
				</div>
				<!--/span-->
			</div>
			<!--/row-->
			<jsp:include page="/WEB-INF/views/Core/footer.jsp">
				<jsp:param name="name" value="sos" /></jsp:include>
		</div>
		<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
		<script type="text/javascript" src="/resources/js/tithe.js"></script>


	</body>

</html>
