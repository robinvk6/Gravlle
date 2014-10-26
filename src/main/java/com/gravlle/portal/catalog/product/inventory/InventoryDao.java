package com.gravlle.portal.catalog.product.inventory;

import org.springframework.stereotype.Repository;

import com.gravlle.portal.persistence.common.AbstractHibernateDao;

@Repository(value="inventoryDao")
public class InventoryDao extends AbstractHibernateDao<Inventory> implements IInventoryDao{
	
	public InventoryDao() {
		super();
		setClazz(Inventory.class);
	}

}
