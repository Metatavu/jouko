package fi.metatavu.jouko.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;

import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.server.rest.AdminApi;
import fi.metatavu.jouko.server.rest.model.InterruptionGroup;

@Stateless
public class AdminApiImpl implements AdminApi {
  
  @Inject
  private InterruptionController interruptionController;
  
  @Inject
  private DeviceController deviceController;
  
  @Inject
  private DeviceCommunicator deviceCommunicator;
  
  @Inject
  private Logger logger;
  
  public InterruptionGroup interruptionGroupFromEntity(InterruptionGroupEntity entity) {
    InterruptionGroup result = new InterruptionGroup();
    result.setStartTime(entity.getStartTime());
    result.setEndTime(entity.getEndTime());
    result.setId(entity.getId());
    return result;
  }

  @Override
  public Response createInterruptionGroup(InterruptionGroup body)
      throws Exception {
    InterruptionGroupEntity group = interruptionController.createInterruptionGroup(
        body.getStartTime(),
        body.getEndTime());
    
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
  
}
