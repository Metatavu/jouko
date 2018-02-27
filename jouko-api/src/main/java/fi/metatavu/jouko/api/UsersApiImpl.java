package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;

import fi.metatavu.jouko.api.dao.DeviceDAO;
import fi.metatavu.jouko.api.dao.InterruptionDAO;
import fi.metatavu.jouko.api.dao.PowerMeasurementDAO;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.server.rest.UsersApi;
import fi.metatavu.jouko.server.rest.model.Device;
import fi.metatavu.jouko.server.rest.model.DevicePowerConsumption;
import fi.metatavu.jouko.server.rest.model.Interruption;
import fi.metatavu.jouko.server.rest.model.InterruptionCancellation;

@RequestScoped
@Stateful
public class UsersApiImpl implements UsersApi {
  
  @Inject
  private DeviceDAO deviceDAO;
  
  @Inject
  private InterruptionDAO interruptionDAO;
  
  @Inject
  private PowerMeasurementDAO powerMeasurementDAO;
  
  private Device deviceFromEntity(DeviceEntity entity) {
    Device result = new Device();
    result.setId(entity.getId());
    result.setName(entity.getName());
    return result;
  }

  private Interruption interruptionFromEntity(InterruptionEntity entity) {
    Interruption result = new Interruption();
    result.setId(entity.getId());
    result.setStartTime(entity.getStartTime());
    result.setEndTime(entity.getEndTime());
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
    // TODO error handling
    // TODO handle different measurement durations
    // TODO do in database
    DeviceEntity deviceEntity = deviceDAO.findById(deviceId);
    List<DevicePowerMeasurementEntity> entities = powerMeasurementDAO.listByDeviceAndDate(
        deviceEntity,
        fromTime,
        toTime
    );
    double average = 0;
    for (DevicePowerMeasurementEntity entity : entities) {
      average += entity.getAverage();
    }
    average /= entities.size();
    DevicePowerConsumption result = new DevicePowerConsumption();
    result.setAverageConsumptionInWatts(average);
    return Response.ok(result).build();
  }

  @Override
  public Response listDevices(
      Long userId,
      Integer firstResult,
      Integer maxResults) throws Exception {
    // TODO error handling
    List<DeviceEntity> entities = deviceDAO.listAll(firstResult, maxResults);
    List<Device> devices = entities.stream()
                                   .map(this::deviceFromEntity)
                                   .collect(Collectors.toList());
    return Response.ok(devices).build();
  }

  @Override
  public Response listInterruptions(
      Long userId,
      OffsetDateTime fromTime,
      OffsetDateTime toTime,
      Long deviceId) throws Exception {
    // TODO error handling
    DeviceEntity deviceEntity = deviceDAO.findById(deviceId);
    List<InterruptionEntity> entities = interruptionDAO.listByDeviceAndDate(
        deviceEntity,
        fromTime,
        toTime
    );
    List<Interruption> interruptions = entities.stream()
                                               .map(this::interruptionFromEntity)
                                               .collect(Collectors.toList());
    return Response.ok(interruptions).build();
  }

  @Override
  public Response setInterruptionCancelled(
      Long userId,
      Long interruptionId,
      InterruptionCancellation body) throws Exception {
    // TODO error handling
    InterruptionEntity interruptionEntity = interruptionDAO.findById(interruptionId);
    interruptionEntity.setCancelled(body.isCancelled());
    if (body.isCancelled()) {
      interruptionEntity.setCancellationTime(OffsetDateTime.now(ZoneOffset.UTC));
    }
    return Response.ok(body).build();
  }

}