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
public class InterruptionGroupDAO extends AbstractDAO<InterruptionGroupEntity> {
  
  public InterruptionGroupEntity create(OffsetDateTime startTime, OffsetDateTime endTime) {
    InterruptionGroupEntity group = new InterruptionGroupEntity();
    group.setStartTime(startTime);
    group.setEndTime(endTime);
    getEntityManager().persist(group);
    return group;
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
