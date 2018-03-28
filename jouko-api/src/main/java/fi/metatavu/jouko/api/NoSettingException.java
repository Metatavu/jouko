package fi.metatavu.jouko.api;

public class NoSettingException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  public NoSettingException(String missingSetting) {
    super("No such setting: " + missingSetting);
  }

}
