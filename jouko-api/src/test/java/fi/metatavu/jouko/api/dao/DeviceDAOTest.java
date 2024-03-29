package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

import java.util.Arrays;

public class DeviceDAOTest {
    private DeviceDAO deviceDAO;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(DeviceDAOTest.class);

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
        logger.debug("Device created");
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
        logger.debug("Devices found by user");
    }
}
