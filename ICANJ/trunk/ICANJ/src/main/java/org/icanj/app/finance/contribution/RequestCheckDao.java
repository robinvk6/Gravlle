package org.icanj.app.finance.contribution;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RequestCheckDao {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	public void addOrUpdateCheckRequest(DesignatedContribution contribution){
		hibernateTemplate.saveOrUpdate(contribution);
	}
	
	public DesignatedContribution getContributionById(long cId){
		return hibernateTemplate.get(DesignatedContribution.class, cId);
	}
	
	public List<DesignatedContribution> getLatestTransactions(){
		HibernateTemplate ht = hibernateTemplate;
		ht.setMaxResults(20);
		List<DesignatedContribution> lOfchecks = ht.find("from DesignatedContribution t order by t.lastUpdatedAt desc");
		return lOfchecks;
	}
	
	public List<DesignatedContribution> getLatestTransactions(long familyID){		
		List<DesignatedContribution> lOfchecks = hibernateTemplate.find("from DesignatedContribution t where t.familyID=? order by t.lastUpdatedAt desc",familyID);
		return lOfchecks;
	}
	
	public List<DesignatedContribution> getPendingTransactions(String transactStatus){		
		List<DesignatedContribution> lOfchecks = hibernateTemplate.find("from DesignatedContribution t where t.transactStatus=? order by t.requestDate asc",transactStatus);		
		return lOfchecks;
	}
}
