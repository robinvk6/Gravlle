package com.gravlle.portal.catalog.category;

import com.gravlle.portal.persistence.common.IOperations;
import com.gravlle.portal.templateEngine.GravlleTemplate;

public interface ICategoryDao extends IOperations<Category>{
	
	public Category categoryInitializeAll(long id);
	public Category categoryInitializeAll(String parameter,Object value);
	public GravlleTemplate find(long id);
	
}
