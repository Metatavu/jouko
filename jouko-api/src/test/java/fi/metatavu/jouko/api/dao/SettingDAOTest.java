package fi.metatavu.jouko.api.dao;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

public class SettingDAOTest {
    private SettingDAO settingDAO;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(SettingDAOTest.class);

    @Before
    public void setUp() {
        settingDAO = Mockito.mock(SettingDAO.class);
    }

    /**
     * Search for a setting by key but not found
     */
    @Test
    public void testSearchSettingNotFound() {
        Mockito.when(settingDAO.findByKey("key")).thenReturn(null);
        Assert.assertNull(settingDAO.findByKey("key"));
        logger.debug("Setting not found by key works");
    }
}
