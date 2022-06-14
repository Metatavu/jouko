package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity_;
import fi.metatavu.jouko.api.model.MessageType;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Dependent
public class GprsMessageDAO extends AbstractDAO<GprsMessageEntity> {
  public GprsMessageEntity create(ControllerEntity controller, long deviceId, String content, MessageType messageType) {
    GprsMessageEntity result = new GprsMessageEntity(null, deviceId, content, controller, messageType);
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
  
  public GprsMessageEntity findOneByController(ControllerEntity controller, long deviceId) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<GprsMessageEntity> criteria = criteriaBuilder.createQuery(GprsMessageEntity.class);
    Root<GprsMessageEntity> root = criteria.from(GprsMessageEntity.class);
    
    List<Order> orderList = new ArrayList();
    
    criteria.select(root);
    
    CriteriaQuery<GprsMessageEntity> newInterruptionQuery = criteria.where(
        criteriaBuilder.and(
            criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller),
            criteriaBuilder.equal(root.get(GprsMessageEntity_.deviceId), deviceId),
            criteriaBuilder.equal(root.get(GprsMessageEntity_.type), MessageType.NEW_INTERRUPTION)
        )
    );
    
    if (em.createQuery(newInterruptionQuery).getResultList().size() > 0) {
      orderList.add(criteriaBuilder.asc(root.get(GprsMessageEntity_.id)));
      criteria.orderBy(orderList);
      return em.createQuery(newInterruptionQuery).getResultList().get(0);
    }
    
    CriteriaQuery<GprsMessageEntity> cancelInterruptionQuery = criteria.where(
        criteriaBuilder.and(
            criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller),
            criteriaBuilder.equal(root.get(GprsMessageEntity_.deviceId), deviceId),
            criteriaBuilder.equal(root.get(GprsMessageEntity_.type), MessageType.CANCEL_INTERRUPTION)
        )
    );
    
    if (em.createQuery(cancelInterruptionQuery).getResultList().size() > 0) {
      orderList.add(criteriaBuilder.asc(root.get(GprsMessageEntity_.id)));
      criteria.orderBy(orderList);
      return em.createQuery(cancelInterruptionQuery).getResultList().get(0);
    }
    
    CriteriaQuery<GprsMessageEntity> elseQuery = criteria.where(
        criteriaBuilder.and(
            criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller),
            criteriaBuilder.equal(root.get(GprsMessageEntity_.deviceId), deviceId)
        )
    );
    
    // Order results by ID
    orderList.add(criteriaBuilder.asc(root.get(GprsMessageEntity_.id)));
    criteria.orderBy(orderList);
    
    if (em.createQuery(criteria).getResultList().size() > 0) {
      return em.createQuery(criteria).getResultList().get(0);
    }
    
    elseQuery = criteria.where(
      criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller)
    );
    
    // Order results by ID
    orderList.add(criteriaBuilder.asc(root.get(GprsMessageEntity_.id)));
    criteria.orderBy(orderList);
    
    if (em.createQuery(criteria).getResultList().size() > 0) {
      return em.createQuery(criteria).getResultList().get(0);
    }
    
    return null;
  }
  
  public void deleteGprsMessageFromController(ControllerEntity controller, GprsMessageEntity message) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<GprsMessageEntity> delete = criteriaBuilder.createCriteriaDelete(GprsMessageEntity.class);
    Root<GprsMessageEntity> root = delete.from(GprsMessageEntity.class);

    delete.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller)
      ),
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(GprsMessageEntity_.id), message.getId())
      )
    );
    
    em.createQuery(delete).executeUpdate();
  }
}
