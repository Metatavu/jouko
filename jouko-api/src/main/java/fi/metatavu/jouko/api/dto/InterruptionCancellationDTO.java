package fi.metatavu.jouko.api.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class InterruptionCancellationDTO {
  private final long interruptionId;
  
  @JsonCreator
  public InterruptionCancellationDTO(@JsonProperty("katkoID") long interruptionId) {
    super();
    this.interruptionId = interruptionId;
  }

  @JsonProperty("katkoID")
  public long getInterruptionId() {
    return interruptionId;
  }
}