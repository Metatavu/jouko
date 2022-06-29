package fi.metatavu.jouko.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Creates MySQL table "Device" and sets data types for columns.
 */
@Table(name="Device")
@Entity
public class DeviceEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  @NotNull
  private String name;
  
  @ManyToOne
  private UserEntity user;
  
  @ManyToOne
  private ControllerEntity controller;
  
  public DeviceEntity() {
  }

  public DeviceEntity(Long id, String name, UserEntity user, ControllerEntity controller) {
    super();
    this.id = id;
    this.name = name;
    this.user = user;
    this.controller = controller;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  public ControllerEntity getController() {
    return controller;
  }

  public void setController(ControllerEntity controller) {
    this.controller = controller;
  }
  
}
