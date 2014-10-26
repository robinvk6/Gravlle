package org.icanj.app.assets.inventory;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.icanj.app.directory.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);
    @Autowired
    private InventoryDAO inventoryDAO;
    @Autowired
    private PasswordEncoder memberIdEncoder;
    @Autowired
    private DirectoryService directoryServiceImpl;

    @Secured("ROLE_ADMIN")
    public List<Inventory> getLatestInventory() throws ParseException {

        List<Inventory> inventory = inventoryDAO.getLatestInventory();
        return inventory;
    }
    
    public TreeMap<String, List<Inventory>> getAllInventory(){
    	return inventoryDAO.getAllInventory();    	
    }

    @Secured("ROLE_ADMIN")
    public List<InventoryGroup> getlatestInventoryGroup() {
        List<InventoryGroup> inventoryGroup = inventoryDAO.getLatestInventoryGroup();
        return inventoryGroup;
    }

    @Secured("ROLE_ADMIN")
    public Inventory getInventoryByInventoryId(long inventoryId) {
        return inventoryDAO.getInventoryByInventoryId(inventoryId);

    }

    @Secured("ROLE_ADMIN")
    public InventoryGroup getInventoryGroupByInventoryGroupId(long inventoryGroupId) {
        return inventoryDAO.getInventoryGroupByInventoryGroupId(inventoryGroupId);

    }

    @Secured("ROLE_ADMIN")
    public void deleteInventory(long inventoryId) {
        inventoryDAO.deleteInventory(inventoryId);
    }
    
    public List<InventoryGroup> listInventoryGroup(){
    	return inventoryDAO.listInventoryGroup();
    }

    @Secured("ROLE_ADMIN")//Delete Payment Transaction
    public void deleteInventoryGroup(long inventoryGroupId) {
        inventoryDAO.deleteInventoryGroup(inventoryGroupId);
    }

    @Secured("ROLE_ADMIN")
    public void addUpdateInventory(String inventoryName,String inventoryDescription,long inventoryCount,long inventoryGroupId,HttpServletRequest request,String principal) throws Exception {      
            
                try {
                	
					Inventory inventory = new Inventory();                
					inventory.setInventoryName(inventoryName);
					inventory.setInventoryDescription(inventoryDescription); 
					inventory.setInventoryCount(inventoryCount);
					inventory.setInventoryGroupId(inventoryDAO.getInventoryGroupByInventoryGroupId(inventoryGroupId).getInventoryGroupId());
					inventory.setInventoryPriceRange(request.getParameter("inventoryPriceRange").trim());
					inventory.setBarCode(request.getParameter("barCode").trim());
					inventory.setLastUpdatedBy(principal);
					inventory.setLastUpdatedAt(new Date());
					
					inventoryDAO.addUpdateInventory(inventory);
				} catch (Exception e) {
					logger.error("Exception adding new inventory : " + e.getMessage(),e);
					throw new Exception("Exception adding new inventory : " + e.getMessage());
				}
  
    }
    
    @Secured("ROLE_ADMIN")
    public void updateInventory(long id,String inventoryName,String inventoryDescription,long inventoryCount,long inventoryGroupId,HttpServletRequest request,String principal) throws Exception {      
            
                try {
                	
					Inventory inventory = inventoryDAO.getInventoryByInventoryId(id);          
					inventory.setInventoryName(inventoryName);
					inventory.setInventoryDescription(inventoryDescription); 
					inventory.setInventoryCount(inventoryCount);
					inventory.setInventoryGroupId(inventoryDAO.getInventoryGroupByInventoryGroupId(inventoryGroupId).getInventoryGroupId());
					inventory.setInventoryPriceRange(request.getParameter("einventoryPriceRange").trim());
					inventory.setBarCode(request.getParameter("ebarCode").trim());
					inventory.setLastUpdatedBy(principal);
					inventory.setLastUpdatedAt(new Date());
					
					inventoryDAO.addUpdateInventory(inventory);
				} catch (Exception e) {
					logger.error("Exception adding new inventory : " + e.getMessage(),e);
					throw new Exception("Exception adding new inventory : " + e.getMessage());
				}
  
    }

    
    @Secured("ROLE_ADMIN")
    public void addUpdateInventoryGroup(String inventoryGroupName, String inventoryGroupDescription, String principal) throws Exception {
       	InventoryGroup inventoryGroup = new InventoryGroup();
    	inventoryGroup.setInventoryGroupName(inventoryGroupName);
    	inventoryGroup.setInventoryGroupDescription(inventoryGroupDescription);
    	inventoryGroup.setLastUpdatedBy(principal);
    	inventoryGroup.setLastUpdatedAt(new Date());
    	inventoryDAO.addUpdateInventoryGroup(inventoryGroup);
    }
}
