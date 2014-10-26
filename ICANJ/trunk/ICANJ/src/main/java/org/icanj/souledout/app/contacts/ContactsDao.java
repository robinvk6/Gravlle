package org.icanj.souledout.app.contacts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ContactsDao {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
    
	
	public List<Contact> listOfContacts(){
		return hibernateTemplate.find("from Contact");
	}
	
	public void saveContact(Contact contact){
		hibernateTemplate.save(contact);
	}
	
	public Contact getContact(String emailId){
		return hibernateTemplate.get(Contact.class, emailId);
	}
	
	public void updateContact(Contact contact){
		hibernateTemplate.saveOrUpdate(contact);
	}

}
