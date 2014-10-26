package org.icanj.app.thanksgiving;

import java.util.ArrayList;
import java.util.List;

import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ThanksGivingDAO {

	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	@Autowired
	private DirectoryService directoryServiceImpl;
	
	public void saveMemberItem(MemberItem item){
		hibernateTemplate.save(item);
	}
	
	public List<MemberItem> listMemberItems(){
		return hibernateTemplate.find("from MemberItem");
	}
	
	public MemberItem getMemberItem (long Id){
		return hibernateTemplate.get(MemberItem.class, Id);
	}
	
	public MemberItem getMemberItemByItemId(long itemId){
		List<MemberItem> items = hibernateTemplate.find("from MemberItem m where m.item=?",itemId);
		return items.get(0);
	}
	
	public List<MemberItem> getMemberItemByMember(long member){
		return hibernateTemplate.find("from MemberItem m where m.member=?",member);
	}
	
	public void deleteMemberItem(long Id){
		hibernateTemplate.delete(getMemberItem(Id));
	}
	
	public void  updateMemberItem(MemberItem item){
		hibernateTemplate.update(item);
	}
	
	public void updateMenuItem(MenuItem menuItem){
		hibernateTemplate.update(menuItem);
	}
	
	public List<MenuItem> availableMenuItems(){
		return hibernateTemplate.find("from MenuItem m where m.available=?", true);
	}
	
	public List<MenuItem> getMenuItems(){
		return hibernateTemplate.find("from MenuItem");
	}
	
	public MenuItem getMenuItem(long itemId){
		return hibernateTemplate.get(MenuItem.class, itemId);
	}
	
	public List<FamilyItem> getPickedItems(){
		List<FamilyItem> familyItems = new ArrayList<FamilyItem>();
		for(MemberItem item : listMemberItems()){
			FamilyItem familyItem = new FamilyItem();
			Member m = directoryServiceImpl.getMember(item.getMember());
			familyItem.setMember(m);
			familyItem.setFamily(directoryServiceImpl.getFamily(m.getFamilyId()));
			familyItem.setItem(getMenuItem(item.getItem()));
			familyItem.setDate(item.getLastUpdatedat());
			familyItem.setComment(item.getComments());
			familyItems.add(familyItem);
		}
		return familyItems;
	}
	
	public List<FamilyItem> getItemsforFamily(String principal){
		List<FamilyItem> familyItems = new ArrayList<FamilyItem>();
		List<MemberItem> memberItems = new ArrayList<MemberItem>();
		Member member = directoryServiceImpl.getMemberFromPrincipal(principal);
		for(Member mem:directoryServiceImpl.listMemberByFamily(member.getFamilyId())){
			memberItems.addAll(getMemberItemByMember(mem.getMemberId()));
		}
		
		for(MemberItem item : memberItems){
			FamilyItem familyItem = new FamilyItem();
			Member m = directoryServiceImpl.getMember(item.getMember());
			familyItem.setMember(m);
			familyItem.setId(item.getId());
			familyItem.setFamily(directoryServiceImpl.getFamily(m.getFamilyId()));
			familyItem.setItem(getMenuItem(item.getItem()));
			familyItem.setDate(item.getLastUpdatedat());
			familyItem.setComment(item.getComments());
			familyItems.add(familyItem);
		}
		return familyItems;
	}
	
}
