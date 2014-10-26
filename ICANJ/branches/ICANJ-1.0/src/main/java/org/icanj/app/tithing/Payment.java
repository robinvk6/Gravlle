package org.icanj.app.tithing;

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
@Table(name="PAYMENT")
public class Payment {

	@Id
	@GeneratedValue
	@Column(name="PAYMENT_ID" , nullable=false)
	private long transactionId;
	
	@Column(name="PAYMENT_DATE", nullable=false)
	private Date checkDate;
	
	@Column(name="PAYMENT_TYPE", nullable=false)
	private String paymentType;
	
	@Column(name="PAYMENT_CHECK_INFO")
	private String checkInfo;
	
	@Column(name="PAYMENT_AMOUNT", nullable=false)
	private BigDecimal amount;
	
	@Column(name="PAYMENT_MEMO", nullable=false)
	private String memo;
	
	@Column(name="PAYMENT_DETAILS")
	private String detail;
	
	
	@Column(name="LAST_UPDATED_BY", nullable=false)
	private String lastUpdatedBy;
	
	@Column(name="LAST_UPDATED_DATE", nullable=false)
	private Date lastUpdatedAt;
	
	@Column(name="PAYMENT_STATUS", nullable=false)
	private String transactStatus;
	
	
	
	public String getTransactStatus() {
		return transactStatus;
	}
	public void setTransactStatus(String transactStatus) {
		this.transactStatus = transactStatus;
	}
	
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
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
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public long getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(long transactionId) {
		this.transactionId = transactionId;
	}
	
	
}
