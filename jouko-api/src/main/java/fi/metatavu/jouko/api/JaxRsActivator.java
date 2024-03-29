package fi.metatavu.jouko.api;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * Set the API path to "/v1"
 * Initialises the API using JAX-RS
*/
@ApplicationPath("/v1")
public class JaxRsActivator extends Application {
  
  {
    Logger.getLogger(getClass().getName()).log(Level.INFO, "JaxRsActivator initiated");
  }
  
}