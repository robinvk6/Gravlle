package com.gravlle.portal.catalog.product;

import com.gravlle.portal.persistence.common.IOperations;

public interface IProductDao extends IOperations<GravlleProduct>{
	
	public GravlleProduct productInitializeAll(long id);
	public GravlleProduct productInitializeAll(String parameter,Object value);

}
