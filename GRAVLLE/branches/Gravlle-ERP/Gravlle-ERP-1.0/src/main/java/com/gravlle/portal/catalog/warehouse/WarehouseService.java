package com.gravlle.portal.catalog.warehouse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gravlle.portal.persistence.common.AbstractService;
import com.gravlle.portal.persistence.common.IOperations;

@Service
public class WarehouseService extends AbstractService<Warehouse> implements IWarehouseService{
	
	@Autowired
	private IWarehouseDao warehouseDao;
	
	public WarehouseService() {
		super();
	}

	@Override
	protected IOperations<Warehouse> getDao() {
		return warehouseDao;
	}

}
