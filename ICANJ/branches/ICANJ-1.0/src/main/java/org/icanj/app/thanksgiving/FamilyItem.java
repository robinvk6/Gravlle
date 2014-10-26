package org.icanj.app.thanksgiving;

import java.util.Date;

import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;

public class FamilyItem {
	
	private long id;
	private Family family;
	private Member member;
	private MenuItem item;
	private String comment;
	private Date date;
	public Family getFamily() {
		return family;
	}
	public void setFamily(Family family) {
		this.family = family;
	}
	public Member getMember() {
		return member;
	}
	public void setMember(Member member) {
		this.member = member;
	}
	public MenuItem getItem() {
		return item;
	}
	public void setItem(MenuItem item) {
		this.item = item;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

}
