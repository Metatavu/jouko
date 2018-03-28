package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.util.Arrays;
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
import fi.metatavu.jouko.server.rest.model.Device;

@Dependent
public class DeviceDAO extends AbstractDAO<DeviceEntity> {
  
  public List<DeviceEntity> listByInterruption(InterruptionEntity entity) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<DeviceEntity> criteria = criteriaBuilder.createQuery(DeviceEntity.class);
    Root<InterruptionEntity> root = criteria.from(InterruptionEntity.class);
    Join<InterruptionEntity, DeviceEntity> join = root.join(InterruptionEntity_.device);
    
    criteria.select(join);
    criteria.where(
      criteriaBuilder.equal(root, entity)
    );
    
    return em.createQuery(criteria).getResultList();
  }
  
}
