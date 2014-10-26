package com.gravlle.portal.persistence.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

public class HibernateAwareObjectMapper extends ObjectMapper{

	private static final long serialVersionUID = 8619102890307939984L;

	public HibernateAwareObjectMapper() {
        registerModule(new Hibernate4Module());
    }
}
