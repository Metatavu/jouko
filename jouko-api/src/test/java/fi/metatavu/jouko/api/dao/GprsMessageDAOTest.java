package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class GprsMessageDAOTest {
    GprsMessageDAO gprsMessageDAO;

    @Before
    public void setUp() {
        gprsMessageDAO = Mockito.mock(GprsMessageDAO.class);
    }

    /**
     * Create a new Gprs message (ControllerEntity controller, long deviceId, String content, MessageType messageType)
     */
    @Test
    public void createGprsMessage() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        MessageType messageType = MessageType.NEW_INTERRUPTION;

        GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
        Mockito.when(gprsMessageDAO.findById(1L)).thenReturn(gprsMessage);
        Assert.assertEquals(gprsMessage, gprsMessageDAO.findById(1L));
        System.out.println("Gprs message created (New interruption)");
    }

    /**
     * Find a gprs message by controller (ControllerEntity controller, long deviceId)
     */
    @Test
    public void findGprsMessageByController() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        MessageType messageType = MessageType.NEW_INTERRUPTION;

        GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
        Mockito.when(gprsMessageDAO.findOneByController(controller, 1L)).thenReturn(gprsMessage);
        Assert.assertEquals(gprsMessage, gprsMessageDAO.findOneByController(controller, 1L));
        System.out.println("Gprs message found by controller");
    }

    /**
     * If gprs message not found by controller
     */
    @Test
    public void findGprsMessageByControllerNotFound() {
        GprsMessageEntity gprsMessage = gprsMessageDAO.findOneByController(null, 5L);
        Assert.assertNull(gprsMessage);
        System.out.println("Gprs message not found by controller");
    }

    /**
     * Delete a gprs message from a controller (ControllerEntity controller, GprsMessageEntity message)
     */
    @Test
    public void deleteGprsMessage() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        MessageType messageType = MessageType.NEW_INTERRUPTION;

        GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
        Mockito.when(gprsMessageDAO.findById(1L)).thenReturn(gprsMessage);
        Assert.assertEquals(gprsMessage, gprsMessageDAO.findById(1L));
        gprsMessageDAO.delete(gprsMessage);
        Assert.assertNull(gprsMessageDAO.findById(1L));
        System.out.println("Gprs message deleted (New interruption)");
    }

    /**
     * Create a gprs message using a different message type (ControllerEntity controller, long deviceId, String content, MessageType messageType)
     */
    @Test
    public void createGprsMessageWithDifferentMessageType() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        MessageType messageType = MessageType.CANCEL_INTERRUPTION;

        GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
        Mockito.when(gprsMessageDAO.findById(1L)).thenReturn(gprsMessage);
        Assert.assertEquals(gprsMessage, gprsMessageDAO.findById(1L));
        System.out.println("Gprs message created (Cancel interruption)");
    }

    /**
     * Clear a controller's gprs messages (ControllerEntity controller)
     */
    @Test
    public void clearGprsMessages() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        MessageType messageType = MessageType.NEW_INTERRUPTION;

        GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
        Mockito.when(gprsMessageDAO.findById(1L)).thenReturn(gprsMessage);
        Assert.assertEquals(gprsMessage, gprsMessageDAO.findById(1L));
        gprsMessageDAO.clearControllerMessages(controller);
        Assert.assertNull(gprsMessageDAO.findById(1L));
        System.out.println("Gprs messages cleared from a controller");
    }

    /**
     * Clear all Gprs messages (
     */
    @Test
    public void clearAllGprsMessages() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        MessageType messageType = MessageType.NEW_INTERRUPTION;

        GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
        Mockito.when(gprsMessageDAO.findById(1L)).thenReturn(gprsMessage);
        Assert.assertEquals(gprsMessage, gprsMessageDAO.findById(1L));
        gprsMessageDAO.clear();
        Assert.assertNull(gprsMessageDAO.findById(1L));
        System.out.println("All Gprs messages cleared");
    }
}
