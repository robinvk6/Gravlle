package org.icanj.app.thanksgiving;

import java.security.Principal;
import java.util.List;

import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.tithing.TithingController;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/ThanksGiving")
public class ThanksGivingController {
	
	@Autowired
	private DirectoryService directoryServiceImpl;
	
	private static final Logger logger = LoggerFactory
			.getLogger(ThanksGivingController.class);

	
	@Autowired
	private ThanksGivingDAO dao;
	
	@RequestMapping(value = "")
	public ModelAndView landing(Principal principal){
		String responseUrl="ThanksGiving/landingForm";
		ModelMap modelMap = new ModelMap();
		
		List<MenuItem> items = dao.availableMenuItems();
		modelMap.addAttribute("navSelected", "ThanksGiving");
		modelMap.addAttribute("items", items);
		modelMap.addAttribute("pickedItems",dao.getPickedItems());
		modelMap.addAttribute("personal", dao.getItemsforFamily(principal.getName()));
		return new ModelAndView(responseUrl, modelMap);
	}
	
	@RequestMapping(value = "/AddItem")
	public ModelAndView saveItem(Principal principal,
			@RequestParam("item") long itemId,
			@RequestParam("comments") String comments){
		
		String responseUrl="ThanksGiving/landingForm";
		ModelMap modelMap = new ModelMap();
		try {
			MenuItem item = dao.getMenuItem(itemId);
			if(!item.isAvailable()){
				throw new Exception("This item has already been taken. Please try again");
			}
			Member member = directoryServiceImpl.getMemberFromPrincipal(principal.getName());
			MemberItem memberItem = new MemberItem();
			memberItem.setItem(itemId);
			memberItem.setMember(member.getMemberId());
			memberItem.setComments(comments);
			
			dao.saveMemberItem(memberItem);
			try {
				item.setAvailable(false);
				dao.updateMenuItem(item);
			} catch (Exception e) {
				logger.error("Exception setting menu item as not available. Rolling back");
				dao.deleteMemberItem(dao.getMemberItemByItemId(itemId).getId());
				throw new Exception("Error updating menu item"+e.getMessage());
			}
			
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS, "You have successfully selected the item."));

		} catch (Exception e) {
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR, e.getMessage()));
			logger.error("Exception Adding new Item : " + e.getMessage(),e);
		}
		
		
		modelMap.addAttribute("navSelected", "ThanksGiving");
		modelMap.addAttribute("items", dao.availableMenuItems());
		modelMap.addAttribute("pickedItems",dao.getPickedItems());
		modelMap.addAttribute("personal", dao.getItemsforFamily(principal.getName()));
		return new ModelAndView(responseUrl, modelMap);
	}
	
	@RequestMapping(value = "/DeleteItem/{item}")
	public ModelAndView saveItem(Principal principal,
			@PathVariable("item") long itemId){
		String responseUrl="ThanksGiving/landingForm";
		ModelMap modelMap = new ModelMap();
		MemberItem memberItem = dao.getMemberItem(itemId);
		Member member=directoryServiceImpl.getMember(memberItem.getMember());
		if(directoryServiceImpl.isPrincipalInFamily(principal.getName(),member.getFamilyId())){
			dao.deleteMemberItem(memberItem.getId());
			MenuItem item = dao.getMenuItem(memberItem.getItem());
			item.setAvailable(true);
			dao.updateMenuItem(item);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS, "You have successfully deleted the item."));

		}else{
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR, "You can only delete items for your families only"));
		}
		modelMap.addAttribute("navSelected", "ThanksGiving");
		modelMap.addAttribute("items", dao.availableMenuItems());
		modelMap.addAttribute("pickedItems",dao.getPickedItems());
		modelMap.addAttribute("personal", dao.getItemsforFamily(principal.getName()));
		return new ModelAndView(responseUrl, modelMap);
	}
	
}
