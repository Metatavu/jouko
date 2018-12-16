package fi.metatavu.jouko.api.model;

import javax.validation.constraints.NotNull;

public class KeycloakUserEntity {

  @NotNull
  private long id;
  
  @NotNull
  private String keycloakId;
  
  private String username;
  
  private String firstName;
  
  private String lastName;
  
  @NotNull
  private String email;


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getKeycloakId() {
    return keycloakId;
  }

  public void setKeycloakId(String keycloakId) {
    this.keycloakId = keycloakId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
  
  
}
