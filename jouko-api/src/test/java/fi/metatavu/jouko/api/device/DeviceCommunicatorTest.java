package fi.metatavu.jouko.api.device;

import java.time.Clock;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import fi.metatavu.jouko.api.DeviceController;
import fi.metatavu.jouko.api.SettingController;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.InterruptionEntity;
import fi.metatavu.jouko.api.model.InterruptionGroupEntity;

public class DeviceCommunicatorTest {
    
  DeviceController deviceController;
  SettingController settingController;
  private List<String> postResults;
  DeviceCommunicator subject;
  
  @Before
  public void setUp() {
    deviceController = Mockito.mock(DeviceController.class);
    settingController = Mockito.mock(SettingController.class);
    postResults = new ArrayList<>();

    Mockito.when(settingController.getSetting("deviceCommunicator.endpoint"))
           .thenReturn("http://jouko.test/");

    Mockito.when(settingController.getSetting("deviceCommunicator.asId"))
           .thenReturn("as");

    Mockito.when(settingController.getSetting("deviceCommunicator.enabled"))
           .thenReturn("true");

    subject = new DeviceCommunicator(
        deviceController,
        settingController,
        Clock.fixed(Instant.EPOCH, ZoneOffset.UTC),
        (String postResult) -> {
          postResults.add(postResult);
          return "<html><body>Request queued by LRC</body></html>";
        }
    );
  }
  
  @Test
  public void testNotifySingleDeviceInterruption() {
    ControllerEntity controller = new ControllerEntity(1l, "EUI", "KEY");
    
    DeviceEntity device = new DeviceEntity(1l, "Device", null, controller);
    
    InterruptionGroupEntity group = new InterruptionGroupEntity(
        1l,
        OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
        OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
    
    InterruptionEntity interruption = new InterruptionEntity(1l, device, group, false, null);
    
    Mockito.when(deviceController.listByInterruption(Mockito.any()))
           .thenReturn(Arrays.asList(device));
    
    subject.notifyInterruption(interruption);
    
    String expectedPost = "http://jouko.test/?DevEUI=EUI"
                        + "&FPort=1"
                        + "&Payload=010a0a0a08080301100301180300206402"
                        + "&AS_ID=as"
                        + "&Time=1970-01-01T00:00:00Z"
                        + "&Token=b71383488144fe4e7418f2aeaf30d675ae91b953007978df9a6ee12c4a2d2ae8";

    Assert.assertEquals(postResults.size(), 1);
    Assert.assertEquals(postResults.get(0), expectedPost);
  }
  
  @Test
  public void testNotifySingleDeviceInterruptionCancellation() {
    ControllerEntity controller = new ControllerEntity(1l, "EUI", "KEY");
    
    DeviceEntity device = new DeviceEntity(1l, "Device", null, controller);
    
    InterruptionGroupEntity group = new InterruptionGroupEntity(
        1l,
        OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
        OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
    
    InterruptionEntity interruption = new InterruptionEntity(1l, device, group, false, null);
    
    Mockito.when(deviceController.listByInterruption(Mockito.any()))
           .thenReturn(Arrays.asList(device));
    
    subject.notifyInterruptionCancellation(interruption);
    
    String expectedPost = "http://jouko.test/?DevEUI=EUI"
                        + "&FPort=1"
                        + "&Payload=0112040a030208030102"
                        + "&AS_ID=as"
                        + "&Time=1970-01-01T00:00:00Z"
                        + "&Token=a2bef1536660afe6df263c79d51bcdaebc964d53bd9f2feb6260eb90bf8be8fd";

    Assert.assertEquals(postResults.size(), 1);
    Assert.assertEquals(postResults.get(0), expectedPost);
  }

}
