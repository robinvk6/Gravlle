package com.gravlle.portal.persistence.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

public abstract class AbstractController<T extends Serializable> {
	
	protected abstract Class<T> getClazz();	
	protected abstract IOperations<T> getService();	
	protected abstract Logger getLogger();
	
	@RequestMapping(method=RequestMethod.GET, value="/landing")
	public String landing() {
		getLogger().debug("Request for Landing Page");
		return "/"+getClazz().getSimpleName()+"/landing";
	}

	@RequestMapping(value="/find/{id}",method=RequestMethod.GET)
	@ResponseBody
	public T findOne(@PathVariable long id) {
		getLogger().debug("Request to Find for id : " + id);
		return getService().findOne(id);
	}

	@RequestMapping(value="/find/{parameter}/{value}",method=RequestMethod.GET)
	@ResponseBody
	public T findOne(@PathVariable String parameter, @PathVariable String value) {
		getLogger().debug("Request to Find for parameter : " + parameter + " and value : "+ value);
		return getService().findOne(parameter,value);
	}

	@RequestMapping(value="/list",method=RequestMethod.GET)
	@ResponseBody
	public List<T> findAll() {
		getLogger().debug("Request to list all entities : ");
		return getService().findAll();
	}

	@RequestMapping(value="/save",method=RequestMethod.PUT)
	@ResponseBody
	protected abstract CoreResponse create(T entity); 

	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	protected abstract CoreResponse update(T entity);

	@RequestMapping(value="/delete",method=RequestMethod.DELETE)
	@ResponseBody
	public CoreResponse delete(T entity) {
		CoreResponse coreResponse = new CoreResponse();
		try {
			getLogger().debug("Delete Entity Request for | " + entity);
			getService().delete(entity);
			coreResponse.setMessage("SUCCESS");
			getLogger().debug("Deleted Entity | " + entity);
		} catch (Exception e) {
			getLogger().error("Exception Deleting Entity | "+e);
			coreResponse.setMessage("Exception Deleting Entity | "+e.getMessage());
		}
		return coreResponse;
	}

	@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
	@ResponseBody
	public CoreResponse deleteById(@PathVariable long entityId) {
		CoreResponse coreResponse = new CoreResponse();
		try {
			getLogger().debug("Delete Entity Request for ID | " + entityId);
			T t = getService().findOne(entityId);
			getService().deleteById(entityId);
			coreResponse.setMessage("SUCCESS");
			getLogger().debug("Deleted Entity | " + t);
		} catch (Exception e) {
			getLogger().error("Exception Deleting Entity | "+e);
			coreResponse.setMessage("Exception Deleting Entity | "+e.getMessage());
		}
		return coreResponse;		
	}

	
	public List<T> find(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return null;
	}
	


}
