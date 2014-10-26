package com.gravlle.portal.catalog.category;

import java.util.List;

import com.gravlle.portal.persistence.common.AbstractController;
import com.gravlle.portal.persistence.common.CoreResponse;
import com.gravlle.portal.persistence.common.IOperations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/services/catalog/category")
public class CategoryController extends AbstractController<Category>{
	
	private static final Logger logger = LoggerFactory
			.getLogger(CategoryController.class);
	
	@Autowired
	private ICategoryService categoryService;
	
   
	@Override
	protected Class<Category> getClazz() {
		return Category.class;
	}

	@Override
	protected IOperations<Category> getService() {
		return this.categoryService;
	}

	@Override
	protected Logger getLogger() {
		return this.logger;
	}

	@Override
	@RequestMapping(value = "/save", method = RequestMethod.PUT)
	@ResponseBody
	protected CoreResponse create(Category entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	protected CoreResponse update(Category entity) {
		// TODO Auto-generated method stub
		return null;
	}
	
	 
    @RequestMapping("/tree/{id}")
    @ResponseBody
    public List<Category> getChildrenForParent(@PathVariable long id) {
        return categoryService.getChildrenCategories(id);
    }

    @RequestMapping("/tree")
    @ResponseBody
    public List<Category> getChildrenForParent() {
        return categoryService.getChildrenCategories(0);
    }
	
}

