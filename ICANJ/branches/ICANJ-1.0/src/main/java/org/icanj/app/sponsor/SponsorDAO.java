package org.icanj.app.sponsor;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SponsorDAO {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
    public List<SponsorList> getSponsorDateList() {
        return hibernateTemplate.find("from SponsorList");
    }
    
    public void saveUpdateSponsorList(SponsorList list){
    	hibernateTemplate.saveOrUpdate(list);
    }

	public SponsorList getSponsorList(long listId) {
		return hibernateTemplate.get(SponsorList.class, listId);
	}

}
