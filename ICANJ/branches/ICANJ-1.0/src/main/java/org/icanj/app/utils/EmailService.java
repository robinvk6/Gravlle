package org.icanj.app.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.apache.velocity.app.VelocityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.springframework.ui.velocity.VelocityEngineUtils;

public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private VelocityEngine velocityEngine;

	private boolean notificationEnabled;

	

	private static final Logger logger = LoggerFactory
			.getLogger(EmailService.class);
	

	public void send(final String toMessage, final String subject,
			final String domain, final Object obj, final String template) {
		logger.info("Email Notifications is enabled : " + String.valueOf(notificationEnabled));
		if (notificationEnabled) {
			MimeMessagePreparator preparator = new MimeMessagePreparator() {
				public void prepare(MimeMessage mimeMessage) throws Exception {

					MimeMessageHelper message = new MimeMessageHelper(
							mimeMessage);
					message.setFrom("administrator@my.icanj.org");
					message.setTo(toMessage);
					message.setSubject(subject);

					Map model = new HashMap();
					model.put(domain, obj);
					String text = VelocityEngineUtils.mergeTemplateIntoString(
							velocityEngine, template, model);
					message.setText(text, true);
				}

			};
			mailSender.send(preparator);

			logger.debug("Emailed user " + toMessage + " | Subject : "
					+ subject + " @ " + new Date());
		} else {
			logger.error("Notification Agent is disabled | Email was not send to user : "
					+ toMessage + " | Subject : " + subject);
		}
	}

	public void send(final String toMessage, final String subject,
			final Map domainMap, final String template) throws Exception {
		try {
			logger.debug("Email Service Request | "+ subject);
			logger.info("Email Notifications is enabled : " + String.valueOf(notificationEnabled));
			
			
			if (notificationEnabled) {
				MimeMessagePreparator preparator = new MimeMessagePreparator() {
					public void prepare(MimeMessage mimeMessage) throws MessagingException {

						MimeMessageHelper message = new MimeMessageHelper(
								mimeMessage);
						message.setFrom("administrator@my.icanj.org");
						message.setTo(toMessage);						
						message.setSubject(subject);

						String text = VelocityEngineUtils.mergeTemplateIntoString(
								velocityEngine, template, domainMap);
						message.setText(text, true);
					}

				};
				mailSender.send(preparator);

				logger.debug("Emailed user " + toMessage + " | Subject : "
						+ subject + " @ " + new Date());
			} else {
				logger.error("Notification Agent is disabled | Email was not send to user : "
						+ toMessage + " | Subject : " + subject);
			}
		} catch (MailException e) {
			logger.error("Unable to send email " + e);
			throw new Exception(e); 
			};
		
	}
	
	public void send(final String[] toMessage,final String[] ccMessage,final String[] bccMessage,  final String subject,
			final Map domainMap, final String template) throws Exception {
		try {
			logger.debug("Email Service Request | "+ subject);
			logger.info("Email Notifications is disabled : " + String.valueOf(notificationEnabled));
			
			if (notificationEnabled) {
				MimeMessagePreparator preparator = new MimeMessagePreparator() {
					public void prepare(MimeMessage mimeMessage) throws MessagingException {

						MimeMessageHelper message = new MimeMessageHelper(
								mimeMessage);
						message.setFrom("administrator@my.icanj.org");
						message.setTo(toMessage);						
						message.setSubject(subject);
						message.setCc(ccMessage);
						message.setBcc(bccMessage);
						String text = VelocityEngineUtils.mergeTemplateIntoString(
								velocityEngine, template, domainMap);
						message.setText(text, true);
					}

				};
				mailSender.send(preparator);

				logger.debug("Emailed user " + toMessage + " | Subject : "
						+ subject + " @ " + new Date());
			} else {
				logger.error("Notification Agent is disabled | Email was not send to user : "
						+ toMessage + " | Subject : " + subject);
			}
		} catch (MailException e) {
			logger.error("Unable to send email " + e);
			throw new Exception(e); 
			};
		
	}
	
	public boolean getNotificationEnabled() {
		return notificationEnabled;
	}

	public void setNotificationEnabled(boolean nfe) {
		this.notificationEnabled = nfe;
		logger.info("Email Notifications is disabled : " + String.valueOf(notificationEnabled));
		
	}

}
