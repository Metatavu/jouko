package fi.metatavu.jouko.api;

import java.util.UUID;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.KeycloakUsersApi;
import fi.metatavu.jouko.server.rest.model.User;

@RequestScoped
@Stateful
public class KeycloakUsersApiImpl implements KeycloakUsersApi {
  
  @Inject
  private UserController userController;
  
  private User userFromEntity(UserEntity entity) {
    User result = new User();
    result.setId(entity.getId());
    result.setName(entity.getName());
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

}