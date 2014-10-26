
<!DOCTYPE HTML>
<html>

<head>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Highcharts Example</title>
<!-- <script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script> -->
<script type="text/javascript">
	$(function() {
		// On document ready, call visualize on the datatable.
		$(document)
				.ready(
						function() {

							//alert("Currently we only show some tithing data for the year 2012. Your current data will be available starting January 2014");

							$("#year").val("${year}");

							/**
							 * Visualize an HTML table using Highcharts. The top (horizontal) header
							 * is used for series names, and the left (vertical) header is used
							 * for category names. This function is based on jQuery.
							 * @param {Object} table The reference to the HTML table to visualize
							 * @param {Object} options Highcharts options
							 */
							Highcharts.visualize = function(table, options) {
								// the categories
								options.xAxis.categories = [];
								$('tbody th', table).each(
										function(i) {
											if(i = 0 || i%2==0){
											options.xAxis.categories
													.push(this.innerHTML);
											}
										});

								// the data series
								options.series = [];
								$('tr', table)
										.each(
												function(i) {
													var tr = this;
													$('th', tr)
															.each(
																	function(j) {
																		if (j > 0) { // skip first column
																			if (i == 0) { // get the name and init the series
																				options.series[j - 1] = {
																					name : this.innerHTML,
																					data : []
																				};
																			} else { // add values
																				options.series[j - 1].data
																						.push(parseFloat(this.innerHTML));
																			}
																		}
																	});
												});

								var chart = new Highcharts.Chart(options);
							}

							var table = document.getElementById('datatable'), options = {
								chart : {
									renderTo : 'container',
									type : 'column'
								},
								plotOptions: {
						            column: {
						                pointPadding: 0.2,
						                borderWidth: 0
						            }
						        },
								title : {
									text : 'Tithe Contributions for the Year ${year}'
								},
								xAxis : {},
								yAxis : {
									title : {
										text : 'Amount in Dollars'
									}
								},
								tooltip : {
									formatter : function() {
										return '<b>' + this.series.name
												+ '</b><br/>' + this.y + ' '
												+ this.x.toLowerCase();
									}
								}
							};

							Highcharts.visualize(table, options);
						});

	});
</script>
</head>
<body>
	<script type="text/javascript"
		src="/resources/js/HighCharts/highcharts.js"></script>
	<script type="text/javascript"
		src="/resources/js/HighCharts/exporting.js"></script>


	<div class="container-fluid">
		<div class="row-fluid">
			<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
				<jsp:param name="name" value="sos" />
			</jsp:include>


			<div class="span9">

				<c:if test="${not empty alert}">
					<div class="alert ${alert.cssAlertClass}" id="errorBox">
						<button type="button" class="close" data-dismiss="alert">×</button>
						<strong>Warning! :</strong> ${alert.message}
					</div>
				</c:if>

				<div>
					<form action="/Tithe/FamilyTithe" method="POST">
						<div class="control-group">
							<div class="controls">
								<select name="year" id="year" onchange="this.form.submit()">
									<option value="Current">Year 2014</option>
								</select>
							</div>
						</div>
					</form>
				</div>

				<div id="container"></div>
				<hr>
				<button id="PrintinPopup" class="btn pull-right">
						<i class="icon-print"></i>Print
					</button>
				<div id="toPrint">

					<h3>${year} - Tithe Summary</h3>
					
					<table class="table table-hover">
						<tr>
							<td>Total Number of Payments Received in ${year}:</td>
							<td>${totalcount}</td>
						</tr>

						<tr>
							<td>Total Amount Received in ${year}:</td>
							<td>$${total}</td>
						</tr>


					</table>

					<h3>Tithe Details</h3>
					<div>

						<table id="datatable" class="table table-hover">
							<thead>
								<tr>
									<th>Transaction Details</th>
									<th>Transaction Amount</th>
									<td></td>
									<td></td>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${tithes}" var="tithe">
									<tr>
										<th><fmt:formatDate pattern="MMM-dd" 
												value="${tithe.checkDate}" /></th>

										<th>${tithe.amount}</th>
										<td>${tithe.memberID}</td>
										<td><table class="table table-condensed">
											<thead>
											<td>Account</td>
											<td>Amount</td>
											</thead>
											<c:forEach items="${tithe.subTransactions}" var="subtithe">
												<tr>
													<td>${subtithe.accountType}</td>
													<td>$ ${subtithe.amount}</td>
												</tr>
											</c:forEach>
										</table></td>
									</tr>
								</c:forEach>

							</tbody>
						</table>


					</div>



				</div>
				<!--/span-->
			</div>
			<!--/row-->

			<hr>

			<jsp:include page="/WEB-INF/views/Core/footer.jsp">
				<jsp:param name="name" value="sos" />
			</jsp:include>
			
			<script type="text/javascript">
			$("#PrintinPopup").click(function() {
				printElem({overrideElementCSS: ['/resources/css/bootstrap.css']});
			});


			function printElem(options) {
				$('#toPrint').printElement(options);
			}
			</script>

		</div>
		<!--/.fluid-container-->
</body>
</html>
