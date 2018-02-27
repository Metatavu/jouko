package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity_;

public class PowerMeasurementDAO extends AbstractDAO<DevicePowerMeasurementEntity> {
  public List<DevicePowerMeasurementEntity> listByDeviceAndDate(
      DeviceEntity device,
      OffsetDateTime fromTime,
      OffsetDateTime toTime
  ) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<DevicePowerMeasurementEntity> criteria = criteriaBuilder.createQuery(DevicePowerMeasurementEntity.class);
    Root<DevicePowerMeasurementEntity> root = criteria.from(DevicePowerMeasurementEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
        criteriaBuilder.greaterThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), fromTime),
        criteriaBuilder.lessThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), toTime)
      )
    );
    
    return em.createQuery(criteria).getResultList();
  }
}
