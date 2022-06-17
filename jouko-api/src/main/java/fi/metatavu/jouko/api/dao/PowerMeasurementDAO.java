package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity_;
import fi.metatavu.jouko.api.model.MeasurementType;
import fi.metatavu.jouko.server.rest.model.Device;

@Dependent
public class PowerMeasurementDAO extends AbstractDAO<DevicePowerMeasurementEntity> {
  
  public DevicePowerMeasurementEntity create(
      DeviceEntity device,
      double measurementValue,
      MeasurementType measurementType,
      OffsetDateTime startTime,
      OffsetDateTime endTime,
      int phaseNumber,
      boolean relayIsOpen
  ) {
    DevicePowerMeasurementEntity entity = new DevicePowerMeasurementEntity(
        null,
        device,
        measurementValue,
        measurementType,
        startTime,
        endTime,
        phaseNumber,
        relayIsOpen
    );
    getEntityManager().persist(entity);
    return entity;
  }

  /**
   * Creates a list of power measurements for devices
   *
   * @param devices
   * @param fromTime
   * @param toTime
   * @return list of power measurements
   */
  public List<DevicePowerMeasurementEntity> listByDevices(List<DeviceEntity> devices, OffsetDateTime fromTime, OffsetDateTime toTime) {
    EntityManager em = getEntityManager();
    List<Order> orderList = new ArrayList();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<DevicePowerMeasurementEntity> criteria = criteriaBuilder.createQuery(DevicePowerMeasurementEntity.class);
    Root<DevicePowerMeasurementEntity> root = criteria.from(DevicePowerMeasurementEntity.class);
    
    orderList.add(criteriaBuilder.desc(root.get("startTime")));
    orderList.add(criteriaBuilder.asc(root.get("phaseNumber")));
    
    Expression<DeviceEntity> exp = root.get(DevicePowerMeasurementEntity_.device);
    Predicate predicate = exp.in(devices);
    
    criteria.select(root)
      .orderBy(orderList)
      .where(
          predicate
        );
    
    return em.createQuery(criteria).setMaxResults(96).getResultList();
  }

  /**
   * Creates a list of power measurements for a single device
   *
   * @param device
   * @param fromTime
   * @param toTime
   * @return
   */
  public List<DevicePowerMeasurementEntity> listByDevice(DeviceEntity device, OffsetDateTime fromTime, OffsetDateTime toTime) {
    EntityManager em = getEntityManager();
    List<Order> orderList = new ArrayList();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<DevicePowerMeasurementEntity> criteria = criteriaBuilder.createQuery(DevicePowerMeasurementEntity.class);
    Root<DevicePowerMeasurementEntity> root = criteria.from(DevicePowerMeasurementEntity.class);
    
    orderList.add(criteriaBuilder.asc(root.get("startTime")));
    orderList.add(criteriaBuilder.asc(root.get("phaseNumber")));
    
    criteria.select(root)
      .orderBy(orderList)
      .where(
          criteriaBuilder.or(
              criteriaBuilder.and(
                criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
                criteriaBuilder.lessThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), fromTime),
                criteriaBuilder.greaterThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), fromTime)
              ),
              criteriaBuilder.and(
                criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
                criteriaBuilder.greaterThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), fromTime),
                criteriaBuilder.lessThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), toTime)
              ),
              criteriaBuilder.and(
                criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
                criteriaBuilder.lessThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), toTime),
                criteriaBuilder.greaterThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), toTime)
              )
            )
        );
    
    return em.createQuery(criteria).getResultList();
  }

  /**
   * Creates a list of power measurements for a single device using date as a filter
   *
   * @param device
   * @param fromTime
   * @param toTime
   * @return
   */
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
      criteriaBuilder.or(
        criteriaBuilder.and(
          criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
          criteriaBuilder.lessThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), fromTime),
          criteriaBuilder.greaterThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), fromTime)
        ),
        criteriaBuilder.and(
          criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
          criteriaBuilder.greaterThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), fromTime),
          criteriaBuilder.lessThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), toTime)
        ),
        criteriaBuilder.and(
          criteriaBuilder.equal(root.get(DevicePowerMeasurementEntity_.device), device),
          criteriaBuilder.lessThanOrEqualTo(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.startTime), toTime),
          criteriaBuilder.greaterThan(root.<OffsetDateTime>get(DevicePowerMeasurementEntity_.endTime), toTime)
        )
      )
    );
    
    return em.createQuery(criteria).getResultList();
  }
}
