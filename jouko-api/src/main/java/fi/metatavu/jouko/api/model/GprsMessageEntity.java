package fi.metatavu.jouko.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
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
  
  public GprsMessageEntity() {
  }

  public GprsMessageEntity(
      Long id,
      String content,
      ControllerEntity controller
  ) {
    super();
    this.id = id;
    this.content = content;
    this.controller = controller;
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
