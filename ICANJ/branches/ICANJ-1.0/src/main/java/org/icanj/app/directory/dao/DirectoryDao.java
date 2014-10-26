/************************************************************************
 * 
 * Copyright 2012 - ICANJ
 * 
 ************************************************************************/

package org.icanj.app.directory.dao;

import java.util.List;

import org.icanj.app.directory.entity.Address;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.ImageModel;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.assets.inventory.Inventory;
import org.icanj.app.assets.inventory.InventoryGroup;

public interface DirectoryDao {

	
	public void addMember(Member member);
	public void addFamily(Family family);
	public List<Member> listMembers();
	public List<Member> listMemberByFamily(long familyId);
	public Member getMember(long memberId);
	public Family getFamily(long familyId);
	public void removeMember(long memberId);
	public Address findAddressById(long familyId);
	public List<Address> listAddresses();
	public Family getFamilyHomePhoneNo(String homePhoneNumber);
	public List<Member> MemFamilyNoInteractive(long familyId);
	public List<Family> listFamilies();
	public Member getMemberFromPrincipal(String principal);
	public List<Member> searchMembers(String srchCriteria);
        public void addInventoryGroup(InventoryGroup inventoryGroup);
        public void addInventory(Inventory inventoty);
        public List<InventoryGroup> listInventoryGroup();
        public List<Inventory> listInventory();
        public InventoryGroup getInventoryGroup(long inventoryGroupId);
        public Inventory getInventory(long inventoryId);
        public void removeInvetory(long inventoryId);
        public List<Inventory> searchInventory(String srchCriteria);
	
	
	//Image Handler
	public ImageModel getResourceUrl(long key, String keyType);
        
}
