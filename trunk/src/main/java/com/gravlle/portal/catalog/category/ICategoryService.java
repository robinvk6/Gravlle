package com.gravlle.portal.catalog.category;

import java.util.List;

import com.gravlle.portal.persistence.common.IOperations;
import com.gravlle.portal.templateEngine.GravlleTemplate;

public interface ICategoryService extends IOperations<Category>{
	
	public Category findOneInitializeAll(long id);
	public Category findOneInitializeAll(String parameter,Object value);
	public List<Category> getChildrenCategories(long id);
	public GravlleTemplate find(long id);
}
