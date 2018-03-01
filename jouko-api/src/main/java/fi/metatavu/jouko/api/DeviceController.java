package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.DeviceDAO;
import fi.metatavu.jouko.api.dao.PowerMeasurementDAO;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.DevicePowerMeasurementEntity;
import fi.metatavu.jouko.api.model.MeasurementType;

@Dependent
public class DeviceController {
  
  @Inject
  private DeviceDAO deviceDAO;
  
  @Inject
  private PowerMeasurementDAO powerMeasurementDAO;
  
  public List<DeviceEntity> listAll(
      Integer firstResult,
      Integer maxResults
  ) {
    return deviceDAO.listAll(firstResult, maxResults);
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
    double average = 0;
    for (DevicePowerMeasurementEntity entity : entities) {
      if (entity.getMeasurementType() == MeasurementType.AVERAGE) {
        average += entity.getMeasurementValue();
      }
    }
    average /= entities.size();
    return average;
  }
}
