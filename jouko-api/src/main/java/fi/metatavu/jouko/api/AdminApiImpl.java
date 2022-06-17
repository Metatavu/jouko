package fi.metatavu.jouko.api;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.AdminApi;
import fi.metatavu.jouko.server.rest.model.ControllerDevice;
import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.InterruptionGroup;
import fi.metatavu.jouko.server.rest.model.User;
import fi.metatavu.jouko.api.UserController;
import fi.metatavu.jouko.api.dao.ControllerDAO;
import fi.metatavu.jouko.api.dao.SettingDAO;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

@Stateless
public class AdminApiImpl implements AdminApi {
  
  @Inject
  private InterruptionController interruptionController;
  
  @Inject
  private DeviceController deviceController;

  @Inject
  private UserController userController;
  
  @Inject
  private DeviceCommunicator deviceCommunicator;
  
  @Inject
  private SettingDAO settingDao;
  
  @Inject
  private ControllerDAO controllerDAO;
  
  private Device deviceFromEntity(DeviceEntity entity) {
    Device result = new Device();
    result.setId(entity.getId());
    result.setName(entity.getName());
    result.setControllerId(entity.getController().getId());
    result.setUserId(entity.getUser().getId());
    return result;
  }

  /**
   * Get user from entity
   *
   * @param entity you want to get user from
   * @return user
   */
  private User userFromEntity(UserEntity entity) {
    User result = new User();
    result.setId(entity.getId());
    result.setKeycloakId(UUID.fromString(entity.getKeycloakId()));
    return result;
  }

  /**
   * Get controller from entity
   *
   * @param entity you want to get controller from
   * @return controller
   */
  private ControllerDevice controllerDeviceFromEntity(ControllerEntity entity) {
    ControllerDevice result = new ControllerDevice();
    result.setId(entity.getId());
    result.setEui(entity.getEui());
    result.setKey(entity.getKey());
    result.setCommunicationChannel(entity.getCommunicationChannelString());
    return result;
  }

  /**
   * Get interruption group from entity
   *
   * @param entity you want to get interruption group from
   * @return interruption group
   */
  public InterruptionGroup interruptionGroupFromEntity(InterruptionGroupEntity entity) {
    InterruptionGroup result = new InterruptionGroup();
    result.setStartTime(entity.getStartTime());
    result.setEndTime(entity.getEndTime());
    result.setId(entity.getId());
    result.setOverbookingFactor(entity.getOverbookingFactor());
    result.setPowerSavingGoalInWatts((long)entity.getPowerSavingGoalInWatts());
    return result;
  }

  /**
   * Create a new interruption group
   *
   * @param body of the request
   * @return created interruption group
   * @throws Exception if something goes wrong
   */
  @Override
  public Response createInterruptionGroup(InterruptionGroup body)
      throws Exception {
    InterruptionGroupEntity group = interruptionController.createInterruptionGroup(
        body.getStartTime(),
        body.getEndTime(),
        body.getOverbookingFactor(),
        (int)((long)body.getPowerSavingGoalInWatts()));
    
    List<DeviceEntity> devices = deviceController.listAll(null, null);
    
    for (DeviceEntity device : devices) {
      InterruptionEntity interruption = interruptionController.createInterruption(device, group);
      deviceCommunicator.notifyInterruption(interruption);
    }
    
    return Response.ok(interruptionGroupFromEntity(group)).build();
  }

  /**
   * List of all interruption groups
   *
   * @param firstResult first result to return
   * @param maxResults max results to return
   * @return list of interruption groups
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listInterruptionGroups(
      Integer firstResult,
      Integer maxResults
  ) throws Exception {
    List<InterruptionGroup> result = interruptionController
        .listInterruptionGroups(firstResult, maxResults)
        .stream()
        .map(this::interruptionGroupFromEntity)
        .collect(Collectors.toList());
    return Response.ok(result).build();
  }

  /**
   * Get interruption group by id
   *
   * @param groupId of the interruption group
   * @return interruption group
   * @throws Exception if something goes wrong
    */
  @Override
  public Response retrieveInterruptionGroup(
      Long groupId
  ) throws Exception {
    InterruptionGroupEntity entity = interruptionController.findInterruptionGroupById(
        groupId);
    if (entity == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("interruption group not found")
                     .build();
    }
    return Response.ok(interruptionGroupFromEntity(entity)).build();
  }

  /**
   * Update interruption group
   *
   * @param groupId of the interruption group
   * @param body of the request
   * @return updated interruption group
   * @throws Exception
   */
  @Override
  public Response updateInterruptionGroup(Long groupId, InterruptionGroup body) throws Exception {
    InterruptionGroupEntity entity = interruptionController.findInterruptionGroupById(groupId);
    if (entity == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("interruption group not found")
                     .build();
    }
    interruptionController.updateInterruptionGroup(
        entity,
        body.getStartTime(),
        body.getEndTime());
    
    return Response.ok(body).build();
  }

