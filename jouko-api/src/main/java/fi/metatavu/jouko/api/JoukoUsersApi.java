package fi.metatavu.jouko.api;

import java.time.OffsetDateTime;
import java.util.UUID;

import javax.ws.rs.core.Response;

import fi.metatavu.jouko.server.rest.UsersApi;
import fi.metatavu.jouko.server.rest.model.InterruptionCancellation;

public class JoukoUsersApi implements UsersApi {

  @Override
  public Response getPowerConsumption(
      UUID userId,
      UUID deviceId,
      OffsetDateTime fromTime,
      OffsetDateTime toTime) throws Exception {
    return null;
  }

  @Override
  public Response listDevices(
      UUID userId,
      Integer firstResult,
      Integer maxResults) throws Exception {
    return null;
  }

  @Override
  public Response listInterruptions(
      UUID userId,
      OffsetDateTime fromTime,
      OffsetDateTime toTime,
      UUID deviceId) throws Exception {
    return null;
  }

  @Override
  public Response setInterruptionCancelled(
      UUID userId,
      UUID interruptionId,
      InterruptionCancellation body) throws Exception {
    return null;
  }
}
