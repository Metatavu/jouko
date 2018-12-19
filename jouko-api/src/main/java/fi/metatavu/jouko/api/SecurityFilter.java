package fi.metatavu.jouko.api;

import java.io.UnsupportedEncodingException;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

import fi.metatavu.jouko.api.model.ControllerEntity;

@Provider
public class SecurityFilter implements ContainerRequestFilter {
  
  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final String AUTHENTICATION_SCHEME = "Basic ";
  
  @Inject
  private DeviceController deviceController;

  @Override
  public void filter(ContainerRequestContext requestContext) {
    String path = requestContext.getUriInfo().getPath();
    String[] pathParts = path.split("/");
    
    if (1 < 10) {
      return;
    }
    
    if (!pathParts[1].equals("gprs") && !pathParts[2].equals("gprs")) {
      return;
    }
    
    String authorizationHeader = requestContext.getHeaderString(AUTHORIZATION_HEADER);
    if (StringUtils.isBlank(authorizationHeader)) {
      handleUnuauthorizedRequest(requestContext, "Missing authorization header");
      return;
    }
    
    if (!StringUtils.startsWithIgnoreCase(authorizationHeader, AUTHENTICATION_SCHEME)) {
      handleUnuauthorizedRequest(requestContext, "Invalid authorization scheme");
      return;
    }
    
    String authorization = decodeAuthorization(authorizationHeader);
    if (StringUtils.isBlank(authorization)) {
      handleUnuauthorizedRequest(requestContext, "Invalid credentials");
      return;        
    }
    
    String[] credentials = StringUtils.split(authorization, ":", 2);
    if (credentials.length != 2) {
      handleUnuauthorizedRequest(requestContext, "Missing credentials");
      return;        
    }
    
    ControllerEntity device = deviceController.findControllerByEuiAndKey(credentials[0], credentials[1]);
    if (device == null) {
      handleUnuauthorizedRequest(requestContext, "Invalid clientId or clientSecret");   
      return;
    }
    
    String method = StringUtils.upperCase(requestContext.getMethod());
    if (!isMethodAllowed(method)) {
      handleUnuauthorizedRequest(requestContext, String.format("Client is not allowed to use %s", method));
    }
    
  }
  
  /**
   * Returns whether method is allowed for the client
   * 
   * @param method method
   * @param client client
   * @return whether method is allowed for the client
   */
  private boolean isMethodAllowed(String method) {
    return ("POST".equals(method));
  }
  
  /**
   * Decodes authorization string
   * 
   * @param authorization authorization string
   * @return decoded authorization string
   */
  private String decodeAuthorization(String authorization) {
    try {
      return new String(Base64.decodeBase64(authorization.substring(AUTHENTICATION_SCHEME.length())), "UTF-8");
    } catch (UnsupportedEncodingException e) {
      return null;
    }
  }

  
  /**
   * Handles unauthorized request
   * 
   * @param requestContext request context
   * @param logMessage log message
   */
  private void handleUnuauthorizedRequest(ContainerRequestContext requestContext, String logMessage) {
    requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("Unauthorized").build());
  }
}
