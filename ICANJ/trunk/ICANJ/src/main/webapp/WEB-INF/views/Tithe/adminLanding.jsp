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
						<h3>Income & Tithe Management</h3>
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
							<h4>Select Member</h4>

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
						<th>Check Info</th>
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
								<td>${tithe.checkInfo}</td>
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
					<form action="/Admin/Tithe/AddTithe" method="post" style="width:1000px" >
						<div id="titheModal" class="modal hide fade">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								<h3>Add New Receipt</h3>

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
												<label class="control-label" for="amount">Total Payment Amount</label>
												<div class="controls">
													<input id="amount" name="amount" type="text" placeholder="Payment Amount">
												</div>
											</div>
										</td>
										<td>
											<div class="control-group">
												<label class="control-label" for="paymentType">Payment Type</label>
												<div class="controls">
													<select id="paymentType" name="paymentType">
														<option value="Check">Check</option>
														<option value="Cash">Cash</option>
													</select>
												</div>
											</div>
										</td>
										
									</tr>
									<tr>
									<td>
											<div class="control-group">
												<label class="control-label" for="checkInfo">Check Info/Number</label>
												<div class="controls">
													<input type="text" id="checkInfo" name="checkInfo" placeholder="Enter Check Information">
												</div>
											</div>
										</td>
										<!-- <td>
											<div class="control-group">
												<label class="control-label" for="rcvdDate">Received Date</label>
												<div class="controls input-append date" id="rcvdDateControl" data-date-format="yyyy-mm-dd"
														 data-date='getCurrentDate();' >
													<input  type="text" id="rcvdDate" name="rcvdDate" placeholder="Enter Check Received date"  required >
													<span class="add-on">
														<i class="icon-calendar"></i>
													</span>
												</div>
											</div>

										</td> -->
										<td>
											<div class="control-group">
												<label class="control-label" for="checkDate">Check Date</label>
												<div class="controls input-append date" id="checkDateControl" 
														 data-date-format="yyyy-mm-dd" data-date='getCurrentDate();' >
													<input type="text" name="checkDate" id="checkDate" placeholder="Enter Date on check" >
													<span class="add-on">
														<i class="icon-calendar"></i>
													</span>
												</div>
											</div>
										</td>
										<td></td>
									</tr>
								</table>
								<table class="table">
									<caption>Transaction Details (Sub Ledger Accounts)</caption>
									<thead>
										<tr>
											<th>Amount</th>
											<th>Sub-Account</th>
											<th>Details</th>
										</tr>
									</thead>
									<tbody>
										<c:forEach var="i" begin="1" end="5" step="1" varStatus="status">
											<tr>
												<td>
													<input id="subAmount${i}" name="subAmount${i}" type="text" placeholder="Sub-Contribution Amount ${i}">
												</td>
												<td>
													<select id="subTransactType${i}" name="subTransactType${i}">
														<option value="Personal Contribution">Personal Contribution</option>
														<option value="Bihar Missions">Bihar Missions</option>
														<option value="Missions and Charity">Missions and Charity</option>
														<option value="Offering">Offering</option>
														<option value="Building">Building Fund</option>
														<option value="HMI">HMI</option>
														<option value="Designated Contribution">Designated Contribution</option>
														<option value="PYPA">PYPA</option>
														<option value="Kidz for Kidz">Kidz for Kidz</option>
														<option value="Children Sunday School">Children Sunday School</option>
														<option value="Adult Sunday School">Adult Sunday School</option>
														<option value="Sisters Fellowship">Sisters Fellowship</option>
														<option value="SouledOut">SouledOut</option>
														<option value="Convention">Convention</option>
														<option value="Rent Income">Rent Income</option>
														<option value="DTB">DTB</option>
														<option value="Others">Others</option>
													</select>
												</td>
												<td>
													<input id="details${i}" name="details${i}" type="text" placeholder="Enter Receipt Details">
												</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
								<div class="control-group">
									<label class="control-label" for="transactStatus">Transaction Status</label>
									<div class="controls">
										<select id="transactStatus" name="transactStatus">
										<option value="T_MONEYRECEIVED">Money Received</option>	
										<option value="T_PROCESSING">Processing</option>
										</select>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button class="btn btn-primary">Save changes</button>
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
		<script type="text/javascript">
			$(document).ready(function(){
				$('#amount').change(function(){
					$('#subAmount1').val($(this).val());
				});
			});
		</script>


	</body>

</html>
