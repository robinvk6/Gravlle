/**
 * **********************************************************************
 *
 * Copyright 2012 - ICANJ
 *
 ***********************************************************************
 */
package org.icanj.app.usersignup;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.security.ICAAuthenticationService;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.HTTPUtils;
import org.icanj.app.utils.UtilityMethods;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/Public/Register")
public class RegisterController {

	private static final Logger logger = LoggerFactory
			.getLogger(RegisterController.class);
	@Autowired
	private DirectoryService directoryServiceImpl;
	@Autowired
	private ICAAuthenticationService authenticationService;

	/**
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String landing(HttpServletRequest request) {
		return "/Registration/registration";
	}

	/**
	 *
	 * @param request
	 * @return
	 */

	@RequestMapping(value = "/activate/{encodedEmail}", method = RequestMethod.GET)
	public String activateAccount(@PathVariable String encodedEmail) {
		authenticationService.activateAccount(encodedEmail);
		return "redirect:" + "http://my.icanj.org/";

	}


	@RequestMapping(value = "/Reset", method = RequestMethod.POST)
	public String resetPassword(@RequestParam("emailId") String emailId,ModelMap modelMap) {
		try {
			authenticationService.resetPasswordHandler(emailId);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE,AppConstant.CSS_ALERT_SUCESS, "An email has been sent to your email address with instructions to reset your password. The link will expire in 10 minutes. Please ensure to click on the link before it expires."));

		} catch (Exception e) {
			logger.error("Exception resetting password : " + e);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, "Your password could not be reset. Please contact the ICANJ IT Team"));
		}
		return "/Login/resetPassword";
	}

	@RequestMapping(value = "/ForgotPassword", method = RequestMethod.GET)
	public String forgotPassword() {
		return "/Login/resetPassword";
	}

	@RequestMapping(value = "/ValidateKey/{encodedEmail}", method = RequestMethod.GET)
	public String validateResetPassword(@PathVariable String encodedEmail,ModelMap modelMap) {

		try {
			String emailId = authenticationService.resetPasswordValidator(encodedEmail);
			modelMap.addAttribute("email",emailId);
			return "/Login/passwordForm";
		} catch (Exception e) {
			logger.error("Exception resetting password : " + e);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, "Your password could not be reset. Please contact the ICANJ IT Team"));
			return "/Login/resetPassword";
		}

	}

	@RequestMapping(value = "/SavePassword", method = RequestMethod.POST)
	public String saveNewPassword(@RequestParam("password") String password,
			@RequestParam("emailId") String email,
			ModelMap modelMap) {
		try {
			authenticationService.resetPassword(email, password);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_SUCCESS_CODE,AppConstant.CSS_ALERT_SUCESS, "Your password has been reset successfully. Please go back to the Login page and sign-in with your account with your new password."));

		} catch (Exception e) {
			logger.error("Exception in resetting password: " + e);
			modelMap.addAttribute("alert", new JSPAlert(AppConstant.MSG_ERROR_CODE,AppConstant.CSS_ALERT_ERROR, "Your password could not be reset. Please contact the ICANJ IT Team"));
		}
		return "/Login/resetPassword";
	}


	@RequestMapping(value = "/validate", method = RequestMethod.POST)
	public ModelAndView validateHomePhone(HttpServletRequest request) {
		Family family = new Family();

		ModelMap modelMap = new ModelMap();
		String message = "";
		String responeUrl = "";
		String failUrl = "/Registration/registration";
		String successUrl = "/Registration/selectAccount";

		try {
			String homePhone = request.getParameter("phone").trim();
			homePhone = UtilityMethods.parsePhone( homePhone );

			if (homePhone != null && homePhone.length() == 10) {
				family = directoryServiceImpl.getFamilyHomePhoneNo(homePhone);
				if (family != null) {
					List<Member> lMember = new ArrayList<Member>();
					lMember = directoryServiceImpl
							.MemFamilyNoInteractive(family.getFamilyId());
					modelMap.addAttribute("family", family);
					modelMap.addAttribute("members", lMember);
					responeUrl = successUrl;
				} else {
					logger.error("We could not find any family details for " + homePhone);
					message = "There are no family details setup for the entered phone number. Please ensure the entered number is correct and if the problem persists, contact the ICANJ IT.";
					responeUrl = failUrl;
					modelMap.addAttribute("alert", new JSPAlert(
							AppConstant.MSG_ERROR_CODE,
							AppConstant.CSS_ALERT_ERROR, message));
				}
			} else {
				message = "We could not find a match for the entered phone number.";
				responeUrl = failUrl;
				modelMap.addAttribute("alert", new JSPAlert(
						AppConstant.MSG_ERROR_CODE,
						AppConstant.CSS_ALERT_ERROR, message));
			}

		} catch (Exception e) {
			logger.error("Error retrieving family details" + e.toString());
			message = "The system encountered a problem while retrieving your your family details.";
			responeUrl = failUrl;
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
					message));
		}

		return new ModelAndView(responeUrl, modelMap);
	}

	/**
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/createAccount", method = RequestMethod.POST)
	public ModelAndView createAccount(HttpServletRequest request) {

		ModelMap modelMap = new ModelMap();
		String message = "";
		String responeUrl = "";
		String failUrl = "/Registration/registration";
		String successUrl = "/Registration/selectAccount";

		if (HTTPUtils.validateParameter(request, "memberId", 2)
				&& HTTPUtils.validateParameter(request, "emailAddress", 2)
				&& HTTPUtils.validateParameter(request, "password", 2)) {

			logger.info("Creating Login Account for member id: "
					+ request.getParameter("memberId"));
			if(authenticationService.createMemberAccount(Long.parseLong(request
					.getParameter("memberId").trim()),
					request.getParameter("emailAddress").trim(), request
							.getParameter("password").trim())){

				modelMap.addAttribute("alert", new JSPAlert(
						AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
						"The account has been created successfully. You will shortly recieve an email with instructions to activate and access your account."));

			}else{

				modelMap.addAttribute("alert", new JSPAlert(
						AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
						"There was an error creating your account. Please contact the ICANJ IT team for more details. "));
			}

			long memberId = Long.parseLong(request.getParameter("memberId"));
			Member m = directoryServiceImpl.getMember(memberId);
			List<Member> lMember = new ArrayList<Member>();
			lMember = directoryServiceImpl.MemFamilyNoInteractive(m
					.getFamilyId());
			Family family = directoryServiceImpl.getFamily(m.getFamilyId());
			modelMap.addAttribute("family", family);
			modelMap.addAttribute("members", lMember);
			responeUrl = successUrl;

		} else {
			logger.error("Bad Incoming Request");
			message = "All information needed to create the account were not found.";
			responeUrl = failUrl;
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
					message));
		}

		return new ModelAndView(responeUrl, modelMap);

	}
}
