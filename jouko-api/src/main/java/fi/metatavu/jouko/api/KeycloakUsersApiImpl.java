package fi.metatavu.jouko.api;

import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.model.KeycloakUserEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.KeycloakUsersApi;
import fi.metatavu.jouko.server.rest.model.User;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequestScoped
@Stateful
public class KeycloakUsersApiImpl implements KeycloakUsersApi {

  @Inject
  private UserController userController;

  @Inject
  private SettingDAO settingDao;

  private User userFromEntity(UserEntity entity) {
    User result = new User();
    result.setId(entity.getId());
    result.setKeycloakId(UUID.fromString(entity.getKeycloakId()));
    return result;
  }

  /**
   * Get user by keycloak id
   *
   * @param keycloakId keycloak id
   * @return user
   * @throws Exception if user could not be found
   */
  @Override
  public Response getUserByKeycloakId(UUID keycloakId) throws Exception {
    UserEntity userEntity = userController.findUserByKeycloakId(keycloakId.toString());
    if (userEntity == null) {
      return Response.status(Status.NOT_FOUND)
              .entity("User with keycloak id " + keycloakId + " not found")
              .build();
    } else {
      return Response.ok(userFromEntity(userEntity)).build();
    }
  }

  /**
   * List keycloak users
   *
   * @param token keycloak token
   * @return list of keycloak users
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listKeycloakUsers(String token) throws Exception {
    if (token == null || token.isEmpty()) {
      return null;
    }

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

    List<UserRepresentation> list = keycloak.realm(realm).users().list();
    List<KeycloakUserEntity> userList = new ArrayList<KeycloakUserEntity>();

    /*
        * Fetches keycloak users, sets their details and saves them to a userList that gets built and returned.
    */
    for (UserRepresentation kcUser : list) {
      KeycloakUserEntity keycloakUserEntity = new KeycloakUserEntity();
      UserEntity userEntity = userController.findUserByKeycloakId(kcUser.getId());

      if (userEntity != null) {
        keycloakUserEntity.setEmail(kcUser.getEmail());
        keycloakUserEntity.setFirstName(kcUser.getFirstName());
        keycloakUserEntity.setLastName(kcUser.getLastName());
        keycloakUserEntity.setKeycloakId(kcUser.getId());
        keycloakUserEntity.setUsername(kcUser.getUsername());
        keycloakUserEntity.setId(userEntity.getId());

        userList.add(keycloakUserEntity);
      }
    }

    return Response.ok(userList).build();
  }

}