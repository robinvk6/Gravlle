package com.gravlle.portal.catalog.product.inventory;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.gravlle.portal.catalog.product.GravlleProduct;
import com.gravlle.portal.catalog.warehouse.location.StockLocation;

@Entity
@Table(name="catalog_product_inventory")
public class Inventory implements Serializable{
	

	private static final long serialVersionUID = 1L;
	
	@Id
    @Column(name="id", unique=true, nullable=false)
    @GeneratedValue(generator="gen")
    @GenericGenerator(name="gen", strategy="foreign", parameters=@Parameter(name="property", value="product"))    
	private long productId;		
	
	@OneToOne
    @PrimaryKeyJoinColumn
	private GravlleProduct product;
	
	private Double min_qty;
	
	private boolean backorders;
	
	@Column(nullable=false)
	private boolean is_in_stock;
	
	private Date low_stock_date;
	
	private Double notify_stock_qty;
	
	private Double qty_increments;
	
	@OneToMany(mappedBy="inventory",fetch=FetchType.EAGER)
	private Set<StockLocation> stockLocations = new HashSet<StockLocation>();
	
	@Column(name = "last_updated_by", nullable = false, length = 50)
	private String lastUpdatedBy;

	@Column(name = "last_updated_at", nullable = false)
	private Date lastUpdatedAt = new Date();

	public Double getMin_qty() {
		return min_qty;
	}
	public void setMin_qty(Double min_qty) {
		this.min_qty = min_qty;
	}
	public boolean isBackorders() {
		return backorders;
	}
	public void setBackorders(boolean backorders) {
		this.backorders = backorders;
	}

	public boolean isIs_in_stock() {
		return is_in_stock;
	}
	public void setIs_in_stock(boolean is_in_stock) {
		this.is_in_stock = is_in_stock;
	}
	public Date getLow_stock_date() {
		return low_stock_date;
	}
	public void setLow_stock_date(Date low_stock_date) {
		this.low_stock_date = low_stock_date;
	}
	public Double getNotify_stock_qty() {
		return notify_stock_qty;
	}
	public void setNotify_stock_qty(Double notify_stock_qty) {
		this.notify_stock_qty = notify_stock_qty;
	}
	public Double getQty_increments() {
		return qty_increments;
	}
	public void setQty_increments(Double qty_increments) {
		this.qty_increments = qty_increments;
	}
	public GravlleProduct getProduct() {
		return product;
	}
	public void setProduct(GravlleProduct product) {
		this.product = product;
	}
	public Set<StockLocation> getStockLocations() {
		return stockLocations;
	}
	public void setStockLocations(Set<StockLocation> stockLocations) {
		this.stockLocations = stockLocations;
	}
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
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
	@Override
	public String toString() {
		return "Inventory [productId=" + productId + ", product=" + product
				+ ", min_qty=" + min_qty + ", backorders=" + backorders
				+ ", is_in_stock=" + is_in_stock + ", low_stock_date="
				+ low_stock_date + ", notify_stock_qty=" + notify_stock_qty
				+ ", qty_increments=" + qty_increments + ", stockLocations="
				+ stockLocations + ", lastUpdatedBy=" + lastUpdatedBy
				+ ", lastUpdatedAt=" + lastUpdatedAt + "]";
	}
	
}