package fi.metatavu.jouko.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

public class TimeSyncEntity {

  @Column(nullable = false)
  @NotNull
  private OffsetDateTime time;
  private DeviceEntity device;
  
  @NotNull
  private int reason;

    public void setTime(OffsetDateTime time) {
        this.time = time;
    }

    public void setDevice(DeviceEntity device) {
        this.device = device;
    }

    public void setReason(int reason) {
        this.reason = reason;
    }
}
