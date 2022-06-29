package fi.metatavu.jouko.api.dao;

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
  /**
   * Creates a new GPRS message
   *
   * @param controller you want to use for the message
   * @param deviceId the device you want to send the message to
   * @param content the content of the message
   * @param messageType type of message
   * @return new Gprs message
   */
  public GprsMessageEntity create(ControllerEntity controller, long deviceId, String content, MessageType messageType) {
    GprsMessageEntity result = new GprsMessageEntity(null, deviceId, content, controller, messageType);
    getEntityManager().persist(result);
    return result;
  }

  /**
   * Clears all GPRS messages
   */
  public void clear() {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<GprsMessageEntity> delete = criteriaBuilder.createCriteriaDelete(GprsMessageEntity.class);
    delete.from(GprsMessageEntity.class);
    
    em.createQuery(delete).executeUpdate();
  }

  /**
   * Clear a controller's messages
   *
   * @param controller the controller to clear the messages for
   */
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

  /**
   * List the given controller's messages
   *
   * @param controller the controller to list the messages for
   * @return the messages of the given controller
   */
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

  /**
   * Find a message for the device using the controller and the device ID.
   *
   * @param controller the controller the message was sent tto
   * @param deviceId the device ID that sent the message
   * @return the found message
   */
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

    /*
     * Order results by ID
     */
    orderList.add(criteriaBuilder.asc(root.get(GprsMessageEntity_.id)));
    criteria.orderBy(orderList);
    
    if (em.createQuery(criteria).getResultList().size() > 0) {
      return em.createQuery(criteria).getResultList().get(0);
    }
    
    elseQuery = criteria.where(
      criteriaBuilder.equal(root.get(GprsMessageEntity_.controller), controller)
    );

    /*
     * Order results by ID
     */
    orderList.add(criteriaBuilder.asc(root.get(GprsMessageEntity_.id)));
    criteria.orderBy(orderList);
    
    if (em.createQuery(criteria).getResultList().size() > 0) {
      return em.createQuery(criteria).getResultList().get(0);
    }
    
    return null;
  }

  /**
   * Delete a Gprs message from specified controller
   *
   * @param controller the controller to delete the message from
   * @param message the message to delete
   */
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
