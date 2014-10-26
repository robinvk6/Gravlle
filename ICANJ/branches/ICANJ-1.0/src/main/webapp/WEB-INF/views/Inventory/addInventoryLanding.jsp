<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html lang="en">

	<head>
		<jsp:include page="/WEB-INF/views/Core/header.jsp">
			<jsp:param name="name" value="sos" /></jsp:include>
		</head>

		<body>
			<div class="container-fluid">
				<div class="row-fluid">
				<jsp:include page="/WEB-INF/views/Core/sidebar.jsp">
					<jsp:param name="name" value="sos" /></jsp:include>
					<div class="span9">
						<!-- form -->
						<h3>Inventory Management</h3>

					<c:if test="${not empty alert}">
						<div class="alert ${alert.cssAlertClass}" id="errorBox">
							<button type="button" class="close" data-dismiss="alert">×</button>${alert.message}</div>
						</c:if>

				<ul class="nav nav-pills pull-right">
					<li><a href="#addInventoryModal" role="button"
                           data-toggle="modal"><i class="icon-plus-sign"></i> Add Inventory</a></li>
					<li><a href="#addInventoryGroupModal" role="button"
                           data-toggle="modal"><i class="icon-plus-sign"></i> Add Inventory Group</a></li>
					
				</ul>
				
								
				<!-- Inventory Table  -->
				
				<c:forEach items="${inventoryMap}" var="map">
				
				<h4>${map.key}</h4>		
				<div style='overflow: auto; max-height:300px;' >						
				<table class="table table-striped">
				<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Quantity</th>
				<th></th>
				</tr>
				<c:forEach items="${map.value}" var="inventory">
				
				<tr>
				<td>${inventory.inventoryName}</td>
				<td>${inventory.inventoryDescription}</td>
				<td>${inventory.inventoryCount}</td>
				<td><a href="#editInventoryModal" role="button" onclick="editInventory('${inventory.inventoryName}','${inventory.inventoryDescription}','${inventory.inventoryCount}','${inventory.inventoryPriceRange}','${inventory.inventoryGroupId}','${inventory.barCode}','${inventory.inventoryId}')"
                           data-toggle="modal"><i class="icon-edit"></i></a></td>
				</tr>
				</c:forEach>
				
				</table>
				</hr>
				</div>
				</c:forEach>
				
				<!--  -->

				<div id="addInventoryModal" class="modal hide fade">	
					<form action="/Admin/Inventory/AddUpdateInventory" method="post" id="receiptManagement">
					<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4>Add Inventory</h4>
                            </div>
					<div class="modal-body">
						<table class="table">
						<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryName">Inventory Name</label>
										<div class="controls">
											<input id="inventoryName" name="inventoryName" type="text" placeholder="Inventory Name"
														 data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Description</label>
										<div class="controls">
											<input type="text" id="inventoryDescription" name="inventoryDescription" placeholder="Inventory Description">
										</div>
									</div>
								</td>
								
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryCount">Quantity</label>
										<div class="controls">
											<input type="text" id="inventoryCount" name="inventoryCount" placeholder="Quantity">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkDate">Inventory Group</label>
										<div class="controls">
											<select id="inventoryGroupId" name="inventoryGroupId">
											<c:forEach items="${inventoryGroups}" var="inventoryGroup">
												<option value="${inventoryGroup.inventoryGroupId}">${inventoryGroup.inventoryGroupName}</option>
											</c:forEach>									
											</select>
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryPriceRange">Price/Price Range<em>(optional)</em></label>
										<div class="controls">
											<input type="text" id="inventoryPriceRange" name="inventoryPriceRange" placeholder="Price/Price Range">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="barCode">Inventory Bar Code<em>(optional)</em></label>
										<div class="controls">
											<input type="text" id="barCode" name="barCode" placeholder="Inventory Bar Code">
										</div>
									</div>
								</td>
							</tr>
						</table>
						</div>
						<div class="modal-footer">
						<button class="btn btn-primary">Save changes</button>
						</div>
					</form>
					</div>
					<!-- Form End -->
					
					<!-- Edit Inventory -->					
					<div id="editInventoryModal" class="modal hide fade">	
					<form action="/Admin/Inventory/UpdateInventory" method="post" id="receiptManagement">
					<input name="einventoryId" id="einventoryId" value="" type="hidden">
					<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4>Add Inventory</h4>
                            </div>
					<div class="modal-body">
						<table class="table">
						<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryName">Inventory Name</label>
										<div class="controls">
											<input id="einventoryName" name="einventoryName" type="text" placeholder="Inventory Name"
														 data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Description</label>
										<div class="controls">
											<input type="text" id="einventoryDescription" name="einventoryDescription" placeholder="Inventory Description">
										</div>
									</div>
								</td>
								
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryCount">Quantity</label>
										<div class="controls">
											<input type="text" id="einventoryCount" name="einventoryCount" placeholder="Quantity">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkDate">Inventory Group</label>
										<div class="controls">
											<select id="einventoryGroupId" name="einventoryGroupId">
											<c:forEach items="${inventoryGroups}" var="inventoryGroup">
												<option value="${inventoryGroup.inventoryGroupId}">${inventoryGroup.inventoryGroupName}</option>
											</c:forEach>									
											</select>
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryPriceRange">Price/Price Range<em>(optional)</em></label>
										<div class="controls">
											<input type="text" id="einventoryPriceRange" name="einventoryPriceRange" placeholder="Price/Price Range">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="barCode">Inventory Bar Code<em>(optional)</em></label>
										<div class="controls">
											<input type="text" id="ebarCode" name="ebarCode" placeholder="Inventory Bar Code">
										</div>
									</div>
								</td>
							</tr>
						</table>
						</div>
						<div class="modal-footer">
						<button class="btn btn-primary">Save changes</button>
						</div>
					</form>
					</div>
					<!--  -->

					
					<div id="addInventoryGroupModal" class="modal hide fade">
					<form action="/Admin/Inventory/AddUpdateInventoryGroup" method="post" id="receiptManagement">
					<div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">&times;</button>
                                <h4>Add Inventory Group</h4>
                            </div>
					<div class="modal-body">
					<table class="table">
						<tr>
								<td>
									<div class="control-group">
										<label class="control-label" for="inventoryName">Inventory Group Name</label>
										<div class="controls">
											<input id="inventoryGroupName" name="inventoryGroupName" type="text" placeholder="Inventory Group Name"
														 data-required="true">
										</div>
									</div>
								</td>
								<td>
									<div class="control-group">
										<label class="control-label" for="checkInfo">Inventory Group Description</label>
										<div class="controls">
											<input type="text" id="inventoryGroupDescription" name="inventoryGroupDescription" placeholder="Inventory Group Description">
										</div>
									</div>
								</td>
								</tr>
					</table>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary">Save changes</button>
					</div>
					</form>
					</div>

				</div>
				<!--/span-->
			</div>
			<!--/row-->
			<jsp:include page="/WEB-INF/views/Core/footer.jsp">
				<jsp:param name="name" value="sos" /></jsp:include>
		</div>
		
		<script>
		function editInventory(inventoryName,inventoryDescription,inventoryCount,inventoryPriceRange,inventoryGroupId,barCode,inventoryId){
			
			$("#einventoryName").attr({
				"value": inventoryName
			});
			
			$("#einventoryDescription").attr({
				"value": inventoryDescription
			});
			
			$("#einventoryCount").attr({
				"value": inventoryCount
			});
			
			$("#einventoryPriceRange").attr({
				"value": inventoryPriceRange
			});
			
			$("#einventoryGroupId").attr({
				"value": inventoryGroupId
			});
			
			$("#ebarCode").attr({
				"value": barCode
			});
			
			$("#einventoryId").attr({
				"value": inventoryId
			});
		}
		</script>
	
	</body>

</html>