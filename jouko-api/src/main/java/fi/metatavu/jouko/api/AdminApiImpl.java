package fi.metatavu.jouko.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import fi.metatavu.jouko.api.model.InterruptionGroupEntity;
import fi.metatavu.jouko.server.rest.AdminApi;
import fi.metatavu.jouko.server.rest.model.InterruptionGroup;

public class AdminApiImpl implements AdminApi {
  
  @Inject
  private InterruptionController interruptionController;
  
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
    InterruptionGroupEntity entity = interruptionController.createInterruptionGroup(
        body.getStartTime(),
        body.getEndTime());
    return Response.ok(interruptionGroupFromEntity(entity)).build();
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
