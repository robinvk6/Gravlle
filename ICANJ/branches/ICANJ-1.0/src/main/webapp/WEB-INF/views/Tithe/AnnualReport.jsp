
<!DOCTYPE HTML>
<html>

<head>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Highcharts Example</title>

<script type="text/javascript">
$(function () {
    // On document ready, call visualize on the datatable.
    $(document).ready(function() {
    	
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
	<script type="text/javascript" src="/resources/js/HighCharts/highcharts.js"></script>
	<script type="text/javascript" src="/resources/js/HighCharts/exporting.js"></script>
	<div class="container-fluid">
		<div class="row-fluid">
			<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
				<jsp:param name="name" value="sos" />
			</jsp:include>


			<div class="span9">
			
			<c:if test="${not empty alert}">
					<div class="alert ${alert.cssAlertClass}" id="errorBox">
						<button type="button" class="close" data-dismiss="alert">×</button>
						<strong>Warning! :</strong>
						${alert.message}
					</div>
			</c:if>
			
			<div>
			<form action="/Admin/Finance/Annual" method="POST">
			<div class="control-group">
			<div class="controls">
    		<select name="year" id="year" onchange="this.form.submit()">   
    		<option value="Current">Current Year</option>     	

        	
   			</select>
   			</div>
   			</div>
</form>
			</div>
			
				<div id="container"></div>
				
			<div>			
			<h3>Tithe Details</h3>
								
			<table id="datatable" class="table table-hover">
					<thead>
						<tr>
							<th></th>
							<th> Total Income </th>
							<th> Total Expenses </th>

						</tr>
					</thead>
					<tbody>
					<c:set var="sumIncome" value="${0}"/>     
				<c:set var="sumPayment" value="${0}"/>     
				
						<c:forEach items="${reports}" var="report">
							<tr>
							<th>${report.month}</th>
									
								<td>${report.totalReceiptAmount}</td>
								<td>${report.totalPaymentAmount}</td>
							
							<c:set var="sumIncome" value="${sumIncome + report.totalReceiptAmount}"/>      
							<c:set var="sumPayment" value="${sumPayment + report.totalPaymentAmount}"/>      
							
							</tr>
						</c:forEach>
						
					</tbody>
				</table>
				<table class="table table-hover">
				<thead>
						<tr>
							<th></th>
							<th>Net Income</th>
							<th>Net Expenditure</th>
							<th>Balance </th>

						</tr>
					</thead>
					<tbody>
				<tr>
						<th>Total</th>
						<th><fmt:formatNumber value='${sumIncome}' type="currency" groupingUsed='true' />      </th>
						<th><fmt:formatNumber value='${sumPayment}' type="currency" groupingUsed='true' />      </th>
						<th><fmt:formatNumber value='${sumIncome-sumPayment}' type="currency" groupingUsed='true' />      </th>
						
						</tr>
						</tbody>
					
				</table>
				</div>
			<!--/span-->
		</div>
		<!--/row-->

		<jsp:include page="/WEB-INF/views/Core/footer.jsp">
			<jsp:param name="name" value="sos" />
		</jsp:include>

	</div>
</html>
