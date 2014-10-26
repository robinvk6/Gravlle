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
				
				
				
                <div class="span9" style="padding:10px;">
                    
                    <c:if test="${not empty alert}">
                        <div class="alert ${alert.cssAlertClass}" id="errorBox">
                            <button type="button" class="close" data-dismiss="alert">×</button>
                            ${alert.message}
                        </div>
                    </c:if>
                    <div class="row hero-unit">
                    <div class="span8">
                    <h3>My Family Profile</h3>
					<img alt="" src="${resourceUrl}" />				
					</div>
                                    					
					<div class="span4">					
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
                        <a href="#addressModal" role="button"
                           data-toggle="modal">Click to Edit Address</a>
                  
                    </div>
                    </div>
                    
                    
                    <div class="row">
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
                                    <td> <button class="btn btn-info"
                                                 onclick="getMemberInfo(${member.memberId})">Edit Detail</button></td>

                                </tr>
                            </c:forEach>
                        </table>
                    </form>
					</div>
                    </div>
                    </div>
						
                    <!-- Address Modal Start -->
                    <div id="addressModal" class="modal hide fade">
                        <form action="UpdateFamily" method="post" id="updateFamily">
                            <input type="hidden" id="familyId" name="familyId" value="${family.familyId}">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h3>Edit Address</h3>
                            </div>
                            <div class="modal-body">


                                <div class="control-group">
                                    <label class="control-label" for="familyName">Family
                                        Name</label>
                                    <div class="controls">
                                        <input type="text" id="familyName" name="familyName"
                                               value="${family.familyName}" placeholder="Enter Family Name" data-required="true">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="familyTagLine">Line
                                        about your family.</label>
                                    <div class="controls">
                                        <input type="text" id="familyTagLine" name="familyTagLine"
                                               value="${family.tagLine}" placeholder="A Line About Your Family">
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="street">Street Name</label>
                                    <div class="controls">
                                        <input type="text" id="street" name="street"
                                               value="${family.address.streetAddress}"
                                               placeholder="Enter Street Name" data-required="true">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="city">City</label>
                                    <div class="controls">
                                        <input type="text" id="city" name="city"
                                               value="${family.address.city}" placeholder="Enter City" data-required="true">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="state">State</label>
                                    <div class="controls">
                                        <select id="editState" name="state" data-required="true">
                                            <option value="NJ">New Jersey</option>
                                            <option value="NY">New York</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="zip">Zip</label>
                                    <div class="controls">
                                        <input type="text" id="zip" name="zip" value="${family.address.zip}" placeholder="Enter Zip" data-required="true">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="Country">Home Phone
                                        Number</label>
                                    <div class="controls">
                                        <input type="text" id="homePhoneNumber" name="homePhoneNumber"
                                               value="${family.homePhoneNumber}"
                                               placeholder="Enter Phone number" data-required="true">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="parkingInfo">Parking
                                        Info Details</label>
                                    <div class="controls">
                                        <textarea rows="5" name="parkingInfo"
                                                  placeholder="${family.address.parkingDetails}"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                                <button class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                    <!-- Address Modal End -->



                
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
