package com.gravlle.portal.catalog.category;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gravlle.portal.templateEngine.GravlleTemplate;

@Entity
@Table(name="catalog_category",uniqueConstraints = { @UniqueConstraint(columnNames = {
		"name", "parent_category" }) })
public class Category implements Serializable{

	
	private static final long serialVersionUID = 5441613952548341105L;
    
	@Id
    @GeneratedValue
    @Column(name = "id")
	private long id;
	
    @Column(name = "name",nullable=false,length=100)
	private String name;
    
    @Column(name="last_updated_by", nullable=false , length=50)
	private String lastUpdatedBy;
    
    @Column(name="last_updated_at", nullable=false)
	private Date lastUpdatedAt = new Date();
	
	@ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name="parent_category")
    private Category parent;
    
    private boolean rootCategory;
    
    
    @ManyToOne(cascade=CascadeType.ALL)
    private GravlleTemplate template;

	public Category getParent() {
		return parent;
	}

	public void setParent(Category parent) {
		this.parent = parent;
	}

	public boolean isRootCategory() {
		return rootCategory;
	}

	public void setRootCategory(boolean rootCategory) {
		this.rootCategory = rootCategory;
	}

	public GravlleTemplate getTemplate() {
		return template;
	}

	public void setTemplate(GravlleTemplate template) {
		this.template = template;
	}

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

	@Override
	public String toString() {
		return "Category [parent=" + parent + ", rootCategory=" + rootCategory
				+ ", template=" + template + ", getId()=" + getId()
				+ ", getName()=" + getName() + "]";
	}
}
