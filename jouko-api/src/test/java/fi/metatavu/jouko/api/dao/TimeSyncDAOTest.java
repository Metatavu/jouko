package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.ControllerCommunicationChannel;
import fi.metatavu.jouko.api.model.ControllerEntity;
import fi.metatavu.jouko.api.model.DeviceEntity;
import fi.metatavu.jouko.api.model.TimeSyncEntity;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class TimeSyncDAOTest {
    private TimeSyncDAO timeSyncDAO;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(TimeSyncDAO.class);

    @Before
    public void setUp() {
        timeSyncDAO = Mockito.mock(TimeSyncDAO.class);
    }

    @Test
    public void testCreateTimeSync() {
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.LORA);
        DeviceEntity device = new DeviceEntity(1L, "Device", null, controller);
        TimeSyncEntity timeSync = timeSyncDAO.create(OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), device, 1);
        Assert.assertEquals(timeSync, timeSyncDAO.findById(1L));
        logger.debug("TimeSync created");
    }
}
