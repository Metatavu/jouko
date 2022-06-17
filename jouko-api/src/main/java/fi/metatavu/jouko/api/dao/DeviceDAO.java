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

  /**
   * Creates a new device entity.
   *
   * @param controller the controller that manages the device
   * @param name the name of the device
   * @param user the user that utilizes the device
   * @return the newly created device
   */
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

  /**
   * Lists the device entities by interruption
   *
   * @param entity you want to retrieve interruptions from
   * @return list of interruptions
   */
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

  /**
   * List the user's devices.
   *
   * @param user the user to list the devices of
   * @param firstResult the first result (index) to return
   * @param maxResults the maximum amount of results to return
   * @return the user's devices, sliced as {@code [firstResult...firstResult+maxResults]}
   */
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
