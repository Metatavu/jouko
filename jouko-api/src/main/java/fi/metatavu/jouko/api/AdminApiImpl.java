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
  
  private User userFromEntity(UserEntity entity) {
    User result = new User();
    result.setId(entity.getId());
    result.setKeycloakId(UUID.fromString(entity.getKeycloakId()));
    return result;
  }
  
  private ControllerDevice controllerDeviceFromEntity(ControllerEntity entity) {
    ControllerDevice result = new ControllerDevice();
    result.setId(entity.getId());
    result.setEui(entity.getEui());
    result.setKey(entity.getKey());
    result.setCommunicationChannel(entity.getCommunicationChannelString());
    return result;
  }
  
  public InterruptionGroup interruptionGroupFromEntity(InterruptionGroupEntity entity) {
    InterruptionGroup result = new InterruptionGroup();
    result.setStartTime(entity.getStartTime());
    result.setEndTime(entity.getEndTime());
    result.setId(entity.getId());
    result.setOverbookingFactor(entity.getOverbookingFactor());
    result.setPowerSavingGoalInWatts((long)entity.getPowerSavingGoalInWatts());
    return result;
  }

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

  @Override
  public Response listAllDevices(Integer firstResult, Integer maxResults)
      throws Exception {
    List<DeviceEntity> entities = deviceController.listAll(firstResult, maxResults);
    List<Device> devices = entities.stream()
                                   .map(this::deviceFromEntity)
                                   .collect(Collectors.toList());
    return Response.ok(devices).build();
  }

  @Override
  public Response createDevice(Device body) throws Exception {
    ControllerEntity controller = deviceController.findControllerById(
        body.getControllerId());
    UserEntity user = userController.findUserById(body.getUserId());
    DeviceEntity device = deviceController.createDevice(controller, body.getName(), user);
    body.setId(device.getId());
    return Response.ok(body).build();
  }

  @Override
  public Response createUser(User body, String token) throws Exception {
    String keycloakId = userController.createKeycloakUser(body, token);   
    UserEntity newUser = userController.createUser(body, keycloakId);
    
    return Response.ok(newUser).build();
  }

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
   * @throws Exception
   */
  @Override
  public Response retrieveUser(Long userId) throws Exception {
    UserEntity user = userController.findUserById(userId);
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

  @Override
  public Response createControllerDevice(ControllerDevice body) throws Exception {
    ControllerCommunicationChannel controllerCommunicationChannel = ControllerCommunicationChannel.valueOf(body.getCommunicationChannel());
    String eui = body.getEui();
    String key = body.getKey();
    
    deviceController.createControllerDevice(eui, key, controllerCommunicationChannel);
    return null;
  }

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
    return Response.ok(controllerDeviceFromEntity(entity)).build();
  }

  @Override
  public Response updateControllerDevice(Long controllerDeviceId, ControllerDevice newControllerDevice)
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
    deviceController.deleteControllerDevice(controllerDeviceId);
    return Response.ok().build();
  }

  // @Override
  // public Response deleteUser(String keycloakId, String token) throws Exception {
  //   String IDOfDeletedUser = userController.deleteKeycloakUser(keycloakId, token);
  //   UserEntity deletedUser = userController.deleteUser(IDOfDeletedUser);

  //   return Response.ok(deletedUser).build();
  // }
}
