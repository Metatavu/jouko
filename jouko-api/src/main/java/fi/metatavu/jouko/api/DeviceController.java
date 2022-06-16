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
import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.MeasurementType;
import fi.metatavu.jouko.api.model.MessageType;
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
  
  public ControllerEntity createControllerDevice(
      String eui, 
      String key, 
      ControllerCommunicationChannel communicationChannel
    ) {
    return controllerDAO.create(eui, key, communicationChannel);
  }
  
  public List<DeviceEntity> listAll(
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listAll(firstResult, maxResults);
  }
  
  public List<ControllerEntity> listControllerDevices(
      Integer firstResult,
      Integer maxResults
  ) {
    return controllerDAO.listAll(firstResult, maxResults);
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
  
  public ControllerEntity findControllerByEuiAndKey(String eui, String key) {
    return controllerDAO.findByEuiAndKey(eui, key);
  }
  
  public DevicePowerMeasurementEntity addPowerMeasurement(
      DeviceEntity device,
      double measurementValue,
      MeasurementType measurementType,
      OffsetDateTime startTime,
      OffsetDateTime endTime,
      int phaseNumber,
      boolean relayIsOpen
  ) {
    return powerMeasurementDAO.create(
        device,
        measurementValue,
        measurementType,
        startTime,
        endTime,
        phaseNumber,
        relayIsOpen);
  }
      
  public double averageConsumptionInWatts(DeviceEntity device, OffsetDateTime fromTime, OffsetDateTime toTime) {
    // TODO handle different measurement durations
    // TODO do in database
    double energyInJoules = 0.0;
    
    if (fromTime.toEpochSecond() < toTime.toEpochSecond()) {
      fromTime = fromTime.plusSeconds(1);
    }
    
    List<DevicePowerMeasurementEntity> entities = powerMeasurementDAO.listByDeviceAndDate(
        device,
        fromTime,
        toTime
    );
    
    //double timeSpanInSeconds = toTime.toEpochSecond() - fromTime.toEpochSecond();
    double overallDuration = 0;
    double averagePowerInWatts = 0;
    
    for (DevicePowerMeasurementEntity entity : entities) {
      OffsetDateTime startTime = entity.getStartTime();
      OffsetDateTime endTime = entity.getEndTime();
      
      double durationInSeconds = endTime.toEpochSecond() - startTime.toEpochSecond();
      overallDuration += durationInSeconds;
      
      energyInJoules += entity.getMeasurementValue() * durationInSeconds;
    }
    
    if (overallDuration > 0) {
      averagePowerInWatts = energyInJoules / (overallDuration / 3);
    }
    
    return averagePowerInWatts;
  }
  
  public List<DevicePowerMeasurementEntity> listPowerMeasurementsByDevices(List<DeviceEntity> devices, OffsetDateTime fromTime, OffsetDateTime toTime) {
    return powerMeasurementDAO.listByDevices(devices, fromTime, toTime);
  }
  
  public List<DevicePowerMeasurementEntity> listPowerMeasurementsByDevice(DeviceEntity device, OffsetDateTime fromTime, OffsetDateTime toTime) {
    return powerMeasurementDAO.listByDevice(device, fromTime, toTime);
  }
  
  public void queueGprsMessage(ControllerEntity controller, long deviceId, String message, MessageType messageType) {
    gprsMessageDAO.create(controller, deviceId, message, messageType);
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
  
  public GprsMessageEntity getQueuedGprsMessageForController(ControllerEntity controller, long deviceId) {
    return gprsMessageDAO.findOneByController(controller, deviceId);
  }
  
  public void deleteGprsMessageFromController(ControllerEntity controller, GprsMessageEntity message) {
    gprsMessageDAO.deleteGprsMessageFromController(controller, message); 
  }
  
  public void clearGprsMessages() {
    gprsMessageDAO.clear();
  }

  public void clearGprsMessagesForController(ControllerEntity controller) {
    gprsMessageDAO.clearControllerMessages(controller);
  }

  public void updateDevice(DeviceEntity device, String name) {
    deviceDAO.update(device, name);
  }

  public void deleteControllerDevice(Long controllerDeviceId) {
    controllerDAO.delete(controllerDeviceId);
  }

  public ControllerEntity findControllerDeviceById(Long controllerDeviceId) {
    return controllerDAO.findById(controllerDeviceId);
  }

  public void updateControllerDevice(ControllerEntity entity, String eui, String key) {
    controllerDAO.update(entity, eui, key);
  }
}
