package org.icanj.app.tithing;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TithingDAO {
	
	private static final Logger logger = LoggerFactory
			.getLogger(TithingDAO.class);

	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	
	@Transactional
	public void addTithingTransaction(Tithe tithe) throws Exception {
		hibernateTemplate.saveOrUpdate(tithe);
	}
	public void addReceiptSignoffStatus(ReceiptsTransactionSignoff signoff){
		 hibernateTemplate.save(signoff);
	}
	
	@Transactional
	public void addUpdatePaymentTransaction(Payment payment) throws Exception {
		hibernateTemplate.saveOrUpdate(payment);
	}
	
	public ReceiptsTransactionSignoff getReceiptTransactionStatusbyID(long transactId){
		try {
			return hibernateTemplate.get(ReceiptsTransactionSignoff.class, transactId);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public List<Tithe> getlatestTransactions(){
		HibernateTemplate ht = hibernateTemplate;
		ht.setMaxResults(20);
		List<Tithe> lOfTithe = ht.find("from Tithe t order by t.lastUpdatedAt desc");
		ht.setMaxResults(0);//Set it back to 0(default/no limit) else hibernate template will store the max results for future transactions.
							// We are using the same session factory for hibernate template throughout
		return lOfTithe;
		
	}
	
	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public List<Payment> getlatestPaymentTransactions(){
		HibernateTemplate ht = hibernateTemplate;
		ht.setMaxResults(20);
		List<Payment> loPayment = ht.find("from Payment t order by t.lastUpdatedAt desc");
		ht.setMaxResults(0);//Set it back to 0(default/no limit) else hibernate template will store the max results for future transactions.
		// We are using the same session factory for hibernate template throughout
		return loPayment;
		
	}
	
	@Transactional(readOnly = true)
	public Tithe getTitheByTransactId(long transactId){
		try {
			return hibernateTemplate.get(Tithe.class, transactId);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}	
	
	@Transactional(readOnly = true)
	public Payment getPaymentByTransactId(long transactId){
		try {
			return hibernateTemplate.get(Payment.class, transactId);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	@Transactional(readOnly = false)
	public void deleteTransaction (long transactId){
		Tithe t =null;
		try {
			t = getTitheByTransactId(transactId);
			hibernateTemplate.delete(t);
		} catch (Exception e) {
			logger.error("Error deleting Receipt transaction : transaction Id" + t.getTransactionId()+ "  "+ e);
			e.printStackTrace();
		}
	}
	
	
	@Transactional(readOnly = false)
	public void deletePaymentTransaction (long transactId){
		Payment t =null;
		try {
			t = getPaymentByTransactId(transactId);
			hibernateTemplate.delete(t);
		} catch (Exception e) {
			logger.error("Error deleting Payment transaction : transaction Id" + t.getTransactionId()+ "  "+ e);
			e.printStackTrace();
		}
	}
	 
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Tithe> getTransactionsFamily(String year, String familyId){		
		return hibernateTemplate.find("from Tithe t where t.familyID = ? and year(t.dateRecieved) = ? order by t.dateRecieved",familyId,new Integer(year));
	} 
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Tithe> getTransactionsFamily(String familyId,final Date fromDate, final Date toDate ){		
		return hibernateTemplate.find("from Tithe t where t.familyID = ? and t.dateRecieved between ? and ? order by t.dateRecieved",familyId,fromDate,toDate);
	}
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Tithe> getTransactionsMember(String memberId,final Date fromDate, final Date toDate ){		
		return hibernateTemplate.find("from Tithe t where t.memberID = ? and t.dateRecieved between ? and ? order by t.dateRecieved",memberId,fromDate,toDate);
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Tithe> getTransactionsMonthYear(final Date fromDate, final Date toDate){	
		logger.debug("Request for getTitheTransacton for date range : " + fromDate.toString() + " | " + toDate.toString());
		List<Tithe> tithes = hibernateTemplate.find("from Tithe t where t.dateRecieved between ? and ?",fromDate,toDate);
		logger.debug("Number of found tithing transactions : "+ tithes.size());
		return tithes;
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Payment> getPaymentMonthYear(final Date fromDate, final Date toDate){		
		logger.debug("Request for getPaymentTransacton for date range : " + fromDate.toString() + " | " + toDate.toString());
		List<Payment> payments = hibernateTemplate.find("from Payment t where t.checkDate between ? and ?",fromDate,toDate);
		logger.debug("Number of found tithing transactions : "+ payments.size());
		return payments;
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public void titheReceiptGroupByType(final Date fromDate, final Date toDate){
		
		Map receiptByGroup = new HashMap<String, BigDecimal>();
		List<Tithe> tithes = hibernateTemplate.find("from Tithe t where t.dateRecieved between ? and ?",fromDate,toDate);
		for(Tithe t: tithes){
			
			for(TitheSubLedger sL : t.getSubTransactions()){
				if(receiptByGroup.containsKey(sL.getAccountType())){
					BigDecimal slAmt = (BigDecimal) receiptByGroup.get(sL.getAccountType());					
					receiptByGroup.put(sL.getAccountType(), slAmt.add(sL.getAmount()));
					
				}else{
					receiptByGroup.put(sL.getAccountType(), sL.getAmount());
				}				
			}
		}
		
	
	}

}
