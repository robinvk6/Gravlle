package org.icanj.app.tithing;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="TITHING")
public class Tithe {
	
	@Id
	@GeneratedValue
	@Column(name="TRANSACTION_ID" , nullable=false)
	private long transactionId;
	
	@Column(name="MEMBER_ID", nullable=false)
	private String memberID;
	
	@Column(name="FAMILY_ID", nullable=false)
	private String familyID;			
	
	@Column(name="TRANSACTION_DATE", nullable=false)
	private Date dateRecieved;
	
	@Column(name="CHECK_DATE")
	private Date checkDate;
	
	@Column(name="TRANSACTION_TYPE", nullable=false)
	private String paymentType;
	
	@Column(name="CHECK_INFO")
	private String checkInfo;
	
	@Column(name="TRANSACTION_AMOUNT", nullable=false)
	private BigDecimal amount;
	
		
	@Column(name="LAST_UPDATED_BY", nullable=false)
	private String lastUpdatedBy;
	
	@Column(name="LAST_UPDATED_DATE", nullable=false)
	private Date lastUpdatedAt;
	
	@Column(name="TRANSACTION_STATUS", nullable=false)
	private String transactStatus;
	
	@OneToMany(cascade={CascadeType.ALL},fetch = FetchType.EAGER)
	@JoinColumn(name="transaction_id")
	private List<TitheSubLedger> subTransactions;
	
	public String getTransactStatus() {
		return transactStatus;
	}
	public void setTransactStatus(String transactStatus) {
		this.transactStatus = transactStatus;
	}
	public String getMemberID() {
		return memberID;
	}
	public void setMemberID(String memberID) {
		this.memberID = memberID;
	}	
	
	public Date getLastUpdatedAt() {
		return lastUpdatedAt;
	}
	public void setLastUpdatedAt(Date lastUpdatedAt) {
		this.lastUpdatedAt = lastUpdatedAt;
	}
	public String getLastUpdatedBy() {
		return lastUpdatedBy;
	}
	public void setLastUpdatedBy(String lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}
	
	public Date getDateRecieved() {
		return dateRecieved;
	}
	public void setDateRecieved(Date dateRecieved) {
		this.dateRecieved = dateRecieved;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getCheckInfo() {
		return checkInfo;
	}
	public void setCheckInfo(String checkInfo) {
		this.checkInfo = checkInfo;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	public long getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(long transactionId) {
		this.transactionId = transactionId;
	}

	public String getFamilyID() {
		return familyID;
	}
	public void setFamilyID(String familyID) {
		this.familyID = familyID;
	}
	public List<TitheSubLedger> getSubTransactions() {
		return subTransactions;
	}
	public void setSubTransactions(List<TitheSubLedger> subTransactions) {
		this.subTransactions = subTransactions;
	}
	

}
