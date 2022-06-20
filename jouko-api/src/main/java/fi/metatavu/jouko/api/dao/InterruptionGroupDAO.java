package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity_;

@Dependent
public class InterruptionGroupDAO extends AbstractDAO<InterruptionGroupEntity> {
  
  public InterruptionGroupEntity create(
      OffsetDateTime startTime,
      OffsetDateTime endTime,
      double overbookingFactor,
      int powerSavingGoalInWatts) {
    InterruptionGroupEntity group = new InterruptionGroupEntity();
    group.setStartTime(startTime);
    group.setEndTime(endTime);
    group.setOverbookingFactor(overbookingFactor);
    group.setPowerSavingGoalInWatts(powerSavingGoalInWatts);
    getEntityManager().persist(group);
    return group;
  }
  
  public void deleteInterruptionGroupById(Long id) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<InterruptionGroupEntity> delete = criteriaBuilder.createCriteriaDelete(InterruptionGroupEntity.class);
    Root<InterruptionGroupEntity> root = delete.from(InterruptionGroupEntity.class);

    delete.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(InterruptionGroupEntity_.id), id)
      )
    );
    
    em.createQuery(delete).executeUpdate();
  }
  
  public InterruptionGroupEntity update(
      InterruptionGroupEntity entity,
      OffsetDateTime startTime,
      OffsetDateTime endTime) {
    entity.setStartTime(startTime);
    entity.setEndTime(endTime);
    getEntityManager().persist(entity);
    return entity;
  }
}
