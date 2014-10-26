package org.icanj.app.tithing.reporting;

import java.math.BigDecimal;
import java.util.List;

import org.icanj.app.tithing.Payment;
import org.icanj.app.tithing.Tithe;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class FinanceReportingDao {
	
	
	private static final Logger logger = LoggerFactory
			.getLogger(FinanceReportingDao.class);
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Tithe> getReceiptTransactionsMonth(Integer month,Integer year){		
		return hibernateTemplate.find("from Tithe t where month(t.dateRecieved)= ? and year(t.dateRecieved) = ?",month,year);
	}
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<Payment> getPaymentTransactionsMonth(Integer month,Integer year){		
		return hibernateTemplate.find("from Payment t where month(t.checkDate) and year(t.checkDate) = ?",month,year);
	}
	
	public BigDecimal sumOfReceipts(Integer month,Integer year){
		String sql = "SELECT SUM(TRANSACTION_AMOUNT) FROM TITHING t where month(t.TRANSACTION_DATE)= ? and year(t.TRANSACTION_DATE) = ?";		
		BigDecimal total = jdbcTemplate.queryForObject(sql, new Object[]{month,year},BigDecimal.class);
		return total!=null?total:new BigDecimal(0);
	}
	
	public BigDecimal sumOfPayments(Integer month,Integer year){
		String sql = "SELECT SUM(PAYMENT_AMOUNT) FROM PAYMENT p where month(p.PAYMENT_DATE)= ? and year(p.PAYMENT_DATE) = ?";		
		BigDecimal total = jdbcTemplate.queryForObject(sql, new Object[]{month,year},BigDecimal.class);
		return total!=null?total:new BigDecimal(0);
	}
	
}
