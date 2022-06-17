package fi.metatavu.jouko.api;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;

/**
 * Keycloak admin client class
 * @author villekoivukangas
 *
 */
public class KeycloakAdminClient {
  private String serverUrl;
  
  private String realmId;
  
  private String username;
  
  private String secret;
  
  private String clientId;
  
  private Keycloak keycloakInstance;
  
  /**
   * Constructor
   * 
   * @param serverUrl where keycloak is located at
   * @param realmId is the realm name
   * @param username of keycloak user
   * @param secret
   * @param clientId that's used to interact with the keycloak server
   */
  public KeycloakAdminClient(String serverUrl, String realmId, String username, String secret, String clientId, Keycloak keycloakInstance) {
    this.serverUrl = serverUrl;
    this.realmId = realmId;
    this.username = username;
    this.secret = secret;
    this.clientId = clientId;
    this.keycloakInstance = keycloakInstance;
  }
  
  /**
   * Initialize keycloak
   *
   * @param serverUrl of keycloak server
   * @param realmId is the realm you want to control / name
   * @param username of keycloak user
   * @param clientId  that's used to interact with the keycloak server
   * @param keycloakInstance
   * @return Keycloak instance of keycloak
   */
  private Keycloak initializeKeycloak(String serverUrl, String realmId, String username, String secret, String clientId, Keycloak keycloakInstance) {
    if (this.keycloakInstance != null) {
      return this.keycloakInstance;
    }
 
    
    return this.keycloakInstance;
  }
}
