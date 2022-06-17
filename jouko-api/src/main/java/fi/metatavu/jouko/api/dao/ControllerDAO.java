package fi.metatavu.jouko.api.dao;

import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.ControllerEntity_;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity_;
import fi.metatavu.jouko.api.model.UserEntity;

@Dependent
public class ControllerDAO extends AbstractDAO<ControllerEntity> {

  /**
   * Creates a new controller entity.
   *
   * @param eui the eui of the controller entity
   * @param key the key of the controller entity
   * @param communicationChannel the channel this controller uses, GPRS or LORA
   * @return a new controller entity
   */
  public ControllerEntity create(String eui, String key, ControllerCommunicationChannel communicationChannel) {
    ControllerEntity controllerDevice = new ControllerEntity();
    controllerDevice.setEui(eui);
    controllerDevice.setKey(key);
    controllerDevice.setCommunicationChannel(communicationChannel);
    getEntityManager().persist(controllerDevice);
    return controllerDevice;
  }

  /**
   * Deletes the controller entity with the given ID.
   *
   * @param id the ID of the controller entity to delete.
   */
  public void delete(Long id) {
    EntityManager em = getEntityManager();

    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaDelete<ControllerEntity> delete = criteriaBuilder.createCriteriaDelete(ControllerEntity.class);
    Root<ControllerEntity> root = delete.from(ControllerEntity.class);

    delete.where(
      criteriaBuilder.and(
        criteriaBuilder.equal(root.get(ControllerEntity_.id), id)
      )
    );

    em.createQuery(delete).executeUpdate();
  }

  /**
   * Finds a controller entity by its eui
   *
   * @param eui the eui of the requested controller entity
   * @return the found controller entity or null if none was found
   * @throws RuntimeException if more than one controller entity is found for the eui
   */
  public ControllerEntity findByEui(String eui) {
    EntityManager em = getEntityManager();

    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<ControllerEntity> criteria = criteriaBuilder.createQuery(ControllerEntity.class);
    Root<ControllerEntity> root = criteria.from(ControllerEntity.class);

    criteria.select(root);
    criteria.where(
      criteriaBuilder.equal(root.get(ControllerEntity_.eui), eui)
    );

    List<ControllerEntity> results = em.createQuery(criteria).getResultList();
    if (results.size() == 0) {
      return null;
    } else if (results.size() == 1) {
      return results.get(0);
    } else {
      throw new RuntimeException("More than 2 settings found by key");
    }
  }

  /**
   * Finds a controller entity given the eui (Extended Unique Identifier) and key
   *
   * @param eui the eui of the controller entity
   * @param key the key of the controller entity
   * @return the controller entity matching the criteria, or null if none was found
   * @throws RuntimeException if more than two entities are found
   */
  public ControllerEntity findByEuiAndKey(String eui, String key) {
    EntityManager em = getEntityManager();

    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<ControllerEntity> criteria = criteriaBuilder.createQuery(ControllerEntity.class);
    Root<ControllerEntity> root = criteria.from(ControllerEntity.class);

    criteria.select(root);
    criteria.where(
        criteriaBuilder.and(
            criteriaBuilder.equal(root.get(ControllerEntity_.eui), eui),
            criteriaBuilder.equal(root.get(ControllerEntity_.key), key)
        )
    );

    List<ControllerEntity> results = em.createQuery(criteria).getResultList();
    if (results.size() == 0) {
      return null;
    } else if (results.size() == 1) {
      return results.get(0);
    } else {
      throw new RuntimeException("More than 2 settings found by key");
    }
  }

}
