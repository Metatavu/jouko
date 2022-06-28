package fi.metatavu.jouko.server.rest.model;

import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;


public class ControllerDevice   {
  
  private @Valid Long id = null;
  private @Valid String eui = null;
  private @Valid String key = null;
  private @Valid String communicationChannel = null;

  /**
   * Controller device id
   **/
  public ControllerDevice id(Long id) {
    this.id = id;
    return this;
  }

  
  @ApiModelProperty(value = "Controller device id")
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * The EUI of the controller device
   **/
  public ControllerDevice eui(String eui) {
    this.eui = eui;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "The EUI of the controller device")
  @NotNull
  public String getEui() {
    return eui;
  }
  public void setEui(String eui) {
    this.eui = eui;
  }

  /**
   * The key of the controller device
   **/
  public ControllerDevice key(String key) {
    this.key = key;
    return this;
  }

  
  @ApiModelProperty(required = true, value = "The key of the controller device")
  @NotNull
  public String getKey() {
    return key;
  }
  public void setKey(String key) {
    this.key = key;
  }

  /**
   * The communication channel of the controller device
   **/
  public ControllerDevice communicationChannel(String communicationChannel) {
    this.communicationChannel = communicationChannel;
    return this;
  }

  
  @ApiModelProperty(value = "The communication channel of the controller device")
  public String getCommunicationChannel() {
    return communicationChannel;
  }
  public void setCommunicationChannel(String communicationChannel) {
    this.communicationChannel = communicationChannel;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ControllerDevice controllerDevice = (ControllerDevice) o;
    return Objects.equals(id, controllerDevice.id) &&
        Objects.equals(eui, controllerDevice.eui) &&
        Objects.equals(key, controllerDevice.key) &&
        Objects.equals(communicationChannel, controllerDevice.communicationChannel);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, eui, key, communicationChannel);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ControllerDevice {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    eui: ").append(toIndentedString(eui)).append("\n");
    sb.append("    key: ").append(toIndentedString(key)).append("\n");
    sb.append("    communicationChannel: ").append(toIndentedString(communicationChannel)).append("\n");
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

