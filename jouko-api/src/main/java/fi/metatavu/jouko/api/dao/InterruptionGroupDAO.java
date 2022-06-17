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
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity_;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity_;

@Dependent
public class InterruptionGroupDAO extends AbstractDAO<InterruptionGroupEntity> {

  /**
   * Creates a new interruption group
   *
   * @param startTime when to start interruption
   * @param endTime when to end interruption
   * @param overbookingFactor how much to overbook the device
   * @param powerSavingGoalInWatts power saving goal in watts
   * @return a new group
   */
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

  /**
   * Deletes an interruption group by id
   *
   * @param id of interruption group
   */
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

  /**
   * Updates an interruption group
   *
   * @param entity the id of the interruption group that wish to change
   * @param startTime from when
   * @param endTime to when
   * @return updated interruption group
   */
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
