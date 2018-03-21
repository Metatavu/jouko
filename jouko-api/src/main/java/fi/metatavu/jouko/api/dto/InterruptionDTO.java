package fi.metatavu.jouko.api.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class InterruptionDTO {
  private final long interruptionId;
  private final long deviceId;
  private final long startTimestamp;
  private final long endTimestamp;
  
  @JsonCreator
  public InterruptionDTO(
      @JsonProperty("katkoID")
      long interruptionId,
      @JsonProperty("laiteID")
      long deviceId,
      @JsonProperty("alku")
      long startTimestamp,
      @JsonProperty("loppu")
      long endTimestamp
  ) {
    super();
    this.interruptionId = interruptionId;
    this.deviceId = deviceId;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
  }

  @JsonProperty("katkoID")
  public long getInterruptionId() {
    return interruptionId;
  }

  @JsonProperty("laiteID")
  public long getDeviceId() {
    return deviceId;
  }

  @JsonProperty("alku")
  public long getStartTimestamp() {
    return startTimestamp;
  }

  @JsonProperty("loppu")
  public long getEndTimestamp() {
    return endTimestamp;
  }
}
