package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.time.OffsetDateTime;
import java.util.List;

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
  
  public InterruptionEntity updateCancelled(InterruptionEntity entity, boolean cancelled) {
    entity.setCancelled(cancelled);
    getEntityManager().persist(entity);
    return entity;
  }
  
  public InterruptionEntity updateCancellationTime(InterruptionEntity entity, OffsetDateTime cancellationTime) {
    entity.setCancellationTime(cancellationTime);
    getEntityManager().persist(entity);
    return entity;
  }
}
