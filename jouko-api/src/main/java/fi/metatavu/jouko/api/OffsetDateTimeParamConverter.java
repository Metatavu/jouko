package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;

import javax.ws.rs.ext.ParamConverter;

public class OffsetDateTimeParamConverter
    implements ParamConverter<OffsetDateTime> {

  @Override
  public OffsetDateTime fromString(String value) {
    return OffsetDateTime.parse(value); // ISO8601
  }

  @Override
  public String toString(OffsetDateTime value) {
    return value.toString(); // ISO8601
  }

}
