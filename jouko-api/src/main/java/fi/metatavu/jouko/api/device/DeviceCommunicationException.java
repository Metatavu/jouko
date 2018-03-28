package fi.metatavu.jouko.api.device;

public class DeviceCommunicationException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  public DeviceCommunicationException(String message) {
    super(message);
  }

  public DeviceCommunicationException(String message, Throwable cause) {
    super(message, cause);
  }
}
