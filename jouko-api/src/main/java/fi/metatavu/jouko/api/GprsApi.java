package fi.metatavu.jouko.api;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;

import com.google.protobuf.InvalidProtocolBufferException;

import fi.metatavu.jouko.api.device.Laiteviestit.AikasynkLaitteelle;
import fi.metatavu.jouko.api.device.Laiteviestit.AikasynkLaitteelta;
import fi.metatavu.jouko.api.device.Laiteviestit.Mittaukset;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelle;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelta;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.MeasurementType;

@Stateless
@Path("/gprs")
public class GprsApi {
  
  @Inject
  private Logger logger;
  
  @Inject
  private DeviceController deviceController;
  
  @Context
  private HttpServletRequest request;
  
  private static final Pattern MESSAGE_PATTERN = Pattern.compile("{([^}]*)}");
  
  private static final Pattern AUTH_PATTERN = Pattern.compile("^Key ([a-zA-Z0-9]+)$");
  
  @POST
  @Path("/gprs/:eui")
  public Response communicateWithGprsDevice(
      @PathParam("eui") String eui,
      String content
  ) {

    ControllerEntity controller = deviceController.findControllerByEui(eui);
    if (controller == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("No device with eui")
                     .build();
    }
    
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null) {
      return Response.status(Status.UNAUTHORIZED)
                     .entity("No authorization header")
                     .build();
    }
    
    Matcher authMatcher = AUTH_PATTERN.matcher(authHeader);
    if (authMatcher.matches()) {
      String key = authMatcher.group(1);
      
      if (!Objects.equals(controller.getKey(), key)) {
        return Response.status(Status.UNAUTHORIZED)
                       .entity("Invalid key")
                       .build();
      }
    } else {
      return Response.status(Status.UNAUTHORIZED)
                     .entity("Invalid key format")
                     .build();
    }
    
    Matcher messageMatcher = MESSAGE_PATTERN.matcher(content);
    List<String> messages = new ArrayList<>();
    try {
      while (messageMatcher.find()) {
        String base64 = messageMatcher.group(1);
        byte[] bytes = Base64.decodeBase64(base64);
        ViestiLaitteelta viestiLaitteelta = ViestiLaitteelta.parseFrom(bytes);
        if (viestiLaitteelta.hasMittaukset()) {
          Mittaukset mittaukset = viestiLaitteelta.getMittaukset();
          
          long deviceId = mittaukset.getLaiteID();
          DeviceEntity device = deviceController.findById(deviceId);
          if (device == null) {
            logger.error("Invalid device ID: {}", deviceId);
            return Response.status(400).entity("Invalid device ID").build();
          }

          Instant endTime = Instant.ofEpochSecond(mittaukset.getAika());
          long measurementLength = mittaukset.getPituusMinuutteina();
          int numMeasurements = mittaukset.getKeskiarvotCount();
          
          Instant time = endTime.minus(numMeasurements * measurementLength, ChronoUnit.MINUTES);
          
          for (int average : mittaukset.getKeskiarvotList()) {
            deviceController.addPowerMeasurement(
                device,
                (double)average,
                MeasurementType.AVERAGE,
                time
                  .atOffset(ZoneOffset.UTC),
                time
                  .plus(measurementLength, ChronoUnit.MINUTES)
                  .atOffset(ZoneOffset.UTC));
            time = time.plus(measurementLength, ChronoUnit.MINUTES);
          }
        } else if (viestiLaitteelta.hasAikasynkLaitteelta()) {
          AikasynkLaitteelta sync = viestiLaitteelta.getAikasynkLaitteelta();
          long deviceTime = sync.getLaiteaika();
          long myTime = Instant.now().getEpochSecond();
          
          ViestiLaitteelle replyMessage = ViestiLaitteelle
              .newBuilder()
              .setAikasynkLaitteelle(
                  AikasynkLaitteelle.newBuilder()
                    .setErotus(deviceTime - myTime)
                    .build())
              .build();
          
          String replyMessageString = String.format("{%s}",
              Base64.encodeBase64String(replyMessage.toByteArray()));
          
          messages.add(replyMessageString);
        }
      }
    } catch (InvalidProtocolBufferException ex) {
      return Response
          .status(400)
          .entity(String.format("Protobuf error: %s", ex.getMessage()))
          .build();
    }
      
    messages.addAll(deviceController.getQueuedGprsMessagesForController(controller));
    deviceController.clearGprsMessagesForController(controller);

    return Response.ok(String.join(" ", messages)).build();
  }
}
