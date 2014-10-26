package com.gravlle.portal.catalog.product;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gravlle.portal.catalog.warehouse.WarehouseController;
import com.gravlle.portal.persistence.common.AbstractController;
import com.gravlle.portal.persistence.common.CoreResponse;
import com.gravlle.portal.persistence.common.IOperations;

@Controller
@RequestMapping("/services/catalog/product")
public class ProductController extends AbstractController<GravlleProduct>{
	
	@Autowired
	private IProductService productService;
	
	private static final Logger logger = LoggerFactory.getLogger(WarehouseController.class);

	@Override
	protected Class<GravlleProduct> getClazz() {
		return GravlleProduct.class;
	}

	@Override
	protected IOperations<GravlleProduct> getService() {
		return productService;
	}

	@Override
	protected Logger getLogger() {
		return logger;
	}

	@Override
	@RequestMapping(value = "/save", method = RequestMethod.PUT)
	@ResponseBody
	protected CoreResponse create(GravlleProduct entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	protected CoreResponse update(GravlleProduct entity) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@RequestMapping(value = "/lookup/{type}/{id}", method = RequestMethod.GET, produces="application/json")
	@ResponseBody
	protected Map<String,ProductLookupResponse> lookup(@PathVariable String type, @PathVariable String id) {
		try{
		return this.productService.getMatchingProduct(id, StandardProductIdType.valueOf(type));
		}catch (Exception e){
			this.logger.error(e.getMessage(),e);
			return null;
		}
	}

}
