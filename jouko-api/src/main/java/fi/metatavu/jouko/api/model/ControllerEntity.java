package fi.metatavu.jouko.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Creates MySQL table "Controller" and sets data types for columns.
 */
@Table(name="Controller")
@Entity
public class ControllerEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  @NotNull
  private String eui;
  
  @Column(nullable = false, name="`key`")
  @NotNull
  private String key;
  
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  @NotNull
  private ControllerCommunicationChannel communicationChannel;
  
  public ControllerEntity() {
  }

  public ControllerEntity(
      Long id,
      String eui,
      String key,
      ControllerCommunicationChannel communicationChannel) {
    super();
    this.id = id;
    this.eui = eui;
    this.key = key;
    this.communicationChannel = communicationChannel;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEui() {
    return eui;
  }

  public void setEui(String eui) {
    this.eui = eui;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public ControllerCommunicationChannel getCommunicationChannel() {
    return communicationChannel;
  }
  
  public String getCommunicationChannelString() {
    return communicationChannel.toString();
  }

  public void setCommunicationChannel(ControllerCommunicationChannel communicationChannel) {
    this.communicationChannel = communicationChannel;
  }
}
