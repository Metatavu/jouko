package fi.metatavu.jouko.api.dao;

import fi.metatavu.jouko.api.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class PowerMeasurementDAOTest {
    private PowerMeasurementDAO powerMeasurementDAO;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(PowerMeasurementDAOTest.class);

    @Before
    public void setUp() {
        powerMeasurementDAO = Mockito.mock(PowerMeasurementDAO.class);
    }

    /**
     * Create a new power measurement (DeviceEntity device, double measurementValue, MeasurementType measurementType, OffsetDateTime startTime, offsetDateTime endTime, int phaseNumber, boolean relayIsOpen)
     */
    @Test
    public void testCreatePowerMeasurement() {
        ControllerEntity controller = new ControllerEntity(1l, "EUI", "KEY", ControllerCommunicationChannel.LORA);
        DeviceEntity device = new DeviceEntity(1L, "Device", null, controller);
        MeasurementType measurementType = MeasurementType.AVERAGE;
        DevicePowerMeasurementEntity powerMeasurement = new DevicePowerMeasurementEntity(
                1L,
                device,
                1.0,
                measurementType,
                OffsetDateTime.ofInstant(Instant.ofEpochSecond(0), ZoneOffset.UTC),
                OffsetDateTime.ofInstant(Instant.ofEpochSecond(100), ZoneOffset.UTC),
                1,
                false);
        Mockito.when(powerMeasurementDAO.findById(1L)).thenReturn(powerMeasurement);
        Assert.assertEquals(powerMeasurement, powerMeasurementDAO.findById(1L));
        logger.debug("Power measurement created by id");
    }
}
