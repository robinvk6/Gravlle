package com.gravlle.portal.catalog.category;

import java.util.List;

import org.joda.time.LocalTime;
import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import com.gravlle.portal.bootstrap.PersistenceXmlConfig;
import com.gravlle.portal.catalog.product.IProductService;
import com.gravlle.portal.catalog.product.inventory.IInventoryService;
import com.gravlle.portal.catalog.product.inventory.Inventory;
import com.gravlle.portal.catalog.warehouse.IWarehouseService;
import com.gravlle.portal.catalog.warehouse.Warehouse;
import com.gravlle.portal.catalog.warehouse.location.IStockLocationService;
import com.gravlle.portal.catalog.warehouse.location.StockLocation;
import com.gravlle.portal.common.services.IAddressService;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceXmlConfig.class }, loader = AnnotationConfigContextLoader.class)
public class InventoryServiceTest {
	
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
	
	@Test
	public void createWarehouse(){
		
		Warehouse warehouse = new Warehouse();
		warehouse.setAddress(addressService.findOne(1));
		warehouse.setName("Test Warehouse 1");
		warehouse.setEmail("test@test.com");
		warehouse.setPhone("123456789");
		warehouse.setWarehouseCloseTime("08:00");
		warehouse.setWarehouseOpenTime("22:00");
		
		warehouseService.create(warehouse);
		
		Warehouse warehouse2 = warehouseService.findOne("address", addressService.findOne(1));
		System.out.println(warehouse2);
		Assert.assertTrue(warehouse2.getName().equals(warehouse.getName()));
		
	}
	
	@Test
	public void listWarehouses(){
		List<Warehouse> list = warehouseService.findAll();
		System.out.println(list);
		Assert.assertTrue(list.size()>=1);
	}
	
/*	@Test
	public void createInventory(){
		StockLocation location = new StockLocation();
		location.setWarehouse(warehouseService.findOne("address", addressService.findOne(201)));
		location.setAisle("Aisle3");
		location.setSection("section3");
		location.setBin("Bin3");
		
		Inventory inventory = new Inventory();
		inventory.setProduct(productService.findOne(1));
		inventory.setQty(100.00);
		inventory.setBackorders(false);
		inventory.setIs_in_stock(true);
	//	inventory.getStockLocations().add(location);
		inventory.getStockLocations().add(stockLocationService.findOne(1));
		
		inventoryService.create(inventory);
		
		Inventory inventory2 = inventoryService.findOne("product", productService.findOne(1));
		Assert.assertNotNull(inventory2);
	}*/
	
/*	@Test
	public void createWareHouseLocation() {
		StockLocation location = new StockLocation();
		location.setWarehouse(warehouseService.findOne("address", addressService.findOne(201)));
		location.setAisle("Aisle1");
		location.setSection("section1");
		location.setBin("Bin1");
		
		stockLocationService.create(location);
		
		StockLocation location2 = new StockLocation();
		location2.setWarehouse(warehouseService.findOne("address", addressService.findOne(201)));
		location2.setAisle("Aisle2");
		location2.setSection("section2");
		location2.setBin("Bin2");
		
		stockLocationService.create(location2);
	}*/


}
