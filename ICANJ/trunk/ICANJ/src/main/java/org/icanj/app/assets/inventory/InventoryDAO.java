package org.icanj.app.assets.inventory;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class InventoryDAO {
	
	private static final Logger logger = LoggerFactory
			.getLogger(InventoryDAO.class);

	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	
	@Transactional
	public void addUpdateInventory(Inventory inventory) throws Exception {
		hibernateTemplate.saveOrUpdate(inventory);
	}
	
	@Transactional
	public void addUpdateInventoryGroup(InventoryGroup inventoryGroup) throws Exception {
		hibernateTemplate.save(inventoryGroup);
	}
	
	public List<InventoryGroup> listInventoryGroup(){
		return hibernateTemplate.find("FROM InventoryGroup");
	}
	
	
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public List<Inventory> getLatestInventory(){
		HibernateTemplate ht = hibernateTemplate;
		ht.setMaxResults(20);
		List<Inventory> lOfInventory = ht.find("FROM Inventory i ORDER By i.modifiedTimestamp DESC");
		ht.setMaxResults(0);//Set it back to 0(default/no limit) else hibernate template will store the max results for future transactions.
							// We are using the same session factory for hibernate template throughout
		return lOfInventory;
		
	}
	
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public TreeMap<String, List<Inventory>> getAllInventory(){	
		TreeMap<String , List<Inventory>> lOfInventory = new TreeMap<String, List<Inventory>>();				
		for(InventoryGroup group :listInventoryGroup()){
		List<Inventory> inventories = hibernateTemplate.find("FROM Inventory i where i.inventoryGroupId= ?",group.getInventoryGroupId());
		lOfInventory.put(group.getInventoryGroupName(), inventories);
		}
		return lOfInventory;		
	}
	
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public List<InventoryGroup> getLatestInventoryGroup(){
		HibernateTemplate ht = hibernateTemplate;
		ht.setMaxResults(20);
		List<InventoryGroup> lOfInventoryGroup = ht.find("FROM inventory_group ig ORDER BY ig.modifiedTimestamp DESC");
		ht.setMaxResults(0);//Set it back to 0(default/no limit) else hibernate template will store the max results for future transactions.
		// We are using the same session factory for hibernate template throughout
		return lOfInventoryGroup;
		
	}
	
	@Transactional(readOnly = true)
	public Inventory getInventoryByInventoryId(long inventoryId){
		try {
			return hibernateTemplate.get(Inventory.class, inventoryId);
		} catch (DataAccessException e) {
			e.printStackTrace();
			return null;
		}
		
	}	
	
	@Transactional(readOnly = true)
	public InventoryGroup getInventoryGroupByInventoryGroupId(long inventoryGroupId){
		try {
			return hibernateTemplate.get(InventoryGroup.class, inventoryGroupId);
		} catch (DataAccessException e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	@Transactional(readOnly = false)
	public void deleteInventory (long inventoryId){
		Inventory i =null;
		try {
			i = getInventoryByInventoryId(inventoryId);
			hibernateTemplate.delete(i);
		} catch (DataAccessException e) {
			logger.error("Error deleting Inventory : inventory Id" + i.getInventoryId()+ "  "+ e);
			e.printStackTrace();
		}
	}
	
	
	@Transactional(readOnly = false)
        public void deleteInventoryGroup (long inventoryGroupId){
		InventoryGroup ig =null;
		try {
			ig = getInventoryGroupByInventoryGroupId(inventoryGroupId);
			hibernateTemplate.delete(ig);
		} catch (DataAccessException e) {
			logger.error("Error deleting Inventory Group: inventory group Id" + ig.getInventoryGroupId()+ "  "+ e);
			e.printStackTrace();
		}
	}
	 

}
