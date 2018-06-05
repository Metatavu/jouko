package fi.metatavu.jouko.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.server.rest.AdminApi;
import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.InterruptionGroup;
import fi.metatavu.jouko.server.rest.model.User;

@Stateless
public class AdminApiImpl implements AdminApi {
  
  @Inject
  private InterruptionController interruptionController;
  
  @Inject
  private DeviceController deviceController;
  
  @Inject
  private DeviceCommunicator deviceCommunicator;
  
  private Device deviceFromEntity(DeviceEntity entity) {
    Device result = new Device();
    result.setId(entity.getId());
    result.setName(entity.getName());
    result.setControllerId(entity.getController().getId());
    result.setUserId(entity.getUser().getId());
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
  public Response updateInterruptionGroup(
      Long groupId,
      InterruptionGroup body
  ) throws Exception {
    InterruptionGroupEntity entity = interruptionController.findInterruptionGroupById(
        groupId);
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
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Response createUser(User body) throws Exception {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Response listAllUsers(Integer firstResult, Integer maxResults)
      throws Exception {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Response retrieveDevice(Long deviceId) throws Exception {
    // TODO Auto-generated method stub
    return null;
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
  
}
