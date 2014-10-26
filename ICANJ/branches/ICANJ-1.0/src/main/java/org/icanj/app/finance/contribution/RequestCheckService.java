package org.icanj.app.finance.contribution;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.directory.service.DirectoryService;
import org.icanj.app.utils.HTTPUtils;
import org.icanj.app.utils.UtilityMethods;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestCheckService {

	private static final Logger logger = LoggerFactory
			.getLogger(RequestCheckService.class);

	@Autowired
	private DirectoryService directoryServiceImpl;

	@Autowired
	private RequestCheckDao requestCheckDao;

	public void addDesignatedContribution(HttpServletRequest request,
			Principal principal) throws Exception {

		boolean isUpdate = true;

		if (principal.getName() != null && HTTPUtils.validateParameter(request, "recipientsName")
				&& HTTPUtils.validateParameter(request, "recipientsAddress")
				&& HTTPUtils.validateParameter(request, "amount")) {

			try {

				DesignatedContribution contribution = null;
				Member member = directoryServiceImpl
						.getMemberFromPrincipal(principal.getName());
				if (HTTPUtils.validateParameter(request, "transactionId")) {// If
																			// transaction
																			// Id
																			// exists,
																			// Then
																			// its
																			// an
																			// existing
																			// entry.
					contribution = requestCheckDao.getContributionById(Long
							.parseLong(request.getParameter("transactionId")));
					if (!(contribution.getFamilyID() == member.getFamilyId())) {
						throw new Exception("The Principal : "
								+ principal.getName()
								+ " is only allowed to edit this transaction.");
					}
				} else {// Creating new Tithe Object
					isUpdate = false;
					contribution = new DesignatedContribution();
					contribution
							.setMemberID(Long.toString(member.getMemberId()));
					contribution.setFamilyID(member.getFamilyId());
					logger.debug("Adding a new Check Request transaction");
				}

				BigDecimal amount = new BigDecimal(request.getParameter(
						"amount").trim());
				contribution.setAmount(amount);

				if (HTTPUtils.validateParameter(request, "transactStatus")) {
					String transacStatus = request.getParameter(
							"transactStatus").trim();
					contribution.setTransactStatus(transacStatus);
					if (transacStatus.equals("Completed")) {

						if (HTTPUtils.validateParameter(request, "paidAmount")
								&& HTTPUtils.validateParameter(request,
										"paidAmount")
								&& HTTPUtils.validateParameter(request,
										"paidAmount")) {

							BigDecimal paidAmount = new BigDecimal(request
									.getParameter("paidAmount").trim());
							contribution.setPaidAmount(paidAmount);
							contribution.setPaidDate(UtilityMethods
									.getDatefromString(request
											.getParameter("paidDate").trim()
											.split(" ")[0]));
							contribution.setPaidCheckNumber(request
									.getParameter("paidCheckNumber"));

						} else {
							throw new Exception(
									"Please fill in the mandatory reimbursement fields");
						}

					}
				} else {
					contribution.setTransactStatus("Pending");
				}

				contribution.setRecipientsName(request.getParameter(
						"recipientsName").trim());
				contribution.setRecipientsAddress(request.getParameter(
						"recipientsAddress").trim());
				contribution.setCheckMemo(request.getParameter("checkMemo")
						.trim());// Purpose of Payment
				contribution.setLocationAddress(request.getParameter(
						"recipientsAddress").trim());
				contribution.setLastUpdatedBy(principal.getName());
				contribution.setLastUpdatedAt(new Date());

				if (HTTPUtils.validateParameter(request, "checkDate")) {
					contribution.setCheckDate(UtilityMethods
							.getDatefromString(request
									.getParameter("checkDate").trim()
									.split(" ")[0]));
					contribution.setRequestDate(new Date());
				}

				if (HTTPUtils.validateParameter(request, "checkInfo")) {
					contribution.setCheckInfo(request.getParameter("checkInfo")
							.trim());
				}

				requestCheckDao.addOrUpdateCheckRequest(contribution);

			} catch (Exception e) {
				logger.warn(e.getMessage(), e);
				throw new Exception("Internal Error : " + e.getMessage());
			}

		} else {

			logger.error("Invalid Request Parameters.");
			throw new Exception(
					"The check request could not be processed at this time. Invalid Request Parameters.");
		}

	}

	public List<DesignatedContribution> getLatestTransactions() {
		return requestCheckDao.getLatestTransactions();
	}

	public List<DesignatedContribution> getLatestTransactions(
			Principal principal) {
		Member m = directoryServiceImpl.getMemberFromPrincipal(principal
				.getName());
		return requestCheckDao.getLatestTransactions(m.getFamilyId());
	}

	public List<DesignatedContribution> getTransactionsForStatus(
			String transactStatus) {
		List<DesignatedContribution> contributions = requestCheckDao
				.getPendingTransactions(transactStatus);
		for (DesignatedContribution dc : contributions) {
			Member m = directoryServiceImpl.getMember(Long.parseLong(dc
					.getMemberID()));
			dc.setMemberID(m.getFirstName() + " " + m.getLastName());
		}
		return contributions;
	}
	
	public DesignatedContribution getContributionById(long cId){
		return requestCheckDao.getContributionById(cId);
	}
}
