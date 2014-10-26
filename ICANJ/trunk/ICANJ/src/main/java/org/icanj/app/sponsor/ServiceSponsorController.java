package org.icanj.app.sponsor;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.icanj.app.directory.controller.DirectoryController;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryServiceImpl;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.ModelMap;
import java.security.Principal;

@Controller
@RequestMapping("/Sponsor")
public class ServiceSponsorController {

    private static final Logger logger = LoggerFactory
            .getLogger(DirectoryController.class);

    @Autowired
    private SponsorService sponsorService;
    
    @Autowired
    private DirectoryServiceImpl directoryServiceImpl;


	/**
	 * Get details of a family members of a specific family
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/serviceSponsorForm", method = RequestMethod.GET)
	public ModelAndView serviceSponsorForm(HttpServletRequest request,
			ModelMap model, Principal principal) {

		String responseUrl = "/Sponsor/serviceSponsorForm";
		String userName = principal.getName();
		Member m = directoryServiceImpl.getMemberFromPrincipal(userName);
		long fId = m.getFamilyId();
		Family family = directoryServiceImpl.getFamily(fId);
		ModelMap modelMap = new ModelMap();
		List<SponsorList> sponsorLists = sponsorService.getSponsorDateList();
		modelMap.addAttribute("family", family);
		modelMap.addAttribute("sponsorLists", sponsorLists);

		modelMap.addAttribute("navSelected", "serviceSponsor");
		return new ModelAndView(responseUrl, modelMap);

	}
	
	@RequestMapping(value = "/selectEvent", method = RequestMethod.POST)
	public ModelAndView submitSponsorForm(@RequestParam("pid") long id,
			@RequestParam("pmeeting") String meeting,
			Principal principal) {
		ModelMap modelMap = new ModelMap();
		String responseUrl = "/Sponsor/serviceSponsorForm";
		try {
			sponsorService.saveUpdateSponsorList(id, meeting, principal);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS, "Your Selection has been completed."));

		} catch (Exception e) {
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR, "There was an Exception selecting the Event. Please try again later."));
			
			e.printStackTrace();
		}
		
		
		
		List<SponsorList> sponsorLists = sponsorService.getSponsorDateList();
		modelMap.addAttribute("sponsorLists", sponsorLists);


		modelMap.addAttribute("navSelected", "serviceSponsor");
		return new ModelAndView(responseUrl, modelMap);
		
	}


}