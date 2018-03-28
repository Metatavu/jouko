package fi.metatavu.jouko.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name="Interruption")
@Entity
public class InterruptionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne
  private DeviceEntity device;
  
  @ManyToOne
  private InterruptionGroupEntity group;
  
  @Column(nullable = false)
  private boolean cancelled;
  
  @Column(nullable = true)
  private OffsetDateTime cancellationTime;
  
  public InterruptionEntity() {
    cancelled = false;
  }

  public InterruptionEntity(
      Long id,
      DeviceEntity device,
      InterruptionGroupEntity group,
      boolean cancelled,
      OffsetDateTime cancellationTime) {
    super();
    this.id = id;
    this.device = device;
    this.group = group;
    this.cancelled = cancelled;
    this.cancellationTime = cancellationTime;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public DeviceEntity getDevice() {
    return device;
  }

  public void setDevice(DeviceEntity device) {
    this.device = device;
  }

  public InterruptionGroupEntity getGroup() {
    return group;
  }

  public void setGroup(InterruptionGroupEntity group) {
    this.group = group;
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
