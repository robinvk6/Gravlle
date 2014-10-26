package com.gravlle.portal.catalog.warehouse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gravlle.portal.persistence.common.AbstractController;
import com.gravlle.portal.persistence.common.CoreResponse;
import com.gravlle.portal.persistence.common.IOperations;

@Controller
@RequestMapping("/services/catalog/warehouse")
public class WarehouseController extends AbstractController<Warehouse>{
	
	private static final Logger logger = LoggerFactory.getLogger(WarehouseController.class);
	
	@Autowired
	private IWarehouseService warehouseService;

	@Override
	protected IOperations<Warehouse> getService() {		
		return warehouseService;
	}


	@Override
	protected Logger getLogger() {
		return this.logger;
	}


	@Override
	protected Class<Warehouse> getClazz() {		
		return Warehouse.class;
	}
	
	@RequestMapping(value= "/save",method = RequestMethod.PUT)
	public @ResponseBody CoreResponse create(@RequestBody Warehouse body) {		
		CoreResponse coreResponse = new CoreResponse();
		try {
			getLogger().debug("Save Entity Request for | " + body);
			warehouseService.create(body);
			coreResponse.setMessage("SUCCESS");
			getLogger().info("Created new Entity | " + body);
		} catch (Exception e) {
			getLogger().error("Exception Creating Entity | "+e);
			coreResponse.setMessage("Exception Creating Entity | "+e.getMessage());
		}
		return coreResponse;
	}


	@Override
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	protected CoreResponse update(Warehouse entity) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
