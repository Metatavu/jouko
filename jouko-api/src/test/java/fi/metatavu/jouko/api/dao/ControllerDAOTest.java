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

        /**
         * Create a new controller (String eui, String key, ControllerCommunicationChannel, communicationChannel)
         */
        Mockito.when(controllerDAO.create(Mockito.anyString(), Mockito.anyString(), Mockito.any(ControllerCommunicationChannel.class)))
                .thenReturn(new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA));
    }

    /**
     * Create a new controller and make sure it exists
     */
    @Test
    public void testCreateController() {
        ControllerEntity controller = controllerDAO.create("EUI", "KEY", ControllerCommunicationChannel.LORA);
        Assert.assertEquals("EUI", controller.getEui());
        Assert.assertEquals("KEY", controller.getKey());
        Assert.assertEquals(ControllerCommunicationChannel.LORA, controller.getCommunicationChannel());
        System.out.println("Controller created");
    }

    /**
     * Check that if a controller doesn't exist then null is returned
     */
    @Test
    public void testGetControllerByEui() {
        ControllerEntity controller = controllerDAO.findByEui("EUI2131232132312");
        Assert.assertNull(controller);
        System.out.println("Controller found by EUI");
    }

    /**
     * Test deleting a controller and make sure it doesn't exist
     */
    @Test
    public void testDeleteController() {
        ControllerEntity controller = controllerDAO.delete(1L);
        controllerDAO.delete(controller);
        Assert.assertNull(controllerDAO.findByEui("EUI"));
        System.out.println("Controller deleted");
    }
}
