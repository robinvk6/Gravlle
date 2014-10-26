package org.icanj.app.thanksgiving;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.springframework.stereotype.Component;
@Component
@Entity
@Table(name="THANKSGIVING_MENU_MEMBER")
public class MemberItem {
	
	@Id
	@GeneratedValue
	@Column(name="ID")
	private long id;

	private long member;
	
	private Date lastUpdatedat = new Date();

	private long item;
	@Column(name="COMMENTS")
	private String comments;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getMember() {
		return member;
	}
	public void setMember(long member) {
		this.member = member;
	}
	public long getItem() {
		return item;
	}
	public void setItem(long item) {
		this.item = item;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public Date getLastUpdatedat() {
		return lastUpdatedat;
	}
	
}
