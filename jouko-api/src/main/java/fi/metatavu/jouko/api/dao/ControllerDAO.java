package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.ControllerEntity_;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Dependent
public class ControllerDAO extends AbstractDAO<ControllerEntity> {

  /**
   * Creates a new controller entity.
   *
   * @param eui some parameter. what is an eui?
   * @param key some parameter, presumably a database key or something?
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
