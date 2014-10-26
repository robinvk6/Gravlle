package com.gravlle.portal.common.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class AbstractEntity {
	
	@Id
    @GeneratedValue
    @Column(name = "id")
	private long id;
	
    @Column(name = "name",nullable=false,unique=true,length=100)
	private String name;
    
    @Column(name="last_updated_by", nullable=false , length=50)
	private String lastUpdatedBy;
    
    @Column(name="last_updated_at", nullable=false)
	private Date lastUpdatedAt = new Date();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
