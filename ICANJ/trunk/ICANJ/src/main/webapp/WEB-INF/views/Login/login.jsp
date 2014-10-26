<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Sign in &middot; ICANJ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <link href="/resources/css/bootstrap.css" rel="stylesheet" media="screen">
        <link href="/resources/css/bootstrap-responsive.css" rel="stylesheet" media="screen">
        <link href="/resources/css/docs.css" rel="stylesheet"	media="screen">
        <link href="/resources/css/icanj.css" rel="stylesheet" media="screen">
        <link href="/resources/css/login.css" rel="stylesheet" media="screen">

    </head>
    <body onload="$('#j_username').focus();">


        <div class="navbar navbar-inverse navbar-fixed-top">
<!--            <div class="navbar-inner" id="loginHeader">
                <div class="container-fluid pull-right">
                    <div class="btn-group">
                        <a class="btn btn-large btn-warning pull-right" href="/Public/Register/">
                            Register with ICANJ
                            <span class="caret"></span>
                        </a>
                    </div>
                </div>
            </div>-->

            <header class="jumbotron subhead">
                <div id="registerButton" class="container">
                    <div class="container-fluid pull-right">
                        <div class="btn-group">
                            <a class="btn btn-large btn-primary btn-warning pull-right" href="/Public/Register/">
                                Register with ICANJ
                            </a>
                        </div>
                    </div>
                </div>
                <div id="headerText" class="container">
                    <h1>my.icanj.org</h1>
                    <p class="lead">Welcome to India Christian Assembly of New Jersey Church Member Portal.</p>
                </div>
            </header>
            <div class="wrap">
                <div class="container">
                    <div class="row">
                        <div id="feature-list" class="span4 offset2">
                            <div class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src="/resources/img/mobile.gif">
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading">Mobile Friendly</h4>
                                    <p>Completely mobile friendly page.</p>
                                </div>
                            </div>
                            <div class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src="/resources/img/secure.png">
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading">Enterprise Security</h4>
                                    <p>Enterprise level security to keep your data safe.</p>
                                </div>
                            </div>
                            <div class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src="/resources/img/wallet.png">
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading">Consolidation</h4>
                                    <p>Enjoy access to your church data on your fingertips.</p>
                                </div>
                            </div>
                        </div>

                        <div class="span4">
                            <form class="form-signin" action="j_spring_security_check"
                                  method="post">
                                <h2 class="form-signin-heading">Please sign in</h2>
                                <c:if test="${not empty sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message}">
                                    <div class="alert" id="errorBox">
                                        <button type="button" class="close" data-dismiss="alert">×</button>
                                        ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
                                    </div>
                                </c:if>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="input-block-level" name="j_username"
                                               id="j_username" placeholder="Email address" required>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="password" class="input-block-level" name="j_password"
                                               id="j_password" placeholder="Password" required>
                                    </div>
                                </div>

                                <button class="btn btn-large btn-primary" type="submit">Sign
                                    in</button>
                                <span class="help-block pull-right">
                                    <a href="/Public/Register/ForgotPassword">Forgot password ?</a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /container -->
            <script type="text/javascript" src="/resources/js/jquery.js"></script>
            <script type="text/javascript" src="/resources/js/bootstrap.js"></script>
            <script type="text/javascript" src="/resources/js/jquery-validate.js"></script>
            <script type="text/javascript" src="/resources/js/login.js"></script>

    </body>

</html>
