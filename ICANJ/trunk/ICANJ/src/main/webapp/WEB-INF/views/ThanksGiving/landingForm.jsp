<!DOCTYPE html>
<html lang="en">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <head>
    <jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
	</jsp:include>
	<script type="text/javascript">
	var reserved = false;
	function validateBachelor(isReserved){
		if(isReserved == 'true'){
			reserved=true;
		}
	}
	
	function validate(){
		if(reserved){
			alert("This item is reserved for Single/Bachelor members");
			return false;
		}else{
			
		}
	}
	</script>

</head>

  <body>

    <div class="container-fluid">
      <div class="row-fluid">
  <jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>


        <div class="span9">
	    <h3>Watch Night Menu Selection</h3>
	    <c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>${alert.message}</div>
						</c:if>
		<div class="span3">				
				<form onsubmit="return confirm('Do you want to select this item?');" action="/ThanksGiving/AddItem" method="post"
					id="receiptManagement">
					<h4>Please Select your Item</h4>
					
					<div class="control-group">
						<label class="control-label" for="item">Menu Item</label>
						<div class="controls">
							<select name="item" required>
							<c:forEach items="${items}" var="item">
								<option value='${item.itemId}'> ${item.itemName}</option>	
								</c:forEach>							
							</select>
						</div>
					</div>
					
					<div class="control-group">
						<label class="control-label" for="parkingInfo">Additional
							Comments</label>
						<div class="controls">
							<textarea rows="5" name="comments" maxlength="150"
								placeholder="Additional Comments"></textarea>
						</div>
					</div>
					<div class="form-actions">
							<button type="submit" class="btn btn-primary">Select Item</button>
						
						</div>
				</form>
				</div>
				<div class="span6 hero-unit">
				<h4>Your Family's Items</h4>
				<table class="table table-condensed">
				<tr>
				<th>Item</th>
				<th>Comments</th>
				<th>Last Updated at</th>
				<th></th>
				</tr>
				<c:forEach items="${personal}" var="item">
				<tr>
				<td>${item.item.itemName}</td>
				<td>${item.comment}</td>
				<td>${item.date}</td>
				<td><a href="/ThanksGiving/DeleteItem/${item.id}"
									 type="button" onclick="return confirm('Do you really want to delete this item?');" class="btn btn-small btn-danger">Delete Item</a></td>
				</tr>
				</c:forEach>							
				</table>
				</div>
			</div><!--/span-->
			<div class="span9">
				<h4>Other Selected Items</h4>
				<table class="table table-bordered">
				<tr>
				<th>Family Name</th>
				<th>Item</th>
				<th>Comments</th>
				<th>Last Updated at</th>
				</tr>
				<c:forEach items="${pickedItems}" var="item">
				<tr>
				<td>${item.family.familyName}</td>
				<td>${item.item.itemName}</td>
				<td>${item.comment}</td>
				<td>${item.date}</td>
				</tr>
				</c:forEach>							
				</table>
				</div>
      </div><!--/row-->

      <hr>

	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>

    </div><!--/.fluid-container-->

  </body>
</html>
