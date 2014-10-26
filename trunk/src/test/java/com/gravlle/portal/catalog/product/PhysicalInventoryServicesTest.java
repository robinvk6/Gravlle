package com.gravlle.portal.catalog.product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import org.springframework.util.Assert;

import com.gravlle.portal.bootstrap.PersistenceXmlConfig;
import com.gravlle.portal.catalog.category.Category;
import com.gravlle.portal.catalog.category.ICategoryService;
import com.gravlle.portal.catalog.product.inventory.IInventoryService;
import com.gravlle.portal.catalog.product.inventory.Inventory;
import com.gravlle.portal.catalog.warehouse.IWarehouseService;
import com.gravlle.portal.catalog.warehouse.Warehouse;
import com.gravlle.portal.catalog.warehouse.location.IStockLocationService;
import com.gravlle.portal.catalog.warehouse.location.StockLocation;
import com.gravlle.portal.common.domain.Address;
import com.gravlle.portal.common.services.IAddressService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceXmlConfig.class }, loader = AnnotationConfigContextLoader.class)
public class PhysicalInventoryServicesTest {/*
	
	@Autowired
	private IProductService productService;
	
	@Autowired
	private ICategoryService categoryService;
	
	@Autowired
	private IInventoryService inventoryService;
	
	@Autowired
	private IAddressService addressService;
	
	@Autowired
	private IWarehouseService warehouseService;
	
	@Autowired
	private IStockLocationService stockLocationService;
	
	private GravlleProduct createAProductObject(String name, Set<Category> categories){
		String uidString = UUID.randomUUID().toString();
		GravlleProduct product = new GravlleProduct();
		product.setName(name);
		product.setDescription("Test Descriptionygyug");
		product.setCost(1208.99);
		product.setEnabled(true);
		product.setMetaDescription("Meta Info");
		product.getProductAttributes().put("key1", "value1");
		product.getProductAttributes().put("key2", "value2");
		product.setQty(50.00);
		product.setShortDescription("Short DESC");
		product.setSku(uidString);
		product.setWeight(25.11);
		product.setUrlKey(uidString);
		
		product.setCategories(categories);
		
		return product;

	}
	
	private Inventory createAnInventoryObject(GravlleProduct product, Set<StockLocation> locations){
		Inventory inventory = new Inventory();
		inventory.setProduct(product);
		inventory.setQty(100.00);
		inventory.setBackorders(false);
		inventory.setIs_in_stock(true);
		inventory.setStockLocations(locations);
		
		return inventory;
	}
	
	private Warehouse createAWarehouseObject(String name, Address address){
		Warehouse warehouse = new Warehouse();
		warehouse.setAddress(address);
		warehouse.setName(name);
		
		return warehouse;
	}
	
	private StockLocation createAStockLocationObject(Warehouse warehouse){
		StockLocation location = new StockLocation();
		location.setWarehouse(warehouse);
		location.setAisle("Aisle3");
		location.setSection("section3");
		location.setBin("Bin3");
		
		return location;
	}
	
	private Category createACategoryObject(String name){
		Category category = new Category();
		category.setName(name);	
		category.setRootCategory(true);
		
		return category;
	}
	
	private Address createAnAddressObject(String cityName){
		Address address = new Address();
		address.setStreetAddress("16 Coin St");
		address.setCity(cityName);
		address.setState("NJ");
		address.setCountry("USA");
		address.setZip("07621");
		
		return address;
	}
	
	//THIS TEST DOES NOT PASS
	@Test
	public void createACompleteInventoryProductObject(){
		
		//create the pojos of a compelte product and inventory
		
		Address address = createAnAddressObject("Burgerfield");
		Warehouse warehouse = createAWarehouseObject("My first warehouse", address);
		StockLocation location = createAStockLocationObject(warehouse);
		
		Category category = createACategoryObject("pets");
		Set<Category> listOfCategories = new HashSet<Category>();
		listOfCategories.add(category);
		GravlleProduct product = createAProductObject("kitty", listOfCategories);
		
		Set<StockLocation> listOfLocations = new HashSet<StockLocation>();
		listOfLocations.add(location);
		Inventory inventory = createAnInventoryObject(product, listOfLocations);
		
		//Save all this stuffs in the database
		
		addressService.create(address);
		warehouseService.create(warehouse);
		stockLocationService.create(location);
		categoryService.create(category);
		productService.create(product);
		inventoryService.create(inventory);
		
		//Get them all back
		GravlleProduct foundProduct = productService.findOne("name", "kitty");
		
		Inventory foundInventory = inventoryService.findOne("product", foundProduct);
		
		//Asset that everything's not empty or null
		
		Assert.notNull(foundInventory);
		Assert.notNull(foundInventory.getProduct());
		
		Set<StockLocation> foundLocations = foundInventory.getStockLocations();
		Assert.notEmpty(foundLocations);
		
		Iterator<StockLocation> iter = foundLocations.iterator();
		StockLocation firstFoundLocation = iter.next();
		Assert.notNull(firstFoundLocation);
		
		Assert.notNull(firstFoundLocation.getWarehouse());
		
		Assert.notNull(firstFoundLocation.getWarehouse().getAddress());
		
		//Delete it all once again - so we're back where we started
		
		addressService.delete(address);
		warehouseService.delete(warehouse);
		stockLocationService.delete(location);
		categoryService.delete(category);
		productService.delete(product);
		inventoryService.delete(inventory);
		
	}
	
*/}
