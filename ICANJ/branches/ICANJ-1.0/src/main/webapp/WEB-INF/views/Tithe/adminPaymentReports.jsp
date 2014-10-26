<!DOCTYPE html>
<html lang="en">
	<head>

		<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
		<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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


				<div class="span9" style="max-height: 700px; overflow: auto;">

					<form class="form-inline" action="../Tithe/AdminPaymentReport" method="post">
						<label class="control-label" for="fromDate">Check Date</label>
						<div class="controls input-append date" id="fromDateControl" data-date-format="yyyy-mm-dd"
								 data-date="2013-01-01">
							<input type="text" class="input-small" id="fromDate" name="fromDate" placeholder="From Date">
							<span class="add-on">
								<i class="icon-calendar"></i>
							</span>
						</div>
						<label class="control-label" for="toDate">Check Date</label>
						<div class="controls input-append date" id="toDateControl" data-date-format="yyyy-mm-dd"
								 data-date="2013-01-01" >
							<input type="text" class="input-small" id="toDate" name="toDate" placeholder="To Date">
							<span class="add-on">
								<i class="icon-calendar"></i>
							</span>
						</div>

						<button type="submit" class="btn btn-primary" id="searchPayment">Search Payments</button>
						<button id="PrintinPopup" class="btn pull-right"><i class="icon-print"></i></button>
					</form>
					<hr>

					<div id="toPrint">
						<h3>Payments Reporting</h3>
						<table class="table table-bordered">
							<thead>
							<th>Id</th>
							<th>Type</th>
							<th>Check Date</th>
							<th>Check Info</th>
							<th>Amount</th>
							<th>Details</th>

							</thead>
							<c:forEach items="${payments}" var="payment" varStatus="idx">
								<tr>
									<td>${payment.transactionId}</td>
									<td>${payment.memo}</td>
									<td><fmt:formatDate pattern="yyyy-MM-dd"
																	value="${payment.checkDate}" /></td>
									<td>${payment.checkInfo}</td>
									<td>$ ${payment.amount}</td>
									<td>
										${payment.detail}
									</td>
								</tr>
							</c:forEach>
						</table>

						<h4>Total by Sub-Accounts</h4>

						<table class="table table-bordered">
							<thead>
							<th>Payment Type</th>
							<th>Total Amount</th>
							</thead>
							<c:forEach var="subAccount" items="${subPayments}">
								<tr>
									<td>${subAccount.key}</td>
									<td>${subAccount.value}</td>
								</c:forEach>
						</table>

					</div>
					<!--/span-->

				</div>
			</div>
			<!--/row-->

			<hr>

			<jsp:include page="/WEB-INF/views/Core/footer.jsp">
				<jsp:param name="name" value="sos" />
			</jsp:include>

		</div>
		<!--/.fluid-container-->
		<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
		<script type="text/javascript" src="/resources/js/search-payments.js"></script>
	</body>
</html>
