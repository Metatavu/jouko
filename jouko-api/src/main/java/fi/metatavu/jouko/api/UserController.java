package fi.metatavu.jouko.api;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.authorization.client.util.HttpResponseException;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.dao.UserDAO;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.model.User;

@Dependent
public class UserController {
  
  @Inject
  private UserDAO userDAO;
  
  @Inject
  private SettingDAO settingDao;

  /**
   * Get user by keycloak id
   * @param keycloakId keycloak id
   * @return keycloak user
   */
  public UserEntity findUserByKeycloakId(String keycloakId) {
    return userDAO.findByKeycloakId(keycloakId);
  }

  /**
   * Get user by id
   * @param id user id
   * @return user
   */
  public UserEntity findUserById(Long id) {
    return userDAO.findById(id);
  }

  /**
   * Get list of all users
   * @return list of users
   */
  public List<UserEntity> listUsers() {
    return userDAO.listAll();
  }

  /**
   * Create user
   * @param user you want to create
   * @param keycloakId keycloak id
   * @return created user
   */
  public UserEntity createUser(User user, String keycloakId) {
    UserEntity entity = new UserEntity();
    entity.setKeycloakId(keycloakId);
    entity.setName(user.getFirstName() + " " + user.getLastName());
    
    return userDAO.create(entity);
  }

  /**
   * Create a new keycloak user
   * @param user The user to create
   * @param token The token to use for authentication
   * @return The created user
   */
  public String createKeycloakUser(User user, String token) {
    String kcUrl = settingDao.findByKey("keycloakUrl").getValue();
    String realm = settingDao.findByKey("keycloakRealm").getValue();
    
    Keycloak keycloak = KeycloakBuilder.builder()
        .serverUrl(kcUrl)
        .realm(realm)
        .authorization(token)
        .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(20).build())
        .build();
    
    UserRepresentation newUser = new UserRepresentation();
    newUser.setEnabled(true);
    newUser.setUsername(user.getUsername());
    newUser.setFirstName(user.getFirstName());
    newUser.setLastName(user.getLastName());
    newUser.setEmail(user.getEmail());
    
    RealmResource realmResource = keycloak.realm(realm);
    UsersResource userRessource = realmResource.users();
    Response response = null;
    
    try {
      response = userRessource.create(newUser);
    } catch (Throwable e) {
      e.printStackTrace();
      System.out.println(e.getMessage());
      System.out.println(e.getCause());
    }
    
    if (response != null) {
      String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
      return userId;
    }
    
    
    return null;
  }
  

}
