package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class ControllerDAOTest {
    ControllerDAO controllerDAO;

    @Before
    public void setUp() {
        controllerDAO = Mockito.mock(ControllerDAO.class);
        
        // Create a new controller (String eui, String key, ControllerCommunicationChannel, communicationChannel)
        Mockito.when(controllerDAO.create(Mockito.anyString(), Mockito.anyString(), Mockito.any(ControllerCommunicationChannel.class)))
                .thenReturn(new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA));
    }

    // Check that the newly created controller is returned
    @Test
    public void testCreateController() {
        ControllerEntity controller = controllerDAO.create("EUI", "KEY", ControllerCommunicationChannel.LORA);
        Assert.assertEquals("EUI", controller.getEui());
        Assert.assertEquals("KEY", controller.getKey());
        Assert.assertEquals(ControllerCommunicationChannel.LORA, controller.getCommunicationChannel());
    }

    // Check that no controller is returned when there is no controller with the given eui
    @Test
    public void testGetControllerByEui() {
        ControllerEntity controller = controllerDAO.findByEui("EUI2131232132312");
        Assert.assertNull(controller);
    }

    // Test deleting a controller
    @Test
    public void testDeleteController() {
        ControllerEntity controller = controllerDAO.delete(1L);
        controllerDAO.delete(controller);
        Assert.assertNull(controllerDAO.findByEui("EUI"));
    }
}
