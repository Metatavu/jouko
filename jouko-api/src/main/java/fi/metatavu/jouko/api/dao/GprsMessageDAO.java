package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity_;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity_;
import fi.metatavu.jouko.api.model.MessageType;

@Dependent
public class GprsMessageDAO extends AbstractDAO<GprsMessageEntity> {
  public GprsMessageEntity create(ControllerEntity controller, String content, MessageType messageType) {
    GprsMessageEntity result = new GprsMessageEntity(null, content, controller, messageType);
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
  
  public GprsMessageEntity findOneByController(ControllerEntity controller) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<GprsMessageEntity> criteria = criteriaBuilder.createQuery(GprsMessageEntity.class);
    Root<GprsMessageEntity> root = criteria.from(GprsMessageEntity.class);
    
    List<Order> orderList = new ArrayList();
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller)
    );
    
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
