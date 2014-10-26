<!DOCTYPE html>
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
        <h3> Welcome to my.icanj.org !!!</h3>
	<p><strong>my.icanj.org</strong> is an ICANJ members only website for managing membership, pledges & donations, tithing, and resource scheduling. 
	 Our users are supported by an open-source community of IT people who volunteer their time and energy to make this technology available to all members of our church.</p>
<h4>Core Features and Functions:</h4>

<dl>
  <dt>Directory</dt>
  <dd>This feature of the website gives you Family and individual information of church members with highly flexible profiles.</dd>
  
  <dt>Personal Profile</dt>
  <dd>This feature allows you to add and update your family related information and makes it available for other users realtime.</dd>
  
  <dt>My Tithing Info</dt>
  <dd>This feature provides a view into your tithing and contributions. Now you can track your payments realtime.Historical tithing data will soon be available on this page.</dd>
  
</dl>

<h4>Core Admininistration Functionalities:</h4>

<dl>
  <dt>People & Families</dt>
  <dd>Individuals make up the church and in my.icanj.org everyone is part of a family. This section allows effective on-boarding of a new family to the church.</dd>
  
  <dt>Pledges and Payments</dt>
  <dd>Pledges and Payments are tracked for each fiscal year, with automated support for reminder letters. There is also automated support for generating donation acknowledgement letters for tax purposes based on the calendar year.</dd>
  
  <dt>Reporting</dt>
  <dd>my.icanj.org has a number of built-in reports to provide a snapshot of the users data, income & expenses and fiscal year reporting.</dd>
  
</dl>

        </div><!--/span-->
      </div><!--/row-->

      <hr>

	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>

    </div><!--/.fluid-container-->

  </body>
</html>
