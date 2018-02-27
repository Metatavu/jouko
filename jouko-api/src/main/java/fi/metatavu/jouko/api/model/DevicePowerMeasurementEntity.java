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

@Table(name="DevicePowerMeasurement")
@Entity
public class DevicePowerMeasurementEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private DeviceEntity device;
  
  @Column(nullable = false)
  @NotNull
  private Double average;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime startTime;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime endTime;

  public DevicePowerMeasurementEntity(Long id, DeviceEntity device, Double average,
      OffsetDateTime startTime, OffsetDateTime endTime) {
    super();
    this.id = id;
    this.device = device;
    this.average = average;
    this.startTime = startTime;
    this.endTime = endTime;
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
  public Double getAverage() {
    return average;
  }
  public void setAverage(Double average) {
    this.average = average;
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
}
