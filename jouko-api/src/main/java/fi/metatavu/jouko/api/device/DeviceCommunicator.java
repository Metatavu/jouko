package fi.metatavu.jouko.api.device;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.regex.Matcher;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.client.fluent.Request;
import org.jboss.resteasy.util.Hex;
import org.slf4j.Logger;

import com.google.protobuf.InvalidProtocolBufferException;

import fi.metatavu.jouko.api.DeviceController;
import fi.metatavu.jouko.api.SettingController;
import fi.metatavu.jouko.api.device.Laiteviestit.AikasynkLaitteelle;
import fi.metatavu.jouko.api.device.Laiteviestit.AikasynkLaitteelta;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkonestot;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkonestot.Katkonesto;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot.Katko;
import fi.metatavu.jouko.api.device.Laiteviestit.SbUpdateStart;
import fi.metatavu.jouko.api.device.Laiteviestit.SbUpdateStop;
import fi.metatavu.jouko.api.device.Laiteviestit.SbUpdatePart;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelle;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelta;
import fi.metatavu.jouko.api.files.FilePart;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.MessageType;

/**
 * File handles communication with the device
 */
public class DeviceCommunicator {
  
  private static String ENDPOINT_SETTING = "deviceCommunicator.endpoint";
  private static String AS_ID_SETTING = "deviceCommunicator.asId";
  private static String ENABLED_SETTING = "deviceCommunicator.enabled";

  private Clock clock;
  private Function<String, String> doPost;
  
  @Inject
  private DeviceController deviceController;
  
  @Inject
  private SettingController settingController;

  @Inject
  private static final Logger logger = org.slf4j.LoggerFactory.getLogger(DeviceCommunicator.class);
  
  public DeviceCommunicator() {
  }
  
  public DeviceCommunicator(DeviceController deviceController, SettingController settingController, Clock clock, Function<String, String> doPost) {
    this.deviceController = deviceController;
    this.settingController = settingController;
    this.clock = clock;
    this.doPost = doPost;
  }
  
  @PostConstruct
  public void init() {
    clock = Clock.systemUTC();
    doPost = this::doPostFunc;
  }

  /**
   * Deals with doing a POST request
   *
   * @param url to send the request to
   * @return successfully message was sent
   * @throws DeviceCommunicationException if was unable to process the request
   */
  private String doPostFunc(String url) {
    try {
      return Request.Post(url.toString())
                             .execute()
                             .returnContent()
                             .asString(StandardCharsets.UTF_8);
    } catch (IOException e) {
      throw new DeviceCommunicationException("Couldn't send request", e);
    }
  }

  /**
   * Sends the Gprs message
   *
   * @param message to send
   * @param controller to send to
   * @param messageType that is being sent
   */
  private void sendMessageGprs(ViestiLaitteelle message, ControllerEntity controller, MessageType messageType) {
    byte[] payloadBytes = encodeMessage(message);
    long deviceId = -1;
    
    if (message.hasKatkot()) {
      deviceId = message.getKatkot().getKatkotList().get(0).getLaiteID();
    }
    
    logger.debug(new String(payloadBytes, StandardCharsets.UTF_8));
    deviceController.queueGprsMessage(controller, deviceId, new String(payloadBytes, StandardCharsets.UTF_8), messageType);
  }

  /**
   * Sends message to Lora
   *
   * @param encodedMessage of the message
   * @param message that is being sent and encodes it if not
   * @param controller to send to
   */
  private void sendMessageLora(String encodedMessage, ViestiLaitteelle message, ControllerEntity controller) {
    byte[] payloadBytes = null;
    
    if (encodedMessage != null) {
      payloadBytes = encodedMessage.getBytes();
    } else {
      payloadBytes = encodeMessage(message); 
    }
    
    StringBuilder qsNoToken = new StringBuilder();
    qsNoToken.append("DevEUI=");
    qsNoToken.append(controller.getEui());
    qsNoToken.append("&FPort=1");
    qsNoToken.append("&Payload=");
    qsNoToken.append(Hex.encodeHex(payloadBytes));
    qsNoToken.append("&AS_ID=");
    qsNoToken.append(settingController.getSetting(AS_ID_SETTING));
    qsNoToken.append("&Time=");
    qsNoToken.append(clock.instant().toString());
    
    String tokenSource = qsNoToken.toString() + controller.getKey();
    String token = DigestUtils.sha256Hex(tokenSource.getBytes(StandardCharsets.UTF_8));
    
    StringBuilder url = new StringBuilder();
    url.append(settingController.getSetting(ENDPOINT_SETTING));
    url.append("?");
    url.append(qsNoToken);
    url.append("&Token=");
    url.append(token);
    
    logger.debug("LÄHTEVÄ LORA VIESTI: " + url.toString());
    String response = doPost.apply(url.toString());
    if (!"<html><body>Request queued by LRC</body></html>".equals(response)) {
      // Maybe check status code instead, IF none of the errors are 200
      throw new DeviceCommunicationException(response);
    }
  }

