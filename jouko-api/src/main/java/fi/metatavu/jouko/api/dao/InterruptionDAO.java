package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity_;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity_;

@Dependent
public class InterruptionDAO extends AbstractDAO<InterruptionEntity> {
  
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

  public List<InterruptionEntity> listByDate(
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
        criteriaBuilder.greaterThanOrEqualTo(join.<OffsetDateTime>get(InterruptionGroupEntity_.startTime), fromTime),
        criteriaBuilder.lessThan(join.<OffsetDateTime>get(InterruptionGroupEntity_.endTime), toTime)
      )
    );
    
    return em.createQuery(criteria).getResultList();
  }
  
  public InterruptionEntity updateCancelled(
      InterruptionEntity entity,
      boolean cancelled
  ) {
    entity.setCancelled(cancelled);
    getEntityManager().persist(entity);
    return entity;
  }
  
  public InterruptionEntity updateCancellationTime(
      InterruptionEntity entity,
      OffsetDateTime cancellationTime
  ) {
    entity.setCancellationTime(cancellationTime);
    getEntityManager().persist(entity);
    return entity;
  }
}
