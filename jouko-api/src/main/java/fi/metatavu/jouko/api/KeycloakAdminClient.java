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
   * @param serverUrl
   * @param realmId
   * @param username
   * @param secret
   * @param clientId
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
   * @return Keycloak instance of keycloak
   */
  private Keycloak initializeKeycloak(String serverUrl, String realmId, String username, String secret, String clientId, Keycloak keycloakInstance) {
    if (this.keycloakInstance != null) {
      return this.keycloakInstance;
    }
 
    
    return this.keycloakInstance;
  }
}
