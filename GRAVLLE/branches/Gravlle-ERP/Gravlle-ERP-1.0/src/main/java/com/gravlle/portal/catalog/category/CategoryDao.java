package com.gravlle.portal.catalog.category;

import org.springframework.stereotype.Repository;

import com.gravlle.portal.persistence.common.AbstractHibernateDao;
import com.gravlle.portal.templateEngine.GravlleTemplate;

@Repository(value="categoryDao")
public class CategoryDao extends AbstractHibernateDao<Category> implements ICategoryDao{
	
	public CategoryDao() {
		super();
		setClazz(Category.class);
	}

	@Override
	public Category categoryInitializeAll(long id) {
		Category category = findOne(id);
		return category;
	}

	@Override
	public Category categoryInitializeAll(String parameter,Object value) {
		Category category = findOne(parameter, value);
		return category;
	}

	@Override
	public void delete(Category entity) {
		// TODO Auto-generated method stub
		super.delete(entity);
	}
	
	public GravlleTemplate find(long id){
		return (GravlleTemplate) getCurrentSession().get(GravlleTemplate.class, id);
	}

}
