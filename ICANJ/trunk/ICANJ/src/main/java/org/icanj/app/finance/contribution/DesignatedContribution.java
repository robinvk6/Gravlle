package org.icanj.app.finance.contribution;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="DESIGNATED_CONTRIBUTION")

public class DesignatedContribution {
	
	@Id
	@GeneratedValue
	@Column(name="TRANSACTION_ID" , nullable=false)
	private long transactionId;
	
	@Column(name="MEMBER_ID", nullable=false)
	private String memberID;
	
	@Column(name="FAMILY_ID", nullable=false)
	private long familyID;			
	
	@Column(name="CHECK_DATE", nullable=false)
	private Date checkDate;
	
	@Column(name="CHECK_INFO", nullable=false)
	private String checkInfo;
	
	@Column(name="CHECK_PURPOSE")
	private String checkMemo;
	
	@Column(name="RECIPIENTS_NAME", nullable=false)
	private String recipientsName;
	
	@Column(name="RECIPIENTS_ADDRESS", nullable=false)
	private String recipientsAddress;
	
	@Column(name="LOCATION", nullable=false)
	private String locationAddress;
	
	@Column(name="TRANSACTION_AMOUNT", nullable=false)
	private BigDecimal amount;	
		
	@Column(name="LAST_UPDATED_BY", nullable=false)
	private String lastUpdatedBy;
	
	@Column(name="LAST_UPDATED_DATE", nullable=false)
	private Date lastUpdatedAt;
	
	@Column(name="TRANSACTION_STATUS", nullable=false)
	private String transactStatus;
	
	@Column(name="REQUEST_DATE", nullable=false)
	private Date requestDate;
	
	@Column(name="REIMBURSED_AMOUNT")
	private BigDecimal paidAmount;
	
	@Column(name="REIMBURSED_DATE")
	private Date paidDate;
	
	@Column(name="REIMBURSED_CHECK_NUMBER")
	private String paidCheckNumber;


	public long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(long transactionId) {
		this.transactionId = transactionId;
	}

	public String getMemberID() {
		return memberID;
	}

	public void setMemberID(String memberID) {
		this.memberID = memberID;
	}

	public long getFamilyID() {
		return familyID;
	}

	public void setFamilyID(long familyID) {
		this.familyID = familyID;
	}

	public Date getCheckDate() {
		return checkDate;
	}

	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}

	public String getCheckInfo() {
		return checkInfo;
	}

	public void setCheckInfo(String checkInfo) {
		this.checkInfo = checkInfo;
	}

	public String getCheckMemo() {
		return checkMemo;
	}

	public void setCheckMemo(String checkMemo) {
		this.checkMemo = checkMemo;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getLastUpdatedBy() {
		return lastUpdatedBy;
	}

	public void setLastUpdatedBy(String lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}

	public Date getLastUpdatedAt() {
		return lastUpdatedAt;
	}

	public void setLastUpdatedAt(Date lastUpdatedAt) {
		this.lastUpdatedAt = lastUpdatedAt;
	}

	public String getTransactStatus() {
		return transactStatus;
	}

	public void setTransactStatus(String transactStatus) {
		this.transactStatus = transactStatus;
	}

	public Date getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	public String getRecipientsName() {
		return recipientsName;
	}

	public void setRecipientsName(String recipientsName) {
		this.recipientsName = recipientsName;
	}

	public String getRecipientsAddress() {
		return recipientsAddress;
	}

	public void setRecipientsAddress(String recipientsAddress) {
		this.recipientsAddress = recipientsAddress;
	}

	public String getLocationAddress() {
		return locationAddress;
	}

	public void setLocationAddress(String locationAddress) {
		this.locationAddress = locationAddress;
	}

	public BigDecimal getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(BigDecimal paidAmount) {
		this.paidAmount = paidAmount;
	}

	public Date getPaidDate() {
		return paidDate;
	}

	public void setPaidDate(Date paidDate) {
		this.paidDate = paidDate;
	}

	public String getPaidCheckNumber() {
		return paidCheckNumber;
	}

	public void setPaidCheckNumber(String paidCheckNumber) {
		this.paidCheckNumber = paidCheckNumber;
	}
		 
}
