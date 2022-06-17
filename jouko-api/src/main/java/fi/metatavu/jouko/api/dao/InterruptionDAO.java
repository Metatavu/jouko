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
   * @param device you want ot create an interruption for
   * @param group to assign the device to
   * @return
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
   * @param device you want to retrieve interruptions from
   * @param fromTime filter from when
   * @param toTime filter to when
   * @return
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
   * @param fromTime filter from when
   * @param toTime filter from to
   * @return interruptions in a specific time period
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
   * Lists interruptions using group id
   *
   * @param groupId of an interruption group
   * @return all interruption groups of an id
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
   * @param entity is the interruption that you want to delete
   * @param device is from what device the interruption want to be deleted from
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
   * @param entity
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
   * Set interruption as cancelled
   *
   * @param entity
   * @param cancelled
   * @return
   */
  public InterruptionEntity updateCancelled(InterruptionEntity entity, boolean cancelled) {
    entity.setCancelled(cancelled);
    getEntityManager().persist(entity);
    return entity;
  }

  /**
   * Set interruption cancellation time
   *
   * @param entity
   * @param cancellationTime
   * @return
   */
  public InterruptionEntity updateCancellationTime(InterruptionEntity entity, OffsetDateTime cancellationTime) {
    entity.setCancellationTime(cancellationTime);
    getEntityManager().persist(entity);
    return entity;
  }
}
