package fi.metatavu.jouko.api.dao;

import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.SettingEntity;
import fi.metatavu.jouko.api.model.SettingEntity_;

@Dependent
public class SettingDAO extends AbstractDAO<SettingEntity> {

  /**
   * Find setting by key
   * 
   * @param key
   * @return setting or null if not found
   */
  public SettingEntity findByKey(String key) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<SettingEntity> criteria = criteriaBuilder.createQuery(SettingEntity.class);
    Root<SettingEntity> root = criteria.from(SettingEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.equal(root.get(SettingEntity_.key), key)
    );
    
    List<SettingEntity> results = em.createQuery(criteria).getResultList();
    if (results.size() == 0) {
      return null;
    } else if (results.size() == 1) {
      return results.get(0);
    } else {
      throw new RuntimeException("More than 2 settings found by key");
    }
  }

}