package org.icanj.app.thanksgiving;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="THANKSGIVING_MENU")
public class MenuItem {
	
	@Id
	@GeneratedValue
	private long itemId;
	@Column(name="ITEM_NAME" , nullable=false)
	private String itemName;
	@Column(name="COUNT")
	private int count;
	@Column(name="AVAILABLE" , nullable=false)
	private boolean available;
	@Column(name="RESERVED" , nullable=false)
	private boolean availableToAll;
	
	public long getItemId() {
		return itemId;
	}
	public void setItemId(long itemId) {
		this.itemId = itemId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	public boolean isAvailableToAll() {
		return availableToAll;
	}
	public void setAvailableToAll(boolean availableToAll) {
		this.availableToAll = availableToAll;
	}
	

}
