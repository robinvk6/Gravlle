package org.icanj.app.tithing;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.icanj.app.directory.entity.Address;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.finance.contribution.DesignatedContribution;
import org.icanj.app.finance.contribution.RequestCheckService;
import org.icanj.app.utils.AppConstant;
import org.icanj.app.utils.JSPAlert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/Admin/Tithe")
public class TithingController {

	private static final Logger logger = LoggerFactory
			.getLogger(TithingController.class);

	@Autowired
	private TithingService tithingService;
	
	@Autowired
	private DirectoryService directoryServiceImpl;
	
	@Autowired
	private RequestCheckService checkService;

	@RequestMapping(value = "/AddTithe", method = RequestMethod.POST)
	public ModelAndView addorUpdateTithe(HttpServletRequest request,
			Principal principal) {
		String responseUrl = "Tithe/adminLanding";
		ModelMap modelMap = new ModelMap();
		String message = "";
		modelMap.addAttribute("navSelected", "ReceiptManagement");
		try {
			String name = principal.getName();
			tithingService.addTithingTransaction(request, name);

			List<Tithe> tithes = tithingService.getlatestTransactions();
			message = "The transaction was added successfully !!!!";
			modelMap.addAttribute("tithes", tithes);
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
					message));
		
			return new ModelAndView(responseUrl, modelMap);
		} catch (Exception e) {
			message = "There was an error saving the transaction. Please contact the IT team.";
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
					message + " : " + e.getMessage()));
		
			return new ModelAndView(responseUrl, modelMap);
		}

	}
	
	
	@RequestMapping(value = "/AddPayment", method = RequestMethod.POST)
	public ModelAndView addorUpdatePayment(HttpServletRequest request,
			Principal principal) {
		String responseUrl = "Tithe/adminPayment";
		ModelMap modelMap = new ModelMap();
		String message = "";
		modelMap.addAttribute("navSelected", "PaymentManagement");
		try {
			String name = principal.getName();
			tithingService.addUpdatePayment(request, name);

			List<Payment> payments = tithingService.getlatestPaymentTransactions();
			message = "The payment was added successfully !!!!";
			modelMap.addAttribute("payments", payments);
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_SUCCESS_CODE, AppConstant.CSS_ALERT_SUCESS,
					message));
			return new ModelAndView(responseUrl, modelMap);
		} catch (Exception e) {
			message = "There was an error saving the payment. Please contact the IT team.";
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
					message + " : " + e.getMessage()));
			return new ModelAndView(responseUrl, modelMap);
		}

	}

	@RequestMapping(value = "/Admin", method = RequestMethod.GET)
	public ModelAndView adminLanding(ModelMap model) {
		ModelMap modelMap = new ModelMap();
		String responseUrl = "Tithe/adminLanding";
		modelMap.addAttribute("navSelected", "ReceiptManagement");
		List<Tithe> tithes;
		try {
			tithes = tithingService.getlatestTransactions();

			modelMap.addAttribute("tithes", tithes);

		} catch (Exception e) {
			logger.error("Error Retrieving Lastest Transactions: ", e);
			e.printStackTrace();
		}
		return new ModelAndView(responseUrl, modelMap);

	}

	
	@RequestMapping(value = "/Admin/Payment", method = RequestMethod.GET)
	public ModelAndView adminPaymentLanding(ModelMap model) {
		ModelMap modelMap = new ModelMap();
		String responseUrl = "Tithe/adminPayment";
		List<Payment> payments;
		modelMap.addAttribute("navSelected", "PaymentManagement");
		try {
			payments = tithingService.getlatestPaymentTransactions();
			modelMap.addAttribute("payments", payments);

		} catch (Exception e) {
			logger.error("Error Retrieving Lastest Payment Transactions: ", e);
			e.printStackTrace();
		}
		return new ModelAndView(responseUrl, modelMap);

	}
	
	//Generate Admin Receipt Report
	@RequestMapping(value = "/AdminReport")
	public ModelAndView adminReport(@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate,HttpServletRequest request) {
		ModelMap modelMap = new ModelMap();
		modelMap.addAttribute("navSelected", "ReceiptReporting");
		String responseUrl = "Tithe/adminReports";
		List<Tithe> tithes = null;
		String memberId = request.getParameter("memberId");
		try {
			
			
			if(fromDate!=null && !"".equals(fromDate) && 
					toDate!=null && !"".equals(toDate)){
				if(memberId !=null && !"".equalsIgnoreCase(memberId)) {
					tithes=tithingService.searchTransactions(memberId, "0", "member", fromDate, toDate);
				}else if(memberId==null || "".equalsIgnoreCase(memberId)) {
					tithes = tithingService.getTransactionsMonthYear(fromDate, toDate);
				}
				Map<String, BigDecimal> subAccounts = tithingService.titheReceiptGroupByType(tithes);
				BigDecimal totalAmount = new BigDecimal(0);
				for(BigDecimal valueBigDecimal :subAccounts.values()) {
					totalAmount=totalAmount.add(valueBigDecimal);
				}
				modelMap.addAttribute("subAccounts", subAccounts);
				modelMap.addAttribute("totalAmount", totalAmount);
				modelMap.addAttribute("tithes", tithes);
			}
			
		} catch (Exception e) {
			logger.error("Error Retrieving Lastest Transactions: ", e);
			e.printStackTrace();
		}
		return new ModelAndView(responseUrl, modelMap);

	}
	
	
	//Generate Admin Payments Report
		@RequestMapping(value = "/AdminPaymentReport")
		public ModelAndView adminPaymentsReport(@RequestParam("fromDate") String fromDate,
				@RequestParam("toDate") String toDate) {
			ModelMap modelMap = new ModelMap();
			modelMap.addAttribute("navSelected", "PaymentReporting");
			String responseUrl = "Tithe/adminPaymentReports";
			List<Payment> payments;
			try {
				if(fromDate!=null && !"".equals(fromDate) && 
						toDate!=null && !"".equals(toDate)){
					payments = tithingService.getPaymentsMonthYear(fromDate, toDate);
				modelMap.addAttribute("payments", payments);
				
				Map<String, BigDecimal> paymGroTotal = tithingService.tithePaymentGroupByType(payments);
				modelMap.addAttribute("subPayments", paymGroTotal);
				}
				
			} catch (Exception e) {
				logger.error("Error Retrieving Lastest Transactions: ", e);
				e.printStackTrace();
			}
			return new ModelAndView(responseUrl, modelMap);

		}
	
	
	//Edit Receipt Transaction
	@RequestMapping(value = "/EditReceipt/{transactionId}", method = RequestMethod.GET)
	public ModelAndView editReceipt(@PathVariable("transactionId") long transactionId) {
		String responseUrl = "Tithe/TitheEdit";
		Tithe tithe = tithingService.getTitheByTransactId(transactionId);
		ModelMap modelMap = new ModelMap();
		modelMap.addAttribute("tithe", tithe);
		modelMap.addAttribute("titheStatus", tithingService.getReceiptTransactionStatusbyID(transactionId));
		return new ModelAndView(responseUrl, modelMap);

	}
	
	//Edit Payment Transaction
		@RequestMapping(value = "/EditPayment/{transactionId}", method = RequestMethod.GET)
		public ModelAndView editPayment(@PathVariable("transactionId") long transactionId) {
			String responseUrl = "Tithe/paymentEdit";
			Payment payment = tithingService.getPaymentByTransactId(transactionId);
			ModelMap modelMap = new ModelMap();
			modelMap.addAttribute("payment", payment);
			return new ModelAndView(responseUrl, modelMap);

		}
	
	//Delete Receipt Transaction
	@RequestMapping(value = "/DeleteReceipt/{transactionId}", method = RequestMethod.GET)
	public ModelAndView deleteReceipt(@PathVariable("transactionId") long transactionId) {
		ModelMap modelMap = new ModelMap();
		String responseUrl = "Tithe/adminLanding";
		tithingService.deleteTransaction(transactionId);

		List<Tithe> tithes = null;
		try {
			tithes = tithingService.getlatestTransactions();
		} catch (Exception e) {
			modelMap.addAttribute("alert", new JSPAlert(
					AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
					e.getMessage()));
		}
		
		modelMap.addAttribute("tithes", tithes);
		return new ModelAndView(responseUrl, modelMap);

	}
	
	//Delete Payment Transaction
		@RequestMapping(value = "/DeletePayment/{transactionId}", method = RequestMethod.GET)
		public ModelAndView deletePayment(@PathVariable("transactionId") long transactionId) {
			ModelMap modelMap = new ModelMap();
			String responseUrl = "Tithe/adminPayment";
			tithingService.deletePaymentTransaction(transactionId);

			List<Payment> payments = null;
			try {
						payments = tithingService.getlatestPaymentTransactions();
			} catch (Exception e) {
				modelMap.addAttribute("alert", new JSPAlert(
						AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
						e.getMessage()));
			}
			
			modelMap.addAttribute("payments", payments);
			return new ModelAndView(responseUrl, modelMap);

		}
	
		@RequestMapping(value = "RequestCheck")
		public ModelAndView landingPage(Principal principal) {
			ModelMap modelMap = new ModelMap();
			String responseUrl = "Finance/ProcessCheckRequests";
			List<DesignatedContribution> lOfPendingChecks=null;
			List<DesignatedContribution> lOfProcessedChecks=null;
			try {
				lOfPendingChecks = checkService.getTransactionsForStatus("Pending");
				modelMap.addAttribute("lOfPendingChecks", lOfPendingChecks);
				
				lOfProcessedChecks = checkService.getTransactionsForStatus("Completed");
				modelMap.addAttribute("processedChecks", lOfProcessedChecks);
                                modelMap.addAttribute("navSelected", "DesignatedContributionRequest");
			} catch (Exception e) {
				logger.error("Error Retrieving Lastest Transactions: ", e);
				modelMap.addAttribute("alert", new JSPAlert(
						AppConstant.MSG_ERROR_CODE, AppConstant.CSS_ALERT_ERROR,
						 e.getMessage()));
			}
			return new ModelAndView(responseUrl, modelMap);

		}
		
		@RequestMapping(value = "/PrintCheck/{transactionId}")
		public ModelAndView printCheck(@PathVariable("transactionId") long id){
			ModelMap modelMap = new ModelMap();
			String responseUrl = "Finance/printCheck";
			DesignatedContribution contribution = checkService.getContributionById(id);
			Member member = directoryServiceImpl.getMember(Long.parseLong(contribution.getMemberID()));
			Address address= directoryServiceImpl.findAddressById(contribution.getFamilyID());
			modelMap.addAttribute("processedCheck", contribution);
			modelMap.addAttribute("address", address);
			modelMap.addAttribute("member", member);
			return new ModelAndView(responseUrl, modelMap);
		}
		
		@RequestMapping(value = "/Search")
		public ModelAndView search(){
			String responseUrl="Tithe/searchTransactions";
			ModelMap modelMap = new ModelMap();
			modelMap.addAttribute("navSelected", "SearchReceipts");
			return new ModelAndView(responseUrl, modelMap);
		}
		
		@RequestMapping(value = "/SearchTransactions")
		public ModelAndView searchTransactions(@RequestParam("memberId") String memberId,
				@RequestParam("familyId") String familyId,
				@RequestParam("searchType") String searchType,
				@RequestParam("startDate") String startDate,
				@RequestParam("endDate") String endDate){
			String responseUrl="Tithe/searchTransactions";
			ModelMap modelMap = new ModelMap();
			List<Tithe> tithes = tithingService.searchTransactions(memberId, familyId, searchType, startDate, endDate);
			modelMap.addAttribute("tithes", tithes);
			modelMap.addAttribute("navSelected", "SearchReceipts");
			return new ModelAndView(responseUrl, modelMap);
			
		}
		
		
}
