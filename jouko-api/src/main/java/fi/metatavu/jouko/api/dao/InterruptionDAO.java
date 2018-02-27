package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity_;

public class InterruptionDAO extends AbstractDAO<InterruptionEntity> {
  
  public List<InterruptionEntity> listByDeviceAndDate(
      DeviceEntity device,
      OffsetDateTime fromTime,
      OffsetDateTime toTime
  ) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<InterruptionEntity> criteria = criteriaBuilder.createQuery(InterruptionEntity.class);
    Root<InterruptionEntity> root = criteria.from(InterruptionEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionEntity_.device), device),
        criteriaBuilder.greaterThanOrEqualTo(root.<OffsetDateTime>get(InterruptionEntity_.startTime), fromTime),
        criteriaBuilder.lessThan(root.<OffsetDateTime>get(InterruptionEntity_.endTime), toTime)
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
