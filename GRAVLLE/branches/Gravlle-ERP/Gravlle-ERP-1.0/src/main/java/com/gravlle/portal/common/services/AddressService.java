package com.gravlle.portal.common.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gravlle.portal.common.dao.IAddressDao;
import com.gravlle.portal.common.domain.Address;
import com.gravlle.portal.persistence.common.AbstractService;
import com.gravlle.portal.persistence.common.IOperations;

@Service(value="addressService")
public class AddressService extends AbstractService<Address> implements IAddressService{
	
	@Autowired
	private IAddressDao addressDao;
	
	public AddressService() {
		super();
	}

	@Override
	protected IOperations<Address> getDao() {
		return addressDao;
	}
}
