<%@page import="org.springframework.security.core.GrantedAuthority"%>
<%@page import="java.util.Collection"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="span3">
    <!-- @todo: Very Bad implementation [Fix it version 2.0 -->
    <%
        boolean isSuperAdmin = false;
    	boolean isInventoryManager = false;
    	boolean isSouledOutAdmin = false;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Collection<GrantedAuthority> ls = auth.getAuthorities();
        for (GrantedAuthority authority : ls) {
            if (authority.toString().equals("ROLE_ADMIN")) {
            	isSuperAdmin = true;
            }
            
            if (authority.toString().equals("ROLE_INVENTORY")) {
            	isInventoryManager = true;
            }
            
            if (authority.toString().equals("ROLE_SOUTADMIN")) {
            	isSouledOutAdmin = true;
            }
        }

    %>
    
   
    
    <!-- Endddd -->
    <div id="menu" class="nav-collapse collapse width menu">
        <div class="collapse-inner">
            <div class="navbar navbar-inverse">
<!--                <div class="navbar-inner">
                    Menu
                </div>-->
            </div>
            <div class="well sidebar-nav">
                <ul class="nav nav-list">


                    <li class="nav-header">Family & Members</li>
                    <li <c:if test="${navSelected == 'FamilyProfile'}"> class="active" </c:if> ><a href="/Directory/ContactInfo"><i class="icon-user"></i>Dashboard</a></li>
                    <li <c:if test="${navSelected=='Directory'}"> class="active" </c:if> ><a href="/Directory/Families"><i class="icon-book"></i> Directory</a></li>
                   <%--  <li <c:if test="${navSelected=='Retreat2013'}"> class="active" </c:if> ><a href="/Retreat/landingPage"><i class="icon-book"></i> Retreat 2013</a></li>
					<li <c:if test="${navSelected=='ThanksGiving'}"> class="active" </c:if> ><a href="/ThanksGiving"><i class="icon-book"></i> Watch Night Menu Selection</a></li>
					 --%>
					 <li class="nav-header">PYPA Sponsorship</li>
                    <li <c:if test="${navSelected == 'serviceSponsor'}"> class="active" </c:if> ><a href="/Sponsor/serviceSponsorForm"><i class="icon-plus-sign"></i> Sponsorship</a></li>
                 

                        <li class="nav-header">Tithe</li>
                        <li <c:if test="${navSelected == 'MyTithe'}"> class="active" </c:if> ><a href="/Tithe/FamilyTithe"><i class="icon-star"></i> My Tithing Info</a></li>
                       <li <c:if test="${navSelected == 'RequestACheck'}"> class="active" </c:if> ><a href="/Finance/RequestCheck/"><i class="icon-star"></i> Request a Check</a></li>
                                <li <c:if test="${navSelected == 'SubmitReceipt'}"> class="active" </c:if> ><a href="/PageNotFound"><i class="icon-star"></i> Submit Receipt</a></li>
                   <%if (isInventoryManager) {%>
                 <li class="nav-header">Inventory Management</li>
                    <li <c:if test="${navSelected == 'inventory'}"> class="active" </c:if> ><a href="/Admin/Inventory/Management"><i class="icon-plus-sign"></i> Inventory</a></li>
                   
                  <%}%>
                  
                  <%if (isSouledOutAdmin) {%>
                 <li class="nav-header">Souled Out</li>
                    <li <c:if test="${navSelected == 'souledout'}"> class="active" </c:if> ><a href="/SouledOut/Contacts"><i class="icon-plus-sign"></i> Contacts</a></li>
                   
                  <%}%>
                  
                    <%if (isSuperAdmin) {%>
                    <li class="nav-header">Member Administration</li>
                    <li <c:if test="${navSelected == 'FamilySignup'}"> class="active" </c:if> ><a href="/Admin/Signup/Family"><i class="icon-plus-sign"></i> Family Signup</a></li>
                    <li <c:if test="${navSelected == 'RegisterAccount'}"> class="active" </c:if> ><a href="/Public/Register/"><i class="icon-plus-sign"></i> Register Accounts</a></li>

                        <li class="nav-header">Finance</li>
                        <li <c:if test="${navSelected == 'DesignatedContributionRequest'}"> class="active" </c:if> ><a href="/Admin/Tithe/RequestCheck"><i class="icon-th-list"></i>Designated Contribution Requests</a></li>

                        <li class="nav-header">Tithe Administration</li>
                    <li <c:if test="${navSelected == 'ReceiptManagement'}"> class="active" </c:if> ><a href="/Admin/Tithe/Admin"><i class="icon-th-list"></i> Receipts Management</a></li>
                    <li <c:if test="${navSelected == 'SearchReceipts'}"> class="active" </c:if> ><a href="/Admin/Tithe/Search"><i class="icon-th-list"></i> Edit Receipts</a></li>
                    <li <c:if test="${navSelected == 'PaymentManagement'}"> class="active" </c:if> ><a href="/Admin/Tithe/Admin/Payment"><i class="icon-th-list"></i> Payments Management</a></li>
                       
                       <li class="nav-header">Finance Reporting</li>
                       <li <c:if test="${navSelected == 'AnnualSummaryReport'}"> class="active" </c:if> ><a href="/Admin/Finance/Annual"><i class="icon-star"></i>Annual Summary Report</a></li>
                        <li <c:if test="${navSelected == 'ReceiptReporting'}"> class="active" </c:if> ><a href="/Admin/Tithe/AdminReport?fromDate=&toDate=&memberId="><i class="icon-search"></i> Receipts Reporting</a></li>
                        <li <c:if test="${navSelected == 'PaymentReporting'}"> class="active" </c:if> ><a href="/Admin/Tithe/AdminPaymentReport?fromDate=&toDate="><i class="icon-search"></i> Payments Reporting</a></li>
                   
                        <%}%>
                </ul>
            </div><!--/.well -->
        </div>
    </div>
    <!--    <div class="navbar navbar-inverse">
            <div class="navbar-inner">
                <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target="#menu">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
        </div>-->
</div><!--/span-->
