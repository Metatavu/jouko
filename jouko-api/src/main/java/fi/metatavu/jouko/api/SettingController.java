package fi.metatavu.jouko.api;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;

import fi.metatavu.jouko.api.dao.SettingDAO;
import fi.metatavu.jouko.api.model.SettingEntity;

@Dependent
public class SettingController {
  
  @Inject
  private SettingDAO settingDAO;

  /**
   * Reads the setting, otherwise throws an exception that no setting exists for the key
   *
   * @param key is an ID for the setting
   * @return settings data
   */
  public String getSetting(String key) {
    SettingEntity setting = settingDAO.findByKey(key);
    if (setting != null) {
      return setting.getValue();
    }
    else {
      throw new NoSettingException(key);
    }
  }
  
  public String getSetting(String key, String def) {
    SettingEntity setting = settingDAO.findByKey(key);
    if (setting != null) {
      return setting.getValue();
    }
    else {
      return def;
    }
  }
}
