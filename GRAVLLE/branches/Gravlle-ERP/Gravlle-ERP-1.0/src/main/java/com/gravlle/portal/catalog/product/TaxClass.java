package com.gravlle.portal.catalog.product;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="catalog_tax_shipping_class")
public class TaxClass implements Serializable{
	
	
	private static final long serialVersionUID = 8947288346513214538L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(nullable=false ,unique = true)
	private String taxClassName;
	
	@Column(nullable=false)
	private double taxRate;
	
	@Column(nullable=false)
	private double shippingRate;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTaxClassName() {
		return taxClassName;
	}
	public void setTaxClassName(String taxClassName) {
		this.taxClassName = taxClassName;
	}
	public double getTaxRate() {
		return taxRate;
	}
	public void setTaxRate(double taxRate) {
		this.taxRate = taxRate;
	}
	public double getShippingRate() {
		return shippingRate;
	}
	public void setShippingRate(double shippingRate) {
		this.shippingRate = shippingRate;
	}
	
}
