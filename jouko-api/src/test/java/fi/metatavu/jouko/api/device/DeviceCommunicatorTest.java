package fi.metatavu.jouko.api.device;

import fi.metatavu.jouko.api.DeviceController;
import fi.metatavu.jouko.api.SettingController;
import fi.metatavu.jouko.api.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.time.Clock;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    Mockito.when(settingController.getSetting("deviceCommunicator.enabled", "false"))
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

  /**
   * Test interruption notification for single device
   */
  @Test
  public void testNotifySingleDeviceInterruption() {
    ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);

    DeviceEntity device = new DeviceEntity(1L, "Device", null, controller);

    InterruptionGroupEntity group = new InterruptionGroupEntity(
            1L,
            OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
            OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));

    InterruptionEntity interruption = new InterruptionEntity(1L, device, group, false, null);

    Mockito.when(deviceController.listByInterruption(Mockito.any()))
            .thenReturn(Arrays.asList(device));

    subject.notifyInterruption(interruption);

    String expectedPost = "http://jouko.test/?DevEUI=EUI"
            + "&FPort=1"
            + "&Payload=7b43676f4b43416742454145594143426b7d"
            + "&AS_ID=as"
            + "&Time=1970-01-01T00:00:00Z"
            + "&Token=5b89dcabdeadcd07a523a6a26f94c951a4bc8b14947e30a048615010a4d3f034";

    Assert.assertEquals(1, postResults.size());
    Assert.assertEquals(expectedPost, postResults.get(0));
  }

  /**
   * Test interruption notification cancellation for single device.
   */
  @Test
  public void testNotifySingleDeviceInterruptionCancellation() {
    ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);

    DeviceEntity device = new DeviceEntity(1L, "Device", null, controller);

    InterruptionGroupEntity group = new InterruptionGroupEntity(
            1L,
            OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
            OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));

    InterruptionEntity interruption = new InterruptionEntity(1l, device, group, false, null);

    Mockito.when(deviceController.listByInterruption(Mockito.any()))
            .thenReturn(Arrays.asList(device));

    subject.notifyInterruptionCancellation(interruption);

    String expectedPost = "http://jouko.test/?DevEUI=EUI"
            + "&FPort=1"
            + "&Payload=7b4567514b416767427d"
            + "&AS_ID=as"
            + "&Time=1970-01-01T00:00:00Z"
            + "&Token=31c171ca123ce8cf905ab83e4a9aad2f6190f3cdcb73b63714ea18eae2402d5f";

    Assert.assertEquals(1, postResults.size());
    Assert.assertEquals(expectedPost, postResults.get(0));
  }

  /**
   * Test that when device is not found, no request is sent
   */
  @Test
  public void testNotifySingleDeviceInterruptionDeviceNotFound() {
    ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);

    DeviceEntity device = new DeviceEntity(1L, "Device", null, controller);

    InterruptionGroupEntity group = new InterruptionGroupEntity(
            1L,
            OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
            OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));

    InterruptionEntity interruption = new InterruptionEntity(1L, device, group, false, null);

    Mockito.when(deviceController.listByInterruption(Mockito.any()))
            .thenReturn(Arrays.asList());

    subject.notifyInterruption(interruption);

    Assert.assertEquals(0, postResults.size());
  }
}