<!DOCTYPE html>
<html>

<jsp:include page="/WEB-INF/views/Core/header.jsp">
	<jsp:param name="name" value="sos" />
</jsp:include>

<body onload="testDiv()">

	<div id="wrapper">


		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<h1 class="page-header">Warehouse Management</h1>
					<div class="panel panel-default">
						<div class="panel-heading">Create New Warehouse</div>
						<div class="panel-body">
							<div class="row">
								<div class="col-lg-6">
									<form id="warehouse">
										<div class="form-group">
											<label for="warehousename">Warehouse Name</label> <input
												type="text" class="form-control" id="name"
												name="name" placeholder="Enter Warehouse Name">
										</div>
										<div class="form-group">
											<label for="phone">Phone</label> <input type="tel"
												class="form-control" id="phone" name="phone"
												placeholder="Enter Warehouse Phone number">
										</div>
										<div class="form-group">
											<label for="email">Email</label> <input type="email"
												class="form-control" id="email" name="email"
												placeholder="Enter Warehouse Email">
										</div>
										<div class="form-group">
											<label for="warehouseOpenTime">Open Time</label> <input
												type="time" class="form-control" id="warehouseOpenTime"
												name="warehouseOpenTime"
												placeholder="Enter Warehouse Open Time">
										</div>
										<div class="form-group">
											<label for="warehouseCloseTime">Close Time</label> <input
												type="time" class="form-control" id="warehouseCloseTime"
												name="warehouseCloseTime"
												placeholder="Enter Warehouse Close Time">
										</div>
										<a class="btn btn-default"
											onclick="buildForm()">Submit</a>
									</form>
								</div>
								<!-- /.col-lg-6 (nested) -->
								<div class="col-lg-6">
									<form id="address">
										<div class="form-group">
											<label for="streetAddress">Street Address</label> <input
												type="text" class="form-control" id="streetAddress"
												name="streetAddress" placeholder="Enter Street Address">
										</div>
										<div class="form-group">
											<label for="city">City</label> <input type="tel"
												class="form-control" id="city" name="city"
												placeholder="Enter City">
										</div>
										<div class="form-group">
											<label for="state">State</label> <select id="state"
												class="form-control" name="state">
												<option value="NJ">New Jersey</option>
												<option value="NY">New York</option>
											</select>
										</div>
										<div class="form-group">
											<label for="country">Country</label> <select id="country"
												class="form-control" name="country">
												<option value="USA">USA</option>
											</select>
										</div>
										<div class="form-group">
											<label for="zip">Zip</label> <input type="text"
												class="form-control" id="zip" name="zip"
												placeholder="Enter Zip">
										</div>

									</form>

								</div>
								<!-- /.col-lg-6 (nested) -->
							</div>
							<!-- /.row (nested) -->
						</div>
						<!-- /.panel-body -->
						<div class="panel-heading">Warehouses</div>
						<div class="panel-body" id="warehouseList">
						</div>
					</div>

				</div>

			</div>
			<!-- /.row -->
		</div>

        <div id="testDiv"></div>

		<!-- /#page-wrapper -->

	</div>

	<jsp:include page="/WEB-INF/views/Core/footer.jsp">
		<jsp:param name="name" value="sos" />
	</jsp:include>

	<script type="text/javascript">
		
		function buildForm() {
			$('#loading-indicator').show();			
			var obj = {};
			obj= $('form#warehouse').serializeObject();
			obj.address = $('form#address').serializeObject();
			obj.warehouse_id=null;
			obj.stockLocations=null;
			console.log(JSON.stringify(obj));
			GRAVLLE_ERP.publishRequest("PUT","${pageContext.request.contextPath}/services/catalog/warehouse/save",JSON.stringify(obj),onSuccessData);
		}
		
		function onSuccessData(data){
			console.log(data);
			loadWarehouseData();
		}
		
		function loadWarehouseData(){
			GRAVLLE_ERP.publishRequest("GET","${pageContext.request.contextPath}/services/catalog/warehouse/list",null,onWarehouseData);
		}
		
		function onWarehouseData(warehouses){
			if(warehouses){
				var html = "<table class='table table-striped'><tr><th>Warehouse Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Open Time</th><th>Close Time</th></tr>";
				var rowshtml="";
				for(var i=0; i<warehouses.length;i++){
					rowshtml += "<tr><td>"+warehouses[i].name+"</td>"+
					"<td>"+warehouses[i].phone+"</td>"+
					"<td>"+warehouses[i].email+"</td>"+
					"<td>"+warehouses[i].address.streetAddress +"," + warehouses[i].address.city+"</td>"+
					"<td>"+warehouses[i].warehouseOpenTime+"</td>"+
					"<td>"+warehouses[i].warehouseCloseTime+"</td></tr>";
				}
				html = html +rowshtml + "</table>";

                $('#warehouseList').html(html);
            }
		}
        function testDiv() {
        	GRAVLLE_CATEGORY_TREE.getTree({
                "div": "testDiv",
                "callbackFn": function(text){
                    console.log( " Inside Application : " + text);
                }
            });
        }
	</script>
</body>

</html>
