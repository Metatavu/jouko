package fi.metatavu.jouko.api.dao;

import java.util.List;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.api.model.UserEntity_;

@Dependent
public class UserDAO extends AbstractDAO<DeviceEntity> {
  
  public UserEntity findByKeycloakId(String keycloakId) {
    EntityManager em = getEntityManager();
    
    CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
    CriteriaQuery<UserEntity> criteria = criteriaBuilder.createQuery(UserEntity.class);
    Root<UserEntity> root = criteria.from(UserEntity.class);
    
    criteria.select(root);
    criteria.where(
      criteriaBuilder.equal(root.get(UserEntity_.keycloakId), keycloakId)
    );
    
    List<UserEntity> users = em.createQuery(criteria).getResultList();
    if (users.size() == 0) {
      return null;
    }
    else if (users.size() == 1) {
      return users.get(0);
    }
    else {
      throw new RuntimeException("Multiple users with the same keycloakId");
    }
  }
  
}
