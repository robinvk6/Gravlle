package com.gravlle.portal.templateEngine;

import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gravlle.marketplace.amazon.annotations.GravlleRootAmazonCategory;
import com.gravlle.portal.catalog.category.Category;
import com.gravlle.portal.catalog.category.ICategoryDao;

@Transactional
@Service
public class CategoryTemplateService {
	
	@Autowired
	private CategoryTemplateGenerator categoryTemplateGenerator;
	
	@Autowired
	private ICategoryDao categoryDao;
	
	public void populateCategories() {
		System.out.println("Starting");
		ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(
				false);
		scanner.addIncludeFilter(new AnnotationTypeFilter(
				GravlleRootAmazonCategory.class));

		for (BeanDefinition bd : scanner
				.findCandidateComponents("com.gravlle.marketplace.amazon.feed.domain")) {
			System.out.println(bd.getBeanClassName());
			Class clazz = null;
			try {
			clazz = Class.forName(bd.getBeanClassName());
				ObjectMapper objectMapper = new ObjectMapper();

				Map<String, String> categories = categoryTemplateGenerator
				.populate(clazz);
				
				//Step 1 : Persist All Categories with Product Type
				
				GravlleRootAmazonCategory gravlleRootAmazonCategory = (GravlleRootAmazonCategory) clazz.getAnnotation(GravlleRootAmazonCategory.class);
				System.out.println("Creating category " + gravlleRootAmazonCategory.name());
				Category category = new Category();
				category.setName(gravlleRootAmazonCategory.name());
				category.setParent(null);
				category.setRootCategory(true);
				category.setLastUpdatedBy("gravlle");
				
				categoryDao.create(category);
				
				Category parent = categoryDao.findOne("name", category.getName());
				
				for(Entry<String, String> entry : categories.entrySet()){
					persistCategories(parent, entry.getKey(), entry.getValue(),false);
				}
				
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				System.err.println(clazz.getSimpleName() +" - "+e1.getMessage());
			} 
		}
	}
	
	public void populateMisc() throws Exception{
		//Step 2 Persist Misc Category
		
		Map<String,String> miscMap = categoryTemplateGenerator.generateMiscTemplate();
		persistCategories(null,"Miscellaneous",miscMap.get("Miscellaneous"),true);
	}
	
	private void persistCategories(Category parent, String subCategory, String json, boolean root){
		System.out.println("Creating subcategory " + subCategory);
		String[] sampleArray = subCategory.split("(?<!(^|[A-Z]))(?=[A-Z])|(?<!^)(?=[A-Z][a-z])");
		String newStringName  = StringUtils.join(sampleArray," ");
		Category category = new Category();
		
		category.setName(WordUtils.capitalizeFully(newStringName));
		category.setParent(parent);
		category.setRootCategory(root);
		category.setLastUpdatedBy("gravlle");
		
		GravlleTemplate  gravlleTemplate = new GravlleTemplate();
		gravlleTemplate.setName(WordUtils.capitalizeFully(newStringName));
		gravlleTemplate.setJsonString(json);
		
		category.setTemplate(gravlleTemplate);
		categoryDao.create(category);
	}
}
