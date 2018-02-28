package fi.metatavu.jouko.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Table(name="Interruption")
@Entity
public class InterruptionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime startTime;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime endTime;
  
  @ManyToOne
  private DeviceEntity device;
  
  @Column(nullable = false)
  private boolean cancelled;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime cancellationTime;
  
  public InterruptionEntity() {
    cancelled = false;
  }

  public InterruptionEntity(Long id, OffsetDateTime startTime, OffsetDateTime endTime,
      DeviceEntity device, boolean cancelled, OffsetDateTime cancellationTime) {
    super();
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.device = device;
    this.cancelled = cancelled;
    this.cancellationTime = cancellationTime;
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

  public DeviceEntity getDevice() {
    return device;
  }

  public void setDevice(DeviceEntity device) {
    this.device = device;
  }

  public boolean isCancelled() {
    return cancelled;
  }

  public void setCancelled(boolean cancelled) {
    this.cancelled = cancelled;
  }

  public OffsetDateTime getCancellationTime() {
    return cancellationTime;
  }

  public void setCancellationTime(OffsetDateTime cancellationTime) {
    this.cancellationTime = cancellationTime;
  }
}
