package fi.metatavu.jouko.api.device;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.client.fluent.Request;
import org.jboss.resteasy.util.Hex;

import fi.metatavu.jouko.api.DeviceController;
import fi.metatavu.jouko.api.SettingController;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkonestot;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkonestot.Katkonesto;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot.Katko;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelle;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.MessageType;

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
  
  public DeviceCommunicator() {
  }
  
  public DeviceCommunicator(
    DeviceController deviceController,
    SettingController settingController,
    Clock clock,
    Function<String, String> doPost
  ) {
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

  private void sendMessageGprs(ViestiLaitteelle message, ControllerEntity controller, MessageType messageType) {
    byte[] payloadBytes = encodeMessage(message);
    System.out.println(new String(payloadBytes, StandardCharsets.UTF_8));
    deviceController.queueGprsMessage(controller, new String(payloadBytes, StandardCharsets.UTF_8), messageType);
  }
  
  private void sendMessageLora(ViestiLaitteelle message, ControllerEntity controller) {
    byte[] payloadBytes = encodeMessage(message);
    
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
    
    String response = doPost.apply(url.toString());
    if (!"<html><body>Request queued by LRC</body></html>".equals(response)) {
      // Maybe check status code instead, IF none of the errors are 200
      throw new DeviceCommunicationException(response);
    }
  }

  private byte[] encodeMessage(ViestiLaitteelle message) {
    ByteArrayOutputStream payloadBytes = new ByteArrayOutputStream();
    byte[] base64 = Base64.encodeBase64(message.toByteArray());
    payloadBytes.write(Character.codePointAt("{", 0));
    payloadBytes.write(base64, 0, base64.length);
    payloadBytes.write(Character.codePointAt("}", 0));
    return payloadBytes.toByteArray();
  }
  
  private boolean isEnabled() {
    return true;
    //String enabledSetting = settingController.getSetting(ENABLED_SETTING, "false");
    //return "true".equals(enabledSetting);
  }

  private void sendMessage(ViestiLaitteelle viestiLaitteelle, ControllerEntity controller, MessageType messageType) {
    switch (controller.getCommunicationChannel()) {
    case LORA:
      sendMessageLora(viestiLaitteelle, controller);
    case GPRS:
      sendMessageGprs(viestiLaitteelle, controller, messageType);
    }
  }
  
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
      
      sendMessage(viestiLaitteelle, controller, messageType);
    }
  }

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
      
      sendMessage(viestiLaitteelle, controller, messageType);
    }
  }
}
