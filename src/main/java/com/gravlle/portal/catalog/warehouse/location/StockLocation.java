package com.gravlle.portal.catalog.warehouse.location;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.gravlle.portal.catalog.product.inventory.Inventory;
import com.gravlle.portal.catalog.warehouse.Warehouse;

@Entity
@Table(name = "catalog_stock_location")
public class StockLocation implements Serializable {

	private static final long serialVersionUID = 319873569070021826L;

	@Id
	@GeneratedValue
	private long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "warehouse")
	private Warehouse warehouse;

	private String aisle;
	private String section;
	private String shelf;
	private String bin;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "inventory")
	private Inventory inventory;

	@Column(name = "last_updated_by", nullable = false, length = 50)
	private String lastUpdatedBy;

	@Column(name = "last_updated_at", nullable = false)
	private Date lastUpdatedAt = new Date();

	public String getAisle() {
		return aisle;
	}

	public void setAisle(String aisle) {
		this.aisle = aisle;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getShelf() {
		return shelf;
	}

	public void setShelf(String shelf) {
		this.shelf = shelf;
	}

	public String getBin() {
		return bin;
	}

	public void setBin(String bin) {
		this.bin = bin;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	public Inventory getInventory() {
		return inventory;
	}

	public void setInventory(Inventory inventory) {
		this.inventory = inventory;
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

}