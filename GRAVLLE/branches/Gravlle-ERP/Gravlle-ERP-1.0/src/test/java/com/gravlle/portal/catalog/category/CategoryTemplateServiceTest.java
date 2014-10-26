package com.gravlle.portal.catalog.category;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import com.gravlle.portal.bootstrap.PersistenceXmlConfig;
import com.gravlle.portal.templateEngine.CategoryTemplateService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceXmlConfig.class }, loader = AnnotationConfigContextLoader.class)
public class CategoryTemplateServiceTest {
	
	@Autowired
	private CategoryTemplateService categoryService;


	@Test
	public void populateDB() throws Exception {
		categoryService.populateCategories();
		categoryService.populateMisc();
	}
}
