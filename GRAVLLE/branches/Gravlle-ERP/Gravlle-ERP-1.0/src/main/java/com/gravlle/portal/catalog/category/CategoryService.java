package com.gravlle.portal.catalog.category;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gravlle.portal.persistence.common.AbstractService;
import com.gravlle.portal.persistence.common.IOperations;
import com.gravlle.portal.templateEngine.GravlleTemplate;

@Transactional
@Service
public class CategoryService extends AbstractService<Category> implements
		ICategoryService {

	@Autowired
	private ICategoryDao categoryDao;

	public CategoryService() {
		super();
	}

	@Override
	protected IOperations<Category> getDao() {
		return categoryDao;
	}

	@Override
	@Transactional
	public Category findOneInitializeAll(long id) {
		return categoryDao.categoryInitializeAll(id);
	}

	@Override
	@Transactional
	public Category findOneInitializeAll(String parameter, Object value) {
		return categoryDao.categoryInitializeAll(parameter, value);
	}

	@Override
	public List<Category> getChildrenCategories(long id) {
		Long parent = id;
		if (parent == null || parent == 0) {
			return categoryDao.find("rootCategory", true);
		} else {
			Category category = categoryDao.findOne(id);
			if (category != null) {
				return categoryDao.find("parent", category);
			} else {
				return null;
			}
		}
	}
	
	public GravlleTemplate find(long id){
		return categoryDao.find(id);
	}

}
