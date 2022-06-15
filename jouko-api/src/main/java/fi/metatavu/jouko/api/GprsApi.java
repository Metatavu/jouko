package fi.metatavu.jouko.api;

import java.nio.charset.StandardCharsets;
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
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.protobuf.InvalidProtocolBufferException;

import fi.metatavu.jouko.api.device.DeviceCommunicator;
import fi.metatavu.jouko.api.device.Laiteviestit.AikasynkLaitteelle;
import fi.metatavu.jouko.api.device.Laiteviestit.AikasynkLaitteelta;
import fi.metatavu.jouko.api.device.Laiteviestit.Mittaukset;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelle;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelta;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.GprsMessageEntity;
import fi.metatavu.jouko.api.model.MeasurementType;

@Stateless
@Path("/gprs")
// TODO rename
public class GprsApi {
  
  @Inject
  private Logger logger;
  
  @Inject
  private DeviceController deviceController;
  
  @Inject
  private DeviceCommunicator deviceCommunicator;
  
  @Context
  private HttpServletRequest request;
  
  private static final Pattern MESSAGE_PATTERN = Pattern.compile("\\{([^}]*)\\}");
  
  private static class InvalidDeviceException extends Exception {
    public InvalidDeviceException(String msg) {
      super(msg);
    }
    
    private static final long serialVersionUID = 8322806559664622171L;
  }
  
  private static class Envelope {
    private DevEuiUplink devEuiUplink;

    @JsonProperty("DevEUI_uplink")
    public DevEuiUplink getDevEuiUplink() {
      return devEuiUplink;
    }

    @JsonProperty("DevEUI_uplink")
    public void setDevEuiUplink(DevEuiUplink devEuiUplink) {
      this.devEuiUplink = devEuiUplink;
    }
  }
  
  @JsonIgnoreProperties(ignoreUnknown=true)
  private static class DevEuiUplink {
    private String customerId;
    private String devEui;
    private int fPort;
    private int fCntUp;
    private String payloadHex;

    @JsonProperty("CustomerID")
    public String getCustomerId() {
      return customerId;
    }

    @JsonProperty("CustomerID")
    public void setCustomerId(String customerId) {
      this.customerId = customerId;
    }

    @JsonProperty("DevEUI")
    public String getDevEui() {
      return devEui;
    }

    @JsonProperty("DevEUI")
    public void setDevEui(String devEui) {
      this.devEui = devEui;
    }
    
    @JsonProperty("FPort")
    public int getFPort() {
      return fPort;
    }
    
    @JsonProperty("FPort")
    public void setFPort(int fPort) {
      this.fPort = fPort;
    }

    @JsonProperty("FCntUp")
    public int getFCntUp() {
      return fCntUp;
    }

    @JsonProperty("FCntUp")
    public void setFCntUp(int fCntUp) {
      this.fCntUp = fCntUp;
    }

    @JsonProperty("payload_hex")
    public String getPayloadHex() {
      return payloadHex;
    }

    @JsonProperty("payload_hex")
    public void setPayloadHex(String payloadHex) {
      this.payloadHex = payloadHex;
    }
  }

