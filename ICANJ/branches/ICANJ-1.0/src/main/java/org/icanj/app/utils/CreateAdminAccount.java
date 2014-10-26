/************************************************************************
 * 
 * Copyright 2012 - ICANJ
 * 
 ************************************************************************/

package org.icanj.app.utils;

import org.icanj.app.directory.dao.DirectoryDao;
import org.icanj.app.directory.entity.Address;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.security.Authorities;
import org.icanj.app.security.Users;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//Delete before Production
@Controller
@RequestMapping("/Public/bootstrap")
public class CreateAdminAccount {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	@Autowired
	private DirectoryDao directoryhibernateDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory
			.getLogger(CreateAdminAccount.class);
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String createAdminAccount(){
		
		try{
			
		Users user = new Users();
		Authorities authority = new Authorities();
		
		//Encoding Password
		String encodedPassword = passwordEncoder.encodePassword("icanj123", null);
		user.setUsername("admin"+ "@icanj.org");
		user.setEnabled("TRUE");
		user.setMemberId(0);
		user.setPassword(encodedPassword);
		authority.setAuthority("ROLE_ADMIN");
		user.setAuthorities(authority);
		authority.setUsers(user);
		hibernateTemplate.save(user);
		
		logger.info("Created Admin Account :" + user.getUsername() );
		}
		catch(Exception e){
			logger.error(e.toString());

		}
		return "home";
	
	}
	
	@RequestMapping(value = "CreateFamily", method = RequestMethod.GET)
	public void createFamiliesAndMembers(){
			for(int i=1; i<= 9; i++){
			
			Family family = new Family();
			family.setFamilyName("Mathew" +i + " Thomas"+i);
			Address address = new Address();
			address.setCity("city"+i);
			address.setCountry("USA");
			address.setState("NJ");
			address.setStreetAddress("Random Street Address " + i);
			family.setAddress(address);
			family.setEmailAddress("test"+i+"@icanj.org");
			family.setHomePhoneNumber("201212400"+i);
			address.setFamily(family);
			
			directoryhibernateDao.addFamily(family);
			
			
			
			for(int j=1;j<=4;j++){
				
				Member member = new Member();
				member.setInteractiveAccess(false);
				member.setFirstName("Mathew"+i+j);
				member.setLastName("Thomas"+i+j);
				member.setMiddleName("K");
				member.setFamilyId(family.getFamilyId());
				
				directoryhibernateDao.addMember(member);
			}
			
		}
		
	}
		

}
