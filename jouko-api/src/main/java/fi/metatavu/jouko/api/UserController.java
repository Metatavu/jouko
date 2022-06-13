package fi.metatavu.jouko.api;

import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.dao.UserDAO;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.model.User;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.List;

@Dependent
public class UserController {
  
  @Inject
  private UserDAO userDAO;
  
  @Inject
  private SettingDAO settingDao;
  
  public UserEntity findUserByKeycloakId(String keycloakId) {
    return userDAO.findByKeycloakId(keycloakId);
  }

  public UserEntity findUserById(Long id) {
    return userDAO.findById(id);
  }
  
  public List<UserEntity> listUsers() {
    return userDAO.listAll();
  }
  
  public UserEntity createUser(User user, String keycloakId) {
    UserEntity entity = new UserEntity();
    entity.setKeycloakId(keycloakId);
    entity.setName(user.getFirstName() + " " + user.getLastName());
    
    return userDAO.create(entity);
  }
  
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
