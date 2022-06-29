package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;

public class InterruptionDAOTest {
    private InterruptionDAO interruptionDAO;

    @Before
    public void setUp() {
        interruptionDAO = Mockito.mock(InterruptionDAO.class);
    }

    /**
     * Create a new Interruption (DeviceEntity device, InterruptionGroupEntity group)
     */
    @Test
    public void testCreateInterruption() {
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
     * Update cancellation time to interruption (InterruptionEntity entity, OffsetDateTime cancellationTime)
     */
    @Test
    public void testUpdateCancellationTime() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC));
        InterruptionEntity interruption = new InterruptionEntity(1L, device, group, false, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC));
        interruption.setCancellationTime(OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        Mockito.when(interruptionDAO.findById(1L)).thenReturn(interruption);
        Assert.assertEquals(interruption, interruptionDAO.findById(1L));
        Assert.assertEquals(OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC), interruption.getCancellationTime());
        System.out.println("Cancellation time updated");
    }

    /**
     * Cancel a interruption (InterruptionEntity interruption, boolean cancelled)
     */
    @Test
    public void testCancelInterruption() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        interruptionDAO.updateCancelled(interruption, true);
        Mockito.when(interruptionDAO.updateCancelled(interruption, true)).thenReturn(interruption);
        Assert.assertEquals(interruption, interruptionDAO.updateCancelled(interruption, true));
        System.out.println("Interruption cancelled");
    }

    /**
     * Delete Interruption
     */
    @Test
    public void testDeleteInterruption() {
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

    /**
     * List interruptions by device and date (DeviceEntity device, OffsetDateTime start, OffsetDateTime end)
     */
    @Test
    public void listInterruptionsByDeviceAndDate() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        Mockito.when(interruptionDAO.listByDeviceAndDate(device, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC))).thenReturn(Arrays.asList(interruption));
        System.out.println("Interruptions by device and date");
    }

    /**
     * List interruptions by date (OffsetDateTime fromTime, OffsetDateTime toTime)
     */
    @Test
    public void testListInterruptionsByDate() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        Mockito.when(interruptionDAO.listByDate(OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC))).thenReturn(Arrays.asList(interruption));
        System.out.println("Interruptions by date");
    }

    /**
     * List interruptions by group id (Long groupId)
     */
    @Test
    public void testListInterruptionsByGroupId() {
        UserEntity user = new UserEntity(1L,"keycloakId", "name");
        ControllerEntity controller = new ControllerEntity(1L, "EUI", "KEY", ControllerCommunicationChannel.GPRS);
        DeviceEntity device = new DeviceEntity(1L, "Device", user, controller);
        InterruptionGroupEntity group = new InterruptionGroupEntity(1L, OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC), OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC));
        InterruptionEntity interruption = interruptionDAO.create(device, group);
        Mockito.when(interruptionDAO.listByGroupId(1L)).thenReturn(Arrays.asList(interruption));
        System.out.println("Interruptions by group id");
    }
}
