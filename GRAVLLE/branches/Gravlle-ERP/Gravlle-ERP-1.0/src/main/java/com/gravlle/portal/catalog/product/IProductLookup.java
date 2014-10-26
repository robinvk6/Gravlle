package com.gravlle.portal.catalog.product;

import java.util.Map;

import com.gravlle.portal.common.exception.GravllePortalException;

public interface IProductLookup {
	Map<String , ProductLookupResponse> getMatchingProduct(String id, StandardProductIdType type) throws GravllePortalException;
}
