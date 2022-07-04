package fi.metatavu.jouko.api;

import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.dao.UserDAO;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.model.User;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;

@Dependent
public class UserController {

  @Inject
  private UserDAO userDAO;

  @Inject
  private SettingDAO settingDao;

  @Inject
  private Logger logger;

  /**
   * Get user by keycloak id
   *
   * @param keycloakId keycloak id (The long string that is used to identify the user in Keycloak)
   * @return keycloak user
   */
  public UserEntity findUserByKeycloakId(String keycloakId) {
    return userDAO.findByKeycloakId(keycloakId);
  }

  /**
   * Get user by id
   *
   * @param id user id (e.g 1)
   * @return user
   */
  public UserEntity findUserById(Long id) {
    return userDAO.findById(id);
  }

  /**
   * Get list of all users
   *
   * @return list of users
   */
  public List<UserEntity> listUsers() {
    return userDAO.listAll();
  }

  /**
   * Create user
   *
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

  public UserEntity deleteUser(String keycloakId) {
    UserEntity entity = userDAO.findByKeycloakId(keycloakId);
    if (entity != null) {
      userDAO.delete(entity);
    }
    return entity;
  }

  /**
   * Create a new keycloak user
   *
   * @param user The user to create
   * @param token The token to use for authentication
   * @return The created user
   */
  public String createKeycloakUser(User user, String token) {
    String kcUrl = settingDao.findByKey("keycloakUrl").getValue();
    String realm = settingDao.findByKey("keycloakRealm").getValue();

    /**
     * Create a Keycloak client and build Resteasy client
     */
    Keycloak keycloak = KeycloakBuilder.builder()
            .serverUrl(kcUrl)
            .realm(realm)
            .authorization(token)
            .resteasyClient((ResteasyClient) ClientBuilder.newBuilder().build())
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
      logger.error(e.getCause().getMessage());
    }

    if (response != null) {
      String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
      return userId;
    }


    return null;
  }

  public String deleteKeycloakUser(String keycloakId, String token) {
    String kcUrl = settingDao.findByKey("keycloakUrl").getValue();
    String realm = settingDao.findByKey("keycloakRealm").getValue();

    Keycloak keycloak = KeycloakBuilder.builder()
            .serverUrl(kcUrl)
            .realm(realm)
            .authorization(token)
            .build();

    RealmResource realmResource = keycloak.realm(realm);
    UsersResource userRessource = realmResource.users();
    Response response = null;

    try {
      response = userRessource.delete(keycloakId);
    } catch (Throwable e) {
      e.printStackTrace();
      System.out.println(e.getMessage());
      System.out.println(e.getCause());
    }

    if (response != null) {
      return response.getStatusInfo().getReasonPhrase();
    }

    return null;
  }


  public void updateUser(UserEntity user, UUID keycloakId) {
    userDAO.update(user);
  }
}
