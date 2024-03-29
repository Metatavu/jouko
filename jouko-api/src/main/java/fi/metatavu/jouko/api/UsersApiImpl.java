package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import fi.metatavu.jouko.api.dao.InterruptionDAO;
import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import fi.metatavu.jouko.server.rest.UsersApi;
import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.DevicePowerConsumption;
import fi.metatavu.jouko.server.rest.model.Interruption;
import fi.metatavu.jouko.server.rest.model.InterruptionCancellation;
import fi.metatavu.jouko.server.rest.model.PowerMeasurement;
import io.swagger.annotations.ApiParam;

@RequestScoped
@Stateful
public class UsersApiImpl implements UsersApi {
  
  @Inject
  private DeviceController deviceController;
  
  @Inject
  private InterruptionController interruptionController;
  
  @Inject
  private DeviceCommunicator deviceCommunicator;
  
  @Inject
  private UserController userController;
  
  private Device deviceFromEntity(DeviceEntity entity) {
    Device result = new Device();
    result.setId(entity.getId());
    result.setName(entity.getName());
    result.setControllerId(entity.getController().getId());
    result.setUserId(entity.getUser().getId());
    return result;
  }

  private Interruption interruptionFromEntity(InterruptionEntity entity) {
    Interruption result = new Interruption();
    result.setId(entity.getId());
    result.setStartTime(entity.getGroup().getStartTime());
    result.setEndTime(entity.getGroup().getEndTime());
    result.setDeviceId(entity.getDevice().getId());
    result.setCancelled(entity.isCancelled());
    result.setCancellationTime(entity.getCancellationTime());
    return result;
  }
  
  @Override
  public Response getPowerConsumption(
      Long userId,
      Long deviceId,
      OffsetDateTime fromTime,
      OffsetDateTime toTime) throws Exception {
    DeviceEntity device = deviceController.findById(deviceId);
    
    if (device == null) {
      return Response.status(Status.NOT_FOUND).entity("Device not found").build();
    }

    double average = deviceController.averageConsumptionInWatts(device, fromTime, toTime);
    DevicePowerConsumption result = new DevicePowerConsumption();
    result.setAverageConsumptionInWatts(average);
    return Response.ok(result).build();
  }

  /**
   * Lists devices of a user
   *
   * @param userId of a user
   * @param firstResult The offset of the first result
   * @param maxResults The maximum number of results
   * @return devices of a user
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listDevices(
      Long userId,
      Integer firstResult,
      Integer maxResults) throws Exception {
    List<DeviceEntity> entities;
    UserEntity user = userController.findUserById(userId);
    if (user == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("User " + userId + " not found")
                     .build();
    } else {
      entities = deviceController.listByUser(user, firstResult, maxResults);
    }
      
    List<Device> devices = entities.stream()
                                   .map(this::deviceFromEntity)
                                   .collect(Collectors.toList());
    return Response.ok(devices).build();
  }

  /**
   * List interruptions of a user
   *
   * @param userId of a user
   * @param fromTime filter from where you want results from
   * @param toTime filter where to you want the results to end
   * @param deviceId you want the interruptions from
   * @return list of interruptions of a user
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listInterruptions(
      Long userId,
      OffsetDateTime fromTime,
      OffsetDateTime toTime,
      Long deviceId) throws Exception {
    DeviceEntity device = deviceController.findById(deviceId);
    List<InterruptionEntity> entities;
    if (device == null) {
      entities = interruptionController.listInterruptionsByDate(fromTime, toTime);
    } else {
      entities = interruptionController.listInterruptionsByDeviceAndDate(
          device,
          fromTime,
          toTime
      );
    }
    List<Interruption> interruptions = entities.stream()
                                               .map(this::interruptionFromEntity)
                                               .collect(Collectors.toList());
    return Response.ok(interruptions).build();
  }

  /**
   * Cancels interruption
   *
   * @param userId to cancel specific user's interruptions
   * @param interruptionId is the interruption you want to cancel specifically
   * @param body
   * @return cancelled interruption
   * @throws Exception if interruption not found
   */
  @Override
  public Response setInterruptionCancelled(Long userId, Long interruptionId, InterruptionCancellation body) throws Exception {
    InterruptionEntity interruption = interruptionController.findInterruptionById(interruptionId);
    if (interruption == null) {
      return Response.status(Status.NOT_FOUND).entity("Interruption not found").build();
    }

    interruptionController.setInterruptionCancelled(interruption, body.isCancelled());
    if (body.isCancelled()) {
      deviceCommunicator.notifyInterruptionCancellation(interruption);
      //interruptionController.deleteInterruptionByDevice(interruption, device);
    }
      
    return Response.ok(body).build();
  }

  /**
   * List all measurements of a user
   *
   * @param userId of a user
   * @param fromTime filter from when you want the results from
   * @param toTime filter to when you want the results to
   * @return measurements of a user
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listAllMeasurements(Long userId, OffsetDateTime fromTime, OffsetDateTime toTime) throws Exception {
    UserEntity userEntity = userController.findUserById(userId);
    List<DeviceEntity> deviceEntities = deviceController.listByUser(userEntity, 0, 99999);
    
    if (deviceEntities.size() > 0) {
      List<DevicePowerMeasurementEntity> powermeasurements = deviceController.listPowerMeasurementsByDevices(deviceEntities, fromTime, toTime);
      
      return Response.ok(powermeasurements).build();
    }
   
    return null;
  }

  /**
   * List all measurements of a specific device only
   *
   * @param userId of a user
   * @param deviceId of a user
   * @param fromTime filter from when you want the results
   * @param toTime filter to when you want the results
   * @return measurements of a specific device
   * @throws Exception if something goes wrong
   */
  @Override
  public Response listMeasurementsByDevice(Long userId, Long deviceId, OffsetDateTime fromTime, OffsetDateTime toTime) throws Exception {
    DeviceEntity deviceEntity = deviceController.findById(deviceId);
    
    if (deviceEntity != null) {
      List<DevicePowerMeasurementEntity> powermeasurements = deviceController.listPowerMeasurementsByDevice(deviceEntity, fromTime, toTime);
      
      return Response.ok(powermeasurements).build();
    }
    return null;
  }
  
}
