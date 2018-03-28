package fi.metatavu.jouko.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Table(name="Controller")
@Entity
public class ControllerEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  @NotNull
  private String eui;
  
  @Column(nullable = false)
  @NotNull
  private String key;
  
  public ControllerEntity() {
  }

  public ControllerEntity(Long id, String eui, String key) {
    super();
    this.id = id;
    this.eui = eui;
    this.key = key;
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

}
