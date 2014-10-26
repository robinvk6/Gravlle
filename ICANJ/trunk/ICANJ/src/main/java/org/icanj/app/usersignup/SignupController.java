/************************************************************************
 *
 * Copyright 2012 - ICANJ
 *
 ************************************************************************/

package org.icanj.app.usersignup;

import javax.servlet.http.HttpServletRequest;

import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.HTTPUtils;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/Admin/Signup")
public class SignupController {

	private static final Logger logger = LoggerFactory
			.getLogger(SignupController.class);

	@Autowired
	private DirectoryService directoryServiceImpl;

	/**
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/Family", method = RequestMethod.GET)
	public String landing(HttpServletRequest request) {
		ModelMap modelMap = new ModelMap();
		modelMap.addAttribute("navSelected", "FamilySignup");
		return "/Signup/familySignup";
	}

	/**
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/AddFamily.html", method = RequestMethod.POST)
	public ModelAndView saveFamily(HttpServletRequest request) {

		logger.info("Family Onboarding - ");

		String message = "";
		String failUrl = "/Signup/familySignup";
		String sucessUrl = "/Signup/memberSignup";
		String responeUrl = "";
		Family family = null;
		ModelMap modelMap = new ModelMap();

				try {
					String homePhone= request.getParameter("i1").trim()+
									  request.getParameter("i2").trim()+
									  request.getParameter("i3").trim();


					family = directoryServiceImpl.getFamilyHomePhoneNo(homePhone);
					modelMap.addAttribute("navSelected", "FamilySignup");
					if(family == null){

						if(directoryServiceImpl.addFamily(request)){
							family = directoryServiceImpl.getFamilyHomePhoneNo(homePhone);
							responeUrl = sucessUrl;
							modelMap.addAttribute("family", family);
							modelMap.addAttribute("familyNameF", request.getParameter("familyNameF").trim());
							modelMap.addAttribute("familyNameM", request.getParameter("familyNameM").trim());
							modelMap.addAttribute("familyNameL", request.getParameter("familyNameL").trim());
							modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE,AppConstant.CSS_ALERT_SUCESS, "Family was succesfully added to the directory"));
						}
						else{

							message = "There was an error saving the below family details. Please validate the data and try submitting again.";
							responeUrl = failUrl;
							modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, message));
						}
					}
					else{
							modelMap.addAttribute("family", family);
							message = "A family with this phone number already exists. Family Id: " + family.getFamilyId() + " Family Name : " + family.getFamilyName() + " & Family";
							responeUrl = sucessUrl;
							modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, message));
					}

					return new ModelAndView(responeUrl, modelMap);
				} catch (Exception e) {
					logger.error("Exception during member/family sign-up : " + e);
					message = "There was an error saving the below family details. Please validate the data and try submitting again.";
					responeUrl = failUrl;
					modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, message));
					return new ModelAndView(responeUrl, modelMap);
				}
	}

	/**
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/AddMember.html", method = RequestMethod.POST)
	public ModelAndView saveMember(HttpServletRequest request) {
		ModelMap modelMap = new ModelMap();
		String message ="";

		String pageUrl = "/Signup/memberSignup";
		String successUrl = "/Signup/familySignup";
		modelMap.addAttribute("navSelected", "FamilySignup");
		if(HTTPUtils.validateParameter(request, "familyId", 2)){
			directoryServiceImpl.addMembers(request);
			message="The member information was added sucessfully.";
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE,AppConstant.CSS_ALERT_SUCESS, message));
			return new ModelAndView(successUrl, modelMap);
		}else{
			logger.error("Error Adding Members - Family Id cannot be null");
			message = "There was an error saving the below family details. Please validate the data and try submitting again.";
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, message));
			return new ModelAndView(pageUrl, modelMap);
		}

	}
}