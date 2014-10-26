package org.icanj.app.tithing;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TITHE_SUB_ACCOUNTS")
public class TitheSubLedger {
	
	@Id
    @GeneratedValue
    @Column(name="sub_transaction_id")
	private long subTransactionId;
	
	@Column(name="sub_transaction_type")
	private String accountType;
	
	@Column(name="sub_transaction_amount")
	private BigDecimal amount;
	
	@ManyToOne
	@JoinColumn(name="transaction_id")
	private Tithe tithe;
	
	@Column(name="transaction_details")
	private String memo;
	
	public long getSubTransactionId() {
		return subTransactionId;
	}
	public void setSubTransactionId(long subTransactionId) {
		this.subTransactionId = subTransactionId;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public Tithe getTithe() {
		return tithe;
	}
	public void setTithe(Tithe tithe) {
		this.tithe = tithe;
	}
	
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
}
