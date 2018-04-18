package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.DeviceDAO;
import fi.metatavu.jouko.api.dao.GprsMessageDAO;
import fi.metatavu.jouko.api.dao.PowerMeasurementDAO;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.MeasurementType;

@Dependent
public class DeviceController {
  
  @Inject
  private DeviceDAO deviceDAO;
  
  @Inject
  private PowerMeasurementDAO powerMeasurementDAO;
  
  @Inject
  private GprsMessageDAO gprsMessageDAO;
  
  public List<DeviceEntity> listAll(
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listAll(firstResult, maxResults);
  }
  
  public List<DeviceEntity> listByInterruption(InterruptionEntity interruption) {
    return deviceDAO.listByInterruption(interruption);
  }

  public DeviceEntity findById(Long deviceId) {
    return deviceDAO.findById(deviceId);
  }

  public double averageConsumptionInWatts(DeviceEntity device, OffsetDateTime fromTime, OffsetDateTime toTime) {
    // TODO handle different measurement durations
    // TODO do in database
    List<DevicePowerMeasurementEntity> entities = powerMeasurementDAO.listByDeviceAndDate(
        device,
        fromTime,
        toTime
    );
    double energyInJoules = 0.0;
    for (DevicePowerMeasurementEntity entity : entities) {
      if (entity.getMeasurementType() != MeasurementType.AVERAGE) {
        continue;
      }
      if (entity.getStartTime().isBefore(fromTime) && entity.getEndTime().isAfter(fromTime)) {
        double measurementDurationInSecs =
            entity.getEndTime().toEpochSecond() -
            entity.getStartTime().toEpochSecond();
        double relevantSpanDurationInSecs =
            entity.getEndTime().toEpochSecond() -
            fromTime.toEpochSecond();
        double ratio = relevantSpanDurationInSecs / measurementDurationInSecs;
        double measurementEnergyInJoules = entity.getMeasurementValue() * measurementDurationInSecs;
        double relevantEnergyInJoules = ratio * measurementEnergyInJoules;
        energyInJoules += relevantEnergyInJoules;
      } else if (entity.getStartTime().isAfter(fromTime) && entity.getEndTime().isBefore(toTime)) {
        double measurementDurationInSecs =
            entity.getEndTime().toEpochSecond() -
            entity.getStartTime().toEpochSecond();
        double measurementEnergyInJoules = entity.getMeasurementValue() * measurementDurationInSecs;
        energyInJoules += measurementEnergyInJoules;
      } else if (entity.getStartTime().isBefore(toTime) && entity.getEndTime().isAfter(toTime)) {
        double measurementDurationInSecs =
            entity.getEndTime().toEpochSecond() -
            entity.getStartTime().toEpochSecond();
        double relevantSpanDurationInSecs =
            entity.getEndTime().toEpochSecond() -
            toTime.toEpochSecond();
        double ratio = relevantSpanDurationInSecs / measurementDurationInSecs;
        double measurementEnergyInJoules = entity.getMeasurementValue() * measurementDurationInSecs;
        double relevantEnergyInJoules = ratio * measurementEnergyInJoules;
        energyInJoules += relevantEnergyInJoules;
      }
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
  
  public void clearGprsMessages() {
    gprsMessageDAO.clear();
  }
}
