package com.gravlle.portal.common.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.gravlle.portal.common.domain.Address;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PersistenceXmlConfig.class }, loader = AnnotationConfigContextLoader.class)
public class AddressServiceTest {
	
	private static final Logger logger = LoggerFactory
			.getLogger(AddressServiceTest.class);
	
	@Autowired
	private IAddressService addressService;
	
	
//	@Test
//	public void createAddress() {
//		
//		for(int i=1; i<=100; i++) {
//		Address address = new Address();
//		address.setStreetAddress("379 Webster Dr "+i);
//		address.setCity("New Milford");
//		address.setState("NJ");
//		address.setCountry("USA");
//		address.setZip("testzip"+i);
//		
//		addressService.create(address);
//		
//		}
//		
//	}
	
	@Test
	public void findAll() {
		List<Address> list = addressService.findAll();
		Assert.isTrue(list.size()>0);
	}
	
	@Test
	public void findByZip() {
		Map<String, Object> keys = new HashMap<String, Object>();
		keys.put("zip", "testzip%");
		List<Address> list = addressService.find(keys);
		Assert.isTrue(list.size()==100);
	}
	
	
	@Test
	public void findOne() {
		Address address = addressService.findOne("zip", "testzip15");
		Assert.isTrue(address.getZip().equalsIgnoreCase("testzip15"));
	}
	
/*	@Test
	public void removeAddresses() {
		for(int i=1;i<=100;i++) {
		Address address = addressService.findOne("zip", "testzip"+i);
		System.out.println(address.getStreetAddress());
		addressService.delete(address);
		}
		Assert.isTrue(addressService.findAll().size()==0);
	}*/

}
