<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html lang="en">

	<head>
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
						<h3>Payments Management</h3>

					<c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>${alert.message}</div>
						</c:if>
					<form action="/Admin/Tithe/AddPayment" method="post" id="receiptManagement">
						<h4>Add New Payment</h4>



						<table class="table">
							<tr>

								<td>
									<div class="control-group">
										<label class="control-label" for="checkDate">Check Date</label>
										<div class="controls input-append date" id="checkDateControl" data-date-format="MM-dd-yyyy"
									 data-date-format="yyyy-mm-dd" data-date="2013-01-01" >
											<input type="text" name="checkDate" id="checkDate" placeholder="Enter Date on check"
														 data-required="true">
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
										<label class="control-label" for="amount">Total Payment Amount</label>
										<div class="controls">
											<input id="amount" name="amount" type="text" placeholder="Payment Amount"
														 data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="paymentType">Transaction Type</label>
										<div class="controls">
											<select id="paymentType" name="paymentType">
												<option value="Check">Check</option>
												<option value="Cash">Cash</option>
											</select>
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Check Info/Number</label>
										<div class="controls">
											<input type="text" id="checkInfo" name="checkInfo" placeholder="Enter Check Information">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkDate">Payment type</label>
										<div class="controls">
											<select id="subTransactType" name="subTransactType">
												<option value="Pastor's Allowance">Pastor's Allowance</option>
												<option value="Visiting Pastor">Visiting Pastor</option>
												<option value="Mortgage">Mortgage</option>
												<option value="HMI">HMI</option>
												<option value="Designated Payment">Designated Payment</option>
												<option value="Missions and Charity">Missions and Charity</option>
												<option value="PYPA">PYPA</option>
												<option value="Kidz for Kidz">Kidz for Kidz</option>
												<option value="Children Sunday School">Children Sunday School</option>
												<option value="Bihar Missions">Bihar Missions</option>
												<option value="Adult Sunday School">Adult Sunday School</option>
												<option value="Audio and Video">Audio and Video</option>
												<option value="SouledOut">SouledOut</option>
												<option value="Building Expenses">Building Expenses</option>
												<option value="Utility">Utility</option>
												<option value="DTB">DTB</option>
												<option value="Catering">Catering</option>
												<option value="Others">Other</option>
											</select>
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkDate">Other Payment type</label>
										<div class="controls">
											<input id="details" name="details" type="text" placeholder="Enter Details of the Payment.">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="transactStatus">Transaction Status</label>
										<div class="controls">
											<select id="transactStatus" name="transactStatus">
												<option value="Processing">Processing</option>
												<option value="Money Received">Credited</option>
											</select>
										</div>
									</div>
								</td>
							</tr>
						</table>

						<button class="btn btn-primary">Save changes</button>
					</form>
					<!-- Form End -->
					<!-- Table start -->
					<h3>Recent Payments</h3>

					<table class="table table-bordered">
						<thead>
						<th>Transaction Id</th>
						<th>Details of Payments</th>
						<th>Check Date</th>
						<th>Amount</th>
						<th>Last Updated On</th>
						<th></th>
						</thead>
						<c:forEach items="${payments}" var="payment" varStatus="idx">
							<tr>
								<td>${payment.transactionId}</td>
								<td>${payment.memo}</td>
								<td>
									<fmt:formatDate pattern="yyyy-MM-dd" value="${payment.checkDate}" />
								</td>
								<td>$ ${payment.amount}</td>
								<td>${payment.lastUpdatedAt}</td>
								<td>
									<a href="/Admin/Tithe/EditPayment/${payment.transactionId}" type="button" data-toggle="modal" class="btn btn-info">Edit Data</a>
								</td>
							</tr>
						</c:forEach>
					</table>
					<!-- Table End -->
					<!-- Modal Start -->
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