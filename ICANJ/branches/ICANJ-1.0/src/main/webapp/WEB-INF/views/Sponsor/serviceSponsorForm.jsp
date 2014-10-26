<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
    <head>
        <jsp:include page="/WEB-INF/views/Core/header.jsp">
            <jsp:param name="name" value="sos" />
        </jsp:include>
        <title>Service Sponsorship</title>
    </head>

    <body>

        <div class="container-fluid">
            <div class="row-fluid">
                <jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
                    <jsp:param name="name" value="sos" />
                </jsp:include>



                <div class="span9">

                    <c:if test="${not empty alert}">
                        <div class="alert ${alert.cssAlertClass}" id="errorBox">
                            <button type="button" class="close" data-dismiss="alert">◊</button>
                            <strong> ${alert.message}</strong>
                        </div>
                    </c:if>
                    <h3>Service Sponsorship Page</h3>
                    <div>
                    <table class="table">
                    <tr>
                    <th> MONTH </th>
                    <th> PYPA </th>
                    <th> ENGLISH Service </th>
                    <th> ENGLISH Service </th>
                    </tr>
                    <c:forEach var="sponsorList" items="${sponsorLists}">
        <tr>
          <th>${sponsorList.month}</th>
          <td>
          <c:choose>
  <c:when test="${sponsorList.meeting1Family =='AVAILABLE'}">
     <a class="btn" href="#pickEvent" onclick="selectDate('${sponsorList.id}','PYPA','${sponsorList.month}')" role="button" data-toggle="modal"><i class="icon-plus-sign"></i>Sponsor Event</a>
  </c:when>
  <c:otherwise>
  ${sponsorList.meeting1Family}
  </c:otherwise>
</c:choose>
          
          </td>
          
          <td>
          <c:choose>
  <c:when test="${sponsorList.meeting2Family =='AVAILABLE'}">
     <a class="btn" href="#pickEvent" onclick="selectDate('${sponsorList.id}','English Service 1','${sponsorList.month}')" role="button" data-toggle="modal"><i class="icon-plus-sign"></i>Sponsor Event</a>
  </c:when>
  <c:otherwise>
  ${sponsorList.meeting2Family}
  </c:otherwise>
</c:choose>
          
          </td>
          <td>
          <c:choose>
  <c:when test="${sponsorList.meeting3Family =='AVAILABLE'}">
     <a class="btn" href="#pickEvent" onclick="selectDate('${sponsorList.id}','English Service 2','${sponsorList.month}')" role="button" data-toggle="modal"><i class="icon-plus-sign"></i>Sponsor Event</a>
  </c:when>
  <c:otherwise>
  ${sponsorList.meeting3Family}
  </c:otherwise>
</c:choose>
          
          </td>
       
        </tr>
      </c:forEach>
                    </table>
                    </div>



                </div>
                <!--/span-->
            </div>
            <!--/row-->
			
			<div id="pickEvent" class="modal hide fade">	
					<form onsubmit="return confirm('Do you want to sponsor this event?');" action="/Sponsor/selectEvent" method="post" id="addConatct">
					<input type="hidden"  name="pmonth" id="pmonth">
					<input type="hidden" name="pmeeting" id="pmeeting">
					<input type="hidden" name="pid" id="pid">
					<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4>Sponsor Event</h4>
                            </div>
					<div class="modal-body">
					<table class="table">
					<tr>
					<th> Month </th><td><label id="mmonth"></label></td>
					</tr>
					<tr>
					<th> Meeting Sponsored </th><td><label id="mattr"></label></td>
					</tr>
					</table>
					</div>
						<div class="modal-footer">
						<button class="btn btn-primary">Sponsor Event</button>
						</div>
					</form>
					</div>
					<!-- Modal End -->


            <jsp:include page="/WEB-INF/views/Core/footer.jsp">
                <jsp:param name="name" value="sos" />
            </jsp:include>
<script>
function selectDate(mlistid,mattr,mmonth){
	
	$("#mlistid").attr({
		"text": mlistid
	});
	
	 $('#mattr').text(mattr);
	$("#mattr").attr({
		"text": mattr
	});
	 $('#mmonth').text(mmonth);
	$("#mmonth").attr({
		"text": mmonth
	});
	

	$("#pid").attr({
		"value": mlistid
	});

	$("#pmonth").attr({
		"value": mmonth
	});

	$("#pmeeting").attr({
		"value": mattr
	});
	
}
</script>
            <script type="text/javascript" src="/resources/js/service-sponsorship.js"></script>
        </div>
        <!--/.fluid-container-->

    </body>
</html>
