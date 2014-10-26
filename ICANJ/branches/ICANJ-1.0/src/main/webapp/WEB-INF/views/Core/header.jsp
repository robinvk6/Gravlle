<%--
    Document   : footer
    Created on : Dec 14, 2012, 10:56:37 AM
    Author     : robinvk
--%>
<%@page
    import="org.springframework.security.core.context.SecurityContextHolder"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    
    <head>
        <meta charset="utf-8">
        <title>my.icanj.org</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="/resources/css/bootstrap.css" rel="stylesheet"
              media="screen">
        <link href="/resources/css/bootstrap-responsive.css" rel="stylesheet"
              media="screen">
        <link href="/resources/datepicker/css/datepicker.css" rel="stylesheet">

        <link href="/resources/css/docs.css" rel="stylesheet" media="screen">
        <link href="/resources/css/icanj.css" rel="stylesheet" media="screen">
        <link href="/resources/css/mobile.css" rel="stylesheet" media="screen">
        <link href="/resources/css/xtreme-lab-sliding-menu.css" rel="stylesheet" media="screen">
        

		
        <script type="text/javascript" src="/resources/js/jquery.js"></script>
        <script type="text/javascript" src="/resources/js/bootstrap.js"></script>
        <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script> -->
        <script type="text/javascript" src="/resources/js/jquery.dataTables.js"></script>
        <script type="text/javascript" src="/resources/js/jquery-validate.js"></script>
        <script type="text/javascript" src="/resources/js/jquery.printElement.min.js"></script>
        <script type="text/javascript" src="/resources/datepicker/js/bootstrap-datepicker.js"></script>
        <script type="text/javascript" src="/resources/js/icanj.js"></script>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
        <style type="text/css">
            /* Sticky footer styles
                  -------------------------------------------------- */
            html,body {
                height: 100%;
                /* The html and body elements cannot have any padding or margin. */
                padding-bottom: 40px;
            }

            /* Wrapper for page content to push down footer */
            #wrap {
                min-height: 100%;
                height: auto !important;
                height: 100%;
                /* Negative indent footer by it's height */
                margin-top: 20px;
                margin-right: auto;
                margin-bottom: 0px;
                margin-left: auto;
                padding-bottom: 40px;
            }

            /* Set the fixed height of the footer here */
            #footer {
                text-align: right;
                background-color: #f5f5f5;
                height: 40px;
            }

            /* Lastly, apply responsive CSS fixes as necessary */
        </style>

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
              <script src="../assets/js/html5shiv.js"></script>
            <![endif]-->

        <!-- Fav and touch icons -->

        <link rel="icanj-touch-icon-precomposed" sizes="114x114"
              href="/resources/img/icanj-touch-icon-114-precomposed.png">
        <link rel="icanj-touch-icon-precomposed" sizes="72x72"
              href="/resources/img/icanj-touch-icon-72-precomposed.png">
        <link rel="icanj-touch-icon-precomposed"
              href="/resources/img/icanj-touch-icon-57-precomposed.png">
        <link rel="shortcut icon" href="/resources/img/favicon.png">

    </head>
    <body>
        <div class="viewport">
            <div class="frame">
                <div class="view" >
                    <div class="navbar navbar-inverse navbar-fixed-top">
                        <div class="navbar-inner pull-left">
                            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target="#menu">
                            <!--<a id="leftMobileButton" type="button" class="btn btn-navbar" data-toggle="collapsed" data-target="#menu">-->
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <!--</a>-->
                        </div>
                        <div class="navbar-inner">
                            <div class="container-fluid">
                                <button type="button" class="btn btn-navbar" data-toggle="collapse"
                                        data-target="#subMenu">
                                    <span class="icon-bar"></span> <span class="icon-bar"></span> <span
                                        class="icon-bar"></span>
                                </button>

                                <a class="brand" href="/">India Christian Assembly</a>
                                <div id="subMenu" class="nav-collapse collapse">
                                    <ul class="nav">
                                        <li><a href="/"><i
                                                    class="icon-home icon-white"></i> Home</a></li>
                                        <li><a href="/About">About</a></li>
                                        <li><a href="#contact">Contact</a></li>
                                        <!--                            <li class="dropdown"><a class="dropdown-toggle"
                                                                                            data-toggle="dropdown"><i class="icon-user icon-white"></i> <%=SecurityContextHolder.getContext().getAuthentication().getName()%><b
                                                                                class="caret"></b></a>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a
                                                                                    href="/Directory/GetMemberProfile?personalProfile=true">Edit
                                                                                    My Profile</a></li>
                                                                            <li><a href="/j_spring_security_logout">Logout</a></li>
                                                                        </ul>
                                                                    </li>-->
                                        <li>
                                            <a href="/Directory/GetMemberProfile?personalProfile=true"><i class="icon-user icon-white"></i> <%=SecurityContextHolder.getContext().getAuthentication().getName()%>
                                            </a>
                                        </li>
                                        <li><a href="/j_spring_security_logout">Logout</a></li>
                                    </ul>
                                </div>
                                <!--/.nav-collapse -->
                            </div>
                        </div>
                    </div>
                </div>
                <body>
                    <div id="wrap">