  /**
   * Queue lora message
   *
   * @param message to send
   * @param controller to send to
   * @param messageType of the message
   */
  private void queueLoraMessage(ViestiLaitteelle message, ControllerEntity controller, MessageType messageType) {
    byte[] payloadBytes = encodeMessage(message);
    long deviceId = -1;
    
    logger.debug(new String(payloadBytes, StandardCharsets.UTF_8));
    deviceController.queueGprsMessage(controller, deviceId, new String(payloadBytes, StandardCharsets.UTF_8), messageType);
  }

  /**
   * Processes the Lora queue and sends a message from it
   *
   * @param message to send
   * @param controller to send to
   */
  public void sendLoraMessageFromQueue(String message, ControllerEntity controller) {
    sendMessageLora(message, null, controller);
  }

  /**
   * Encode the message
   * 
   * @param message to encode
   * @return encoded message
   */
  private byte[] encodeMessage(ViestiLaitteelle message) {
    ByteArrayOutputStream payloadBytes = new ByteArrayOutputStream();
    byte[] base64 = Base64.encodeBase64(message.toByteArray());
    payloadBytes.write(Character.codePointAt("{", 0));
    payloadBytes.write(base64, 0, base64.length);
    payloadBytes.write(Character.codePointAt("}", 0));
    return payloadBytes.toByteArray();
  }

  /**
   * If enabled then true
   *
   * @return true
   */
  private boolean isEnabled() {
    return true;
    //String enabledSetting = settingController.getSetting(ENABLED_SETTING, "false");
    //return "true".equals(enabledSetting);
  }

  /**
   * Sends the message
   *
   * @param encodedMessage to send
   * @param viestiLaitteelle device to send the message to
   * @param controller to send to
   * @param messageType of the message
   */
  private void sendMessage(String encodedMessage, ViestiLaitteelle viestiLaitteelle, ControllerEntity controller, MessageType messageType) {
    switch (controller.getCommunicationChannel()) {
    case LORA:
      sendMessageLora(null, viestiLaitteelle, controller);
    case GPRS:
      sendMessageGprs(viestiLaitteelle, controller, messageType);
    }
  }

  /**
   * Notifies of an update
   *
   * @param fileName of file
   * @param version of update
   * @param fileParts contents of file
   * @param communicationChannel the update is being sent to
   */
  public void notifyUpdate(String fileName, int version, List<FilePart> fileParts, String communicationChannel) {
    List<ControllerEntity> devices = deviceController.listControllerDevices(0, 9999999);
    ViestiLaitteelle viestiLaitteelle = null;
    
    for (ControllerEntity device : devices) {
      switch (device.getCommunicationChannel()) {
        case GPRS:
          if (!communicationChannel.toLowerCase().equals("gprs")) {
            break;
          }
          viestiLaitteelle = ViestiLaitteelle.newBuilder()
              .setSbUpdateStart(SbUpdateStart.newBuilder()
                  .setNumFiles(fileParts.size())
                  .build())
              .build();
          
          sendMessage(null, viestiLaitteelle, device, MessageType.UPDATE_START);
          
          for (FilePart part : fileParts) {
            String content = part.getFilePart();
            
            ViestiLaitteelle viestiLaitteelle2 = ViestiLaitteelle.newBuilder()
                .setSbUpdatePart(SbUpdatePart.newBuilder()
                    .setNum(fileParts.indexOf(part) + 1)
                    .setPart(content)
                    .build())
                .build();
            
            sendMessage(null, viestiLaitteelle2, device, MessageType.UPDATE_PART);
          }
          
          ViestiLaitteelle viestiLaitteelle3 = ViestiLaitteelle.newBuilder()
              .setSbUpdateStop(SbUpdateStop.newBuilder()
                  .setSplitSize(128)
                  .setNumFiles(fileParts.size())
                  .setFileName(fileName)
                  .setVersioNumero(version)
                  .build())
              .build();
          
          sendMessage(null, viestiLaitteelle3, device, MessageType.UPDATE_STOP);
          break;
        case LORA:
          if (!communicationChannel.toLowerCase().equals("lora")) {
            break;
          }
          ViestiLaitteelle loraViestiLaitteelle1 = ViestiLaitteelle.newBuilder()
              .setSbUpdateStart(SbUpdateStart.newBuilder()
                  .setNumFiles(fileParts.size())
                  .build())
              .build();
          
          queueLoraMessage(loraViestiLaitteelle1, device, MessageType.UPDATE_START);
          
          for (FilePart part : fileParts) {
            String content = part.getFilePart();
            
            ViestiLaitteelle loraViestiLaitteelle2 = ViestiLaitteelle.newBuilder()
                .setSbUpdatePart(SbUpdatePart.newBuilder()
                    .setNum(fileParts.indexOf(part) + 1)
                    .setPart(content)
                    .build())
                .build();
            
            queueLoraMessage(loraViestiLaitteelle2, device, MessageType.UPDATE_PART);
          }
          
          ViestiLaitteelle loraViestiLaitteelle3 = ViestiLaitteelle.newBuilder()
              .setSbUpdateStop(SbUpdateStop.newBuilder()
                  .setSplitSize(128)
                  .setNumFiles(fileParts.size())
                  .setFileName(fileName)
                  .setVersioNumero(version)
                  .build())
              .build();
          
          queueLoraMessage(loraViestiLaitteelle3, device, MessageType.UPDATE_STOP);
          break;
      }
    }
  }

