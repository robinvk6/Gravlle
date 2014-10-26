<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <title>My Family Details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" ></script>
        <script type="text/javascript" src="/resources/js/holder.js"></script>
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


                <div class="span9">
                    <c:if test="${not empty alert}">
                        <div class="alert ${alert.cssAlertClass}" id="errorBox">
                            <button type="button" class="close" data-dismiss="alert">×</button>
                            ${alert.message}
                        </div>
                    </c:if>

					<div class="row hero-unit">
					<div class="span6" >
					<img alt="" src="${resourceUrl}" />					                   
					</div>
					
					<div class="span3">					
                        <input type="hidden" id="formPostType" name="formPostType" value="">  
                        <h4>${family.familyName} & Family</h4>                      
                        <h5><em>${family.tagLine}</em></h5>
                        <address class="float-right">
                            <strong>Home Address</strong><br>
                            ${family.address.streetAddress}<br> ${family.address.city},
                            ${family.address.state},${family.address.zip}<br> <abbr title="Phone">P:</abbr>
                            +1${family.homePhoneNumber}
                        </address>
                        <p>Parking Info: ${family.address.parkingDetails}</p>
                    </div>
                    </div>
					
					
					<div style="padding-top: 20px;">
                    <form action="GetMemberProfile" method="post" id="familyDetail">
                        <input type="hidden" id="memberId" name="memberId">
                        <input type="hidden" name="familyId" value="${family.familyId}">
                        <table class="table table-hover">
                            <tr>
                                <th>Name</th>                                
                                <th>Email Address</th>
                                <th>Cell Phone</th>
                                <th>Work Phone</th>

                                <th></th>
                            </tr>
                            <c:forEach items="${members}" var="member">
                                <tr>
                                    <td>${member.firstName} ${member.lastName}</td>                                  
                                    <td>${member.email}</td>
                                    <td>${member.cellPhoneNumber}</td>
                                    <td>${member.workPhoneNumber}</td>                                   
                                </tr>
                            </c:forEach>
                        </table>
                    </form>
                    <div class="modal-footer">

						<button class="btn btn-primary" ONCLICK="history.go(-1)">Go Back</button>
					</div>
					</div>


                </div>
            </div>
        </div>


        <jsp:include page="/WEB-INF/views/Core/footer.jsp">
            <jsp:param name="name" value="sos" />
        </jsp:include>
        <script type="text/javascript" src="/resources/js/jquery-validate.js"></script>
        <script type="text/javascript" src="/resources/js/jquery.mask.min.js"></script>
        <script type="text/javascript" src="/resources/js/family-detail.js"></script>
        <script type="text/javascript" src="/resources/js/mobile.js"></script>
    </body>
</html>
