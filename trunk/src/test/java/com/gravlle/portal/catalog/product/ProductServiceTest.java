package com.gravlle.portal.catalog.product;

import java.util.Set;
import java.util.UUID;

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
import org.springframework.util.Assert;

import com.gravlle.portal.bootstrap.PersistenceXmlConfig;
import com.gravlle.portal.catalog.category.Category;
import com.gravlle.portal.catalog.category.ICategoryService;
import com.gravlle.portal.catalog.product.inventory.IInventoryService;
import com.gravlle.portal.catalog.warehouse.Warehouse;
import com.gravlle.portal.common.services.IAddressService;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceXmlConfig.class }, loader = AnnotationConfigContextLoader.class)
public class ProductServiceTest {/*

	private static final Logger logger = LoggerFactory
			.getLogger(ProductServiceTest.class);

	@Autowired
	private IProductService productService;
	
	@Autowired
	private ICategoryService categoryService;
	
	@Autowired
	private IInventoryService inventoryService;
	
	@Autowired
	private IAddressService addressService;
	
	
	private GravlleProduct createAProductObject(){
		String uidString = UUID.randomUUID().toString();
		GravlleProduct product = new GravlleProduct();
		product.setName(uidString);
		product.setDescription("Test Descriptionygyug");
		product.setMsrp(1208.99);
		product.setEnabled(true);
		product.setMetaDescription("Meta Info");
		product.getProductAttributes().put("key1", "value1");
		product.getProductAttributes().put("key2", "value2");
		product.getCategories().add(categoryService.findOne("categoryName", "Test Category"));
		product.setQty(50.00);
		product.setShortDescription("Short DESC");
		product.setSku(uidString);
		product.setWeight(25.11);
		product.setUrlKey(uidString);
		
		return product;
	}
		
	@Test
	public void createAndDeleteProduct(){
		GravlleProduct product = createAProductObject();
		String name = product.getName();
		productService.create(product);
		
		GravlleProduct foundProduct = productService.findOne("name", name);
		Assert.notNull(foundProduct);
		productService.delete(foundProduct);
		
		foundProduct = productService.findOne("name", name);
		Assert.isNull(foundProduct);
	}
	
	@Test
	public void setAndGetCategoriesOfAProduct(){
		GravlleProduct product = createAProductObject();
		String name = product.getName();
		Set<Category> categories = product.getCategories();
		
		for(Category cat : categories){
			categoryService.create(cat);
		}
		
		productService.create(product);
		
		GravlleProduct foundProduct = productService.findOne("name", name);
		
		Assert.notEmpty(foundProduct.getCategories());
		
		productService.delete(product);
		for(Category cat : categories){
			categoryService.delete(cat);
		}
	}
	
	@Test
	public void setAndGetAttributesOfAProduct(){
		GravlleProduct product = createAProductObject();
		String name = product.getName();
		productService.create(product);
		
		GravlleProduct foundProduct = productService.findOne("name", name);
		
		Assert.notEmpty(foundProduct.getProductAttributes());
		
		productService.delete(product);
	}
	
	@Test
	public void testEqualsMethod(){
		GravlleProduct product = createAProductObject();
		String name = product.getName();
		productService.create(product);
		
		GravlleProduct firstFoundProduct = productService.findOne("name", name);
		GravlleProduct secondFoundProduct = productService.findOne("name", name);
		
		boolean areTheyEqual = firstFoundProduct.equals(secondFoundProduct);
		
		Assert.isTrue(areTheyEqual);
		
		productService.delete(product);
	}
	
	@Test(expected = Exception.class)
	public void canICreateTwoProductsWithTheSameSKU(){
		GravlleProduct product1 = createAProductObject();
		GravlleProduct product2 = createAProductObject();
				
		product1.setSku("This is the sku");
		product2.setSku("This is the sku");
		
		productService.create(product1);
		productService.create(product2);
	}	

	@Test
	public void asaveProduct(){
		for(int i =11 ;i<=100;i++) {
		String uidString = UUID.randomUUID().toString();
		Product product = new Product();
		product.setName(uidString);
		product.setDescription("Test Description");
		product.setCost(120.99);
		product.setEnabled(true);
		product.setMetaDescription("Meta Info");
		product.getProductAttributes().put("key1", "value1");
		for(int j =30 ; j<=50;j++) {
			product.getCategories().add(categoryService.findOne(j));
		}
		product.setQty(50.00);
		product.setShortDescription("Short DESC");
		product.setSku(uidString);
		product.setWeight(25.11);
		
		productService.create(product);
		}
		
	}
	
	@Test
	public void bgetByName() {
		Product product = productService.productInitializeAll("name", uidString);
		productId=product.getProductId();
		logger.info("Product Id is : " + productId);
		logger.info(product.toString());
		Assert.isTrue(product.getName().equals(uidString));
		}
	
	@Test
	public void cgetById() {
		Product product = productService.productInitializeAll(productId);
		System.out.println(product);
		Assert.isTrue(product.getName().equals(uidString));
		
	}
	
	
	
	@Test
	public void dupdateProduct() {
		Product product = productService.productInitializeAll(productId);
		product.getCategories().add(categoryService.findOne(30));
		product.getProductAttributes().put("key10", "value10");
		
		productService.update(product);
		product = productService.productInitializeAll(productId);
		Assert.isTrue(product.getProductAttributes().containsKey("key10"));
		Assert.isTrue(product.getCategories().size() ==1);
	}
	
	@Test
	public void edeleteProduct() {
		productService.delete(productService.findOne(productId));
		Assert.isNull(productService.findOne(productId));
	}
*/}
