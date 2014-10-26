package org.icanj.app.directory.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;
import javax.persistence.UniqueConstraint;

@Component
@Entity
@Table(name = "RESOURCES_IMAGE", uniqueConstraints = @UniqueConstraint(columnNames = {"PICTURE_KEY", "PICTURE_KEYTYPE"}))
public class ImageModel {
	
	@Id
	@Column(name = "PICTURE_ID")
	@GeneratedValue
	private long iD;
	@Column(name = "PICTURE_KEY")
	private long key;
	@Column(name = "PICTURE_NAME")
	private String pictureName;
	@Column(name = "PICTURE_DESC")
	private String pictureDescription;
	@Column(name = "PICTURE_URL")
	private String resourceUrl;
	@Column(name = "PICTURE_KEYTYPE")
	private String keyType;
	
	
	
	public long getiD() {
		return iD;
	}
	public void setiD(long iD) {
		this.iD = iD;
	}
	public long getKey() {
		return key;
	}
	public void setKey(long key) {
		this.key = key;
	}
	public String getPictureName() {
		return pictureName;
	}
	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}
	public String getPictureDescription() {
		return pictureDescription;
	}
	public void setPictureDescription(String pictureDescription) {
		this.pictureDescription = pictureDescription;
	}
	public String getResourceUrl() {
		return resourceUrl;
	}
	public void setResourceUrl(String resourceUrl) {
		this.resourceUrl = resourceUrl;
	}
	public String getKeyType() {
		return keyType;
	}
	public void setKeyType(String keyType) {
		this.keyType = keyType;
	}
}
