/************************************************************************
 * 
 * Copyright 2012 - ICANJ
 * 
 ************************************************************************/

package org.icanj.app;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.security.SecurityContextAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory
			.getLogger(HomeController.class);

	@Autowired
	SecurityContextAccessor securityContextAccessor;
	
	@Autowired
	private DirectoryService directoryServiceImpl;
	
	@Autowired
	@Qualifier("sessionRegistry")
	private SessionRegistry sessionRegistry;

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(ModelMap model, Principal principal) {

		String name = principal.getName(); // get logged in username
		model.addAttribute("username", name);
		return "home";
	}
	
	@RequestMapping(value = "/Public/Contacts")
	@ResponseBody
	public List<Member> getContacts() {
		return directoryServiceImpl.listMembers();
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String home2(ModelMap model, Principal principal) {

		String name = principal.getName(); // get logged in username
		model.addAttribute("username", name);
		return "home";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(ModelMap model, Principal principal) {

		if (securityContextAccessor.isCurrentAuthenticationAnonymous()) {
			return "/Login/login";
		} else {
			return "home";
		}

	}

	@RequestMapping(value = "/login/", method = RequestMethod.GET)
	public String login2(ModelMap model, Principal principal) {
		if (securityContextAccessor.isCurrentAuthenticationAnonymous()) {
			return "/Login/login";
		} else {
			return "home";
		}

	}

	@RequestMapping(value = "/loginfailed", method = RequestMethod.GET)
	public String loginerror(ModelMap model) {

		// model.addAttribute("spring_error", "true");
		return "redirect:/login";

	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(ModelMap model) {

		return "redirect:/j_spring_security_logout";

	}

	@RequestMapping(value = "/header", method = RequestMethod.GET)
	public String header(ModelMap model) {

		return "/Core/header";

	}

	@RequestMapping(value = "/accessdenied", method = RequestMethod.GET)
	public String accessDenied(ModelMap model) {
		return "Core/403";

	}

	@RequestMapping(value = "/errors/404.html")
	public String handle404() {
		return "Core/404";
	}

	@RequestMapping(value = "/errors/500.html")
	public String handle500() {
		return "Core/500";
	}

	@RequestMapping(value = "/favicon.ico")
	public void favicon() {
		// do Nothing
	}

	@RequestMapping(value = "/Admin/Header")
	public void requestHeaders(HttpServletRequest request) {
		Enumeration headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			System.out.println(headerName + " : ");
			System.out.print(request.getHeader(headerName));
		}
	}
	


	@RequestMapping(value = "/About", method = RequestMethod.GET)
	public String about() {
		return "/Core/about";
	}

	@RequestMapping(value = "/ComingSoon", method = RequestMethod.GET)
	public String comingSoon() {
		return "/Core/comingSoon";
	}
	
	@RequestMapping(value = "/apple-touch-icon-precomposed.png")
	public void applePrecomposed() {
		// do Nothing
	}
	
	@RequestMapping(value = "/apple-touch-icon.png")
	public void appleTouch() {
		// do Nothing
	}

};
