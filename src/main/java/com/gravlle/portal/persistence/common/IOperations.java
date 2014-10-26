package com.gravlle.portal.persistence.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IOperations<T extends Serializable> {

    T findOne(final long id);
    
    T findOne(String parameter, Object value);
    
    List<T> find(String parameter, Object value);

    List<T> findAll();

    void create(final T entity);

    T update(final T entity);

    void delete(final T entity);

    void deleteById(final long entityId);

	List<T> find(Map<String, Object> map);

}
