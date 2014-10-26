package com.gravlle.portal.templateEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.gravlle.portal.catalog.category.CategoryDao;
import com.gravlle.portal.catalog.category.ICategoryService;

@Controller
@RequestMapping("/services/template")
public class TemplateEngineController {
	
	@Autowired
	private ICategoryService categoryService;
	
	@RequestMapping(value= "/new",method = RequestMethod.GET)
	public String newTemplate() {
		return "/FormBuilder/createTemplate";
	}

	@RequestMapping(value= "/save",method = RequestMethod.POST)
	public String saveTemplate(@RequestParam String templateName,
			@RequestParam String templateJSON) {
		return "/FormBuilder/createTemplate";
	}
	
	

}
