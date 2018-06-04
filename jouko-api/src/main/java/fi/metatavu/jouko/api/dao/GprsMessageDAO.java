package fi.metatavu.jouko.api.dao;

import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity_;

@Dependent
public class GprsMessageDAO extends AbstractDAO<GprsMessageEntity> {
  public GprsMessageEntity create(ControllerEntity controller, String content) {
    GprsMessageEntity result = new GprsMessageEntity(null, content, controller);
    getEntityManager().persist(result);
    return result;
  } 
  
  public void clear() {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<GprsMessageEntity> delete = criteriaBuilder.createCriteriaDelete(GprsMessageEntity.class);
    delete.from(GprsMessageEntity.class);
    
    em.createQuery(delete).executeUpdate();
  }

  public void clearControllerMessages(
      ControllerEntity controller
  ) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<GprsMessageEntity> delete = criteriaBuilder.createCriteriaDelete(GprsMessageEntity.class);
    Root<GprsMessageEntity> root = delete.from(GprsMessageEntity.class);

    delete.where(
      criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller)
    );
    
    em.createQuery(delete).executeUpdate();
  }
  
  public List<GprsMessageEntity> listByController(
      ControllerEntity controller
  ) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<GprsMessageEntity> criteria = criteriaBuilder.createQuery(GprsMessageEntity.class);
    Root<GprsMessageEntity> root = criteria.from(GprsMessageEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller)
    );
    
    return em.createQuery(criteria).getResultList();
  }
}
