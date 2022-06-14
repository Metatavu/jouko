package fi.metatavu.jouko.api;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;

import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.model.KeycloakUserEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.KeycloakUsersApi;
import fi.metatavu.jouko.server.rest.model.User;

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
  
  @Override
  public Response listKeycloakUsers(String token) throws Exception {
    if (token == null || token.isEmpty()) {
      return null;
    }
    
    String kcUrl = settingDao.findByKey("keycloakUrl").getValue();
    String realm = settingDao.findByKey("keycloakRealm").getValue();
    
    Keycloak keycloak = KeycloakBuilder.builder()
        .serverUrl(kcUrl)
        .realm(realm)
        .authorization(token)
        .resteasyClient((ResteasyClient) ClientBuilder.newBuilder().build())
        .build();

    List<UserRepresentation> list = keycloak.realm(realm).users().list();
    List<KeycloakUserEntity> userList = new ArrayList<KeycloakUserEntity>();
    
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