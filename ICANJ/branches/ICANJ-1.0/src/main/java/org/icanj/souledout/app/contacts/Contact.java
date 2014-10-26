/**
 * **********************************************************************
 *
 * Copyright 2012 - ICANJ
 *
 ***********************************************************************
 */
package org.icanj.souledout.app.contacts;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="SOULEDOUT_CONTACTS")
@TableGenerator(name = "tab", initialValue = 50, allocationSize = 10)
public class Contact implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -2660942254881136589L;
	
	@Column(name = "MEMBER_ID")
	@GeneratedValue
	private long memberId;
	
	@Column(name = "MEMBER_FIRST_NAME", nullable = false, length = 40)
	private String firstName;
	
	@Column(name = "MEMBER_LAST_NAME", nullable = false, length = 30)
	private String lastName;
	
	@Column(name = "MEMBER_CELL_PHONE", nullable = true, length = 10)
	private String cellPhoneNumber;
	
	
	@Column(name = "MEMBER_DOB", nullable = true)
	private Date dateOfBirth;
	
	@Id
	@Column(name = "EMAIL_ADDRESS",nullable = false)
	private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	public long getMemberId() {
		return memberId;
	}

	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getCellPhoneNumber() {
		return cellPhoneNumber;
	}

	public void setCellPhoneNumber(String cellPhoneNumber) {
		this.cellPhoneNumber = cellPhoneNumber;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
}
