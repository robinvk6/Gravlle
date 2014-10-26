package org.icanj.souledout.app.contacts;

import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/SouledOut")
public class ContactsController {
	
	@Autowired
	private ContactsService contactsService; 
	
	@RequestMapping(value = "/Contacts")
	public String getContacts(ModelMap modelMap){
		modelMap.addAttribute("contacts", contactsService.getAllContacts());
		return "/SOUT/AllContacts";
	}
	
	@RequestMapping(value = "/AddContact")
	public String addContacts(ModelMap modelMap,
			@RequestParam("firstName") String firstName,
			@RequestParam("lastName") String lastName,
			@RequestParam("email") String email,
			@RequestParam("dob") String dob,
			@RequestParam("phoneNumber") String phoneNumber
			){
		
		try {
			contactsService.addContact(firstName, lastName, email, dob, phoneNumber);
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
					"The Contact was added sucessfully added !!!"));
		} catch (Exception e) {
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
					"There was an error adding the contact"));
			e.printStackTrace();
		}
		modelMap.addAttribute("contacts", contactsService.getAllContacts());
		return "/SOUT/AllContacts";
	}
	
	
	@RequestMapping(value = "/UpdateContact")
	public String updateContacts(ModelMap modelMap,
			@RequestParam("mMemberId") long memberId,
			@RequestParam("mfirstName") String firstName,
			@RequestParam("mlastName") String lastName,
			@RequestParam("memail") String email,
			@RequestParam("mdob") String dob,
			@RequestParam("mphoneNumber") String phoneNumber){
		try {
			contactsService.updateContact(memberId, firstName, lastName, email, dob, phoneNumber);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		modelMap.addAttribute("contacts", contactsService.getAllContacts());
		return "/SOUT/AllContacts";
	}
	
}
