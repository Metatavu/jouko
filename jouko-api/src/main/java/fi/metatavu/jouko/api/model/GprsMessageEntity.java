package fi.metatavu.jouko.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Table(name="GprsMessage")
@Entity
public class GprsMessageEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  @NotNull
  private String content;
  
  @ManyToOne
  private ControllerEntity controller;
  
  private long deviceId;
  
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  @NotNull
  private MessageType type;
  
  public GprsMessageEntity() {
  }

  public GprsMessageEntity(
      Long id,
      long deviceId,
      String content,
      ControllerEntity controller,
      MessageType type
  ) {
    super();
    this.id = id;
    this.deviceId = deviceId;
    this.content = content;
    this.controller = controller;
    this.type = type;
  }

  public long getDeviceId() {
    return deviceId;
  }

  public void setDeviceId(long deviceId) {
    this.deviceId = deviceId;
  }

  public MessageType getType() {
    return type;
  }

  public void setType(MessageType type) {
    this.type = type;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public ControllerEntity getController() {
    return controller;
  }
  
  public MessageType getMessageType() {
    return type;
  }
  
  public void setMessageType(MessageType type) {
    this.type = type;
  }

  public void setController(ControllerEntity controller) {
    this.controller = controller;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
