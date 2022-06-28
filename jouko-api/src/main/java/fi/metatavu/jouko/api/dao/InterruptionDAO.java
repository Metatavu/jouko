package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity_;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity_;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity_;

@Dependent
public class InterruptionDAO extends AbstractDAO<InterruptionEntity> {

  /**
   * Creates an interruption to a device
   *
   * @param device the device you want ot create an interruption for
   * @param group the group to assign the device to
   * @return a new interruption
   */
  public InterruptionEntity create(
      DeviceEntity device,
      InterruptionGroupEntity group
  ) {
    InterruptionEntity entity = new InterruptionEntity(
        null,
        device,
        group,
        false,
        null);
    getEntityManager().persist(entity);
    return entity;
  }

  /**
   * List device interruptions by date
   *
   * @param device the device you want to retrieve interruptions from
   * @param fromTime the time of the first interruption to return
   * @param toTime the time of the last interruption to return
   * @return the list of interruptions between {@code fromTime} and {@code toTime}
   */
  public List<InterruptionEntity> listByDeviceAndDate(
      DeviceEntity device,
      OffsetDateTime fromTime,
      OffsetDateTime toTime
  ) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<InterruptionEntity> criteria = criteriaBuilder.createQuery(InterruptionEntity.class);
    Root<InterruptionEntity> root = criteria.from(InterruptionEntity.class);
    Join<InterruptionEntity, InterruptionGroupEntity> join = root.join(InterruptionEntity_.group);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionEntity_.device), device),
        criteriaBuilder.greaterThanOrEqualTo(join.<OffsetDateTime>get(InterruptionGroupEntity_.startTime), fromTime),
        criteriaBuilder.lessThan(join.<OffsetDateTime>get(InterruptionGroupEntity_.endTime), toTime)
      )
    );
    
    return em.createQuery(criteria).getResultList();
  }

  /**
   * Lists all interruptions by date
   *
   * @param fromTime the time of the first interruption to return
   * @param toTime the time of the last interruption to return
   * @return the interruptions in the given time period
   */
  public List<InterruptionEntity> listByDate(OffsetDateTime fromTime, OffsetDateTime toTime) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<InterruptionEntity> criteria = criteriaBuilder.createQuery(InterruptionEntity.class);
    Root<InterruptionEntity> root = criteria.from(InterruptionEntity.class);
    Join<InterruptionEntity, InterruptionGroupEntity> join = root.join(InterruptionEntity_.group);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.and(
        criteriaBuilder.greaterThanOrEqualTo(join.<OffsetDateTime>get(InterruptionGroupEntity_.startTime), fromTime),
        criteriaBuilder.lessThan(join.<OffsetDateTime>get(InterruptionGroupEntity_.endTime), toTime)
      )
    );
    
    return em.createQuery(criteria).getResultList();
  }

  /**
   * Lists interruptions by the given group ID
   *
   * @param groupId the ID of an interruption group
   * @return all interruptions of the given group
   */
  public List<InterruptionEntity> listByGroupId(Long groupId) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<InterruptionEntity> criteria = criteriaBuilder.createQuery(InterruptionEntity.class);
    Root<InterruptionEntity> root = criteria.from(InterruptionEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionEntity_.group), groupId)
      )
    );
    
    return em.createQuery(criteria).getResultList();
  }

  /**
   * Deletes interruption from device
   *
   * @param entity the interruption that you want to delete
   * @param device the device the interruption is to be deleted from
   */
  public void deleteInterruptionFromDevice(InterruptionEntity entity, DeviceEntity device) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<InterruptionEntity> delete = criteriaBuilder.createCriteriaDelete(InterruptionEntity.class);
    Root<InterruptionEntity> root = delete.from(InterruptionEntity.class);

    delete.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionEntity_.device), device)
      ),
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionEntity_.id), entity.getId())
      )
    );
    
    em.createQuery(delete).executeUpdate();
  }

  /**
   * Deletes interruption
   *
   * @param entity the interruption to be deleted
   */
  public void deleteInterruption(InterruptionEntity entity) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<InterruptionEntity> delete = criteriaBuilder.createCriteriaDelete(InterruptionEntity.class);
    Root<InterruptionEntity> root = delete.from(InterruptionEntity.class);

    delete.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionEntity_.id), entity.getId())
      )
    );
    
    em.createQuery(delete).executeUpdate();
  }

  /**
   * Mark interruption's cancel state
   *
   * @param entity the interruption to be edited
   * @param cancelled whether the interruption is to be cancelled or not
   * @return the same interruption entity given as the parameter {@code entity}
   */
  public InterruptionEntity updateCancelled(InterruptionEntity entity, boolean cancelled) {
    entity.setCancelled(cancelled);
    getEntityManager().persist(entity);
    return entity;
  }

  /**
   * Update interruption cancellation time
   *
   * @param entity the interruption to be edited
   * @param cancellationTime the cancellation time
   * @return the same interruption entity given as the parameter {@code entity}
   */
  public InterruptionEntity updateCancellationTime(InterruptionEntity entity, OffsetDateTime cancellationTime) {
    entity.setCancellationTime(cancellationTime);
    getEntityManager().persist(entity);
    return entity;
  }
}
