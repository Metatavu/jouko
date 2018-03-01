package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.InterruptionDAO;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;

@Dependent
public class InterruptionController {
  
  @Inject
  private InterruptionDAO interruptionDAO;
  
  public List<InterruptionEntity> listByDeviceAndDate(
      DeviceEntity device,
      OffsetDateTime fromTime,
      OffsetDateTime toTime) {
    return interruptionDAO.listByDeviceAndDate(device, fromTime, toTime);
  }

  public void setInterruptionCancelled(
      InterruptionEntity interruption,
      boolean cancelled) {
    interruption.setCancelled(cancelled);
    if (cancelled) {
      interruption.setCancellationTime(OffsetDateTime.now(ZoneOffset.UTC));
    }
  }

  public InterruptionEntity findById(Long interruptionId) {
    // TODO Auto-generated method stub
    return interruptionDAO.findById(interruptionId);
  }
}
