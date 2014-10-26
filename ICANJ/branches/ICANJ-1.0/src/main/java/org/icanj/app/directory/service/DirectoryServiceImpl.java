/**
 * **********************************************************************
 *
 * Copyright 2012 - ICANJ
 *
 ***********************************************************************
 */
package org.icanj.app.directory.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.icanj.app.directory.dao.DirectoryDao;
import org.icanj.app.directory.entity.Address;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.icanj.app.utils.EmailService;
import org.icanj.app.utils.HTTPUtils;
import org.icanj.app.utils.UtilityMethods;

@Service
public class DirectoryServiceImpl implements DirectoryService {

	private static final Logger logger = LoggerFactory
			.getLogger(DirectoryServiceImpl.class);
	@Autowired
	private DirectoryDao directoryhibernateDao;

	@Autowired
	private EmailService emailService;

	public boolean addMember(HttpServletRequest request) {

		Member member = new Member();

		long familyId = Long.parseLong(request.getParameter("familyId"));
		member.setFamilyId(familyId);
		directoryhibernateDao.addMember(member);
		return false;

	}

	public List<Member> listMembers() {
		return directoryhibernateDao.listMembers();
	}

	public Member getMember(long memberId) {
		// TODO Auto-generated method stub
		return directoryhibernateDao.getMember(memberId);
	}

	public void removeMember(long memberId) {
		directoryhibernateDao.removeMember(memberId);

	}

	public Address findAddressById(long familyId) {

		return directoryhibernateDao.findAddressById(familyId);
	}

	public List<Address> listAddresses() {

		return directoryhibernateDao.listAddresses();
	}

	public boolean addFamily(HttpServletRequest request) {

		try {
			if (HTTPUtils.validateParameter(request, "familyNameF", 2)
					&& HTTPUtils.validateParameter(request, "familyNameL")

					&& HTTPUtils.validateParameter(request, "emailAddress")
					&& HTTPUtils.validateParameter(request, "streetAddress", 2)
					&& HTTPUtils.validateParameter(request, "city", 2)
					&& HTTPUtils.validateParameter(request, "state", 2)
					&& HTTPUtils.validateParameter(request, "country", 2)) {

				Family family = new Family();
				Address address = new Address();

				String homePhone = request.getParameter("i1").trim()
						+ request.getParameter("i2").trim()
						+ request.getParameter("i3").trim();

				family.setFamilyName(request.getParameter("familyNameF").trim()
						+ " " + request.getParameter("familyNameL").trim());
				family.setEmailAddress(request.getParameter("emailAddress")
						.trim());
				family.setHomePhoneNumber(homePhone);
				address.setStreetAddress(request.getParameter("streetAddress")
						.trim());
				address.setCity(request.getParameter("city").trim());
				address.setState(request.getParameter("state").trim());
				address.setCountry(request.getParameter("country").trim());
				address.setParkingDetails(request.getParameter("parkingInfo")
						.trim());
				family.setAddress(address);
				address.setFamily(family);
				directoryhibernateDao.addFamily(family);

				logger.debug("Family Details for " + family.getFamilyName()
						+ " were added sucessfully.");
				logger.debug("Emailing User Registration link @ "
						+ family.getEmailAddress());

				try {

					String subject = "Welcome to my.icanj.org";
					emailService.send(family.getEmailAddress(), subject,
							"family", family, "familySignup.vm");
					
				} catch (Exception e) {
					logger.warn("Error emailing user " + family.getFamilyName()
							+ " @ " + e.getMessage(), e);
				}

				return true;
			} else {
				return false;
			}

		} catch (Exception e) {

			logger.warn(
					"Error persisting new Family entity in Directory Service."
							+ e.getMessage(), e);
			return false;
		}
	}

	public List<Member> listMemberByFamily(long familyId) {

		return directoryhibernateDao.listMemberByFamily(familyId);
	}

	public Family getFamilyHomePhoneNo(String homePhoneNumber) {
		return directoryhibernateDao.getFamilyHomePhoneNo(homePhoneNumber);
	}

