package org.icanj.app.tithing.reporting;

import java.util.ArrayList;
import java.util.List;
import org.icanj.app.utils.UtilityMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinancialReportingService {
	
	@Autowired
	private FinanceReportingDao financeReportingDao;
	
	public List<AggregateReport> yearAggregateReport(Integer year) throws Exception{
		List<AggregateReport> items = new ArrayList<AggregateReport>();
		if(year!=null){
			for (int i=1; i<=12; i++){
				AggregateReport report = new AggregateReport();
				report.setMonth(UtilityMethods.getMonthfromInt(i));						
				report.setTotalReceiptAmount(financeReportingDao.sumOfReceipts(i, year));
				report.setTotalPaymentAmount(financeReportingDao.sumOfPayments(i, year));
				items.add(report);
			}				
		}else{
			throw new Exception("Year cannot be null.");
		}
		return items;
	}
}
