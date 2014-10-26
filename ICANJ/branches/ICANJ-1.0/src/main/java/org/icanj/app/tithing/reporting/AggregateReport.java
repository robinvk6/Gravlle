package org.icanj.app.tithing.reporting;

import java.math.BigDecimal;

public class AggregateReport {
	
	private String month;
	private BigDecimal totalReceiptAmount;
	private BigDecimal totalPaymentAmount;;
	private int receiptTransactions;
	private int paymentTransactions;
	
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public BigDecimal getTotalReceiptAmount() {
		return totalReceiptAmount;
	}
	public void setTotalReceiptAmount(BigDecimal totalReceiptAmount) {
		this.totalReceiptAmount = totalReceiptAmount;
	}
	public BigDecimal getTotalPaymentAmount() {
		return totalPaymentAmount;
	}
	public void setTotalPaymentAmount(BigDecimal totalPaymentAmount) {
		this.totalPaymentAmount = totalPaymentAmount;
	}
	public int getReceiptTransactions() {
		return receiptTransactions;
	}
	public void setReceiptTransactions(int receiptTransactions) {
		this.receiptTransactions = receiptTransactions;
	}
	public int getPaymentTransactions() {
		return paymentTransactions;
	}
	public void setPaymentTransactions(int paymentTransactions) {
		this.paymentTransactions = paymentTransactions;
	}
	

}