	@Override
	@Transactional
	public boolean addMembers(HttpServletRequest request) {

		try {
			long familyId = Long.parseLong(request.getParameter("familyId"));
			for (int i = 0; i <= 5; i++) {
				if (HTTPUtils.validateParameter(request, "m" + i + "FirstName")
						&& HTTPUtils.validateParameter(request, "m" + i
								+ "LastName")) {
					Member member = new Member();
					member.setFamilyId(familyId);
					member.setFirstName(request.getParameter("m" + i
							+ "FirstName"));
					member.setMiddleName(request.getParameter("m" + i
							+ "MiddleName"));
					member.setLastName(request.getParameter("m" + i
							+ "LastName"));
					member.setMemberRelation(request.getParameter("m" + i
							+ "Relation"));
					member.setInteractiveAccess(false);

					directoryhibernateDao.addMember(member);

				}

			}
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

	}

	@Override
	public List<Member> MemFamilyNoInteractive(long familyId) {
		// TODO Auto-generated method stub
		return directoryhibernateDao.MemFamilyNoInteractive(familyId);
	}

	@Override
	public Family getFamily(long familyId) {
		// TODO Auto-generated method stub
		return directoryhibernateDao.getFamily(familyId);
	}

	@Override
	public List<Family> listFamilies() {
		return directoryhibernateDao.listFamilies();
	}
	
	public boolean isPrincipalInFamily(String principal,long familyId){
		Member member = getMemberFromPrincipal(principal);
		if(member!=null && (member.getFamilyId() == familyId)){
			return true;
		}else {
			return false;
		}
	}
	
	public Map<Long,String> getMembersToFamilyMap(){
		String value="";
		List<Member> members = directoryhibernateDao.listMembers();
		Map<Long,String> membyFamily = new HashMap<Long,String>();
		for(Member m: members){
		
				if(membyFamily.containsKey(m.getFamilyId())){					
					value = membyFamily.get(m.getFamilyId());
					membyFamily.put(m.getFamilyId(),value+","+m.getFirstName());
					
				}else{
					membyFamily.put(m.getFamilyId(), m.getFirstName());
				}				
			
		}	
		
		return membyFamily;
	}

	@Override
	public Member getMemberFromPrincipal(String principal) {

		return directoryhibernateDao.getMemberFromPrincipal(principal);
	}

	/**
	 * Implementation for updateFamily
	 *
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean updateFamily(HttpServletRequest request) throws Exception {

		if (HTTPUtils.validateParameter(request, "familyName", 2)
				&& HTTPUtils.validateParameter(request, "familyId", 2)
				&& HTTPUtils.validateParameter(request, "street", 2)
				&& HTTPUtils.validateParameter(request, "city", 2)
				&& HTTPUtils.validateParameter(request, "state", 2)
				&& HTTPUtils.validateParameter(request, "homePhoneNumber", 2)) {

			String familyId = request.getParameter("familyId");
			Family family = directoryhibernateDao.getFamily(Long
					.parseLong(familyId));
			Address address = directoryhibernateDao.findAddressById(Long
					.parseLong(familyId));

			family.setFamilyName(request.getParameter("familyName").trim());
			family.setHomePhoneNumber(UtilityMethods.parsePhone(request.getParameter("homePhoneNumber")
					.trim()));
			family.setTagLine(request.getParameter("familyTagLine").trim());
			address.setStreetAddress(request.getParameter("street").trim());
			address.setCity(request.getParameter("city").trim());
			address.setState(request.getParameter("state").trim());
			address.setZip(request.getParameter("zip").trim());
			address.setParkingDetails(request.getParameter("parkingInfo")
					.trim());
			family.setAddress(address);
			address.setFamily(family);

			// This method uses add or update hibernate function.
			directoryhibernateDao.addFamily(family);
			return true;

		} else {
			throw new Exception("Please enter the required fields.");
		}
	}

	@Override
	public List<Member> searchMembers(String srchCriteria) {
		return directoryhibernateDao.searchMembers(srchCriteria);

	}

	/**
	 * Implementation for updateMember
	 *
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean updateMember(HttpServletRequest request) throws Exception {

		if (HTTPUtils.validateParameter(request, "memberId")
				&& HTTPUtils.validateParameter(request, "familyId")
				&& HTTPUtils.validateParameter(request, "email")
				&& HTTPUtils.validateParameter(request, "firstName")
				&& HTTPUtils.validateParameter(request, "lastName")
				&& HTTPUtils.validateParameter(request, "dateOfBirth")
				&& HTTPUtils.validateParameter(request, "phoneNumber")
				&& HTTPUtils.validateParameter(request, "relationship")) {
			
			
			
			String memberId = request.getParameter("memberId");
			logger.info("Updating Member Information with member Id : " + memberId);
			Member member = directoryhibernateDao.getMember(Long.parseLong(memberId));
			DateFormat formatter = new SimpleDateFormat("MM-dd-yyyy");
			
			
			if(member != null){
			
			member.setCellPhoneNumber(UtilityMethods.parsePhone(request.getParameter("phoneNumber").trim()));
			member.setWorkPhoneNumber(UtilityMethods.parsePhone(request.getParameter("workPhoneNumber").trim()));
			member.setEmail(request.getParameter("email").trim());		
			member.setFirstName(request.getParameter("firstName").trim());
			member.setLastName(request.getParameter("lastName").trim());
			member.setMiddleName(request.getParameter("middleName").trim());
			member.setNickName(request.getParameter("nickName").trim());
			
			Date date = (Date) formatter.parse(request.getParameter("dateOfBirth")
					.trim());
			member.setDateOfBirth(date);
			
			String relation = request.getParameter("relationship").trim();
			member.setMemberRelation(relation);
			
			if(relation.equals("Other")){
			member.setGender(request.getParameter("gender").trim());
			member.setMemberRelation(request.getParameter("other").trim());
			
			}else if(relation.equals("Father") || relation.equals("Son") || relation.equals("Grand Father")){
				member.setGender("Male");
			}else if(relation.equals("Mother") || relation.equals("Daughter") || relation.equals("Grand Mother")){
				member.setGender("Female");
			}
			
			directoryhibernateDao.addMember(member);
			return true;
			
			}else{
				
				logger.error("No member found for the request with Member Id : " + memberId);
				return false;
			}
		} else {
			return false;
		}

	}
    
}

