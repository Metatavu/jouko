package fi.metatavu.jouko.server.rest.model;

import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;


public class InterruptionCancellation   {
  
  private @Valid Boolean cancelled = null;

  /**
   * True if the interruption has been cancelled
   **/
  public InterruptionCancellation cancelled(Boolean cancelled) {
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


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InterruptionCancellation interruptionCancellation = (InterruptionCancellation) o;
    return Objects.equals(cancelled, interruptionCancellation.cancelled);
  }

  @Override
  public int hashCode() {
    return Objects.hash(cancelled);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InterruptionCancellation {\n");
    
    sb.append("    cancelled: ").append(toIndentedString(cancelled)).append("\n");
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

