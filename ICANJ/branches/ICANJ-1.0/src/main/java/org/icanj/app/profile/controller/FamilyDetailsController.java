/************************************************************************
 * 
 * Copyright 2012 - ICANJ
 * 
 ************************************************************************/

package org.icanj.app.profile.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/Profile")
public class FamilyDetailsController {
    
    @RequestMapping(value= "/FamilyDetails", method =RequestMethod.GET)
	public String addMember(HttpServletRequest request){
        return "/Profile/familyDetails";
    }
    
}