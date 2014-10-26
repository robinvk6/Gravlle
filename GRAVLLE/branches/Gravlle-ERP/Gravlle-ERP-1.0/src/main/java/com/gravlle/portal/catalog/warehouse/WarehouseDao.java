package com.gravlle.portal.catalog.warehouse;

import org.springframework.stereotype.Repository;

import com.gravlle.portal.persistence.common.AbstractHibernateDao;

@Repository(value="warehouseDao")
public class WarehouseDao extends  AbstractHibernateDao<Warehouse> implements IWarehouseDao{
	public WarehouseDao() {
		super();
		setClazz(Warehouse.class);
	}
}
