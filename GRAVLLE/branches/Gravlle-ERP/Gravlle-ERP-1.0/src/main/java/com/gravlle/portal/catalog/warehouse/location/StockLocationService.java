package com.gravlle.portal.catalog.warehouse.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gravlle.portal.persistence.common.AbstractService;
import com.gravlle.portal.persistence.common.IOperations;

@Service
public class StockLocationService extends AbstractService<StockLocation> implements IStockLocationService{
	
	@Autowired
	private IStockLocationDao stockLocationDao;
	
	public StockLocationService() {
		super();
	}
	
	@Override
	protected IOperations<StockLocation> getDao() {
		return stockLocationDao;
	}

}