  /**
   * Notify of time sync
   *
   * @param messageMatcher
   * @param controller to notify to
   */
  public void notifyTimeSync(Matcher messageMatcher, ControllerEntity controller) {
    while (messageMatcher.find()) {
      String base64 = messageMatcher.group(1);
      byte[] bytes = Base64.decodeBase64(base64);
      ViestiLaitteelta viestiLaitteelta;
      
      try {
        viestiLaitteelta = ViestiLaitteelta.parseFrom(bytes);
        
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
          
          sendMessage(null, replyMessage, controller, MessageType.TIME_SYNC);
        }
      } catch (InvalidProtocolBufferException e) {
        logger.error("Viestin lähetys epäonnistui", e);
      }
    }
  }

  /**
   * Notify about an interruption
   *
   * @param interruption to notify about
   */
  public void notifyInterruption(InterruptionEntity interruption) {
    if (!isEnabled()) {
      return;
    }

    List<DeviceEntity> devices = deviceController.listByInterruption(interruption);
    Map<String, List<Katko>> katkos = new HashMap<>();
    Map<String, ControllerEntity> controllers = new HashMap<>();
    for (DeviceEntity device : devices) {
      ControllerEntity controller = device.getController();
      
      long katkoID = interruption.getId();
      long laiteID = device.getId();
      long alku = interruption.getGroup().getStartTime().toInstant().getEpochSecond();
      long loppu = interruption.getGroup().getEndTime().toInstant().getEpochSecond();
      
      katkos.putIfAbsent(controller.getEui(), new ArrayList<Katko>());
      katkos.get(controller.getEui()).add(Katko.newBuilder()
                                               .setKatkoID(katkoID)
                                               .setLaiteID(laiteID)
                                               .setAlku(alku)
                                               .setLoppu(loppu)
                                               .build());
      controllers.put(controller.getEui(), controller);
    }
    
    for (Entry<String, List<Katko>> entry : katkos.entrySet()) {
      ViestiLaitteelle viestiLaitteelle = ViestiLaitteelle.newBuilder()
          .setKatkot(Katkot.newBuilder()
                           .addAllKatkot(entry.getValue())
                           .build())
          .build();
      ControllerEntity controller = controllers.get(entry.getKey());
      MessageType messageType = MessageType.NEW_INTERRUPTION;
      
      sendMessage(null, viestiLaitteelle, controller, messageType);
    }
  }

  /**
   * Notify that the interruption was cancelled
   *
   * @param interruption that was cancelled
   */
  public void notifyInterruptionCancellation(InterruptionEntity interruption) {
    if (!isEnabled()) {
      return;
    }

    List<DeviceEntity> devices = deviceController.listByInterruption(interruption);
    Map<String, List<Katkonesto>> katkonestos = new HashMap<>();
    Map<String, ControllerEntity> controllers = new HashMap<>();
    for (DeviceEntity device : devices) {
      ControllerEntity controller = device.getController();
      
      long katkoID = interruption.getId();
      
      katkonestos.putIfAbsent(controller.getEui(), new ArrayList<Katkonesto>());
      katkonestos.get(controller.getEui()).add(Katkonesto.newBuilder()
                                               .setKatkoID(katkoID)
                                               .build());
      controllers.put(controller.getEui(), controller);
    }
    
    for (Entry<String, List<Katkonesto>> entry : katkonestos.entrySet()) {
      ViestiLaitteelle viestiLaitteelle = ViestiLaitteelle.newBuilder()
          .setKatkonestot(Katkonestot.newBuilder()
                           .addAllKatkonestot(entry.getValue())
                           .build())
          .build();
      ControllerEntity controller = controllers.get(entry.getKey());
      MessageType messageType = MessageType.CANCEL_INTERRUPTION;
      
      sendMessage(null, viestiLaitteelle, controller, messageType);
    }
  }
}
