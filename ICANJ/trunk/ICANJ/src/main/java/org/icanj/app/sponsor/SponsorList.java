package org.icanj.app.sponsor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="SPONSOR_LIST")
public class SponsorList {
	
	@Id
    @GeneratedValue
	private long id;
	
	@Column(unique = true, nullable = false)
	private String month;
	
	private String meeting1Family;
	private String meeting2Family;
	private String meeting3Family;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getMeeting1Family() {
		return meeting1Family;
	}
	public void setMeeting1Family(String meeting1Family) {
		this.meeting1Family = meeting1Family;
	}
	public String getMeeting2Family() {
		return meeting2Family;
	}
	public void setMeeting2Family(String meeting2Family) {
		this.meeting2Family = meeting2Family;
	}
	public String getMeeting3Family() {
		return meeting3Family;
	}
	public void setMeeting3Family(String meeting3Family) {
		this.meeting3Family = meeting3Family;
	}
}
