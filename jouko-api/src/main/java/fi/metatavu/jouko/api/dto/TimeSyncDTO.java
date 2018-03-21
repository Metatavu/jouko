package fi.metatavu.jouko.api.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TimeSyncDTO {
  private final long difference;
  
  @JsonCreator
  public TimeSyncDTO(
      @JsonProperty("erotus")
      long difference
  ) {
    super();
    this.difference = difference;
  }

  @JsonProperty("erotus")
  public long getDifference() {
    return difference;
  }

}
