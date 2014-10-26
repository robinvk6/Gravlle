/************************************************************************
 * 
 * Copyright 2012 - ICANJ
 * 
 ************************************************************************/

package org.icanj.app.assets.inventory;

import java.io.Serializable;
import java.util.Date;
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
import org.icanj.app.directory.entity.Member;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "INVENTORY_GROUP")
public class InventoryGroup implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6829528968442677306L;

	@Id
	@Column(name = "INVENTORY_GROUP_ID")
	@GeneratedValue
	private long inventoryGroupId;

	@Column(name = "INVENTORY_GROUP_NAME", nullable = false, length = 100)
	private String inventoryGroupName;

	@Column(name = "INVENTORY_GROUP_DESCRIPTION", length = 100)
	private String inventoryGroupDescription;

	@Column(name = "LAST_UPDATED_TIMESTAMP", nullable = false)
	private Date lastUpdatedAt;

	@Column(name = "LAST_UPDATED_BY", nullable = false)
	private String lastUpdatedBy;


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

	public String getInventoryGroupDescription() {
		return inventoryGroupDescription;
	}

	public void setInventoryGroupDescription(String inventoryGroupDescription) {
		this.inventoryGroupDescription = inventoryGroupDescription;
	}

	public long getInventoryGroupId() {
		return inventoryGroupId;
	}

	public void setInventoryGroupId(long inventoryGroupId) {
		this.inventoryGroupId = inventoryGroupId;
	}

	public String getInventoryGroupName() {
		return inventoryGroupName;
	}

	public void setInventoryGroupName(String inventoryGroupName) {
		this.inventoryGroupName = inventoryGroupName;
	}
	

}
