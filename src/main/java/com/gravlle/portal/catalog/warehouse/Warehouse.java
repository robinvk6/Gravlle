package com.gravlle.portal.catalog.warehouse;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gravlle.portal.catalog.warehouse.location.StockLocation;
import com.gravlle.portal.common.domain.AbstractEntity;
import com.gravlle.portal.common.domain.Address;

@Entity
@Table(name="catalog_warehouse")
public class Warehouse extends AbstractEntity implements Serializable{	

	private static final long serialVersionUID = -5345579411369637745L;
	
	@ManyToOne(fetch =FetchType.EAGER,cascade= {CascadeType.ALL})
	@JoinColumn(name="address_id")
	private Address address;
	
	@JsonIgnore
	@OneToMany(mappedBy="warehouse",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private Set<StockLocation> stockLocations ;
	
	private String phone;
	
	private String email;
	
	private String warehouseOpenTime;
	
	private String warehouseCloseTime;
	
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getWarehouseOpenTime() {
		return warehouseOpenTime;
	}
	public void setWarehouseOpenTime(String warehouseOpenTime) {
		this.warehouseOpenTime = warehouseOpenTime;
	}
	public String getWarehouseCloseTime() {
		return warehouseCloseTime;
	}
	public void setWarehouseCloseTime(String warehouseCloseTime) {
		this.warehouseCloseTime = warehouseCloseTime;
	}
	public Set<StockLocation> getStockLocations() {
		return stockLocations;
	}
	public void setStockLocations(Set<StockLocation> stockLocations) {
		this.stockLocations = stockLocations;
	}
	
	@Override
	public String toString() {
		return "Warehouse [address=" + address + ", stockLocations="
				+ stockLocations + ", phone=" + phone + ", email=" + email
				+ ", warehouseOpenTime=" + warehouseOpenTime
				+ ", warehouseCloseTime=" + warehouseCloseTime + ", getId()="
				+ getId() + ", getName()=" + getName() + "]";
	}
	
	
}
