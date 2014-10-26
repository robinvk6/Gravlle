<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html lang="en">

<head>
<link href="/resources/datepicker/css/datepicker.css" rel="stylesheet">
<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" /></jsp:include>
<script>

function validate(form) {
if($('#transactStatus').val() == 'Completed'){
		if($('#paidAmount').val() != '' 
			&& $('#paidDate').val() != '' 
			&& $('#paidCheckNumber').val() != '' ){
		return confirm('Do you really want to complete the transaction?');
	}
	else {
		return false;
	}
}	
else{
	return confirm('Do you really want to complete the transaction?');
}	
}


               
                    $(document).ready(function () {
                    	$('#mcheckDate').datepicker({
                    		format: 'yyyy-mm-dd',
                            todayBtn: 'linked'
                    	});
                    	
                    	$('#paidDate').datepicker({
                    		format: 'yyyy-mm-dd',
                            todayBtn: 'linked'
                    	});
                    	
                    	$('#checkDate').datepicker({
                    		format: 'yyyy-mm-dd',
                            todayBtn: 'linked'
                    	});
                    	
                    });
                </script>
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


				<!-- Table start -->
				<h3>Pending Requests</h3>
				<table class="table table-bordered">
					<thead>
						<th>Transaction Id</th>
						<th>Member</th>
						<th>Check Info</th>
						<th>Check Date</th>
						<th>Amount</th>
						<th>Check Memo</th>
						<th>Request Status</th>
						<th></th>
					</thead>
					<c:forEach items="${lOfPendingChecks}" var="lOfPendingCheck"
						varStatus="idx">
						<tr>
							<td>${lOfPendingCheck.transactionId}</td>

							<td>${lOfPendingCheck.memberID}</td>
							<td>${lOfPendingCheck.checkInfo}</td>
							<td><fmt:formatDate pattern="yyyy-MM-dd"
									value="${lOfPendingCheck.checkDate}" /></td>
							<td>$ ${lOfPendingCheck.amount}</td>
							<td>${lOfPendingCheck.checkMemo}</td>
							<td>${lOfPendingCheck.transactStatus}</td>
							<c:set var="str2" value="${lOfPendingCheck.checkDate}" />
							<c:choose>
								<c:when test="${lOfPendingCheck.transactStatus=='Pending'}">
									<td><a href="#accountModal" type="button"
										data-toggle="modal" class="btn btn-info"
										onclick="editInnerModal('${lOfPendingCheck.transactStatus}','${lOfPendingCheck.recipientsName}','${lOfPendingCheck.recipientsAddress}','${fn:split(str2, ' ')[0]}','${lOfPendingCheck.transactionId}','${lOfPendingCheck.checkInfo}','${lOfPendingCheck.amount}','${lOfPendingCheck.checkMemo}')">Edit
											Check Details</a></td>
								</c:when>
								<c:otherwise>
									<td></td>
								</c:otherwise>
							</c:choose>
						</tr>
					</c:forEach>
				</table>
				<!-- Table End -->



				<!-- Table start -->
				<h3>Completed Requests</h3>
				<table class="table table-bordered">
					<thead>
						<th>Transaction Id</th>
						<th>Member</th>
						<th>Check Info</th>
						<th>Check Date</th>
						<th>Amount</th>
						<th>Check Memo</th>
						<th>Request Status</th>
						<th></th>
					</thead>
					<c:forEach items="${processedChecks}" var="processedCheck"
						varStatus="idx">
						<tr>
							<td>${processedCheck.transactionId}</td>
							<td>${processedCheck.memberID}</td>
							<td>${processedCheck.checkInfo}</td>
							<td><fmt:formatDate pattern="yyyy-MM-dd"
									value="${processedCheck.checkDate}" /></td>
							<td>$ ${processedCheck.amount}</td>
							<td>${processedCheck.checkMemo}</td>
							<td>${processedCheck.transactStatus}</td>
							<c:set var="str2" value="${processedCheck.checkDate}" />
							<c:choose>
								<c:when test="${processedCheck.transactStatus=='Completed'}">
									<td><a href="#accountModal" type="button"
										data-toggle="modal" class="btn btn-small btn-info"
										onclick="editInnerModal('${processedCheck.transactStatus}','${processedCheck.recipientsName}','${processedCheck.recipientsAddress}','${fn:split(str2, ' ')[0]}','${processedCheck.transactionId}','${processedCheck.checkInfo}','${processedCheck.amount}','${processedCheck.checkMemo}')">Edit
											Check Details</a>
											<a href="/Admin/Tithe/PrintCheck/${processedCheck.transactionId}" target="_blank" type="button" class="btn btn-small btn-success">Print</a>
											</td>
								</c:when>
								<c:otherwise>
									<td></td>
								</c:otherwise>
							</c:choose>

						</tr>
					</c:forEach>
				</table>
				<!-- Table End -->
				<!-- Modal Start -->
				<div id="accountModal" class="modal hide fade">
					<form action="/Finance/RequestCheck/UpdateCheck?adminReferrer=true" method="post" onsubmit="return validate(this);">

						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h3>Edit Check Details</h3>
							<input id="mtId" name="transactionId" type="hidden"> <!-- <input
								id="mtransactStatus" name="transactStatus" type="hidden"> -->
							<table class="table">
							<td colspan="3">
								<h5>Edit Details for the Requested check</h5>
								</td></tr>
							
								<tr>
									<td>
										<div class="control-group">
											<label class="control-label" for="checkInfo">Recipients
												Name</label>
											<div class="controls">
												<input class="input-large" type="text"
													placeholder="Pay to the order of" id="mrecipientsName"
													name="recipientsName">
											</div>
										</div>
									</td>
									<td>
										<div class="control-group">
											<label class="control-label" for="checkInfo">Recipients
												Address</label>
											<div class="controls">
												<input class="input-xlarge" type="text"
													placeholder="Recipients Address" id="mrecipientsAddress"
													name="recipientsAddress">
											</div>
										</div>
									</td>
									<td>
										<div class="control-group">
											<label class="control-label" for="checkInfo">Purpose
												of the Payment</label>
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
											<label class="control-label" for="amount">Total
												Payment Amount</label>
											<div class="controls">
												<input id="mamount" name="amount" type="text"
													placeholder="Payment Amount">
											</div>
										</div>
									</td>
									<td>
										<div class="control-group">
											<label class="control-label" for="checkDate">Check
												Date</label>
											<div class="controls">
												<input type="text" name="checkDate" id="mcheckDate"
													placeholder="Enter Date on check">

											</div>
										</div>
									</td>
									<td>
										<div class="control-group">
											<label class="control-label" for="transactStatus">Transaction
												Status</label>
											<div class="controls">
												<select id="transactStatus" name="transactStatus">
													<option value="Pending">Pending</option>
													<option value="Completed">Completed</option>
												</select>
											</div>
										</div>
									</td>
								</tr>
								<hr>
								<tr>
								<td colspan="3">
								<h5>Enter detail below for Reimbursed Payments</h5>
								</td></tr>
							<tr>
									<td>
										<div class="control-group">
											<label class="control-label" for="amount">Reimbursed amount:</label>
											<div class="controls">
												<input id="paidAmount" name="paidAmount" type="text" 
													placeholder="Payment Amount">
											</div>
										</div>
									</td>
									<td>
										<div class="control-group">
											<label class="control-label" for="checkDate">Reimbursed
												Date</label>
											<div class="controls">
												<input type="text" name="paidDate" id="paidDate"
													placeholder="Enter payment date">

											</div>
										</div>
									</td>
									<td>
										<div class="control-group">
											<label class="control-label" for="checkInfo">Reimbursed Check Number</label>
											<div class="controls">
												<input class="input" type="text"
													placeholder="Check number" id="paidCheckNumber"
													name="paidCheckNumber">
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
			<jsp:param name="name" value="sos" /></jsp:include>
	</div>
	<!--/.fluid-container-->
	<script type="text/javascript">
                
                function editInnerModal(transactStatus,recipientsName,recipientsAddress,date,tId,info,amount,memo){
                	
                	$("#mtransactStatus").attr({
						"value": transactStatus
					});
                	
                	$("#mrecipientsName").attr({
						"value": recipientsName
					});
                	
                	$("#mrecipientsAddress").attr({
						"value": recipientsAddress
					});
                	
                	$("#mamount").attr({
						"value": amount
					});
                	
                	$("#mamount").attr({
						"value": amount
					});
                	

                	$("#mtId").attr({
						"value": tId
					});
                	
                	$("#mcheckDate").attr({
						"value": date
					});
                	
                	$("#mcheckInfo").attr({
						"value": info
					});
                	
                	$("#mcheckMemo").attr({
						"value": memo
					});
                }
                </script>


</body>

</html>