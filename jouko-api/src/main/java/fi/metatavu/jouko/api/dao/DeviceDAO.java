package fi.metatavu.jouko.api.dao;

import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DeviceEntity_;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity_;
import fi.metatavu.jouko.api.model.UserEntity;

@Dependent
public class DeviceDAO extends AbstractDAO<DeviceEntity> {
  
  public DeviceEntity create(
      ControllerEntity controller,
      String name,
      UserEntity user
  ) {
    DeviceEntity device = new DeviceEntity();
    device.setController(controller);
    device.setName(name);
    device.setUser(user);
    getEntityManager().persist(device);
    return device;
  }
  
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

  public List<DeviceEntity> listByUser(UserEntity user, int firstResult, int maxResults) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<DeviceEntity> criteria = criteriaBuilder.createQuery(DeviceEntity.class);
    Root<DeviceEntity> root = criteria.from(DeviceEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.equal(root.get(DeviceEntity_.user), user)
    );
    
    return em.createQuery(criteria)
             .setFirstResult(firstResult)
             .setMaxResults(maxResults)
             .getResultList();
  }
  
}
