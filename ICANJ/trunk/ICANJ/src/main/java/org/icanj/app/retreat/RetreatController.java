package org.icanj.app.retreat;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;

import org.icanj.app.directory.controller.DirectoryController;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.HTTPUtils;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.ModelMap;
import java.security.Principal;
import java.util.HashMap;
import java.util.Iterator;
import org.icanj.app.utils.EmailService;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;

@Controller
@RequestMapping("/Retreat")
public class RetreatController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private RetreatFormUtil retreatFormEmail;
    @Autowired
    private DirectoryService directoryServiceImpl;
    private static final Logger logger = LoggerFactory
            .getLogger(DirectoryController.class);

    @RequestMapping(value = "/landingPage", method = RequestMethod.GET)
    public String landingPage(HttpServletRequest request, ModelMap model) {

        // try {
        // String userName = principal.getName();
        // Member m = directoryServiceImpl.getMemberFromPrincipal(userName);
        // long fId = m.getFamilyId();
        //
        //
        // model.addAttribute("familyId", fId);
        model.addAttribute("navSelected", "Retreat2013");
        return "/Retreat/landingPage";
        // } catch (Exception e) {
        // logger.debug("Exception getting Family Profile: " + e);
        // model.addAttribute("message",
        // "There was a problem submitting the form.");
        // return "Core/500";
        // }

    }

    /**
     * Get details of a family members of a specific family
     *
     * @param model
     * @return
     */
    @RequestMapping(value = "/retreatOnlineForm", method = RequestMethod.GET)
    public String retreatOnlineForm(HttpServletRequest request, ModelMap model,
            Principal principal) {

        try {
            String userName = principal.getName();
            Member m = directoryServiceImpl.getMemberFromPrincipal(userName);
            long fId = m.getFamilyId();

            model.addAttribute("familyId", fId);

            List<Member> members = directoryServiceImpl.listMemberByFamily(fId);
            Family family = directoryServiceImpl.getFamily(fId);
            model.addAttribute("members", members);
            model.addAttribute("family", family);
            model.addAttribute("navSelected", "Retreat2013");
            return "/Retreat/retreatForm";
        } catch (Exception e) {
            logger.debug("Exception getting Family Profile: " + e);
            model.addAttribute("message",
                    "There was a problem submitting the form.");
            return "Core/500";
        }
    }

    /**
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/submitRetreatForm", method = RequestMethod.POST)
    public ModelAndView submitRetreatForm(HttpServletRequest request,Principal principal) {

        ModelMap modelMap = new ModelMap();
        String message = "";
         String responeUrl = "/Retreat/landingPage";
        String[] bccEmailAddress = new String[]{"maxjerin@gmail.com","robinvk6@gmail.com"};
        String[] toAddress = new String[]{"anil.annie@gmail.com"};
        String[] ccEmailAddress =  new String[]{principal.getName()};
        Map<Object, Object> model = new HashMap<Object, Object>();
        List<String> ls = new ArrayList<String>();
        boolean emailFlag = false;
        List<ReservationModel> registeredMember = new ArrayList();

        // get data from POST
        Map parameterMap = request.getParameterMap();
        Iterator retreatMembers = parameterMap.entrySet().iterator();
        String familyName = request.getParameter("familyName");

        while (retreatMembers.hasNext()) {
            Map.Entry entry = (Map.Entry) retreatMembers.next();

            String[] value = ((String[]) entry.getValue());

            // loop through and find if isGoing checkbox was set
            for (String m : value) {
                if (m.equals("on")) {
                    emailFlag = true;
                }
            }

            // add current value to list of already registered members
            if (emailFlag) {            
                ReservationModel reservationModel = new ReservationModel();
                reservationModel.setMemberName(value[0]);
                reservationModel.setRoomType(value[2]);
                reservationModel.setAgeGroup(value[3]);
                reservationModel.setShirtType(value[4]);
                registeredMember.add(reservationModel);
            }

            // reset flag
            emailFlag = false;

        }
        
        for(ReservationModel rsModel : registeredMember){
        	System.out.println(rsModel.getMemberName() + " " + rsModel.getRoomType());
        }

        if (!registeredMember.isEmpty()) {
            model.put("registeredMembers", registeredMember);
            model.put("familyName", familyName);

            try {
                emailService.send(toAddress,ccEmailAddress,bccEmailAddress, "ICANJ Retreat 2013 Registration: " + familyName + " & Family",
                        model, "retreat_form_submit.vm");

                modelMap.addAttribute("alert", new JSPAlert(
                        AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
                        "You form was successfully submitted to Anil. If you want to make changes, please submit the form again."));
            } catch (Exception e) {
                logger.error(
                        "There was a problem submitting the form: " + e.getMessage(), e);

                modelMap.addAttribute("alert", new JSPAlert(
                        AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
                        "There was an error submitting your form. Please use the word document form and email it to Anil. "));
            }
        } else {
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
                    "No members were registered. "));
        }

        return new ModelAndView(responeUrl, modelMap);

    }
}
