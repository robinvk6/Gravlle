<!DOCTYPE html>
<html lang="en">
  <head>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
    <jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
	</jsp:include>
	<script>

 function printElem(){	
    $('#toPrint').printElement({ overrideElementCSS: ['/resources/css/bootstrap.css'] });
    window.open('', '_self', ''); window.close();
}
 
</script>

</head>

  <body onload="printElem()">

    <div class="container-fluid">
      <div class="row-fluid">
         <div id="toPrint" class="span12">
         <h3>INDIA CHRISTIAN ASSEMBLY OF NEW JERSEY, INC</h3>
         <p class="text-info">315 STATE STREET, HACKENSACK, NEW JERSEY 07601</p>
	<h4>Check Request</h4>
	
	<h5>Requester Information</h5>
	<table class="table">
 	
 	<tr><td>Requested By</td><td>${member.firstName} ${member.lastName}</td></tr>
 	<tr><td></td><td><address class="float-right">
							<strong>Home Address</strong><br>
							${address.streetAddress}<br> ${address.city},
							${address.state},${address.zip}<br> 
						</address></td></tr>
						<tr><td>Signature</td><td></td></tr>
						<tr><td></td><td></td></tr>
 	
	</table>
	<h5>Recipient Information</h5>
	<table class="table table-condensed">
	<tr><td>Recipients Name</td><td>${processedCheck.recipientsName}</td></tr>
 	<tr><td>Recipients Address</td><td>${processedCheck.recipientsAddress}</td></tr>
 	<tr><td>Purpose of the Payment</td><td>${processedCheck.checkMemo}</td></tr>
 	<tr><td>Total Payment Amount</td><td>$${processedCheck.amount}</td></tr>
 	<c:set var="str2" value="${processedCheck.checkDate}" />
 	<tr><td>Check Date</td><td>${fn:split(str2, ' ')[0]}</td></tr>
 	</table>
 	
 	<h5>Official use only</h5>
 	<table class="table">
 	<tr><td>Reimbursed amount</td><td>$${processedCheck.paidAmount}</td></tr>
 	<c:set var="str1" value="${processedCheck.paidDate}" /> 	
 	<tr><td>Reimbursed Date</td><td>${fn:split(str1, ' ')[0]}</td></tr>
 	<tr><td>Reimbursed Check Number</td><td>${processedCheck.paidCheckNumber}</td></tr>
 	<tr><td>Transaction Id</td><td>${processedCheck.transactionId}</td></tr>
 	<tr><td>Approved By</td><td>${processedCheck.lastUpdatedBy}</td></tr>
 	<tr><td>Signature</td><td></td></tr>
	</table>
	
        </div><!--/span-->
      </div><!--/row-->

      <hr>

	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>

    </div><!--/.fluid-container-->

  </body>
</html>
