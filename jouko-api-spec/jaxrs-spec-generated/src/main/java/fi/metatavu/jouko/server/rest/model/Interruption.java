package fi.metatavu.jouko.server.rest.model;

import java.time.OffsetDateTime;
import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;


public class Interruption   {
  
  private @Valid Long id = null;
  private @Valid OffsetDateTime startTime = null;
  private @Valid OffsetDateTime endTime = null;
  private @Valid Long deviceId = null;
  private @Valid Boolean cancelled = null;
  private @Valid OffsetDateTime cancellationTime = null;

  /**
   * Interruption id
   **/
  public Interruption id(Long id) {
    this.id = id;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "Interruption id")
  @NotNull
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Start time of the interruption, inclusive
   **/
  public Interruption startTime(OffsetDateTime startTime) {
    this.startTime = startTime;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "Start time of the interruption, inclusive")
  @NotNull
  public OffsetDateTime getStartTime() {
    return startTime;
  }
  public void setStartTime(OffsetDateTime startTime) {
    this.startTime = startTime;
  }

  /**
   * End time of the interruption, exclusive
   **/
  public Interruption endTime(OffsetDateTime endTime) {
    this.endTime = endTime;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "End time of the interruption, exclusive")
  @NotNull
  public OffsetDateTime getEndTime() {
    return endTime;
  }
  public void setEndTime(OffsetDateTime endTime) {
    this.endTime = endTime;
  }

  /**
   * The ID of the interrupted device
   **/
  public Interruption deviceId(Long deviceId) {
    this.deviceId = deviceId;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "The ID of the interrupted device")
  @NotNull
  public Long getDeviceId() {
    return deviceId;
  }
  public void setDeviceId(Long deviceId) {
    this.deviceId = deviceId;
  }

  /**
   * True if the interruption has been cancelled
   **/
  public Interruption cancelled(Boolean cancelled) {
    this.cancelled = cancelled;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "True if the interruption has been cancelled")
  @NotNull
  public Boolean isCancelled() {
    return cancelled;
  }
  public void setCancelled(Boolean cancelled) {
    this.cancelled = cancelled;
  }

  /**
   * The time when the interruption was cancelled
   **/
  public Interruption cancellationTime(OffsetDateTime cancellationTime) {
    this.cancellationTime = cancellationTime;
    return this;
  }

  
  @ApiModelProperty(value = "The time when the interruption was cancelled")
  public OffsetDateTime getCancellationTime() {
    return cancellationTime;
  }
  public void setCancellationTime(OffsetDateTime cancellationTime) {
    this.cancellationTime = cancellationTime;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Interruption interruption = (Interruption) o;
    return Objects.equals(id, interruption.id) &&
        Objects.equals(startTime, interruption.startTime) &&
        Objects.equals(endTime, interruption.endTime) &&
        Objects.equals(deviceId, interruption.deviceId) &&
        Objects.equals(cancelled, interruption.cancelled) &&
        Objects.equals(cancellationTime, interruption.cancellationTime);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, startTime, endTime, deviceId, cancelled, cancellationTime);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Interruption {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    startTime: ").append(toIndentedString(startTime)).append("\n");
    sb.append("    endTime: ").append(toIndentedString(endTime)).append("\n");
    sb.append("    deviceId: ").append(toIndentedString(deviceId)).append("\n");
    sb.append("    cancelled: ").append(toIndentedString(cancelled)).append("\n");
    sb.append("    cancellationTime: ").append(toIndentedString(cancellationTime)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

