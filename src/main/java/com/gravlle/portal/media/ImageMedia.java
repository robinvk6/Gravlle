package com.gravlle.portal.media;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.InheritanceType;

@Entity
@Table(name="media_image")
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
public class ImageMedia implements Serializable{
	
	
	private static final long serialVersionUID = -9113258787564247890L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private long id;
	
	private String name;
	
	@Lob
	@Column(nullable=false, columnDefinition="mediumblob")
	private byte[] image;

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

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
}

