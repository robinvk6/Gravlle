<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html lang="en">
	<head>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" ></script>
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
					<!-- form -->
					<h3>Edit/Delete Payment Transaction</h3>



					<!-- Modal  Start -->




					<form action="/Admin/Tithe/AddPayment" method="post">


						<div class="span9">
							<div class="control-group">
								<div class="controls">
									<span class="input uneditable-input">Payment Id : ${payment.transactionId}</span>
									<input id="transactionId" name="transactionId" type="hidden" value="${payment.transactionId}">

								</div>
							</div>


							<table class="table">
								<tr>
									<td>
										<c:set var="str1" value="${payment.checkDate}"/>
										<div class="control-group">
											<label class="control-label" for="checkDate">Check Date</label>
											<div class="controls">
												<input type="text" name="checkDate" id="checkDate" value="${fn:split(str1, ' ')[0]}" placeholder="Enter Date on check" >

											</div>
										</div>

									</td>
								</tr>
								<tr>
									<td>
										<div class="control-group">
											<label class="control-label" for="amount">Total Payment Amount</label>
											<div class="controls">
												<input id="amount" name="amount" type="text" value="${payment.amount}"  placeholder="Payment Amount">
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
												<input type="text" id="checkInfo" name="checkInfo" value="${payment.checkInfo}"  placeholder="Enter Check Information">
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
												<input id="details" name="details" type="text" value="${payment.detail}"  placeholder="Enter Details of the Payment.">
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
							<div>
								<button class="btn btn-primary">Save changes</button>
								<a href="/Admin/Tithe/DeletePayment/${payment.transactionId}" type="button"class="btn btn-danger">Delete Payment</a>
								<a type="button" class="btn btn-primary" ONCLICK="history.go(-1)">Cancel</a>
							</div>
						</div>

					</form>



				</div>


				<!-- Modal End  -->
			</div>
			<!--/span-->
		</div>
		<!--/row-->



		<jsp:include page="/WEB-INF/views/Core/footer.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>

	</div>
	<!--/.fluid-container-->

	<link href="/resources/datepicker/css/datepicker.css" rel="stylesheet">
	<script type="text/javascript" src="/resources/datepicker/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
	<script type="text/javascript" src="/resources/js/tithe.js"></script>

</body>
</html>
