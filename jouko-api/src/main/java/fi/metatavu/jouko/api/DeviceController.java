package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
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

  /**
   * Create a device controller
   *
   * @param eui for controller
   * @param key for controller
   * @param communicationChannel the controller uses
   * @return the newly created controller
   */
  public ControllerEntity createControllerDevice(
      String eui, 
      String key, 
      ControllerCommunicationChannel communicationChannel
    ) {
    return controllerDAO.create(eui, key, communicationChannel);
  }

  /**
   * List all devices
   *
   * @param firstResult
   * @param maxResults for how many devices you want to return
   * @return all devices
   */
  public List<DeviceEntity> listAll(
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listAll(firstResult, maxResults);
  }

  /**
   * List all controllers
   *
   * @param firstResult to start from
   * @param maxResults how many controllers want to return
   * @return all controllers
   */
  public List<ControllerEntity> listControllerDevices(
      Integer firstResult,
      Integer maxResults
  ) {
    return controllerDAO.listAll(firstResult, maxResults);
  }

  /**
   * List devices by user
   *
   * @param user you want to get devices from
   * @param firstResult to start from
   * @param maxResults how many results you want
   * @return devices of a user
   */
  public List<DeviceEntity> listByUser(
      UserEntity user,
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listByUser(user, firstResult, maxResults);
  }

  /**
   * List devices by interruption
   *
   * @param interruption you want to return
   * @return interruptions of devices
   */
  public List<DeviceEntity> listByInterruption(InterruptionEntity interruption) {
    return deviceDAO.listByInterruption(interruption);
  }

  /**
   * Find a device using the deviceId
   *
   * @param deviceId you want to find
   * @return device
   */
  public DeviceEntity findById(Long deviceId) {
    return deviceDAO.findById(deviceId);
  }

  /**
   * Find controller by id
   *
   * @param id of a controller
   * @return controller
   */
  public ControllerEntity findControllerById(long id) {
    return controllerDAO.findById(id);
  }

  /**
   * Find controller using euid instead
   *
   * @param eui of a controller
   * @return controller
   */
  public ControllerEntity findControllerByEui(String eui) {
    return controllerDAO.findByEui(eui);
  }

  /**
   * Find controller using Eui and Key
   *
   * @param eui of a controller
   * @param key of a device
   * @return controller
   */
  public ControllerEntity findControllerByEuiAndKey(String eui, String key) {
    return controllerDAO.findByEuiAndKey(eui, key);
  }

  /**
   * Add a power measurement
   *
   * @param device you want to add a power measurement to
   * @param measurementValue that was measured
   * @param measurementType that was used
   * @param startTime from when
   * @param endTime from to
   * @param phaseNumber of the measurement
   * @param relayIsOpen if the relay is open
   * @return adds a measurement to a device
   */
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

  /**
   * Get the average consumption of a device in Watts
   *
   * @param device you want to get consumption from
   * @param fromTime you want the results from
   * @param toTime where you want to filter to
   * @return average consumption in watts
   */
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

  /**
   * List power measurements by devices
   *
   * @param devices you want to get power measurements from
   * @param fromTime you want the results from
   * @param toTime where you want to filter to
   * @return power measurements
   */
  public List<DevicePowerMeasurementEntity> listPowerMeasurementsByDevices(List<DeviceEntity> devices, OffsetDateTime fromTime, OffsetDateTime toTime) {
    return powerMeasurementDAO.listByDevices(devices, fromTime, toTime);
  }

  /**
   * List power measurements of a single device
   *
   * @param device you want to get power measurements from
   * @param fromTime you want the results from
   * @param toTime where you want to filter to
   * @return power measurements
   */
  public List<DevicePowerMeasurementEntity> listPowerMeasurementsByDevice(DeviceEntity device, OffsetDateTime fromTime, OffsetDateTime toTime) {
    return powerMeasurementDAO.listByDevice(device, fromTime, toTime);
  }

  /**
   * Create a Gprs message
   *
   * @param controller you want to use
   * @param deviceId you want to create the message for
   * @param message you want to send
   * @param messageType you want to use
   */
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

  /**
   * Get queued messages of a controller
   *
   * @param controller you want to get the messages from
   * @param deviceId you want to check
   * @return queued messages
   */
  public GprsMessageEntity getQueuedGprsMessageForController(ControllerEntity controller, long deviceId) {
    return gprsMessageDAO.findOneByController(controller, deviceId);
  }

  /**
   * Deletes a Gprs message from a controller
   *
   * @param controller you want to delete a message from
   * @param message you want to delete specifically
   */
  public void deleteGprsMessageFromController(ControllerEntity controller, GprsMessageEntity message) {
    gprsMessageDAO.deleteGprsMessageFromController(controller, message); 
  }
  
  public void clearGprsMessages() {
    gprsMessageDAO.clear();
  }

  public void clearGprsMessagesForController(ControllerEntity controller) {
    gprsMessageDAO.clearControllerMessages(controller);
  }
}
