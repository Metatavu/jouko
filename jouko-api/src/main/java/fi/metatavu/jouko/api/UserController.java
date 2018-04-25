package fi.metatavu.jouko.api;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.UserDAO;
import fi.metatavu.jouko.api.model.UserEntity;

@Dependent
public class UserController {
  
  @Inject
  private UserDAO userDAO;
  
  public UserEntity findUserByKeycloakId(String keycloakId) {
    return userDAO.findByKeycloakId(keycloakId);
  }

  public UserEntity findUserById(Long id) {
    return userDAO.findById(id);
  }

}
