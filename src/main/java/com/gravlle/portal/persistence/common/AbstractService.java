package com.gravlle.portal.persistence.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public abstract class AbstractService<T extends Serializable> implements IOperations<T> {

    @Override
    public T findOne(final long id) {
        return getDao().findOne(id);
    }
    
    @Override
    public T findOne(String parameter, Object value) {
        return getDao().findOne(parameter, value);
    }

    @Override
    public List<T> findAll() {
        return getDao().findAll();
    }
    
    @Override
    public List<T> find(String parameter, Object value) {
        return getDao().find(parameter, value);
    }

    @Override
    public void create(final T entity) {
        getDao().create(entity);
    }

    @Override
    public T update(final T entity) {
        return getDao().update(entity);
    }

    @Override
    public void delete(final T entity) {
        getDao().delete(entity);
    }

    @Override
    public void deleteById(final long entityId) {
        getDao().deleteById(entityId);
    }
    
    public List<T> find(Map<String, Object> map){
    	return getDao().find(map);
    }

    protected abstract IOperations<T> getDao();

}
