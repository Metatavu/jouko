package fi.metatavu.jouko.api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Table(name="TimeSync")
@Entity
public class TimeSyncEntity {

  @Id
  @Column(nullable = false)
  @NotNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private OffsetDateTime time;
  @ManyToOne
  @JoinColumn(name = "device_id")
  private DeviceEntity device;
  
  @NotNull
  private int reason;

  public DeviceEntity getDevice() {
    return device;
  }

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
