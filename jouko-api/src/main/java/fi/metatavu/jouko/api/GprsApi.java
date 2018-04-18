package fi.metatavu.jouko.api;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;

@Stateless
@Path("/gprs")
public class GprsApi {
  
  @Inject
  private Logger logger;
  
  @Inject
  private DeviceController deviceController;
  
  @POST
  @Path("/gprs")
  public Response communicateWithGprsDevice(String content) {
    //logger.info(new String(content, StandardCharsets.UTF_8));
    logger.info(content);
    
    // TODO: list only for the relevant device
    List<String> messages = deviceController.getAllQueuedGprsMessages();
    deviceController.clearGprsMessages();

    return Response.ok(String.join(" ", messages)).build();
  }
}
