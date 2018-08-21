package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.ControllerDAO;
import fi.metatavu.jouko.api.dao.DeviceDAO;
import fi.metatavu.jouko.api.dao.GprsMessageDAO;
import fi.metatavu.jouko.api.dao.PowerMeasurementDAO;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.MeasurementType;
import fi.metatavu.jouko.api.model.UserEntity;

@Dependent
public class DeviceController {
  
  @Inject
  private DeviceDAO deviceDAO;
  
  @Inject
  private PowerMeasurementDAO powerMeasurementDAO;
  
  @Inject
  private GprsMessageDAO gprsMessageDAO;
  
  @Inject
  private ControllerDAO controllerDAO;
  
  public DeviceEntity createDevice(
      ControllerEntity controller,
      String name,
      UserEntity user
  ) {
    return deviceDAO.create(controller, name, user);
  }
  
  public List<DeviceEntity> listAll(
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listAll(firstResult, maxResults);
  }

  public List<DeviceEntity> listByUser(
      UserEntity user,
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listByUser(user, firstResult, maxResults);
  }
  
  public List<DeviceEntity> listByInterruption(InterruptionEntity interruption) {
    return deviceDAO.listByInterruption(interruption);
  }

  public DeviceEntity findById(Long deviceId) {
    return deviceDAO.findById(deviceId);
  }
  
  public ControllerEntity findControllerById(long id) {
    return controllerDAO.findById(id);
  }

  public ControllerEntity findControllerByEui(String eui) {
    return controllerDAO.findByEui(eui);
  }
  
  public DevicePowerMeasurementEntity addPowerMeasurement(
      DeviceEntity device,
      double measurementValue,
      MeasurementType measurementType,
      OffsetDateTime startTime,
      OffsetDateTime endTime,
      int phaseNumber
  ) {
    return powerMeasurementDAO.create(
        device,
        measurementValue,
        measurementType,
        startTime,
        endTime,
        phaseNumber);
  }
      
  public double averageConsumptionInWatts(DeviceEntity device, OffsetDateTime fromTime, OffsetDateTime toTime) {
    // TODO handle different measurement durations
    // TODO do in database
    double energyInJoules = 0.0;
    
    OffsetDateTime time = fromTime;
    
    while (time.isBefore(toTime)) {
      OffsetDateTime nextTime = time.plus(1, ChronoUnit.MINUTES);

      List<DevicePowerMeasurementEntity> entities = powerMeasurementDAO.listByDeviceAndDate(
          device,
          time,
          nextTime
      );
      
      for (DevicePowerMeasurementEntity entity : entities) {
        energyInJoules += entity.getMeasurementValue() * 60.0;
      }
      
      time = nextTime;
    }
    
    double timeSpanInSeconds = toTime.toEpochSecond() - fromTime.toEpochSecond();
    
    return energyInJoules / timeSpanInSeconds;
  }
  
  public void queueGprsMessage(ControllerEntity controller, String message) {
    gprsMessageDAO.create(controller, message);
  }
  
  public List<String> getAllQueuedGprsMessages() {
    return gprsMessageDAO.listAll()
                         .stream()
                         .map(GprsMessageEntity::getContent)
                         .collect(Collectors.toList());
  }

  public List<String> getQueuedGprsMessagesForController(
      ControllerEntity controller
  ) {
    return gprsMessageDAO.listByController(controller)
                         .stream()
                         .map(GprsMessageEntity::getContent)
                         .collect(Collectors.toList());
  }
  
  public void clearGprsMessages() {
    gprsMessageDAO.clear();
  }

  public void clearGprsMessagesForController(ControllerEntity controller) {
    gprsMessageDAO.clearControllerMessages(controller);
  }
}
