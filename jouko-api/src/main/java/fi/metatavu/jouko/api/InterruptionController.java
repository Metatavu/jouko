package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.InterruptionDAO;
import fi.metatavu.jouko.api.dao.InterruptionGroupDAO;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;

@Dependent
public class InterruptionController {
  
  @Inject
  private InterruptionDAO interruptionDAO;
  
  @Inject
  private InterruptionGroupDAO interruptionGroupDAO;
  
  public List<InterruptionEntity> listInterruptionsByDeviceAndDate(
      DeviceEntity device,
      OffsetDateTime fromTime,
      OffsetDateTime toTime) {
    return interruptionDAO.listByDeviceAndDate(device, fromTime, toTime);
  }

  public List<InterruptionEntity> listInterruptionsByDate(
      OffsetDateTime fromTime,
      OffsetDateTime toTime) {
    return interruptionDAO.listByDate(fromTime, toTime);
  }

  public List<InterruptionGroupEntity> listInterruptionGroups(
      Integer firstResult,
      Integer maxResults
  ) {
    return interruptionGroupDAO.listAll(firstResult, maxResults);
  }
  
  public void deleteInterruptionGroup(Long id) {
    interruptionGroupDAO.deleteInterruptionGroupById(id);
  }

  public void setInterruptionCancelled(InterruptionEntity interruption, boolean cancelled) {
    interruption.setCancelled(cancelled);
    
    if (cancelled) {
      interruption.setCancellationTime(OffsetDateTime.now(ZoneOffset.UTC));
    }
  }
  
  public void deleteInterruptionByDevice(InterruptionEntity interruption, DeviceEntity device) {
    interruptionDAO.deleteInterruptionFromDevice(interruption, device);
  }
  
  public void deleteInterruption(InterruptionEntity interruption) {
    interruptionDAO.deleteInterruption(interruption);
  }

  public InterruptionEntity findInterruptionById(Long interruptionId) {
    return interruptionDAO.findById(interruptionId);
  }
  
  public List<InterruptionEntity> listInterruptionsByGroupId(Long groupId) {
    return interruptionDAO.listByGroupId(groupId);
  }

  public InterruptionGroupEntity findInterruptionGroupById(Long interruptionGroupId) {
    return interruptionGroupDAO.findById(interruptionGroupId);
  }
  
  public InterruptionGroupEntity createInterruptionGroup(
      OffsetDateTime startTime,
      OffsetDateTime endTime,
      double overbookingFactor,
      int powerSavingGoalInWatts) {
    return interruptionGroupDAO.create(startTime,
                                       endTime,
                                       overbookingFactor,
                                       powerSavingGoalInWatts);
  }
  
  public InterruptionEntity createInterruption(
      DeviceEntity device,
      InterruptionGroupEntity group
  ) {
    return interruptionDAO.create(device, group);
  }
      
  
  public InterruptionGroupEntity updateInterruptionGroup(
      InterruptionGroupEntity group,
      OffsetDateTime startTime,
      OffsetDateTime endTime) {
    return group;
  }
}
