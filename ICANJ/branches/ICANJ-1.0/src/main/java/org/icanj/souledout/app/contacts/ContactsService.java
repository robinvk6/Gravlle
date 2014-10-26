package org.icanj.souledout.app.contacts;

import java.text.ParseException;
import java.util.List;

import org.icanj.app.utils.UtilityMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactsService {
	
	@Autowired
	private ContactsDao contactsDao;
	
	public List<Contact> getAllContacts(){
		return contactsDao.listOfContacts();
	}
	
	public void addContact(String firstName, String lastName, String email, String dob, String cellPhone) throws ParseException{
		
		Contact contact = new Contact();
		contact.setFirstName(firstName);
		contact.setLastName(lastName);
		contact.setEmail(email.toLowerCase());
		contact.setCellPhoneNumber(UtilityMethods.parsePhone(cellPhone));
		contact.setDateOfBirth(UtilityMethods.getDOBfromString(dob));
		
		contactsDao.saveContact(contact);
	}
	
	public void updateContact(long memberId, String firstName, String lastName, String email, String dob, String cellPhone) throws ParseException{
		Contact contact = contactsDao.getContact(email.trim().toLowerCase());
		contact.setFirstName(firstName);
		contact.setLastName(lastName);
		contact.setEmail(email);
		contact.setCellPhoneNumber(UtilityMethods.parsePhone(cellPhone));
		contact.setDateOfBirth(UtilityMethods.getDOBfromString(dob));
		
		contactsDao.updateContact(contact);
	}
}
