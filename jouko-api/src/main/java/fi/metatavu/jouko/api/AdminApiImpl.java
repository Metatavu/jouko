package fi.metatavu.jouko.api;

import fi.metatavu.jouko.api.dao.ControllerDAO;
import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.model.*;
import fi.metatavu.jouko.server.rest.AdminApi;
import fi.metatavu.jouko.server.rest.model.ControllerDevice;
import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.InterruptionGroup;
import fi.metatavu.jouko.server.rest.model.User;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
     /**
     * TODO Add email, firstName, lastName and username as results that will be returned
     * There's a other method that's called exact the same, so it could be that as well but this will be required for the admin UI if want to display all user information
     * This stores all the user data as well in the Users table, so it would most likely be better in the future to fetch them directly from Keycloak instead for security reasons too than add more data to the Users table
     */
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

    if (group == null) {
      return Response.status(Status.BAD_REQUEST).build();
    }
    
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
   * @param firstResult The offset of the first result
   * @param maxResults The maximum number of results
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
   * @param firstResult The offset of the first result
   * @param maxResults The maximum number of results
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
  if (devices.isEmpty()) {
    return Response.status(Status.NOT_FOUND)
                    .entity("no devices found")
                    .build();
  }
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
    if (controller == null) {
        return Response.status(Status.NOT_FOUND)
                         .entity("controller not found")
                         .build();
    }
    UserEntity user = userController.findUserById(body.getUserId());
    DeviceEntity device = deviceController.createDevice(controller, body.getName(), user);
    if (device == null) {
      return Response.status(Status.BAD_REQUEST).build();
    }
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
    if (newUser == null) {
      return Response.status(Status.BAD_REQUEST).build();
    }
    return Response.ok(newUser).build();
  }

  /**
   * List of all users
   *
   * @param firstResult The offset of the first result
   * @param maxResults The maximum number of results
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

    if (users.isEmpty()) {
      return Response.status(Status.NOT_FOUND)
              .entity("no users found")
              .build();
    }
    return Response.ok(users).build();
  }

  /**
   * Get device by device id
   * @param deviceId of the device
   * @return device
   * @throws Exception if something goes wrong
   */
  @Override
  public Response retrieveDevice(Long deviceId) throws Exception {
    DeviceEntity device = deviceController.findById(deviceId);

    if (device == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("device not found")
                     .build();
    }
    return Response.ok(deviceFromEntity(device)).build();
  }

  /**
   * Retrieve a user
   *
   * @param userId of the user you want to get
   * @return the user
   * @throws Exception if something goes wrong
   */
  @Override
  public Response retrieveUser(Long userId) throws Exception {
    UserEntity user = userController.findUserById(userId);
    if (user == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("user not found")
                     .build();
    }
    return Response.ok(userFromEntity(user)).build();
  }

  /**
   * Update a device
   *
   * @param deviceId you want to update
   * @param newDevice what you want to update it to
   * @return positive response if update was successful
   * @throws Exception
   */
  @Override
  public Response updateDevice(Long deviceId, Device newDevice)
        throws Exception {
    DeviceEntity device = deviceController.findById(deviceId);
    if (device == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("device not found")
                     .build();
    }
    deviceController.updateDevice(device, newDevice.getName());
    return Response.ok(newDevice).build();
  }

  /**
   * Update a user account
   *
   * @param userId of the user
   * @param body is the details that want to update
   * @return positive response if user was updated
   * @throws Exception
   */
  @Override
  public Response updateUser(Long userId, User body) throws Exception {
    UserEntity user = userController.findUserById(userId);
    if (user == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("user not found")
                     .build();
    }
    userController.updateUser(user, body.getKeycloakId());
    return Response.ok(body).build();
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
    if (eui == null || key == null) {
      return Response.status(Status.BAD_REQUEST).build();
    }
    deviceController.createControllerDevice(eui, key, controllerCommunicationChannel);
    return Response.ok(body).build();
  }

  /**
   * List of all controller devices
   *
   * @param firstResult The offset of the first result
   * @param maxResults The maximum number of results
   * @return list of controller devices
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listAllControllerDevices(Integer firstResult, Integer maxResults) throws Exception {
    List<ControllerEntity> entities = deviceController.listControllerDevices(firstResult, maxResults);
    List<ControllerDevice> controllerDevices = entities.stream()
        .map(this::controllerDeviceFromEntity)
        .collect(Collectors.toList());

    if (controllerDevices.isEmpty()) {
      return Response.status(Status.NOT_FOUND)
                     .entity("controller devices not found")
                     .build();
    }
    return Response.ok(controllerDevices).build();
  }

  @Override
  public Response retrieveControllerDevice(Long controllerDeviceId) throws Exception {
    ControllerEntity entity = deviceController.findControllerDeviceById(controllerDeviceId);

    if (entity == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("controller device not found")
                     .build();
    }
    return Response.ok(controllerDeviceFromEntity(entity)).build();
  }

  @Override
  public Response updateControllerDevice(Long controllerDeviceId, ControllerDevice
          newControllerDevice)
      throws Exception {
    ControllerEntity entity = deviceController.findControllerDeviceById(controllerDeviceId);
    if (entity == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("controller device not found")
                     .build();
    }
    deviceController.updateControllerDevice(entity, newControllerDevice.getEui(), newControllerDevice.getKey());
    return Response.ok(newControllerDevice).build();
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
    if (entities.isEmpty()) {
      return Response.status(Status.NOT_FOUND)
                     .entity("interruptions not found")
                     .build();
    }
    interruptionController.deleteInerruptionGroup(groupId);

    return Response.ok().build();
  }

  @Override
  public Response deleteControllerDevice(Long controllerDeviceId) throws Exception {
    if (controllerDeviceId == null) {
      return Response.status(Status.BAD_REQUEST).build();
    }
    deviceController.deleteControllerDevice(controllerDeviceId);
    return Response.ok().build();
  }

  // @Override
  // public Response deleteUser(String keycloakId) throws Exception {
  //   userController.deleteUser(keycloakId);
  //   return Response.ok().build();
  // }
}
