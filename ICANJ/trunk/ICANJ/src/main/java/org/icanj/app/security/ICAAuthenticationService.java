/************************************************************************
 * 
 * Copyright 2012 - ICANJ
 * 
 ************************************************************************/

package org.icanj.app.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.icanj.app.directory.dao.DirectoryDao;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.utils.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.codec.Base64;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class ICAAuthenticationService {

	@Autowired
	private HibernateTemplate hibernateTemplate;

	@Autowired
	private DirectoryDao directoryhibernateDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EmailService emailService;
	
	
	private static final Logger logger = LoggerFactory
			.getLogger(ICAAuthenticationService.class);

	public boolean createMemberAccount(long memberId, String emailAddress,
			String password) {

		try {

			logger.debug("Creating a new Login Account");
			Users user = new Users();
			Authorities authority = new Authorities();

			// Encoding Password
			logger.debug("Creating a new Login Account");
			String encodedPassword = passwordEncoder.encodePassword(password,
					null);
			user.setUsername(emailAddress);
			user.setEnabled("FALSE");
			user.setMemberId(memberId);
			user.setPassword(encodedPassword);
			authority.setAuthority("ROLE_USER");
			user.setAuthorities(authority);
			authority.setUsers(user);
			hibernateTemplate.save(user);

			Member member = directoryhibernateDao.getMember(memberId);
			member.setInteractiveAccess(true);
			member.setEmail(emailAddress);
			directoryhibernateDao.addMember(member);
			logger.debug("A new member account has been created for: "
					+ user.getUsername() + " with member Id: "
					+ user.getMemberId() + " with authority: "
					+ user.getAuthorities().getAuthority());
			// Sending Activate Url

			logger.debug("Generating Activation Email for user: "
					+ user.getUsername());
			Map<Object, Object> model = new HashMap<Object, Object>();
			model.put("member", member);
			model.put("activateCode", encoder(emailAddress));

			emailService.send(emailAddress, "ICANJ Account Activation Email",
					model, "account_create.vm");

			return true;
		} catch (Exception e) {
			logger.error(
					"Exception creating new User Account: " + e.getMessage(), e);
			return false;
		}

	}

	public void resetPasswordHandler(String emailId) throws Exception {

		try {
			Users user = getUser(emailId);
			if (user != null) {
				String key = user.getUsername() + "|"
						+ String.valueOf(System.currentTimeMillis());
				logger.debug("Reset Password for " + key);
				key = encoder(key);
				System.out.println(key);
				Member member = directoryhibernateDao.getMember(user
						.getMemberId());

				logger.debug("Generating Password Reset Email for user: "
						+ member.getFirstName() + " " + member.getLastName()
						+ " | " + user.getUsername() + " | " + new Date());
				Map<String, Object> model = new HashMap<String, Object>();
				model.put("resetCode", key);
				model.put("member", member);
				if (emailService != null) {
					emailService.send(user.getUsername(),
							"ICANJ Password Reset Email", model,
							"password_reset.vm");
				}

			} else {
				throw new Exception(
						"The email address was not found in our database. Please enter a valid email address");
			}
		} catch (Exception e) {
			logger.error("Exception PAssword Reset Handler : " + e);
			throw new Exception("There was an error locating your account. "
					+ e);
		}
	}

	public String resetPasswordValidator(String encodedEmail) throws Exception {
		try {
			String decodedEmail = decoder(encodedEmail);
			String key[] = decodedEmail.split("\\|");
			long keyTime = Long.parseLong(key[1]);

			int milliseconds = (int) (System.currentTimeMillis() - keyTime);
			int minutes = (int) ((milliseconds / 1000) / 60);

			if (minutes <= 10) {
				return key[0];
			} else {
				throw new Exception(
						"The current link has expired. Please resubmit your password reset request.");
			}
		} catch (Exception e) {
			throw new Exception(
					"There was an error processing your request. Please resubmit your request.");
		}
	}

	public void resetPassword(String emailId, String newPassword)
			throws Exception {
		Users user = getUser(emailId);
		if (user != null) {
			user.setPassword(passwordEncoder.encodePassword(newPassword, null));
			hibernateTemplate.saveOrUpdate(user);
		} else {
			throw new Exception("No user with this email Id found");
		}
	}

	public void activateAccount(String encodeUrl) {
		Users user = null;
		try {
			user = getUser(decoder(encodeUrl));
			user.setEnabled("TRUE");
			hibernateTemplate.update(user);
			logger.info("Activated User with Email Address: "
					+ user.getUsername());
		} catch (Exception e) {
			logger.error(
					"Error Activating account for User with email address: "
							+ user.getUsername(), e);
		}
	}

	public Users getUser(String username) {
		return hibernateTemplate.get(Users.class, username);
	}

	public boolean hasAdminRole() {

		boolean status = false;
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		Collection<GrantedAuthority> ls = auth.getAuthorities();
		for (GrantedAuthority authority : ls) {
			if (authority.toString().equals("ROLE_ADMIN"))
				status = true;
		}

		return status;
	}

	private String encoder(String id) throws Exception {

		byte[] encoded = Base64.encode(id.getBytes());
		return new String(encoded);
	}

	private String decoder(String id) {
		byte[] decoded = Base64.decode(id.getBytes());
		return new String(decoded);
	}
		
}
