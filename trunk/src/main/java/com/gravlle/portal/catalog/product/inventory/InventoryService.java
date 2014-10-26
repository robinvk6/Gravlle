package com.gravlle.portal.catalog.product.inventory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gravlle.portal.catalog.warehouse.IWarehouseDao;
import com.gravlle.portal.catalog.warehouse.Warehouse;
import com.gravlle.portal.catalog.warehouse.location.IStockLocationDao;
import com.gravlle.portal.catalog.warehouse.location.StockLocation;
import com.gravlle.portal.persistence.common.AbstractService;
import com.gravlle.portal.persistence.common.IOperations;

@Service(value="inventoryService")
public class InventoryService extends AbstractService<Inventory> implements IInventoryService{

	
	@Autowired
	private IInventoryDao inventoryDao;
	
	public InventoryService() {
		super();
	}

	@Override
	protected IOperations<Inventory> getDao() {
		return inventoryDao;
	}

}

	