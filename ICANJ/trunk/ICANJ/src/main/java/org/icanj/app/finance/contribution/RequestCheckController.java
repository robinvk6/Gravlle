package org.icanj.app.finance.contribution;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/Finance/RequestCheck")
public class RequestCheckController {

    @Autowired
    private RequestCheckService checkService;
    private static final Logger logger = LoggerFactory.getLogger(RequestCheckController.class);

    @RequestMapping(value = "")
    public ModelAndView landingPage(Principal principal) {
        ModelMap modelMap = new ModelMap();
        String responseUrl = "Finance/requestCheck";
        List<DesignatedContribution> lOfChecks = null;
        try {
            lOfChecks = checkService.getLatestTransactions(principal);
            modelMap.addAttribute("checks", lOfChecks);
            modelMap.addAttribute("navSelected", "RequestACheck");
        } catch (Exception e) {
            logger.error("Error Retrieving Lastest Transactions: ", e);
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
                    "The application cannot get the latest transactions."));
        }
        return new ModelAndView(responseUrl, modelMap);

    }

    @RequestMapping(value = "/UpdateCheck")
    public ModelAndView requestNewCheck(Principal principal, HttpServletRequest request) {

        ModelMap modelMap = new ModelMap();
        String referrer = request.getParameter("adminReferrer");
        String responseUrl = "";
       
        if (referrer != null && referrer.equals("true")) {
            responseUrl = "Finance/ProcessCheckRequests";
            modelMap.addAttribute("navSelected", "DesignatedContributionRequest");
        } else {
            responseUrl = "Finance/requestCheck";
            modelMap.addAttribute("navSelected", "RequestACheck");
        }

        List<DesignatedContribution> lOfChecks = null;

        try {
            checkService.addDesignatedContribution(request, principal);

            lOfChecks = checkService.getLatestTransactions(principal);
            modelMap.addAttribute("checks", lOfChecks);
        } catch (Exception e) {
            logger.error("Error Retrieving Lastest Transactions: ", e);
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
                    e.getMessage()));
        }
        return new ModelAndView(responseUrl, modelMap);
    }
}
