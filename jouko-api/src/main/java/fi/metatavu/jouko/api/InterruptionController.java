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

  /**
   * Lists interruptions of a device by date
   *
   * @param device you want interruptions from
   * @param fromTime period you want the interruptions from
   * @param toTime period you want the interruptions to
   * @return interruptions of a device
   */
  public List<InterruptionEntity> listInterruptionsByDeviceAndDate(
      DeviceEntity device,
      OffsetDateTime fromTime,
      OffsetDateTime toTime) {
    return interruptionDAO.listByDeviceAndDate(device, fromTime, toTime);
  }

  /**
   * List interruptions by date specifically
   *
   * @param fromTime you want the interruptions from
   * @param toTime you want the interruptions to
   * @return interruptions
   */
  public List<InterruptionEntity> listInterruptionsByDate(
      OffsetDateTime fromTime,
      OffsetDateTime toTime) {
    return interruptionDAO.listByDate(fromTime, toTime);
  }

  /**
   * List all interruption groups
   *
   * @param firstResult
   * @param maxResults you want to return
   * @return interruption groups
   */
  public List<InterruptionGroupEntity> listInterruptionGroups(
      Integer firstResult,
      Integer maxResults
  ) {
    return interruptionGroupDAO.listAll(firstResult, maxResults);
  }

  /**
   * Deletes an interruption group
   *
   * @param id of interruption group
   */
  public void deleteInerruptionGroup(Long id) {
    interruptionGroupDAO.deleteInterruptionGroupById(id);
  }

  /**
   * Cancel a interruption
   *
   * @param interruption
   * @param cancelled
   */
  public void setInterruptionCancelled(InterruptionEntity interruption, boolean cancelled) {
    interruption.setCancelled(cancelled);
    
    if (cancelled) {
      interruption.setCancellationTime(OffsetDateTime.now(ZoneOffset.UTC));
    }
  }

  /**
   * Deletes an interruption by device
   *
   * @param interruption
   * @param device that has the interruption
   */
  public void deleteInterruptionByDevice(InterruptionEntity interruption, DeviceEntity device) {
    interruptionDAO.deleteInterruptionFromDevice(interruption, device);
  }

  /**
   * Deletes a interruption
   *
   * @param interruption
   */
  public void deleteInterruption(InterruptionEntity interruption) {
    interruptionDAO.deleteInterruption(interruption);
  }

  /**
   * Find an interruption using its id
   *
   * @param interruptionId you want to search for
   * @return interruption
   */
  public InterruptionEntity findInterruptionById(Long interruptionId) {
    return interruptionDAO.findById(interruptionId);
  }

  /**
   * List all interruptions of a group by using its id
   *
   * @param groupId you want the interruptions of
   * @return interruptions of a group
   */
  public List<InterruptionEntity> listInterruptionsByGroupId(Long groupId) {
    return interruptionDAO.listByGroupId(groupId);
  }

  /**
   * Find an interruption group by using its id
   *
   * @param interruptionGroupId you want to search for
   * @return the interruption group
   */
  public InterruptionGroupEntity findInterruptionGroupById(Long interruptionGroupId) {
    return interruptionGroupDAO.findById(interruptionGroupId);
  }

  /**
   * Creates a new interruption group
   *
   * @param startTime you want to start the interruption from
   * @param endTime you want to end the interruption at
   * @param overbookingFactor
   * @param powerSavingGoalInWatts is the watts amount you trying to achieve with this interruption
   * @return a new interruption group
   */
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

  /**
   * Creates a new interruption
   *
   * @param device you want to create a new interruption for
   * @param group of interruption
   * @return the new interruption
   */
  public InterruptionEntity createInterruption(
      DeviceEntity device,
      InterruptionGroupEntity group
  ) {
    return interruptionDAO.create(device, group);
  }

  /**
   * Updates an interruption group
   *
   * @param group you want to update
   * @param startTime of the interruption
   * @param endTime of the interruption
   * @return updated interruption group
   */
  public InterruptionGroupEntity updateInterruptionGroup(
      InterruptionGroupEntity group,
      OffsetDateTime startTime,
      OffsetDateTime endTime) {
    return group;
  }
}
