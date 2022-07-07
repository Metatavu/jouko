package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.api.model.UserEntity_;

import javax.enterprise.context.Dependent;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Dependent
public class UserDAO extends AbstractDAO<UserEntity> {

  /**
   * Creates a new user
   *
   * @param user the user to be created
   * @return the newly created user
   */
  public UserEntity create(UserEntity user) {
    UserEntity entity = new UserEntity(
        null,
        user.getKeycloakId(),
        user.getName()
    );
    getEntityManager().persist(entity);
    return entity;
  }

  /**
   * Finds user by keycloak id
   *
   * @param keycloakId keycloak user id
   * @return user or null if not found
   * @throws RuntimeException if there are multiple users with the same ID
   */
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

  /**
   * Update user details
   * 
   * @param user you want to update
   */
  public void update(UserEntity user) {
    getEntityManager().merge(user);
  }
}
