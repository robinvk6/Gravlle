package org.icanj.app.assets.inventory;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.icanj.app.directory.entity.Address;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.finance.contribution.DesignatedContribution;
import org.icanj.app.finance.contribution.RequestCheckService;
import org.icanj.app.utils.AppConstant;
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
@RequestMapping("/Admin/Inventory")
public class InventoryController {

    private static final Logger logger = LoggerFactory
            .getLogger(InventoryController.class);
    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private DirectoryService directoryServiceImpl;
    @Autowired
    private RequestCheckService checkService;
    
    

    @RequestMapping(value = "/AddUpdateInventory", method = RequestMethod.POST)
    public ModelAndView addUpdateInventory(@RequestParam("inventoryName") String inventoryName,
    		@RequestParam("inventoryDescription") String inventoryDescription,
    		@RequestParam("inventoryCount") long inventoryCount,
    		@RequestParam("inventoryGroupId") long inventoryGroupId,
    		HttpServletRequest request,Principal principal) {
    	String responseUrl = "Inventory/addInventoryLanding";
        ModelMap modelMap = new ModelMap();
        String message = "";
        try {
            String name = principal.getName();
            inventoryService.addUpdateInventory(inventoryName,inventoryDescription,inventoryCount,inventoryGroupId,request,name);
            TreeMap<String, List<Inventory>> inventoryMap = inventoryService.getAllInventory();

            message = "The transaction was added successfully.";
            modelMap.addAttribute("inventoryMap", inventoryMap);
            modelMap.addAttribute("inventoryGroups", inventoryService.listInventoryGroup());
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
                    message));
            return new ModelAndView(responseUrl, modelMap);
        } catch (Exception e) {
            message = "There was an error saving the Inventory. Please contact the IT team.";
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
                    message + " : " + e.getMessage()));
            return new ModelAndView(responseUrl, modelMap);
        }

    }

    @RequestMapping(value = "/AddUpdateInventoryGroup", method = RequestMethod.POST)
    public String addUpdateInventoryGroup(@RequestParam("inventoryGroupName") String inventoryGroupName,
    		@RequestParam("inventoryGroupDescription") String inventoryGroupDescription,
            Principal principal) {
           
        try {
            String name = principal.getName();
            inventoryService.addUpdateInventoryGroup(inventoryGroupName,inventoryGroupDescription, name);

        } catch (Exception e) {
           logger.error("There was an error saving the Inventory Group. "+ e);          
        }
        return "redirect:" + "/Admin/Inventory/Management";
    }

    @RequestMapping(value = "/Management", method = RequestMethod.GET)
    public ModelAndView adminInventoryLanding(ModelMap model) {
        ModelMap modelMap = new ModelMap();
        String responseUrl = "Inventory/addInventoryLanding";
        List<Inventory> inventory;
        List<InventoryGroup> groups;
        try {
          //  inventory = inventoryService.getLatestInventory();
        	groups = inventoryService.listInventoryGroup();
            modelMap.addAttribute("inventoryGroups", groups);
            TreeMap<String, List<Inventory>> inventoryMap = inventoryService.getAllInventory();
            modelMap.addAttribute("inventoryMap", inventoryMap);

        } catch (Exception e) {
            logger.error("Error Retrieving Lastest Inventory List: ", e);
            e.printStackTrace();
        }
        return new ModelAndView(responseUrl, modelMap);

    }

    @RequestMapping(value = "/UpdateInventory")
    public ModelAndView adminInventoryGroupLanding(@RequestParam("einventoryId") long inventoryId,
    		@RequestParam("einventoryName") String inventoryName,
    		@RequestParam("einventoryDescription") String inventoryDescription,
    		@RequestParam("einventoryCount") long inventoryCount,
    		@RequestParam("einventoryGroupId") long inventoryGroupId,
    		HttpServletRequest request,Principal principal) {
    	String responseUrl = "Inventory/addInventoryLanding";
        ModelMap modelMap = new ModelMap();
        String message = "";
        try {
            String name = principal.getName();
            inventoryService.updateInventory(inventoryId,inventoryName,inventoryDescription,inventoryCount,inventoryGroupId,request,name);
            TreeMap<String, List<Inventory>> inventoryMap = inventoryService.getAllInventory();

            message = "The transaction was added successfully.";
            modelMap.addAttribute("inventoryMap", inventoryMap);
            modelMap.addAttribute("inventoryGroups", inventoryService.listInventoryGroup());
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
                    message));
            return new ModelAndView(responseUrl, modelMap);
        } catch (Exception e) {
            message = "There was an error saving the Inventory. Please contact the IT team.";
            modelMap.addAttribute("alert", new JSPAlert(
                    AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
                    message + " : " + e.getMessage()));
            return new ModelAndView(responseUrl, modelMap);
        }


    }

    
}
