package fi.metatavu.jouko.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Creates MySQL table "InterruptionGroup" and sets data types for columns.
 */
@Table(name="InterruptionGroup")
@Entity
public class InterruptionGroupEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime startTime;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime endTime;
  
  @Column(nullable = false)
  @NotNull
  private double overbookingFactor;
  
  @Column(nullable = false)
  @NotNull
  private int powerSavingGoalInWatts;
  
  public InterruptionGroupEntity() {
  }

  public InterruptionGroupEntity(
      Long id,
      OffsetDateTime startTime,
      OffsetDateTime endTime) {
    super();
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public OffsetDateTime getStartTime() {
    return startTime;
  }

  public void setStartTime(OffsetDateTime startTime) {
    this.startTime = startTime;
  }

  public OffsetDateTime getEndTime() {
    return endTime;
  }

  public void setEndTime(OffsetDateTime endTime) {
    this.endTime = endTime;
  }

  public double getOverbookingFactor() {
    return overbookingFactor;
  }

  public void setOverbookingFactor(double overbookingFactor) {
    this.overbookingFactor = overbookingFactor;
  }

  public int getPowerSavingGoalInWatts() {
    return powerSavingGoalInWatts;
  }

  public void setPowerSavingGoalInWatts(int powerSavingGoalInWatts) {
    this.powerSavingGoalInWatts = powerSavingGoalInWatts;
  }
  
}
