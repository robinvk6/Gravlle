package com.gravlle.portal.catalog.product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonservices.mws.products.model.GetMatchingProductForIdRequest;
import com.amazonservices.mws.products.model.GetMatchingProductForIdResponse;
import com.amazonservices.mws.products.model.IdListType;
import com.amazonservices.mws.products.model.Product;
import com.gravlle.marketplace.amazon.conversion.GravlleAmazoneEnvelopeConversionUtil;
import com.gravlle.marketplace.amazon.factory.impl.GravlleMWSProductFactory;
import com.gravlle.marketplace.amazon.feed.domain.ItemAttributes;
import com.gravlle.portal.common.exception.GravllePortalException;
import com.gravlle.portal.persistence.common.AbstractService;
import com.gravlle.portal.persistence.common.IOperations;

@Service
public class ProductService extends AbstractService<GravlleProduct> implements
		IProductService, IProductLookup {

	@Autowired
	private IProductDao productDao;

	private GravlleMWSProductFactory mwsProductFactory = GravlleMWSProductFactory
			.getInstance();

	public ProductService() {
		super();
	}

	@Override
	public GravlleProduct productInitializeAll(long id) {
		return productDao.productInitializeAll(id);
	}

	@Override
	public GravlleProduct productInitializeAll(String parameter, Object value) {
		return productDao.productInitializeAll(parameter, value);
	}

	@Override
	protected IOperations<GravlleProduct> getDao() {
		return productDao;
	}

	@Override
	public Map<String,ProductLookupResponse> getMatchingProduct(String id,
			StandardProductIdType type) throws GravllePortalException {

		// Step 1 : Check if there is an existing Product with the
		// StandardProductID
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("standardProductIdType", type);
		map.put("standardProductID", id);
		List<GravlleProduct> gravlleProducts = productDao.find(map);

		if (gravlleProducts != null & gravlleProducts.size() > 0) {
			throw new GravllePortalException("Product Entity exists for "
					+ type.name());
		} else {
			
			Map<String,ProductLookupResponse> lookupResponses = new HashMap<String, ProductLookupResponse>();
			GetMatchingProductForIdRequest request = new GetMatchingProductForIdRequest();
			request.setMarketplaceId("ATVPDKIKX0DER");

			IdListType idListType = new IdListType();
			List<String> idList = new ArrayList<String>();
			idList.add(id);
			idListType.setId(idList);

			request.setIdList(idListType);
			request.setIdType(type.toString());

			GetMatchingProductForIdResponse response = mwsProductFactory
					.getGetMatchingProductForIdReqres().reqRes(request);
			
			if(response.getGetMatchingProductForIdResult() != null && response
					.getGetMatchingProductForIdResult().get(0).getProducts() != null){
			List<Product> products = response
					.getGetMatchingProductForIdResult().get(0).getProducts()
					.getProduct();

			for (Product product : products) {
				try {
					ProductLookupResponse lookupResponse = new ProductLookupResponse();
					lookupResponse
							.setAttributes(GravlleAmazoneEnvelopeConversionUtil
									.unmarshalNewContext(ItemAttributes.class,
											product.getAttributeSets()
													.toXMLFragment()));
					lookupResponses.put(product.getIdentifiers()
							.getMarketplaceASIN().getASIN(),lookupResponse);
				} catch (Exception e) {

				}
			}
		}

			return lookupResponses;
		}
	}

}
