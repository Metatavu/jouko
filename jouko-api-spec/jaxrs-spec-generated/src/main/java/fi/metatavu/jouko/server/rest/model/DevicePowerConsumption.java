package fi.metatavu.jouko.server.rest.model;

import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;


public class DevicePowerConsumption   {
  
  private @Valid Double averageConsumptionInWatts = null;

  /**
   * The power consumption in the given time span, in watts
   **/
  public DevicePowerConsumption averageConsumptionInWatts(Double averageConsumptionInWatts) {
    this.averageConsumptionInWatts = averageConsumptionInWatts;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "The power consumption in the given time span, in watts")
  @NotNull
  public Double getAverageConsumptionInWatts() {
    return averageConsumptionInWatts;
  }
  public void setAverageConsumptionInWatts(Double averageConsumptionInWatts) {
    this.averageConsumptionInWatts = averageConsumptionInWatts;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DevicePowerConsumption devicePowerConsumption = (DevicePowerConsumption) o;
    return Objects.equals(averageConsumptionInWatts, devicePowerConsumption.averageConsumptionInWatts);
  }

  @Override
  public int hashCode() {
    return Objects.hash(averageConsumptionInWatts);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DevicePowerConsumption {\n");
    
    sb.append("    averageConsumptionInWatts: ").append(toIndentedString(averageConsumptionInWatts)).append("\n");
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

