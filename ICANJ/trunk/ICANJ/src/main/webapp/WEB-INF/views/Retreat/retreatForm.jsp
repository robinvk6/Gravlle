<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
    <head>
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
                            <strong>Warning! :</strong> ${alert.message}
                        </div>
                    </c:if>
                    <h3>Retreat Form</h3>
                    <form action="/Retreat/submitRetreatForm" method="post" id="retreatDetail"
                          name="retreatDetail">

                        <!--
                                Personal Information
                        -->
                        <div class="page-header">
                            <h4 align="left">Registration for ${family.familyName} &
                                Family</h4>
                            <input type="hidden" name="familyName" value="${family.familyName}"/>
                        </div>

                        <table id="directory" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Member Name</th>
                                    <th>Retreat Participation</th>
                                    <th>Room Type</th>
                                    <th>Age Group</th>
                                    <th>T-Shirt Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${members}" var="member" varStatus="loop">
                                    <tr id="${member.memberId}">
                                        <%-- <c:set var="longKey" value="${member.memberId}" /> --%>
                                        <td>${member.firstName} ${member.middleName}
                                            ${member.lastName}
                                            <%-- <div style="display: none">${member.memberId}</div> --%>
                                            <input name="retreatForm${loop.index}" value="${member.firstName} ${member.lastName}" type="hidden" />
                                            <input class="personTotalCost" type="hidden"/>
                                        </td>
                                        <td><label><input name="retreatForm${loop.index}" value="off" id="isGoing" class="retreatStatus" type="checkbox" /> 
                                                Going</label></td>
                                        <td>
                                            <div class="control-group">
                                                <div class="controls">
                                                    <select id="roomType" name="retreatForm${loop.index}" required>
                                                        <option value="none">--Select Room Type--</option>
                                                        <option value="deluxe">Deluxe</option>
                                                        <option value="standard1">Standard 1</option>
                                                        <option value="standard2">Standard 2</option>
                                                    </select>
                                                </div>
                                                <div class="controls">
                                                    <label id="roomTypeDetail"></label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="controls">
                                                <select id="ageGroup" name="retreatForm${loop.index}" required>
                                                    <option value="none">--Select Age Group--</option>
                                                    <option value="above12">Above 12</option>
                                                    <option value="between5And12">Between 5 and 12</option>
                                                    <option value="below5">Below 5</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="control-group">

                                                <div class="controls">
                                                    <select id="tShirtSize" name="retreatForm${loop.index}" required>
                                                        <option value="none">--Select T-Shirt Size--</option>
                                                        <option value="xSmall">Extra Small</option>
                                                        <option value="small">Small</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="large">Large</option>
                                                        <option value="xLarge">XL</option>
                                                        <option value="xxLarge">XXL</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                        <div class="control-group">
                            <label class="control-label" for="totalCost">Total Cost</label>
                            <div class="controls">
                                <label id="totalCostLabel"></label> 
                                <input type="hidden"
                                       id="totalCost" name="retreatTotalCost" value="0.00">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="totalCost">Legal Agreement</label>
                            <div class="controls">
                                <input type="checkbox"
                                       id="iAgree" name="iAgree" value="agree">
                                <span>

                                    I herby accept full responsibility of safety, liability and medical insurance for myself and my family, in case of any emergency, and will not hold India Christian Assembly responsible. Any damages to the Pinebrook property caused by me or my family will be my responsibility.

                                </span>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary" id="submitRetreatForm">Submit Form</button>
                            <a type="button" class="btn btn-primary" ONCLICK="history.go(-1)">Cancel</a>
                        </div>
                    </form>



                </div>
                <!--/span-->
            </div>
            <!--/row-->



            <jsp:include page="/WEB-INF/views/Core/footer.jsp">
                <jsp:param name="name" value="sos" />
            </jsp:include>

            <script type="text/javascript" src="/resources/js/retreat-registration.js"></script>
        </div>
        <!--/.fluid-container-->

    </body>
</html>
