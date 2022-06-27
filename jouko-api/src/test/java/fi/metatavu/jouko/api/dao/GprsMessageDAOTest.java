package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

// public class GprsMessageDAOTest {
//     GprsMessageDAO gprsMessageDAO;

//     @Before
//     public void setUp() {
//         gprsMessageDAO = Mockito.mock(GprsMessageDAO.class);
//     }

//     /**
//      * Create a new Gprs message (ControllerEntity controller, long deviceId, String content, MessageType messageType)
//      */
//     @Test
//     public void createGprsMessage() {
//         ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);
//         DeviceEntity device = new DeviceEntity(1L, "Device", null, controller);
//         MessageType messageType = MessageType.UNKNOWN;
//         GprsMessageEntity gprsMessage = gprsMessageDAO.create(controller, 1L, "test", messageType);
//         Mockito.when(gprsMessage.getId()).thenReturn(1L);
//         System.out.println("Gprs message created");
//     }
// }
