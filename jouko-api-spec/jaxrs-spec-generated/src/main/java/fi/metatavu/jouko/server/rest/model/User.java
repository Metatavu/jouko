package fi.metatavu.jouko.server.rest.model;

import java.util.UUID;
import javax.validation.constraints.*;
import javax.validation.Valid;


import io.swagger.annotations.*;
import java.util.Objects;


public class User   {
  
  private @Valid Long id = null;
  private @Valid UUID keycloakId = null;
  private @Valid String firstName = null;
  private @Valid String lastName = null;
  private @Valid String email = null;
  private @Valid String username = null;

  /**
   * User id
   **/
  public User id(Long id) {
    this.id = id;
    return this;
  }

  
  @ApiModelProperty(value = "User id")
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * The keycloak id of the user
   **/
  public User keycloakId(UUID keycloakId) {
    this.keycloakId = keycloakId;
    return this;
  }

  
  @ApiModelProperty(value = "The keycloak id of the user")
  public UUID getKeycloakId() {
    return keycloakId;
  }
  public void setKeycloakId(UUID keycloakId) {
    this.keycloakId = keycloakId;
  }

  /**
   * The firstname id of the user
   **/
  public User firstName(String firstName) {
    this.firstName = firstName;
    return this;
  }

  
  @ApiModelProperty(value = "The firstname id of the user")
  public String getFirstName() {
    return firstName;
  }
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  /**
   * The lastname id of the user
   **/
  public User lastName(String lastName) {
    this.lastName = lastName;
    return this;
  }

  
  @ApiModelProperty(value = "The lastname id of the user")
  public String getLastName() {
    return lastName;
  }
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  /**
   * The email id of the user
   **/
  public User email(String email) {
    this.email = email;
    return this;
  }

  
  @ApiModelProperty(value = "The email id of the user")
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * The username id of the user
   **/
  public User username(String username) {
    this.username = username;
    return this;
  }

  
  @ApiModelProperty(value = "The username id of the user")
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(id, user.id) &&
        Objects.equals(keycloakId, user.keycloakId) &&
        Objects.equals(firstName, user.firstName) &&
        Objects.equals(lastName, user.lastName) &&
        Objects.equals(email, user.email) &&
        Objects.equals(username, user.username);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, keycloakId, firstName, lastName, email, username);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class User {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    keycloakId: ").append(toIndentedString(keycloakId)).append("\n");
    sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
    sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    username: ").append(toIndentedString(username)).append("\n");
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