  /**
   * List of all devices
   *
   * @param firstResult first result to return
   * @param maxResults max results to return
   * @return list of devices
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listAllDevices(Integer firstResult, Integer maxResults)
      throws Exception {
    List<DeviceEntity> entities = deviceController.listAll(firstResult, maxResults);
    List<Device> devices = entities.stream()
                                   .map(this::deviceFromEntity)
                                   .collect(Collectors.toList());
    return Response.ok(devices).build();
  }

  /**
   * Create a new device
   *
   * @param body of the request
   * @return created device
   * @throws Exception if something goes wrong
   */
  @Override
  public Response createDevice(Device body) throws Exception {
    ControllerEntity controller = deviceController.findControllerById(
        body.getControllerId());
    UserEntity user = userController.findUserById(body.getUserId());
    DeviceEntity device = deviceController.createDevice(controller, body.getName(), user);
    body.setId(device.getId());
    return Response.ok(body).build();
  }

  /**
   * Create a new user
   *
   * @param body of the request
   * @param token to authenticate
   * @return created user
   * @throws Exception if something goes wrong
   */
  @Override
  public Response createUser(User body, String token) throws Exception {
    String keycloakId = userController.createKeycloakUser(body, token);   
    UserEntity newUser = userController.createUser(body, keycloakId);
    
    return Response.ok(newUser).build();
  }

  /**
   * List of all users
   *
   * @param firstResult first result to return
   * @param maxResults max results to return
   * @return list of users
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listAllUsers(Integer firstResult, Integer maxResults)
      throws Exception {
    List<UserEntity> entities = userController.listUsers();
    List<User> users = entities.stream()
        .map(this::userFromEntity)
        .collect(Collectors.toList());
    return Response.ok(users).build();
  }

  @Override
  public Response retrieveDevice(Long deviceId) throws Exception {
    DeviceEntity device = deviceController.findById(deviceId);
    return Response.ok(deviceFromEntity(device)).build();
  }

  @Override
  public Response retrieveUser(Long userId) throws Exception {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Response updateDevice(Long deviceId, Device newDevice)
      throws Exception {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Response updateUser(Long userId, User body) throws Exception {
    // TODO Auto-generated method stub
    return null;
  }

  /**
   * Create a new controller device
   *
   * @param body of request
   * @return created controller device
   * @throws Exception if something goes wrong
   */
  @Override
  public Response createControllerDevice(ControllerDevice body) throws Exception {
    ControllerCommunicationChannel controllerCommunicationChannel = ControllerCommunicationChannel.valueOf(body.getCommunicationChannel());
    String eui = body.getEui();
    String key = body.getKey();
    
    deviceController.createControllerDevice(eui, key, controllerCommunicationChannel);
    return null;
  }

  /**
   * List of all controller devices
   *
   * @param firstResult first result to return
   * @param maxResults max results to return
   * @return list of controller devices
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listAllControllerDevices(Integer firstResult, Integer maxResults) throws Exception {
    List<ControllerEntity> entities = deviceController.listControllerDevices(firstResult, maxResults);
    List<ControllerDevice> controllerDevices = entities.stream()
        .map(this::controllerDeviceFromEntity)
        .collect(Collectors.toList());
    return Response.ok(controllerDevices).build();
  }

  @Override
  public Response retrieveControllerDevice(Long controllerDeviceId) throws Exception {
    System.out.println("mummo");
    return null;
  }

  @Override
  public Response updateControllerDevice(Long controllerDeviceId, ControllerDevice newControllerDevice)
      throws Exception {
    // TODO Auto-generated method stub
 
    return null;
  }

  /**
   * Delete an interruption from a group
   *
   * @param groupId of the group
   * @return deleted interruption
   * @throws Exception if something goes wrong
   */
  @Override
  public Response deleteInterruption(Long groupId) throws Exception {
    List<InterruptionEntity> entities = interruptionController.listInterruptionsByGroupId(groupId);
    
    for (InterruptionEntity entity : entities) {
      deviceCommunicator.notifyInterruptionCancellation(entity);
      interruptionController.deleteInterruption(entity);
    }
    
    interruptionController.deleteInerruptionGroup(groupId);
    return Response.ok().build();
  }

  @Override
  public Response deleteControllerDevice(Long controllerDeviceId) throws Exception {
    // TODO Auto-generated method stub
    System.out.println("Granny's leg");
    System.out.println("Leg of the granny");
    return null;
  }
  
}
