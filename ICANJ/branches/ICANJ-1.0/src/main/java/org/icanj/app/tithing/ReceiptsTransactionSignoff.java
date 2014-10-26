package org.icanj.app.tithing;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="TRANSACTION_STATUS")
public class ReceiptsTransactionSignoff {
	
	@Id
	@Column(name="TRANSACTION_ID" , nullable=false)
	private long transactionId;
	
	@Column(name="TRANSACTION_TYPE", nullable=false)
	private String transactType;
	
	@Column(name="SIGNOFF_DATE", nullable=false)
	private Date signofffDate;
	
	@Column(name="APPROVER", nullable=false)
	private String signoffBy;
	
	@Column(name="STATEMENT_TRANSACTION_ID", nullable=false)
	private String statementTransactID;
	
	@Column(name="ACCOUNT_NAME")
	private String accountName;

	public long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(long transactionId) {
		this.transactionId = transactionId;
	}

	public String getTransactType() {
		return transactType;
	}

	public void setTransactType(String transactType) {
		this.transactType = transactType;
	}

	public Date getSignofffDate() {
		return signofffDate;
	}

	public void setSignofffDate(Date signofffDate) {
		this.signofffDate = signofffDate;
	}

	public String getSignoffBy() {
		return signoffBy;
	}

	public void setSignoffBy(String signoffBy) {
		this.signoffBy = signoffBy;
	}

	public String getStatementTransactID() {
		return statementTransactID;
	}

	public void setStatementTransactID(String statementTransactID) {
		this.statementTransactID = statementTransactID;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

}
