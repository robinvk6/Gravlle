package com.gravlle.portal.catalog.warehouse.location;

import org.springframework.stereotype.Repository;

import com.gravlle.portal.persistence.common.AbstractHibernateDao;

@Repository(value="inventoryLocationDao")
public class StockLocationDao extends AbstractHibernateDao<StockLocation> implements IStockLocationDao{
	public StockLocationDao() {
		super();
		setClazz(StockLocation.class);
	}
}
