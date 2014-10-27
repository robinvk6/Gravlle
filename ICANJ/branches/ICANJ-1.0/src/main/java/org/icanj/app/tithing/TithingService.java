package org.icanj.app.tithing;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.HTTPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.core.codec.Base64;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

@Service
public class TithingService {
	
	
	private static final Logger logger = LoggerFactory.getLogger(TithingService.class);
	
	@Autowired
	private TithingDAO tithingDAO;
	
	@Autowired
	private PasswordEncoder memberIdEncoder;	
	
	@Autowired
	private DirectoryService directoryServiceImpl;
	
	@Secured("ROLE_ADMIN")
	public List<Tithe> getlatestTransactions() throws ParseException{
		
		List<Tithe> tithes = tithingDAO.getlatestTransactions();
		for(Tithe t:tithes){
			String mID= decoder(t.getMemberID());
			Member m =directoryServiceImpl.getMember(Long.parseLong(mID));
			t.setMemberID(m.getFirstName() + " " + m.getLastName());			
		}		
		return tithes;		
	}
	
	private List<Tithe> nameFormatter(List<Tithe> tithes){
		for(Tithe t:tithes){
			String mID= decoder(t.getMemberID());
			Member m =directoryServiceImpl.getMember(Long.parseLong(mID));
			t.setMemberID(m.getFirstName() + " " + m.getLastName());			
		}		
		return tithes;	
	}
	
