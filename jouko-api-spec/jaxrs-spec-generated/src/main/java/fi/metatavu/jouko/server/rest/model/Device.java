package fi.metatavu.jouko.server.rest.model;

import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;


public class Device   {
  
  private @Valid Long id = null;
  private @Valid String name = null;
  private @Valid Long userId = null;
  private @Valid Long controllerId = null;

  /**
   * Device id
   **/
  public Device id(Long id) {
    this.id = id;
    return this;
  }

  
  @ApiModelProperty(value = "Device id")
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * The name of the device
   **/
  public Device name(String name) {
    this.name = name;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "The name of the device")
  @NotNull
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Device user id
   **/
  public Device userId(Long userId) {
    this.userId = userId;
    return this;
  }

  
  @ApiModelProperty(value = "Device user id")
  public Long getUserId() {
    return userId;
  }
  public void setUserId(Long userId) {
    this.userId = userId;
  }

  /**
   * Device controller id
   **/
  public Device controllerId(Long controllerId) {
    this.controllerId = controllerId;
    return this;
  }

  
  @ApiModelProperty(value = "Device controller id")
  public Long getControllerId() {
    return controllerId;
  }
  public void setControllerId(Long controllerId) {
    this.controllerId = controllerId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Device device = (Device) o;
    return Objects.equals(id, device.id) &&
        Objects.equals(name, device.name) &&
        Objects.equals(userId, device.userId) &&
        Objects.equals(controllerId, device.controllerId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, userId, controllerId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Device {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    controllerId: ").append(toIndentedString(controllerId)).append("\n");
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