  /**
   * @POST
   * @Path("/lora/")
   * Creates API path to communicate with Lora device
   */
  @POST
  @Path("/lora/")
  public Response communicateWithLoraDevice(
    Envelope envelope,
    @QueryParam("AS_ID") String asId,
    @QueryParam("LrnDevEui") String lrnDevEui,
    @QueryParam("LrnFPort") String lrnFPort,
    @QueryParam("LrnInfos") String lrnInfos,
    @QueryParam("Time") String time,
    @QueryParam("Token") String token
  ) {
    DevEuiUplink uplink = envelope.getDevEuiUplink();
    String payloadHex = uplink.getPayloadHex();
    String message;
    try {
      // Decode payload hex to string
      message = new String(Hex.decodeHex(payloadHex.toCharArray()),
                                  StandardCharsets.US_ASCII);
    } catch (DecoderException e) {
      logger.error("Invalid hex string: {}", payloadHex);
      return Response.status(400).entity("Invalid hex string").build();
    }
    String bodyParameters = String.format("%s%s%d%d%s",
        uplink.getCustomerId(),
        uplink.getDevEui(),
        uplink.getFPort(),
        uplink.getFCntUp(),
        uplink.getPayloadHex());
    String queryParameters = String.format(
        "LrnDevEui=%s&LrnFPort=%s&LrnInfos=%s&AS_ID=%s&Time=%s",
         lrnDevEui,   lrnFPort,   lrnInfos,   asId,    time);
    
    String hashedStringNoKey = bodyParameters + queryParameters;
    
    ControllerEntity controller = deviceController.findControllerByEui(uplink.getDevEui());
    logger.info("Eui: {}", uplink.getDevEui());
    logger.info("Controller: {}", controller);
    if (controller == null) {
      return Response.status(Status.BAD_REQUEST).entity("Controller not found").build();
    }

    String hashedStringKey = hashedStringNoKey + controller.getKey();
    // Create a hash using SHA-256 algorithm
    String hash = DigestUtils.sha256Hex(hashedStringKey.getBytes(StandardCharsets.UTF_8));
    logger.info("kellonaika: {}", time);
    logger.info("hash: {}", hash);
    logger.info("token: {}", token);
    
    if (!Objects.equals(hash, token)) {
      return Response.status(Status.BAD_REQUEST).entity("Bad token").build();
    }

    Matcher messageMatcher = MESSAGE_PATTERN.matcher(message);
    deviceCommunicator.notifyTimeSync(messageMatcher, controller);
    
    Matcher messageMatcher2 = MESSAGE_PATTERN.matcher(message);
    List<String> messages = new ArrayList<>();
    
    long deviceId = -1;
    
    GprsMessageEntity oldestMessage = deviceController.getQueuedGprsMessageForController(controller, deviceId);
    if (oldestMessage != null) {
      deviceCommunicator.sendLoraMessageFromQueue(oldestMessage.getContent(), controller);
      System.out.println("PÄIVITYS VIESTI LÄHETETTY");
      deviceController.deleteGprsMessageFromController(controller, oldestMessage);
      System.out.println("PÄIVITYS VIESTI POISTETTU");
    }
    
    while (messageMatcher2.find()) {
      System.out.println("WHILE MESSAGEMATCHER FIND");
      String base64 = messageMatcher2.group(1);
      byte[] bytes = Base64.decodeBase64(base64);
      
      try {
        ViestiLaitteelta viestiLaitteelta = ViestiLaitteelta.parseFrom(bytes);
        if (viestiLaitteelta.hasMittaukset()) {
          System.out.println("HAS MITTAUKSET");
          Mittaukset mittaukset = viestiLaitteelta.getMittaukset();
          deviceId = mittaukset.getLaiteID();
          unpackMittaukset(mittaukset);
          System.out.println("MITTAUKSET UNPACKATTU!");
        }
      } catch (InvalidProtocolBufferException | InvalidDeviceException ex) {
        return Response
            .status(400)
            .entity(String.format("Protobuf error: %s", ex.getMessage()))
            .build();
      }
    }

    return Response.ok().build();
  }

