package fi.metatavu.jouko.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

public class TimeSyncEntity {

  @Column(nullable = false)
  @NotNull
  private OffsetDateTime time;
  
  @NotNull
  private int reason;
}