	public List<Tithe> searchTransactions(String memberId, String familyId, String searchType, String startDate, String endDate){
		try {
			if(searchType.equals("member")){
				return nameFormatter(tithingDAO.getTransactionsMember(encoder(memberId), getDatefromString(startDate), getDatefromString(endDate)));
			}else if(searchType.equals("family")){
				return nameFormatter(tithingDAO.getTransactionsFamily(encoder(familyId), getDatefromString(startDate), getDatefromString(endDate)));
			}else{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Secured("ROLE_ADMIN")
	public List<Payment> getlatestPaymentTransactions(){
		List<Payment> payments = tithingDAO.getlatestPaymentTransactions();		
		return payments;		
	}
	
	
	@Secured("ROLE_ADMIN")//Get Receipt by Transaction Id
	public Tithe getTitheByTransactId(long transactId){
		return tithingDAO.getTitheByTransactId(transactId);
		
	}
	
	@Secured("ROLE_ADMIN")//Get Payment by Transaction Id
	public Payment getPaymentByTransactId(long transactId){
		return tithingDAO.getPaymentByTransactId(transactId);
		
	}
	
	
	@Secured("ROLE_ADMIN")//Delete Receipt Transaction
	public void deleteTransaction (long transactId){
		tithingDAO.deleteTransaction(transactId);
	}
	
	@Secured("ROLE_ADMIN")//Delete Payment Transaction
	public void deletePaymentTransaction (long transactId){
		tithingDAO.deletePaymentTransaction(transactId);
	}
	
	public ReceiptsTransactionSignoff getReceiptTransactionStatusbyID(long transactId){
		return tithingDAO.getReceiptTransactionStatusbyID(transactId);
	}
	
	@Secured("ROLE_ADMIN")
	public void addTithingTransaction(HttpServletRequest request, String principal) throws Exception {
		BigDecimal totalFAmount = new BigDecimal(0);
		BigDecimal amount= new BigDecimal(0);
		boolean isUpdate = true;
		
		if (HTTPUtils.validateParameter(request, "memberId")
				&& HTTPUtils.validateParameter(request, "checkDate")
				&& HTTPUtils.validateParameter(request, "paymentType")
				&& HTTPUtils.validateParameter(request, "amount")
				&& HTTPUtils.validateParameter(request, "transactStatus")) {
						
			try {
				
				Tithe tithe= null;
				Member member =null;
				if(HTTPUtils.validateParameter(request, "transactionId")){//If transaction Id exists, Then its an existing entry.
				tithe = tithingDAO.getTitheByTransactId(Long.parseLong(request.getParameter("transactionId")));			
				}
				else{//Creating new Tithe Object
					isUpdate = false;
					
					tithe = new Tithe();
					member = directoryServiceImpl.getMember(Long.parseLong(request.getParameter("memberId")));
					tithe.setMemberID(encoder(Long.toString(member.getMemberId())));
					tithe.setFamilyID(encoder(Long.toString(member.getFamilyId())));
				 logger.debug("Adding a new Tithing transaction");
				}
								
		
				tithe.setPaymentType(request.getParameter("paymentType").trim());
				amount=new BigDecimal(request.getParameter("amount").trim().replace(",", ""));
				tithe.setAmount(amount);
				tithe.setDateRecieved(getDatefromString(request.getParameter("checkDate").trim().split(" ")[0]));
				tithe.setTransactStatus(request.getParameter("transactStatus").trim());
				tithe.setLastUpdatedBy(principal);
				tithe.setLastUpdatedAt(new Date());
				
				
				if (HTTPUtils.validateParameter(request, "checkInfo")){
				tithe.setCheckInfo(request.getParameter("checkInfo").trim());	
				}
				
				if(HTTPUtils.validateParameter(request, "checkDate")){
					tithe.setCheckDate(getDatefromString(request.getParameter("checkDate").trim().split(" ")[0]));
				}
				
				if(!isUpdate){//Do only for New Tithing transactions. Updates do not support updating subtransactions. Handle in future release.)
				List<TitheSubLedger> subtransacts = new ArrayList<TitheSubLedger>();
				for(int i=1; i<=5;i++){
					if (HTTPUtils.validateParameter(request, "subAmount"+i) &&
						HTTPUtils.validateParameter(request, "subTransactType"+i)){	
						totalFAmount = totalFAmount.add(new BigDecimal(request.getParameter("subAmount"+i).trim().replace(",", "")));
						
						TitheSubLedger subLedger = new TitheSubLedger();
						subLedger.setAccountType(request.getParameter("subTransactType"+i).trim());
						subLedger.setMemo(request.getParameter("details"+i).trim());
					
						
						subLedger.setAmount(new BigDecimal(request.getParameter("subAmount"+i).trim().replace(",", "")));
						subtransacts.add(subLedger);
					}					
				}
				
				tithe.setSubTransactions(subtransacts);	
				
				}
				
				
				if(isUpdate){
				//Save/Update Transaction
				tithingDAO.addTithingTransaction(tithe);
				if(request.getParameter("transactStatus").equalsIgnoreCase(AppConstant.TRANSACTION_STATUS_SIGNOFF)){
					ReceiptsTransactionSignoff transactionSignoff = new ReceiptsTransactionSignoff();
					transactionSignoff.setAccountName(request.getParameter("accountName").trim());
					transactionSignoff.setSignoffBy(request.getParameter("signoffBy").trim());
					transactionSignoff.setSignofffDate(getDatefromString(request.getParameter("signofffDate").trim().split(" ")[0]));
					transactionSignoff.setStatementTransactID(request.getParameter("statementTransactID").trim());
					transactionSignoff.setTransactionId(tithe.getTransactionId());
					transactionSignoff.setTransactType(AppConstant.TRANSACTION_RECEIPT);
					
					tithingDAO.addReceiptSignoffStatus(transactionSignoff);
					
				}
				} else {
					
					if(!amount.equals(totalFAmount))
						{
						throw new Exception("The Total Amount and the sum of sub account ammounts does not match. Please verify the data.");	
						}
					//Save/Update Transaction
					tithingDAO.addTithingTransaction(tithe);				
				}
				
				
							
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				logger.warn(e.getMessage(),e);
				throw new Exception("Internal Error : " +e.getMessage());
			} 		

			
			
		}else{
			
			logger.error("Invalid Request Parameters.");
			throw new Exception("Invalid Request Parameters.");
		}

	}
	
	
	public ModelMap getTransactionsFamily(String year, long familyId,ModelMap modelMap) throws Exception{
		
		BigDecimal result = new BigDecimal(0);
		
		List<Tithe> tithes = tithingDAO.getTransactionsFamily(year, encoder(String.valueOf(familyId)));
	
			for(Tithe t:tithes){
				String mID= decoder(t.getMemberID());
				Member m =directoryServiceImpl.getMember(Long.parseLong(mID));
				t.setMemberID(m.getFirstName() + " " + m.getLastName());
				result = result.add(t.getAmount());
			}
			modelMap.addAttribute("tithes",tithes);
			modelMap.addAttribute("year",year);
			modelMap.addAttribute("total",result);
			modelMap.addAttribute("totalcount",tithes.size());
			return modelMap;
	}
	
public ModelMap getTransactionsMember(String year, long memberId,ModelMap modelMap) throws Exception{
	
	Member m =directoryServiceImpl.getMember(memberId);
		BigDecimal result = new BigDecimal(0);
		
		List<Tithe> tithes = tithingDAO.getTransactionsMember(year, encoder(String.valueOf(memberId)));
	
			for(Tithe t:tithes){
				t.setMemberID(m.getFirstName() + " " + m.getLastName());
				result = result.add(t.getAmount());
			}
			modelMap.addAttribute("tithes",tithes);
			modelMap.addAttribute("year",year);
			modelMap.addAttribute("total",result);
			modelMap.addAttribute("totalcount",tithes.size());
			return modelMap;
	}
	
	
	
	private Date getDatefromString(String date) throws ParseException{
		//Expected Date Format "2012-02-18"
		String startDateString = date;
	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
	    Date startDate = null;
	    
	   startDate = df.parse(startDateString);	        
	   
	    return startDate;
	}
	
	private String encoder(String id) throws Exception{
		
		byte[] encoded = Base64.encode(id.getBytes());
		return new String(encoded);
	}
	
	private String decoder(String id){
		byte[] decoded = Base64.decode(id.getBytes());
		return new String(decoded);
	}
	
	public List<Tithe> getTransactionsMonthYear(String fromDate, String toDate) throws ParseException{	
		List<Tithe> tithes = tithingDAO.getTransactionsMonthYear(getDatefromString(fromDate), getDatefromString(toDate));
		for(Tithe t:tithes){
			String mID= decoder(t.getMemberID());
			Member m =directoryServiceImpl.getMember(Long.parseLong(mID));
			t.setMemberID(m.getFirstName() + " " + m.getLastName());
			}
		return tithes;
	}
	
	public List<Payment> getPaymentsMonthYear(String fromDate, String toDate) throws ParseException{	
		List<Payment> payments = tithingDAO.getPaymentMonthYear(getDatefromString(fromDate), getDatefromString(toDate));
		return payments;
	}
	
	public void titheReceiptGroupByType(String fromDate, String toDate) throws ParseException{	
		tithingDAO.titheReceiptGroupByType(getDatefromString(fromDate), getDatefromString(toDate));
	
	}
	
	//Get Receipts grouped by | sum by type
	public Map<String, BigDecimal> titheReceiptGroupByType(List<Tithe> tithes){	
		Map<String, BigDecimal> receiptByGroup = new HashMap<String, BigDecimal>();
		if(tithes!=null) {
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
		
		return receiptByGroup;
	
	}
	
	//Get Payments grouped by | sum by type
		public Map<String, BigDecimal> tithePaymentGroupByType(List<Payment> payments){	
			Map<String, BigDecimal> paymentByGroup = new HashMap<String, BigDecimal>();
			for(Payment t: payments){
			
					if(paymentByGroup.containsKey(t.getMemo())){
						BigDecimal slAmt = (BigDecimal) paymentByGroup.get(t.getMemo());					
						paymentByGroup.put(t.getMemo(), slAmt.add(t.getAmount()));
						
					}else{
						paymentByGroup.put(t.getMemo(), t.getAmount());
					}				
				
			}		
			return paymentByGroup;
		
		}
	
	@Secured("ROLE_ADMIN")
	public void addUpdatePayment(HttpServletRequest request, String principal) throws Exception{
		
		if (HTTPUtils.validateParameter(request, "checkDate")
				&& HTTPUtils.validateParameter(request, "amount")
				&& HTTPUtils.validateParameter(request, "subTransactType")) {
			
			BigDecimal amount= new BigDecimal(0);
			Payment payment;
						
			if(HTTPUtils.validateParameter(request, "transactionId")){//If transaction Id exists, Then its an existing entry.
				payment = tithingDAO.getPaymentByTransactId(Long.parseLong(request.getParameter("transactionId")));			
				}
				else{//Creating new Payment Object
					payment = new Payment();										
				 logger.debug("Adding a new Payment transaction");
				}
								
				
				payment.setPaymentType(request.getParameter("paymentType").trim());
				amount=new BigDecimal(request.getParameter("amount").trim());
				payment.setAmount(amount);
				payment.setCheckDate(getDatefromString(request.getParameter("checkDate").trim().split(" ")[0]));
				payment.setTransactStatus(request.getParameter("transactStatus").trim());
				payment.setLastUpdatedBy(principal);
				payment.setLastUpdatedAt(new Date());
				payment.setMemo(request.getParameter("subTransactType").trim());
				
				if (HTTPUtils.validateParameter(request, "checkInfo")){
					payment.setCheckInfo(request.getParameter("checkInfo").trim());	
					}
				
				if (HTTPUtils.validateParameter(request, "details")){
				payment.setDetail(request.getParameter("details").trim());
				}
				
				tithingDAO.addUpdatePaymentTransaction(payment);
		}
		
	}
}
