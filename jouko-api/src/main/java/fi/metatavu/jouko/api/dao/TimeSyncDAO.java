package fi.metatavu.jouko.api.dao;

import java.time.OffsetDateTime;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.TimeSyncEntity;
import fi.metatavu.jouko.api.model.TimeSyncEntity_;

/**
 * DAO for TimeSyncEntity
 * @author Otto Hooper
 *
 * No clue what the TimeSync is for but this is a guess based on the TimeSyncEntity class.
 */
public class TimeSyncDAO extends AbstractDAO<TimeSyncEntity> {

    public TimeSyncEntity create(
        OffsetDateTime time,
        DeviceEntity device,
        int reason) {
        TimeSyncEntity entity = new TimeSyncEntity();
        entity.setTime(time);
        entity.setDevice(device);
        entity.setReason(reason);
        getEntityManager().persist(entity);
        return entity;
}

    public List<TimeSyncEntity> listByDevice(DeviceEntity device) {
        EntityManager em = getEntityManager();
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<TimeSyncEntity> criteria = criteriaBuilder.createQuery(TimeSyncEntity.class);
        Root<TimeSyncEntity> root = criteria.from(TimeSyncEntity.class);
        criteria.where(criteriaBuilder.equal(root.get(TimeSyncEntity_.device), device));
        return em.createQuery(criteria).getResultList();
    }
}