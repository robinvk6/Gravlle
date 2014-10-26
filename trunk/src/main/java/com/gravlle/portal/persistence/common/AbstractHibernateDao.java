package com.gravlle.portal.persistence.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;


import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.base.Preconditions;

@SuppressWarnings("unchecked")
public abstract class AbstractHibernateDao<T extends Serializable> implements
		IOperations<T> {
	private Class<T> clazz;

	@Autowired
	private SessionFactory sessionFactory;

	
	protected final void setClazz(final Class<T> clazzToSet) {
		clazz = Preconditions.checkNotNull(clazzToSet);
	}

	@Override
	public T findOne(final long id) {
		return (T) getCurrentSession().get(clazz, id);
	}

	@Override
	public T findOne(String parameter, Object value) {
		return (T) getCurrentSession()
				.createQuery(
						"from " + clazz.getName() + " c where c." + parameter
								+ " =:" + parameter)
				.setParameter(parameter, value).uniqueResult();
	}
	
	@Override
	public List<T> find(String parameter, Object value) {
		return getCurrentSession()
				.createQuery(
						"from " + clazz.getName() + " c where c." + parameter
								+ " =:" + parameter)
				.setParameter(parameter, value).list();
	}
	
	@Override
	public List<T> find(Map<String, Object> map) {
		Criteria cr = getCurrentSession().createCriteria(clazz);
		for(Entry<String, Object> entry : map.entrySet()) {
		cr.add(Restrictions.like(entry.getKey(), entry.getValue()));
		}
		return cr.list();
	}

	@Override
	public List<T> findAll() {
		return getCurrentSession().createQuery("from " + clazz.getName())
				.list();
	}

	@Override
	public void create(final T entity) {
		Preconditions.checkNotNull(entity);
		// getCurrentSession().persist(entity);
		getCurrentSession().saveOrUpdate(entity);
	}

	@Override
	public T update(final T entity) {
		Preconditions.checkNotNull(entity);
		return (T) getCurrentSession().merge(entity);
	}

	@Override
	public void delete(final T entity) {
		Preconditions.checkNotNull(entity);
		getCurrentSession().delete(entity);
	}

	@Override
	public void deleteById(final long entityId) {
		final T entity = findOne(entityId);
		Preconditions.checkState(entity != null);
		delete(entity);
	}

	public final Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

}