<!DOCTYPE html>
<html lang="en">
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>

<script type="text/javascript">
$(function () {
    // On document ready, call visualize on the datatable.
    $(document).ready(function() {
    	
    	$("#year").val("${year}");
    	$('#fromDate').val((new Date()).getFullYear() +"-01-01");
    	$('#toDate').val(getCurrentDate());
    	
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
            $('tbody th', table).each( function(i) {
                options.xAxis.categories.push(this.innerHTML);
            });
    
            // the data series
            options.series = [];
            $('tr', table).each( function(i) {
                var tr = this;
                $('th, td', tr).each( function(j) {
                    if (j > 0) { // skip first column
                        if (i == 0) { // get the name and init the series
                            options.series[j - 1] = {
                                name: this.innerHTML,
                                data: []
                            };
                        } else { // add values
                            options.series[j - 1].data.push(parseFloat(this.innerHTML));
                        }
                    }
                });
            });
    
            var chart = new Highcharts.Chart(options);
        }
    
        var table = document.getElementById('datatable'),
        options = {
            chart: {
                renderTo: 'container',
                type: 'column'
            },
            title: {
                text: 'Receipts and Payments for the Year ${year}'
            },
            xAxis: {
            },
            yAxis: {
                title: {
                    text: 'Amount in Dollars'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.y +' '+ this.x.toLowerCase();
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


			<div class="span9" style="max-height: 980px; overflow: auto;">
				<h3>Receipts Reporting</h3>
				<form class="form-horizontal" action="../Tithe/AdminReport"
					method="post">
					<div class="control-group">
						<label class="control-label" for="inputMember">Search
							Member</label>
						<div class="controls inline">
							<input type="text" id="inputMember" placeholder="Search Member"
								onkeyup="listMember(this.value)"> <input type="hidden"
								name="searchType" value="member"> <input type="hidden"
								name="familyId" value="0"> <select id="memberSelect"
								name="memberId"></select>
						</div>

					</div>

					<div class="control-group">
						<label class="control-label" for="fromDate">From Date</label>
						<div class="controls input-append date" id="fromDateControl"
							data-date-format="yyyy-mm-dd" data-date='getCurrentDate();'>
							<input type="text" class="input-small" id="fromDate"
								name="fromDate" placeholder="Start Date"> <span
								class="add-on"> <i class="icon-calendar"></i>
							</span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="toDate">To Date</label>
						<div class="controls input-append date" id="toDateControl"
							data-date-format="yyyy-mm-dd" data-date='getCurrentDate();'>
							<input type="text" class="input-small" id="toDate" name="toDate"
								placeholder="End Date"> <span class="add-on"> <i
								class="icon-calendar"></i>
							</span>
						</div>
					</div>



					<button type="submit" class="btn btn-primary" id="searchReceipt">Search
						Receipts</button>
					<button id="PrintinPopup" class="btn pull-right">
						<i class="icon-print"></i>
					</button>
				</form>

				<!-- <form action="/Admin/Tithe/SearchTransactions" method="post" style="width:1000px" >
						<div id="titheModal" class="modal hide fade">
						<div>
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
					 -->

				<hr>
				<div id="toPrint">
					<h4>Search Results</h4>

					<h4>Total by Sub-Accounts</h4>
					<div id="container"></div>
					<table id="datatable" class="table table-bordered">
						<thead>
							<th>Sub Ledger Account</th>
							<th>Sub Ledger Amount</th>
						</thead>
						<c:forEach var="subAccount" items="${subAccounts}">
							<tr>
								<th>${subAccount.key}</th>
								<td>${subAccount.value}</td>
						</c:forEach>

					</table>
					<hr>
					<table class="table table-bordered">
						<tr>
							<th>Total Amount</th>
							<td>$${totalAmount}</td>
						</tr>
					</table>
					<hr>
					<h4>Transaction Details</h4>
					<table class="table table-bordered">
						<thead>
							<th>Id</th>
							<th>Full Name</th>
							<th>Check Date</th>
							<th>Check Info</th>
							<th>Amount</th>
							<th>Details/Breakdown</th>

						</thead>
						<c:forEach items="${tithes}" var="tithe" varStatus="idx">
							<tr>
								<td>${tithe.transactionId}</td>
								<td>${tithe.memberID}</td>
								<td><fmt:formatDate pattern="yyyy-MM-dd"
										value="${tithe.checkDate}" /></td>
								<td>${tithe.checkInfo}</td>
								<td>$ ${tithe.amount}</td>
								<td>
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
								</td>
							</tr>
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
	<script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
	<script type="text/javascript" src="/resources/js/receipt-report.js"></script>
</body>
</html>
