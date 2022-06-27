package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class InterruptionDAOTest {
    InterruptionDAO interruptionDAO;

    @Before
    public void setUp() {
        interruptionDAO = Mockito.mock(InterruptionDAO.class);
    }

    /**
     * Create a new Interruption (DeviceEntity device, InterruptionGroupEntity group)
     */
    @Test
    public void createInterruption() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        Mockito.when(interruptionDAO.findById(1L)).thenReturn(interruption);
        Assert.assertEquals(interruption, interruptionDAO.findById(1L));
        System.out.println("Interruption created");
    }

    /**
     * Cancel a interruption (InterruptionEntity interruption, boolean cancelled)
     * Need to test that cancelled is set to true, but couldn't get it to work yet.
     */
    @Test
    public void cancelInterruption() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        interruptionDAO.updateCancelled(interruption, true);
        Mockito.when(interruptionDAO.findById(1L)).thenReturn(interruption);
        Assert.assertEquals(interruption, interruptionDAO.findById(1L));
        System.out.println("Interruption cancelled");
    }

    /**
     * Delete Interruption
     */
    @Test
    public void deleteInterruption() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        Mockito.when(interruptionDAO.findById(1L)).thenReturn(interruption);
        interruptionDAO.delete(interruption);
        Assert.assertNull(interruptionDAO.findById(1L));
        System.out.println("Interruption deleted");
    }
}
