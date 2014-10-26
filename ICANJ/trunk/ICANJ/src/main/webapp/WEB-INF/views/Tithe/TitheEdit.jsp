<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html lang="en">
	<head>
	<%@page
    import="org.springframework.security.core.context.SecurityContextHolder"%>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<link href="/resources/datepicker/css/datepicker.css" rel="stylesheet">

		<jsp:include page="/WEB-INF/views/Core/header.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>
		<script type="text/javascript">
		$(document).ready(function() {
			$('#signoffStatDIV').hide();
			
			$("#paymentType").val("${tithe.paymentType}");
			$("#transactStatus").val("${tithe.transactStatus}");
			 if('${tithe.transactStatus}' == 'T_SIGNOFF'){
				$('#signoffStatDIV').show();
				$('#footerGroup').hide();
			} 
			$("#accountName").val("${titheStatus.accountName}");
		});
		</script>
	</head>

	<body>

		<div class="container-fluid">
			<div class="row-fluid">
				<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
					<jsp:param name="name" value="sos" />
				</jsp:include>


				<div class="span9">
					<!-- form -->
					<h3>Edit/Delete Receipt Transaction</h3>



					<!-- Modal  Start -->
					<form action="/Admin/Tithe/AddTithe" method="post">

						<div class="span6">
							<div class="control-group">
								<div class="controls">
									<span class="input uneditable-input">Transaction Id :
										${tithe.transactionId}</span> <input id="transactionId"
																 name="transactionId" type="hidden"
																 value="${tithe.transactionId}"> <input id="memberId"
																 name="memberId" type="hidden" value="${tithe.memberID}">
								</div>
							</div>

							<div class="control-group">
								<label class="control-label" for="amount">Payment Amount</label>
								<div class="input-prepend input-append">
									<span class="input uneditable-input add-on">$ ${tithe.amount}</span> <input
										class="input-small uneditable-input" id="amount" name="amount"
										type="hidden" value="${tithe.amount}">
								</div>
							</div>


							<div class="control-group">
								<label class="control-label" for="paymentType">Payment
									Type</label>
								<div class="controls">
									<select id="paymentType" name="paymentType">
										<option value="Check">Check</option>
										<option value="Cash">Cash</option>

									</select>
								</div>
							</div>

							<%-- <div class="control-group">
								<c:set var="str1" value="${tithe.dateRecieved}"/>

								<label class="control-label" for="rcvdDate">Received Date</label>
								<div class="controls input-append date" id="rcvdDateControl" data-date-format="MM-dd-yyyy"
										 data-date='getCurrentDate();'>
									<input type="text" id="rcvdDate" name="rcvdDate"
												 value="${fn:split(str1, ' ')[0]}"
												 placeholder="Enter Check Received date" required>
									<span class="add-on">
										<i class="icon-calendar"></i>
									</span>
								</div>
							</div>
 --%>
							<div class="control-group">
								<c:set var="str2" value="${tithe.checkDate}"/>

								<label class="control-label" for="checkDate">Check Date</label>
								<div class="controls input-append date" id="checkDateControl" data-date-format="MM-dd-yyyy"
										 data-date='getCurrentDate();'>
									<input type="text" name="checkDate"
												 value="${fn:split(str2, ' ')[0]}"id="checkDate" placeholder="Enter Date on check">
									<span class="add-on">
										<i class="icon-calendar"></i>
									</span>
								</div>
							</div>


							<div class="control-group">
								<label class="control-label" for="checkInfo">Check
									Info/Number</label>
								<div class="controls">
									<input type="text" id="checkInfo" name="checkInfo"
												 value="${tithe.checkInfo}"
												 placeholder="Enter Check Information">
								</div>
							</div>

							<div class="control-group">
								<label class="control-label" for="transactStatus">Transaction
									Status</label>
								<div class="controls">
									<select id="transactStatus" name="transactStatus">
										<option value="T_PROCESSING">Processing</option>
										<option value="T_MONEYRECEIVED">Money Received</option>
									<!-- 	<option value="T_SIGNOFF">Signed Off</option> -->

									</select>
								</div>
							</div>
							
							<div id="footerGroup">
							
								<button class="btn btn-success">Save changes</button>
								<a href="/Admin/Tithe/DeleteReceipt/${tithe.transactionId}"
									 type="button" class="btn btn-danger">Delete Transaction</a>
								<a type="button" class="btn btn-primary" ONCLICK="history.go(-1)">Cancel</a>
							
								</div>
								

						</div>

						<div class="span6">
							<table class="table table-condensed">
								<thead>
								<th>Account</th>
								<th>Amount</th>
								</thead>
								<c:forEach items="${tithe.subTransactions}" var="subtithe">
									<tr>
										<td>${subtithe.accountType}</td>
										<td>$ ${subtithe.amount}</td>
									</tr>
								</c:forEach>
							</table>

							<div class="control-group">
								<div class="controls">
									<span class="input-xlarge uneditable-input">Last Updated
										at : ${tithe.lastUpdatedAt}</span>

								</div>
							</div>
							<div id="signoffStatDIV">
							<h4>SIGN-OFF Transaction</h4>
							
							<div class="control-group">
								<c:set var="str2" value="${titheStatus.signofffDate}"/>

								<label class="control-label" for="checkDate">Signoff Date</label>
								<div class="controls input-append date" id="checkDateControl" data-date-format="MM-dd-yyyy"
										 data-date='getCurrentDate();'>
									<input type="text" name="signofffDate"
												 value="${fn:split(str2, ' ')[0]}"id="signofffDate" placeholder="Enter Date on check">
									<span class="add-on">
										<i class="icon-calendar"></i>
									</span>
								</div>
							</div>
							
							<div class="control-group">
								<label class="control-label" for="amount">Statement Transaction ID</label>
								<div class="input-prepend input-append">
							    <input class="input" id="statementTransactID" name="statementTransactID"
										type="text" value="${titheStatus.statementTransactID}">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="accountName">BANK Details</label>
								
								<div class="controls">
									<select id="accountName" name="accountName">
										<option value="TD_BANK_Primary">TD Bank Primary</option>
										<option value="TD_BANK_Secondary">TD Bank Secondary</option>

									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="amount">Approver</label>
								<div class="input-prepend input-append">
									<span class="input uneditable-input"><%=SecurityContextHolder.getContext().getAuthentication().getName()%></span> 
									<input class="input uneditable-input" id="signoffBy" name="signoffBy"
										type="hidden" value="<%=SecurityContextHolder.getContext().getAuthentication().getName()%>">
								</div>
							</div>
							</div>
							
						</div>


					</form>

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
		<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
		<script type="text/javascript" src="/resources/datepicker/js/bootstrap-datepicker.js"></script>
		<script type="text/javascript" src="/resources/js/tithe.js"></script>

	</body>
</html>
