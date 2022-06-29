package fi.metatavu.jouko.api.dao;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

import fi.metatavu.jouko.api.model.InterruptionGroupEntity;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class InterruptionGroupDAOTest {
    private InterruptionGroupDAO interruptionGroupDAO;
    private InterruptionGroupEntity interruptionGroupEntity;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(InterruptionGroupDAOTest.class);

    @Before
    public void setUp() {
        interruptionGroupDAO = Mockito.mock(InterruptionGroupDAO.class);

    }

    /**
     * Create a new interruption group
     */
    @Test
    public void testCreateInterruptionGroup() {
        InterruptionGroupEntity group = new InterruptionGroupEntity(
                1L,
                OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
                OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));

        // Check that interruption group exists
        Mockito.when(interruptionGroupDAO.findById(1L)).thenReturn(group);
        Assert.assertEquals(group, interruptionGroupDAO.findById(1L));
        logger.info("Interruption group created by id");
    }

    /**
     * Update interruption group manually
     */
    @Test
    public void testUpdateInterruptionGroup() {
        InterruptionGroupEntity group = new InterruptionGroupEntity(
                1L,
                OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
                OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));

        /**
         * Check that interruption group exists
         */
        Mockito.when(interruptionGroupDAO.findById(1L)).thenReturn(group);
        Assert.assertEquals(group, interruptionGroupDAO.findById(1L));

        /**
         * Update interruption group
         */
        OffsetDateTime startTimeUpdated = OffsetDateTime.ofInstant(Instant.ofEpochSecond(200), ZoneOffset.UTC);
        OffsetDateTime endTimeUpdated = OffsetDateTime.ofInstant(Instant.ofEpochSecond(300), ZoneOffset.UTC);
        group.setStartTime(startTimeUpdated);
        group.setEndTime(endTimeUpdated);
        Mockito.when(interruptionGroupDAO.update(group, startTimeUpdated, endTimeUpdated)).thenReturn(group);
        Assert.assertEquals(group, interruptionGroupDAO.update(group, startTimeUpdated, endTimeUpdated));
        logger.info("Interruption group updated");
    }

    /**
     * Delete an interruption group
     */
    @Test
    public void testDeleteInterruptionGroup() {
        interruptionGroupDAO.delete(interruptionGroupEntity);
        Mockito.verify(interruptionGroupDAO).delete(interruptionGroupEntity);
        Assert.assertNull(interruptionGroupDAO.findById(1L));
        logger.info("Interruption group deleted");
    }
}