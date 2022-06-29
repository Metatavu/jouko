package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

public class ControllerDAOTest {
    private ControllerDAO controllerDAO;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(ControllerDAOTest.class);
    

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
        logger.info("Controller created");
    }

    /**
     * Check that if a controller doesn't exist then null is returned
     */
    @Test
    public void testGetControllerByEui() {
        ControllerEntity controller = controllerDAO.findByEui("EUI2131232132312");
        Assert.assertNull(controller);
        logger.info("Controller found by EUI");
    }

    /**
     * Test deleting a controller and make sure it doesn't exist
     */
    @Test
    public void testDeleteController() {
        ControllerEntity controller = controllerDAO.create("EUI", "KEY", ControllerCommunicationChannel.LORA);
        controllerDAO.delete(controller);
        Assert.assertNull(controllerDAO.findByEui("EUI"));
        logger.info("Controller deleted");
    }

    /**
     * Find a controller by EUI and key and make sure it exists
     */
    @Test
    public void testGetControllerByEuiAndKey() {
        ControllerEntity controller = controllerDAO.create("EUI", "KEY", ControllerCommunicationChannel.LORA);
        Mockito.when(controllerDAO.findByEuiAndKey("EUI", "KEY")).thenReturn(controller);
        Assert.assertEquals(controller, controllerDAO.findByEuiAndKey("EUI", "KEY"));
        logger.info("Controller found by EUI and KEY");
    }
}
