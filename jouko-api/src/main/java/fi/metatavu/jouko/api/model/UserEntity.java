package fi.metatavu.jouko.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Creates MySQL table "User" and sets data types for columns.
 */
@Table(name="User")
@Entity
public class UserEntity {
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  /**
   * Use a separate keycloakId because the devices have very restricted
   * communication bandwidth, so using UUIDs everywhere is not feasible
   */
  @Column(nullable = false)
  @NotNull
  private String keycloakId;
  
  private String name;
  
  public UserEntity() {
  }
  
  public UserEntity(Long id, String keycloakId, String name) {
    super();
    this.id = id;
    this.keycloakId = keycloakId;
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getKeycloakId() {
    return keycloakId;
  }

  public void setKeycloakId(String keycloakId) {
    this.keycloakId = keycloakId;
  }
}
