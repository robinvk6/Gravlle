/**
 * **********************************************************************
 *
 * Copyright 2012 - ICANJ
 *
 ***********************************************************************
 */
package org.icanj.app.assets.inventory;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.FetchType;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.icanj.app.directory.entity.Member;

@Entity
@Table(name = "INVENTORY")
public class Inventory implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 8329638216112300626L;
    @Id
    @Column(name = "INVENTORY_ID", unique = true, nullable = false)
    @GeneratedValue
    private long inventoryId;
    
    @Column(name = "INVENTORY_NAME", nullable = false, length = 100)
    private String inventoryName;
    
    @Column(name = "INVENTORY_DESCRIPTION", nullable = false, length = 100)
    private String inventoryDescription;
    
    @Column(name = "INVENTORY_COUNT", nullable = false, length = 50)
    private long inventoryCount;
    
    @Column(name = "INVENTORY_PRICE")
    private String inventoryPriceRange;
    
    public String getInventoryPriceRange() {
		return inventoryPriceRange;
	}

	public void setInventoryPriceRange(String inventoryPriceRange) {
		this.inventoryPriceRange = inventoryPriceRange;
	}

	@Column(name = "BAR_CODE", length = 10)
    private String barCode;
    
    @Column(name = "LAST_UPDATED_TIMESTAMP", nullable=false)
    private Date lastUpdatedAt;

    @Column(name="LAST_UPDATED_BY", nullable=false)
    private String lastUpdatedBy;
    
    @Column(name="INVENTORY_GROUPID", nullable=false)
    private long inventoryGroupId;

    
    // Getters and Setters
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
    
    
    public long getInventoryGroupId() {
        return inventoryGroupId;
    }

    public void setInventoryGroupId(long inventoryGroupId) {
        this.inventoryGroupId = inventoryGroupId;
    }

    public long getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(long inventoryId) {
        this.inventoryId = inventoryId;
    }

    public String getInventoryDescription() {
        return inventoryDescription;
    }

    public void setInventoryDescription(String inventoryDescription) {
        this.inventoryDescription = inventoryDescription;
    }

    public String getInventoryName() {
        return inventoryName;
    }

    public void setInventoryName(String inventoryName) {
        this.inventoryName = inventoryName;
    }

    public long getInventoryCount() {
        return inventoryCount;
    }

    public void setInventoryCount(long inventoryCount) {
        this.inventoryCount = inventoryCount;
    }

	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

}
