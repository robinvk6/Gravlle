package com.gravlle.portal.catalog.product;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.MapKeyClass;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.gravlle.portal.catalog.category.Category;
import com.gravlle.portal.catalog.product.inventory.Inventory;
import com.gravlle.portal.common.domain.AbstractEntity;

@Entity
@Table(name = "catalog_product", uniqueConstraints = { @UniqueConstraint(columnNames = {
		"standardProductID", "standardProductIdType" }) })
public class GravlleProduct extends AbstractEntity implements Serializable {

	private static final long serialVersionUID = -4249630340223584202L;

	@Column(nullable = false, unique = true)
	private String sku;
	
	@Column(nullable = false)
	private String standardProductID;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private StandardProductIdType standardProductIdType;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String description;

	private String bulletPoint1;

	private String bulletPoint2;

	private String bulletPoint3;

	private String bulletPoint4;

	private String bulletPoint5;

	@Column(nullable = false)
	private BigDecimal msrp;

	@Column(nullable = false)
	private BaseCurrencyCode currencyCode;

	private BigInteger maxOrderQuantity;

	private String legalDisclaimer;

	private String manufacturer;

	private String mfrPartNumber;

	@Column(nullable = false)
	private boolean enabled;
	@Column(nullable = false)
	private BigDecimal weight;
	@Column(nullable = false)
	private WeightUnitOfMeasure weightUnitOfMeasure;

	@Column(nullable = false)
	private BigInteger quantity;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "catalog_products_category", joinColumns = { @JoinColumn(name = "product_id") }, inverseJoinColumns = { @JoinColumn(name = "category_id") })
	private Set<Category> categories = new HashSet<Category>();

	@OneToMany(mappedBy = "product")
	private Set<ProductMedia> medias = new HashSet<ProductMedia>();

	@OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
	private Inventory inventory;

	@ElementCollection(fetch = FetchType.EAGER)
	@MapKeyClass(java.lang.String.class)
	@MapKeyColumn(name = "attribute_property")
	@CollectionTable(name = "catalog_product_attributes", joinColumns = @JoinColumn(name = "product_id"))
	@Column(name = "attribute_value")
	private Map<String, String> productAttributes = new HashMap<String, String>();

	@Column(nullable = false, unique = true)
	private String urlKey;

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getStandardProductID() {
		return standardProductID;
	}

	public void setStandardProductID(String standardProductID) {
		this.standardProductID = standardProductID;
	}

	public StandardProductIdType getStandardProductIdType() {
		return standardProductIdType;
	}

	public void setStandardProductIdType(StandardProductIdType standardProductIdType) {
		this.standardProductIdType = standardProductIdType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBulletPoint1() {
		return bulletPoint1;
	}

	public void setBulletPoint1(String bulletPoint1) {
		this.bulletPoint1 = bulletPoint1;
	}

	public String getBulletPoint2() {
		return bulletPoint2;
	}

	public void setBulletPoint2(String bulletPoint2) {
		this.bulletPoint2 = bulletPoint2;
	}

	public String getBulletPoint3() {
		return bulletPoint3;
	}

	public void setBulletPoint3(String bulletPoint3) {
		this.bulletPoint3 = bulletPoint3;
	}

	public String getBulletPoint4() {
		return bulletPoint4;
	}

	public void setBulletPoint4(String bulletPoint4) {
		this.bulletPoint4 = bulletPoint4;
	}

	public String getBulletPoint5() {
		return bulletPoint5;
	}

	public void setBulletPoint5(String bulletPoint5) {
		this.bulletPoint5 = bulletPoint5;
	}

	public BigDecimal getMsrp() {
		return msrp;
	}

	public void setMsrp(BigDecimal msrp) {
		this.msrp = msrp;
	}

	public BaseCurrencyCode getCurrencyCode() {
		return currencyCode;
	}

	public void setCurrencyCode(BaseCurrencyCode currencyCode) {
		this.currencyCode = currencyCode;
	}

	public BigInteger getMaxOrderQuantity() {
		return maxOrderQuantity;
	}

	public void setMaxOrderQuantity(BigInteger maxOrderQuantity) {
		this.maxOrderQuantity = maxOrderQuantity;
	}

	public String getLegalDisclaimer() {
		return legalDisclaimer;
	}

	public void setLegalDisclaimer(String legalDisclaimer) {
		this.legalDisclaimer = legalDisclaimer;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getMfrPartNumber() {
		return mfrPartNumber;
	}

	public void setMfrPartNumber(String mfrPartNumber) {
		this.mfrPartNumber = mfrPartNumber;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public WeightUnitOfMeasure getWeightUnitOfMeasure() {
		return weightUnitOfMeasure;
	}

	public void setWeightUnitOfMeasure(WeightUnitOfMeasure weightUnitOfMeasure) {
		this.weightUnitOfMeasure = weightUnitOfMeasure;
	}

	public BigInteger getQuantity() {
		return quantity;
	}

	public void setQuantity(BigInteger quantity) {
		this.quantity = quantity;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

	public Set<ProductMedia> getMedias() {
		return medias;
	}

	public void setMedias(Set<ProductMedia> medias) {
		this.medias = medias;
	}

	public Inventory getInventory() {
		return inventory;
	}

	public void setInventory(Inventory inventory) {
		this.inventory = inventory;
	}

	public Map<String, String> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(Map<String, String> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public String getUrlKey() {
		return urlKey;
	}

	public void setUrlKey(String urlKey) {
		this.urlKey = urlKey;
	}

}
