package org.icanj.app.profile.controller;

import java.security.Principal;
import java.util.Calendar;
import javax.servlet.http.HttpServletRequest;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.tithing.TithingService;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/Tithe")
public class PersonalTitheController {

	private static final Logger logger = LoggerFactory
			.getLogger(PersonalTitheController.class);

	@Autowired
	private TithingService tithingService;

	@Autowired
	private DirectoryService directoryServiceImpl;

	@RequestMapping(value = "/MyTithe")
	public ModelAndView getTitheFamily(Principal principal, HttpServletRequest request) throws Exception {
		String year = request.getParameter("year");
		ModelMap modelMap = new ModelMap();
		Member m =null;
                modelMap.addAttribute("navSelected", "MyTithe");
		try {
			if(year == null || "".equals(year) || "Current".equals(year)){
				Calendar cal=Calendar.getInstance();
				  year=String.valueOf(cal.get(Calendar.YEAR));
			}

			m = directoryServiceImpl.getMemberFromPrincipal(principal.getName());
			modelMap = tithingService.getTransactionsMember(year, m.getMemberId(),modelMap);


		}catch (NullPointerException e) {
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, "Your tithe details could not be found. Please contact the ICANJ IT Team."));
			logger.error("Error getting Tithe Details for Member : " +m.getFirstName() + " " + m.getLastName());
		}
		catch (Exception e) {
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, "Your tithe details could not be found. Please contact the ICANJ IT Team."));
			logger.error("Error getting Tithe Details for Member : " +m.getFirstName() + " " + m.getLastName());
		}
		return new ModelAndView("Tithe/MyTithe", modelMap);
	}
}
