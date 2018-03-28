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

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.client.fluent.Request;
import org.jboss.resteasy.util.Hex;

import fi.metatavu.jouko.api.DeviceController;
import fi.metatavu.jouko.api.SettingController;
import fi.metatavu.jouko.api.dao.DeviceDAO;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkonestot;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkonestot.Katkonesto;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot;
import fi.metatavu.jouko.api.device.Laiteviestit.Katkot.Katko;
import fi.metatavu.jouko.api.device.Laiteviestit.ViestiLaitteelle;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;

public class DeviceCommunicator {
  
  private static String ENDPOINT_SETTING = "deviceCommunicator.endpoint";
  private static String AS_ID_SETTING = "deviceCommunicator.asId";

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
  
  private void sendMessage(ViestiLaitteelle message, String eui, String key) {
    byte[] payloadBytes = encodeMessage(message);
    
    StringBuilder qsNoToken = new StringBuilder();
    qsNoToken.append("DevEUI=");
    qsNoToken.append(eui);
    qsNoToken.append("&FPort=1");
    qsNoToken.append("&Payload=");
    qsNoToken.append(Hex.encodeHex(payloadBytes));
    qsNoToken.append("&AS_ID=");
    qsNoToken.append(settingController.getSetting(AS_ID_SETTING));
    qsNoToken.append("&Time=");
    qsNoToken.append(clock.instant().toString());
    
    String tokenSource = qsNoToken.toString() + key;
    String token = DigestUtils.sha256Hex(tokenSource.getBytes(StandardCharsets.UTF_8));
    
    StringBuilder url = new StringBuilder();
    url.append(settingController.getSetting(ENDPOINT_SETTING));
    url.append("?");
    url.append(qsNoToken);
    url.append("&Token=");
    url.append(token);
    
    String response = doPost.apply(url.toString());
    if (!"Request queued by LRC".equals(response)) {
      // Maybe check status code instead, IF none of the errors are 200
      throw new DeviceCommunicationException(response);
    }
  }

  private byte[] encodeMessage(ViestiLaitteelle message) {
    ByteArrayOutputStream payloadBytes = new ByteArrayOutputStream();
    payloadBytes.write(0x01); // start data frame
    for (byte escaped : new ByteEscaper(message.toByteArray())) {
      payloadBytes.write(escaped);
    }
    payloadBytes.write(0x02); // end frame
    return payloadBytes.toByteArray();
  }
  
  public void notifyInterruption(InterruptionEntity interruption) {
    List<DeviceEntity> devices = deviceController.listByInterruption(interruption);
    Map<String, List<Katko>> katkos = new HashMap<>();
    Map<String, String> keys = new HashMap<>();
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
      keys.put(controller.getEui(), controller.getKey());
    }
    
    for (Entry<String, List<Katko>> entry : katkos.entrySet()) {
      ViestiLaitteelle viestiLaitteelle = ViestiLaitteelle.newBuilder()
          .setKatkot(Katkot.newBuilder()
                           .addAllKatkot(entry.getValue())
                           .build())
          .build();
      sendMessage(viestiLaitteelle, entry.getKey(), keys.get(entry.getKey()));
    }
  }

  public void notifyInterruptionCancellation(InterruptionEntity interruption) {
    List<DeviceEntity> devices = deviceController.listByInterruption(interruption);
    Map<String, List<Katkonesto>> katkonestos = new HashMap<>();
    Map<String, String> keys = new HashMap<>();
    for (DeviceEntity device : devices) {
      ControllerEntity controller = device.getController();
      
      long katkoID = interruption.getId();
      
      katkonestos.putIfAbsent(controller.getEui(), new ArrayList<Katkonesto>());
      katkonestos.get(controller.getEui()).add(Katkonesto.newBuilder()
                                               .setKatkoID(katkoID)
                                               .build());
      keys.put(controller.getEui(), controller.getKey());
    }
    
    for (Entry<String, List<Katkonesto>> entry : katkonestos.entrySet()) {
      ViestiLaitteelle viestiLaitteelle = ViestiLaitteelle.newBuilder()
          .setKatkonestot(Katkonestot.newBuilder()
                           .addAllKatkonestot(entry.getValue())
                           .build())
          .build();
      sendMessage(viestiLaitteelle, entry.getKey(), keys.get(entry.getKey()));
    }
  }
}
