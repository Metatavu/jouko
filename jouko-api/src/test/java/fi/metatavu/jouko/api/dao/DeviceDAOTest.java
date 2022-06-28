package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;

public class DeviceDAOTest {
    DeviceDAO deviceDAO;
    InterruptionDAO interruptionDAO;

    @Before
    public void setUp() {
        deviceDAO = Mockito.mock(DeviceDAO.class);
    }

    /**
     * Create a new device
     */
    @Test
    public void testCreateDevice() {
        UserEntity user = new UserEntity(
                1L,
                "keycloakId",
                "name"
        );
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        Mockito.when(deviceDAO.create(controller, "Device", user)).thenReturn(device);
        Assert.assertEquals(device, deviceDAO.create(controller, "Device", user));
        System.out.println("Device created");
    }

    /**
     * List devices by user (UserEntity user, int firstResult, int maxResults)
     */
    @Test
    public void testListDevicesByUser() {
        UserEntity user = new UserEntity(
                1L,
                "keycloakId",
                "name"
        );
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        Mockito.when(deviceDAO.listByUser(user, 0, 10)).thenReturn(Arrays.asList(device));
        Assert.assertEquals(Arrays.asList(device), deviceDAO.listByUser(user, 0, 10));
        System.out.println("Devices found by user");
    }
}
