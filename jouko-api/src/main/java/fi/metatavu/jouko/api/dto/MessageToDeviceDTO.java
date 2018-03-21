package fi.metatavu.jouko.api.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(Include.NON_NULL)
public class MessageToDeviceDTO {
  private final List<InterruptionDTO> interruptions;
  private final List<InterruptionCancellationDTO> cancellations;
  private final TimeSyncDTO timeSync;
  
  @JsonCreator
  public MessageToDeviceDTO(
      @JsonProperty("katkot")
      List<InterruptionDTO> interruptions,
      @JsonProperty("katkonestot")
      List<InterruptionCancellationDTO> cancellations,
      @JsonProperty("aikasynk")
      TimeSyncDTO timeSync
  ) {
    super();
    this.interruptions = interruptions;
    this.cancellations = cancellations;
    this.timeSync = timeSync;
  }

  @JsonProperty("katkot")
  public List<InterruptionDTO> getInterruptions() {
    return interruptions;
  }

  @JsonProperty("katkonestot")
  public List<InterruptionCancellationDTO> getCancellations() {
    return cancellations;
  }

  @JsonProperty("aikasynk")
  public TimeSyncDTO getTimeSync() {
    return timeSync;
  }

}