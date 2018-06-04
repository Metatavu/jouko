package fi.metatavu.jouko.api.dao;

import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.ControllerEntity_;

@Dependent
public class ControllerDAO extends AbstractDAO<ControllerEntity> {

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
  
}
