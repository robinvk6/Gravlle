package com.gravlle.portal.catalog.product;

import com.gravlle.portal.persistence.common.IOperations;

public interface IProductService extends IOperations<GravlleProduct> , IProductLookup{
	
	public GravlleProduct productInitializeAll(long id);
	public GravlleProduct productInitializeAll(String parameter,Object value);

}
