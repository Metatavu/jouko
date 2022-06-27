package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.UserEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class DeviceDAOTest {
    DeviceDAO deviceDAO;

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
}
