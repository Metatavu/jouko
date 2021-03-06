package fi.metatavu.jouko.api;

import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.time.OffsetDateTime;

import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import javax.ws.rs.ext.Provider;

@Provider
public class OffsetDateTimeParamConverterProvider implements ParamConverterProvider {
  @SuppressWarnings("unchecked")
  @Override
  public <T> ParamConverter<T> getConverter(
      Class<T> rawType,
      Type genericType,
      Annotation[] annotations) {
    if (rawType == OffsetDateTime.class) {
      return (ParamConverter<T>) new OffsetDateTimeParamConverter();
    }
    return null;
  }
}
