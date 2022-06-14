package fi.metatavu.jouko.api.dao;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.hibernate.jpa.criteria.compile.CriteriaQueryTypeQueryAdapter;
import org.slf4j.Logger;

/**
 * Abstract base class for all DAO classes
 * 
 * @author Antti Leppä
 * @author Valio Valtokari
 *
 * @param <T> entity type
 */
@SuppressWarnings ("squid:S3306")
public abstract class AbstractDAO<T> {

  @Inject
  private Logger logger;
  
  @PersistenceContext(unitName = "jouko")
  private EntityManager entityManager;
  
  /**
   * Returns entity by a string id
   * 
   * @param id entity id
   * @return entity or null if non found
   */
  @SuppressWarnings("unchecked")
  public T findById(String id) {
    return (T) getEntityManager().find(getGenericTypeClass(), id);
  }
  
  /**
   * Returns entity by an integer id
   * 
   * @param id entity id
   * @return entity or null if non found
   */
  @SuppressWarnings("unchecked")
  public T findById(Long id) {
    if (id == null) {
      return null;
    }
    
    return (T) getEntityManager().find(getGenericTypeClass(), id);
  }

  /**
   * Lists all entities from database
   * 
   * @return all entities from database
   */
  @SuppressWarnings("unchecked")
  public List<T> listAll() {
    Class<?> genericTypeClass = getGenericTypeClass();
    Query query = getEntityManager().createQuery("select o from " + genericTypeClass.getName() + " o");
    return query.getResultList();
  }

  /**
   * Lists all entities from database limited by firstResult and maxResults parameters
   * 
   * @param firstResult first result
   * @param maxResults max results
   * @return all entities from database limited by firstResult and maxResults parameters
   */
  @SuppressWarnings("unchecked")
  public List<T> listAll(Integer firstResult, Integer maxResults) {
    Class<?> genericTypeClass = getGenericTypeClass();
    Query query = getEntityManager().createQuery("select o from " + genericTypeClass.getName() + " o");
    
    if (firstResult != null) {
      query.setFirstResult(firstResult);
    }
    
    if (maxResults != null) {
      query.setMaxResults(maxResults);
    }
    
    return query.getResultList();
  }

  /**
   * Returns count of all entities
   * 
   * @return entity count
   */
  public Long count() {
    Class<?> genericTypeClass = getGenericTypeClass();
    Query query = getEntityManager().createQuery("select count(o) from " + genericTypeClass.getName() + " o");
    return (Long) query.getSingleResult();
  }

  /**
   * Deletes entity
   * 
   * @param e entity
   */
  public void delete(T e) {
    getEntityManager().remove(e);
    flush();
  }

  /**
   * Flushes persistence context state
   */
  public void flush() {
    getEntityManager().flush();
  }

  /**
   * Persists an entity
   * 
   * @param object entity to be persisted
   * @return persisted entity
   */
  protected T persist(T object) {
    getEntityManager().persist(object);
    return object;
  }

  /**
   * Executes a query that is expected to return a single result.
   * If the query returns more than one result, the last one is returned.
   *
   * @param query the query to execute
   * @return the result of the typed query
   * @param <X> the typed query thar returns result type X
   */
  protected <X> X getSingleResult(TypedQuery<X> query) {
    List<X> list = query.getResultList();

    if (list.isEmpty())
      return null;
    
    if (list.size() > 1) {
      logger.error(String.format("SingleResult query returned %d elements from %s", list.size(), getGenericTypeClass().getName()));
    }

    return list.get(list.size() - 1);
  }
  
  /**
   * Prints query as HQL. Used for debugging purposes only
   * 
   * @param query query
   * @return query as HQL
   */
  protected String getQueryHQL(Query query) {
    return ((CriteriaQueryTypeQueryAdapter<?>) query).getHibernateQuery().getQueryString();
  }

  private Class<?> getFirstTypeArgument(ParameterizedType parameterizedType) {
    return (Class<?>) parameterizedType.getActualTypeArguments()[0];
  }
  
  protected Class<?> getGenericTypeClass() {
    Type genericSuperclass = getClass().getGenericSuperclass();

    if (genericSuperclass instanceof ParameterizedType) {
      return getFirstTypeArgument((ParameterizedType) genericSuperclass);
    } else {
      if ((genericSuperclass instanceof Class<?>) && (AbstractDAO.class.isAssignableFrom((Class<?>) genericSuperclass))) {
        return getFirstTypeArgument((ParameterizedType) ((Class<?>) genericSuperclass).getGenericSuperclass());
      }
    }

    return null;
  }

  /**
   * Returns the entity manager used by this DAO
   *
   * @return the entity manager used by this DAO
   */
  protected EntityManager getEntityManager() {
    return entityManager;
  }
}