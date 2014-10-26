package org.icanj.app.sponsor;

import java.security.Principal;
import java.util.List;

import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SponsorService {
	@Autowired
	private SponsorDAO dao;
	
	@Autowired
	private DirectoryServiceImpl directoryServiceImpl;
	
	public List<SponsorList> getSponsorDateList() {
        return dao.getSponsorDateList();
    }
    
    public void saveUpdateSponsorList(long listId, String meeting,Principal principal) throws Exception{
    	SponsorList list = dao.getSponsorList(listId);
    	String userName = principal.getName();
		Member m = directoryServiceImpl.getMemberFromPrincipal(userName);
		long fId = m.getFamilyId();
		Family family = directoryServiceImpl.getFamily(fId);
		if(meeting.equals("PYPA")){
			list.setMeeting1Family(family.getFamilyName());
		}else if(meeting.equals("English Service 1")){
			list.setMeeting2Family(family.getFamilyName());
		}else if(meeting.equals("English Service 2")){
			list.setMeeting3Family(family.getFamilyName());
		}else{
			throw new Exception("Illegal Argument");
		}
    	dao.saveUpdateSponsorList(list);
    }

}
