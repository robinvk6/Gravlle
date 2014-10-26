package com.gravlle.portal.catalog.category;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import com.amazonservices.mws.products.model.Categories;
import com.amazonservices.mws.products.model.GetProductCategoriesForASINRequest;
import com.amazonservices.mws.products.model.GetProductCategoriesForASINResponse;
import com.gravlle.marketplace.amazon.factory.impl.GravlleMWSProductFactory;
import com.gravlle.portal.bootstrap.PersistenceXmlConfig;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceXmlConfig.class }, loader = AnnotationConfigContextLoader.class)
public class CatalogServiceTest {

	private static final Logger logger = LoggerFactory
			.getLogger(CatalogServiceTest.class);
	
	@Autowired
	private ICategoryService categoryService;

	
	@Test
	public void populateDBFromAmazon() {
		
		try {
			GetProductCategoriesForASINRequest request = new GetProductCategoriesForASINRequest();

			request.setMarketplaceId("ATVPDKIKX0DER");
		     
		    FileInputStream file = new FileInputStream(new File("/Users/robinvarghese/Documents/workspace-sts-3.2.0.RELEASE/Gravlle-ERP/src/test/resources/Workbook1-small.xls"));
		    //Get the workbook instance for XLS file 
		    XSSFWorkbook workbook = new XSSFWorkbook(file);
		 
		    //Get first sheet from the workbook
		    XSSFSheet sheet = workbook.getSheetAt(0);
		     
		    //Iterate through each rows from first sheet
		    Iterator<Row> rowIterator = sheet.iterator();
		    while(rowIterator.hasNext()) {
		        Row row = rowIterator.next();
		         
		       System.out.println(row.getCell(16)); 
		       
		       try {
		    	   request.setASIN(row.getCell(16).getStringCellValue());
			       GetProductCategoriesForASINResponse response = GravlleMWSProductFactory
							.getInstance().getGetProdutCategoriesForASINReqres()
							.reqRes(request);
			       System.out.println("Response - " + response.toXML());
			       System.out.println("Response - " + response.getGetProductCategoriesForASINResult().getSelf().get(0).getProductCategoryName());
			       List<Categories> categories = response.getGetProductCategoriesForASINResult().getSelf();
			       
			       for(Categories category : categories) {
			    	   persistCategory(category, null);
			       }
			       
				Thread.sleep(5000);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    }
		    file.close();
		    
		     
		} catch (FileNotFoundException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		}
	}
	
	private void persistCategory(Categories categories, Category child) {
		Category gravlleCategory = new Category();
		gravlleCategory.setLastUpdatedBy("gravlleAdmin");
		gravlleCategory.setName(categories.getProductCategoryName());
 	   if("Categories".equalsIgnoreCase(categories.getParent().getProductCategoryName())){
 		   if(categoryService.find("name", categories.getProductCategoryName())==null) {
 		   gravlleCategory.setRootCategory(true);
 		   categoryService.create(gravlleCategory);
 		   }
 	   }else {
 		  if(categoryService.find("name", categories.getProductCategoryName())==null) {
 	 		   gravlleCategory.setRootCategory(false);
 	 		   categoryService.create(gravlleCategory);
 		  }
 		  Category thisCategory = categoryService.findOne("name", categories.getProductCategoryName());
 		  
 		  if(child!=null) {
 			  child.setParent(thisCategory);
 			  categoryService.update(child);
 		  }
 		  
 		 persistCategory(categories.getParent(),thisCategory);
 	   }
	}
}
