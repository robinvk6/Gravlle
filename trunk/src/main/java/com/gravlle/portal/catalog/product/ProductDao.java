package com.gravlle.portal.catalog.product;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Repository;

import com.gravlle.portal.persistence.common.AbstractHibernateDao;

@Repository(value="productDao")
public class ProductDao extends AbstractHibernateDao<GravlleProduct> implements IProductDao{

	public ProductDao() {
		super();
		setClazz(GravlleProduct.class);
	}
	
	@Override
	public GravlleProduct productInitializeAll(long id) {
		GravlleProduct product = findOne(id);
		Hibernate.initialize(product.getCategories());
		Hibernate.initialize(product.getProductAttributes());
		return product;
	}

	@Override
	public GravlleProduct productInitializeAll(String parameter, Object value) {
		GravlleProduct product = findOne(parameter,value);
		Hibernate.initialize(product.getCategories());
		Hibernate.initialize(product.getProductAttributes());
		return product;
	}

}
