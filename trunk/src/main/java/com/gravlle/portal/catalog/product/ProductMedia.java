package com.gravlle.portal.catalog.product;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.gravlle.portal.media.ImageMedia;

@Entity
@Table(name="catalog_product_media")
public class ProductMedia  extends ImageMedia{

	private static final long serialVersionUID = -7540569723660885403L;

	
	@ManyToOne
	@JoinColumn(name="product_id")
	private GravlleProduct product;
	
	private boolean thumbnail;
	private boolean smallImage;
	private boolean largeImage;
	private boolean sliderImage;
	
	
	public boolean isThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(boolean thumbnail) {
		this.thumbnail = thumbnail;
	}
	public boolean isSmallImage() {
		return smallImage;
	}
	public void setSmallImage(boolean smallImage) {
		this.smallImage = smallImage;
	}
	public boolean isLargeImage() {
		return largeImage;
	}
	public void setLargeImage(boolean largeImage) {
		this.largeImage = largeImage;
	}
	public boolean isSliderImage() {
		return sliderImage;
	}
	public void setSliderImage(boolean sliderImage) {
		this.sliderImage = sliderImage;
	}
	public GravlleProduct getProduct() {
		return product;
	}
	public void setProduct(GravlleProduct product) {
		this.product = product;
	}
	

}
