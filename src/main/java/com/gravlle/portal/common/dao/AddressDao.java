package com.gravlle.portal.common.dao;

import org.springframework.stereotype.Repository;

import com.gravlle.portal.common.domain.Address;
import com.gravlle.portal.persistence.common.AbstractHibernateDao;

@Repository(value="addressDao")
public class AddressDao extends AbstractHibernateDao<Address> implements IAddressDao{	
	public AddressDao() {
		super();
		setClazz(Address.class);
	}
}
