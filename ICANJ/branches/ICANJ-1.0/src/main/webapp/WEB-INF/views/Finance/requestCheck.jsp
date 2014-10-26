<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
						<h3>Designated Contributions</h3>
					<c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>
							${alert.message}
						</div>
					</c:if>


					<!-- Form Starts  -->
					<form action="/Finance/RequestCheck/UpdateCheck" id="requestACheck">

						<table class="table">
							<caption>Enter Details to Request a new check</caption>

							<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Recipients Name</label>
										<div class="controls">
											<input class="input-large" type="text"
														 placeholder="Pay to the order of" id="recipientsName"
														 name="recipientsName" data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Recipients Address</label>
										<div class="controls">
											<input class="input-xlarge" type="text"
														 placeholder="Recipients Address" id="recipientsAddress"
														 name="recipientsAddress" data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Purpose of the Payment</label>
										<div class="controls">
											<input class="input-xlarge" type="text"
														 placeholder="Check Memo (Optional)" id="checkMemo"
														 name="checkMemo">
										</div>
									</div>
								</td>
							</tr>


							<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="amount">Total Payment
											Amount</label>
										<div class="controls">
											<input id="amount" name="amount" type="text"
														 placeholder="Payment Amount" data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkDate">Check Date</label>
										<div class="controls input-append date" id="checkDateControl" data-date-format="MM-dd-yyyy"
												 data-date="12-02-2012" data-date-viewmode="years">
											<input type="text" name="checkDate" id="checkDate"
														 placeholder="Enter Date on check" data-required="true">
											<span class="add-on">
												<i class="icon-calendar"></i>
											</span>
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Check Info</label>
										<div class="controls">
											<input class="input-xlarge" type="text"
														 placeholder="Enter check number for personal records" id="checkInfo"
														 name="checkInfo">
										</div>
									</div>
								</td>
							</tr>



						</table>
						<div class="modal-footer">
							<button class="btn btn-primary">Request New Check</button>
						</div>

					</form>

					<!--End Form  -->

					<!-- Table start -->
					<h3>My Recent Requests</h3>
					<table class="table table-bordered">
						<thead>
						<th>Recipient Name</th>
						<th>Check Info</th>
						<th>Check Date</th>
						<th>Amount</th>
						<th>Check Memo</th>
						<th>Request Status</th>

						<th></th>

						</thead>
						<c:forEach items="${checks}" var="check" varStatus="idx">
							<tr>
								<td>${check.recipientsName}</td>
								<td>${check.checkInfo}</td>
								<td><fmt:formatDate pattern="yyyy-MM-dd"
																value="${check.checkDate}" /></td>
								<td>$ ${check.amount}</td>
								<td>${check.checkMemo}</td>
								<td>${check.transactStatus}</td>
								<c:set var="str2" value="${check.checkDate}"/>
								<c:choose>
									<c:when test="${check.transactStatus=='Pending'}">
										<td><a href="#accountModal" type="button"
													 data-toggle="modal" class="btn btn-info"
													 onclick="editInnerModal('${check.transactStatus}', '${check.recipientsName}', '${check.recipientsAddress}', '${fn:split(str2, ' ')[0]}', '${check.transactionId}', '${check.checkInfo}', '${check.amount}', '${check.checkMemo}')">Edit Check Details</a></td>
										</c:when>
										<c:otherwise><td></td></c:otherwise>
								</c:choose>
							</tr>
						</c:forEach>
					</table>
					<!-- Table End -->
					<!-- Modal Start -->
					<div id="accountModal" class="modal hide fade">
						<form action="/Finance/RequestCheck/UpdateCheck?adminReferrer=false" method="post">

							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
												aria-hidden="true">&times;</button>
								<h3>Edit Check Details</h3>
								<input id="mtId" name="transactionId" type="hidden">
								<input id="mtransactStatus" name="transactStatus" type="hidden">
								<table class="table">
									<caption>Edit Details for the Requested check.</caption>
									<tr>
										<td>
											<div class="control-group">
												<label class="control-label" for="checkInfo">Recipients Name</label>
												<div class="controls">
													<input class="input-large" type="text"
																 placeholder="Pay to the order of" id="mrecipientsName"
																 name="recipientsName">
												</div>
											</div>
										</td>
										<td>
											<div class="control-group">
												<label class="control-label" for="checkInfo">Recipients Address</label>
												<div class="controls">
													<input class="input-xlarge" type="text"
																 placeholder="Recipients Address" id="mrecipientsAddress"
																 name="recipientsAddress">
												</div>
											</div>
										</td>
										<td>
											<div class="control-group">
												<label class="control-label" for="checkInfo">Purpose of the Payment</label>
												<div class="controls">
													<input class="input" type="text"
																 placeholder="Check Memo (Optional)" id="mcheckMemo"
																 name="checkMemo">
												</div>
											</div>
										</td>
									</tr>


									<tr>
										<td>
											<div class="control-group">
												<label class="control-label" for="amount">Total Payment
													Amount</label>
												<div class="controls">
													<input id="mamount" name="amount" type="text"
																 placeholder="Payment Amount">
												</div>
											</div>
										</td>
										<td>
											<div class="control-group">
												<label class="control-label" for="checkDate">Check Date</label>
												<div class="controls">
													<input type="text" name="checkDate" id="mcheckDate"
																 placeholder="Enter Date on check">

												</div>
											</div>
										</td>
										<td>
											<div class="control-group">
												<label class="control-label" for="checkInfo">Check Info</label>
												<div class="controls">
													<input class="input" type="text"
																 placeholder="Enter check number for personal records" id="mcheckInfo"
																 name="checkInfo">
												</div>
											</div>
										</td>
									</tr>

								</table>
								<div class="modal-footer">
									<button class="btn btn-primary">Update Request</button>
								</div>

							</div>
						</form>
					</div>

					<!-- Modal End -->
				</div>
				<!--/span-->
			</div>
			<!--/row-->
			<jsp:include page="/WEB-INF/views/Core/footer.jsp">
				<jsp:param name="name" value="sos" />
			</jsp:include>
		</div>
		<!--<script type="text/javascript" src="/resources/js/jquery.maskedinput.min.js"></script>-->
		<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
		<script type="text/javascript" src="/resources/js/request-check.js"></script>
		<!--/.fluid-container-->


	</body>

</html>