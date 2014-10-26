package com.gravlle.portal.templateEngine;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="catalog_gravlle_form_template")
public class GravlleTemplate {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable=false,length=70,unique = true)
	private String name;

	@Column(name="form", columnDefinition="LONGTEXT")
	private String jsonString;
	
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
	public String getJsonString() {
		return jsonString;
	}
	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}
}
