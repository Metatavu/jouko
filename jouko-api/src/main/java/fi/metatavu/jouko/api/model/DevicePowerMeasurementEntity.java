package fi.metatavu.jouko.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Creates MySQL table "DevicePowerMeasurement" and sets data types for columns.
 */
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
  private Double measurementValue;
  
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  @NotNull
  private MeasurementType measurementType;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime startTime;
  
  @Column(nullable = false)
  @NotNull
  private OffsetDateTime endTime;
  
  @Column(nullable = false)
  @NotNull
  private int phaseNumber;
  
  @Column(nullable = false)
  @NotNull
  private boolean relayIsOpen;

  public boolean isRelayIsOpen() {
    return relayIsOpen;
  }

  public void setRelayIsOpen(boolean relayIsOpen) {
    this.relayIsOpen = relayIsOpen;
  }

  public DevicePowerMeasurementEntity() {
  }

  public DevicePowerMeasurementEntity(
      Long id,
      DeviceEntity device,
      Double measurementValue,
      MeasurementType measurementType,
      OffsetDateTime startTime,
      OffsetDateTime endTime,
      int phaseNumber,
      boolean relayIsOpen) {
    super();
    this.id = id;
    this.device = device;
    this.measurementValue = measurementValue;
    this.measurementType = measurementType;
    this.startTime = startTime;
    this.endTime = endTime;
    this.phaseNumber = phaseNumber;
    this.relayIsOpen = relayIsOpen;
  }

  public int getPhaseNumber() {
    return phaseNumber;
  }

  public void setPhaseNumber(int phaseNumber) {
    this.phaseNumber = phaseNumber;
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
  public Double getMeasurementValue() {
    return measurementValue;
  }
  public void setMeasurementValue(Double measurementValue) {
    this.measurementValue = measurementValue;
  }
  public MeasurementType getMeasurementType() {
    return measurementType;
  }
  public void setMeasurementType(MeasurementType measurementType) {
    this.measurementType = measurementType;
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