  /**
    @POST
    @Path("/gprs/{eui}")
    Creates API path for GPRS device communication
  */
  @POST
  @Path("/gprs/{eui}")
  public Response communicateWithGprsDevice(@PathParam("eui") String eui, String content) {
    // TODO basic auth using eui/key
    
    ControllerEntity controller = deviceController.findControllerByEui(eui);
    if (controller == null) {
      return Response.status(Status.NOT_FOUND)
                     .entity("No device with eui")
                     .build();
    }
    
    Matcher messageMatcher = MESSAGE_PATTERN.matcher(content);
    List<String> messages = new ArrayList<>();
    long deviceId = -1;
    
    while (messageMatcher.find()) {
      String base64 = messageMatcher.group(1);
      // Decode base64 to bytes
      byte[] bytes = Base64.decodeBase64(base64);
     
      try {
        ViestiLaitteelta viestiLaitteelta = ViestiLaitteelta.parseFrom(bytes);
        if (viestiLaitteelta.hasMittaukset()) {
          Mittaukset mittaukset = viestiLaitteelta.getMittaukset();
          deviceId = mittaukset.getLaiteID();
          unpackMittaukset(mittaukset);
        } else {
          unpackAikasync(viestiLaitteelta, messages);
        }
      } catch (InvalidProtocolBufferException | InvalidDeviceException ex) {
        return Response
            .status(400)
            .entity(String.format("Protobuf error: %s", ex.getMessage()))
            .build();
      }
    }
    
    // If messages is empty we want to add messages from db
    // If it's not empty we have timesync message there and we only want to respond that 
    if (messages.isEmpty()) {
      GprsMessageEntity oldestMessage = deviceController.getQueuedGprsMessageForController(controller, deviceId);
      if (oldestMessage != null) {
        messages.add(oldestMessage.getContent());
        deviceController.deleteGprsMessageFromController(controller, oldestMessage);
      }
    } 

    return Response.ok(String.join(" ", messages)).build();
  }
  
  private void unpackMittaukset(Mittaukset mittaukset) throws InvalidDeviceException {
    long deviceId = mittaukset.getLaiteID();
    
    DeviceEntity device = deviceController.findById(deviceId);
    if (device == null) {
      logger.error("Invalid device ID: {}", deviceId);
      throw new InvalidDeviceException(String.format("Invalid device ID: %s", deviceId));
    }

    Instant endTime = Instant.ofEpochSecond(mittaukset.getAika());
    long measurementLength = mittaukset.getPituusMinuutteina();
    
    if (measurementLength == 0) {
      measurementLength = 5;
    }
    int numMeasurements = mittaukset.getKeskiarvotCount();

    Instant time = endTime.minus((numMeasurements / 3 ) * measurementLength, ChronoUnit.MINUTES);
    
    int phaseNumber = 0;
    boolean relayIsOpen = !mittaukset.hasReleOhjaukset();
    
    for (int average : mittaukset.getKeskiarvotList()) {
      deviceController.addPowerMeasurement(
          device,
          (double)average,
          MeasurementType.AVERAGE,
          time.atOffset(ZoneOffset.UTC),
          time.plus(measurementLength, ChronoUnit.MINUTES).atOffset(ZoneOffset.UTC),
          (phaseNumber++ % 3) + 1,
          relayIsOpen
      );
      if ((phaseNumber % 3) == 0) {
        time = time.plus(measurementLength, ChronoUnit.MINUTES);
      }
    }
  }


  private void unpackAikasync(ViestiLaitteelta viestiLaitteelta, List<String> messages) throws InvalidProtocolBufferException  {
    if (viestiLaitteelta.hasAikasynkLaitteelta()) {
      AikasynkLaitteelta sync = viestiLaitteelta.getAikasynkLaitteelta();
      long deviceTime = sync.getLaiteaika();
      long myTime = Instant.now().getEpochSecond() * 1000;
      
      ViestiLaitteelle replyMessage = ViestiLaitteelle
          .newBuilder()
          .setAikasynkLaitteelle(
              AikasynkLaitteelle.newBuilder()
                .setErotus(myTime - deviceTime)
                .build())
          .build();
      
      String replyMessageString = String.format("{%s}",
          // Encode message to base64 string and replyMessage to byte array before base64 encoding
          Base64.encodeBase64String(replyMessage.toByteArray()));
      
      // If we end up here, we only want to send timesync message
      messages.clear();
      messages.add(replyMessageString);
    }
  }
}
