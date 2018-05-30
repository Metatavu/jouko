let language = 'fi';

const messages = {
  'hello': {
    'fi': 'Hei,',
    'en': 'Hello, ',
    'de': 'Hallo,',
    'sv': 'Hallå,'
  },
  'powerConsumptionLastMonths': {
    'fi': 'Viime kuukausien tehonkulutus',
    'en': 'Power consumption of the last months',
    'de': 'Energieverbrauch (Leistung) der letzten Monate',
    'sv': 'Strömförbrukningen för de senaste månaderna'
  },
  'powerConsumption': {
    'fi': 'Tehonkulutus',
    'en': 'Power consumption',
    'de': 'Energieverbrauch (Leistung)',
    'sv': 'Energiförbrukning'
  },
  'interruptions': {
    'fi': 'Katkot',
    'en': 'Interruptions',
    'de': 'Unterbrechungen',
    'sv': 'avbrott'
  },
  'interruptionGroups': {
    'fi': 'Katkoryhmät',
    'en': 'Interruption groups',
    'de': 'Unterbrechungsgruppen',
    'sv': 'avbrottsgrupper'
  },
  'allInterruptionGroups': {
    'fi': 'Kaikki katkoryhmät',
    'en': 'All Interruption groups',
    'de': 'Alle Unterbrechungsgruppen',
    'sv': 'Alla Avbrott grupper'
  },
  'newInterruptionGroups': {
    'fi': 'Uusi katkoryhmä',
    'en': 'New Interruption groups',
    'de': 'Neue Unterbrechungsgruppe',
    'sv': 'Nya Avbrott grupper'
  },
  'user': {
    'fi': 'Käyttäjä',
    'en': 'User',
    'de': 'Benutzer',
    'sv': 'Användare'
  },
  'allUsers': {
    'fi': 'Kaikki käyttäjät',
    'en': 'All Users',
    'de': 'Alle Benutzer',
    'sv': 'Alla användare'
  },
  'newUser': {
    'fi': 'Uusi käyttäjä',
    'en': 'New User',
    'de': 'Neuer Benutzer',
    'sv': 'Ny användare'
  },
  'device': {
    'fi': 'Laite',
    'en': 'Device',
    'de': 'Gerät',
    'sv': 'anordning'
  },
  'allDevices': {
    'fi': 'Kaikki laitteet',
    'en': 'All Devices',
    'de': 'Alle Geräte',
    'sv': 'alla enheter'
  },
  'newDevice': {
    'fi': 'Uusi laite',
    'en': 'New Device',
    'de': 'Neues Gerät',
    'sv': 'ny enhet'
  },
  'search': {
    'fi': 'Haku',
    'en': 'Search',
    'de': 'Suche',
    'sv': 'Sök'
  },
  'adminUserData': {
    'fi': 'Hallinnoijan tiedot',
    'en': 'Admin-User Data',
    'de': 'Admin-Benutzerdaten',
    'sv': 'Admin-användardata'
  },
  'username': {
    'fi': 'Käyttäjänimi',
    'en': 'Username',
    'de': 'Benutzername',
    'sv': 'Användarnamn'
  },
  'email': {
    'fi': 'Sähköposti',
    'en': 'Email',
    'de': 'E-Mail',
    'sv': 'E-post'
  },
  'firstname': {
    'fi': 'Etunimi',
    'en': 'Firstname',
    'de': 'Vorname',
    'sv': 'Förnamn'
  },
  'lastname': {
    'fi': 'Sukunimi',
    'en': 'Lastname',
    'de': 'Familienname',
    'sv': 'Efternamn'
  },
  'confirmDeleteInterruptionGroup': {
    'fi': 'Tämä katkoryhmä poistetaan!',
    'en': 'This interruptiongroup will be deleted!',
    'de': 'Diese Unterbrechung wird gelöscht!',
    'sv': 'Detta interruptiongroup kommer att tas bort!'
  },
  'confirmDeleteUser': {
    'fi': 'Tämä käyttäjä poistetaan!',
    'en': 'This user will be deleted!',
    'de': 'Dieser Benutzer wird gelöscht!',
    'sv': 'Den här användaren kommer att raderas!'
  },
  'confirmDeleteDevice': {
    'fi': 'Tämä laite poistetaan!',
    'en': 'This device will be deleted!',
    'de': 'Dieses Gerät wird gelöscht!',
    'sv': 'Denna enhet kommer att tas bort!'
  },
  'starttime': {
    'fi': 'Alkuaika',
    'en': 'Starttime',
    'de': 'Startzeit',
    'sv': 'Starttid'
  },
  'endtime': {
    'fi': 'Loppuaika',
    'en': 'Endtime',
    'de': 'Endzeit',
    'sv': 'Sluttid'
  },
  'powerSaved': {
    'fi': 'Tehonsäästö [kW]',
    'en': 'Power Saved [kW]',
    'de': 'Ersparte Energiemenge [kW]',
    'sv': 'Effekt sparade [kW]'
  },
  'overbooking': {
    'fi': 'Ylibuukkaus [%]',
    'en': 'Overbooking [%]',
    'de': 'Überbuchung [%]',
    'sv': 'Överbokning [%]'
  },
  'date': {
    'fi': 'Päivämäärä',
    'en': 'Date',
    'de': 'Datum',
    'sv': 'Datum'
  },
  'time': {
    'fi': 'Aika (TT:MM)',
    'en': 'Time (HH:MM)',
    'de': 'Zeit (HH:MM)',
    'sv': 'Tid (HH: MM)'
  },
  'duration': {
    'fi': 'Kesto (TT:MM)',
    'en': 'Duration (HH:MM)',
    'de': 'Dauer (HH:MM)',
    'sv': 'Längd (TT: MM)'
  },
  'powerToBeSaved': {
    'fi': 'Säästettävä keskimääräinen teho [kW]',
    'en': 'The Average Power to be saved [kW]',
    'de': 'Menge der einzusparenden Energie [kWh]',
    'sv': 'Den genomsnittliga effekten som ska sparas [kW]'
  },
  'cancel': {
    'fi': 'Peruuta',
    'en': 'Cancel',
    'de': 'Abbrechen',
    'sv': 'Annullera'
  },
  'create': {
    'fi': 'Luo',
    'en': 'Create',
    'de': 'Erstellen',
    'sv': 'Skapa'
  },
  'edit': {
    'fi': 'Muokkaa',
    'en': 'Edit',
    'de': 'Bearbeiten',
    'sv': 'Redigera'
  },
  'keycloakId': {
    'fi': 'Keycloak-tunnus',
    'en': 'Keycloak ID',
    'de': 'Keycloak-ID',
    'sv': 'Keycloak ID'
  },
  'devices': {
    'fi': 'Laitteet',
    'en': 'Devices',
    'de': 'Geräte',
    'sv': 'enheter'
  },
  'deviceName': {
    'fi': 'Laitteen nimi',
    'en': 'Device Name',
    'de': 'Gerätename',
    'sv': 'Enhetsnamn'
  },
  'controllerDevice': {
    'fi': 'Ohjauslaite',
    'en': 'Controller device',
    'de': 'Steuervorrichtung',
    'sv': 'styranordning'
  },
  'switchingDevice': {
    'fi': 'Kytkinlaite',
    'en': 'Switching device',
    'de': 'Schaltvorrichtung',
    'sv': 'omkopplingsanordning'
  },
  'addDevice': {
    'fi': 'Lisää laite',
    'en': 'Add Device',
    'de': 'Gerät hinzufügen',
    'sv': 'Lägg till enhet'
  },
  'userId': {
    'fi': 'Käyttäjätunniste',
    'en': 'User ID',
    'de': 'User-ID',
    'sv': 'användar ID'
  },
  'sortBy': {
    'fi': '',
    'en': 'Sort by:',
    'de': 'Sortieren nach',
    'sv': ''
  },
  'searchFor': {
    'fi': '',
    'en': 'Search for * in *',
    'de': 'Suche nach * in *',
    'sv': ''
  },
  'searchForHint1': {
    'fi': '',
    'en': '* Search for dates and times like this YYYY-MM-DD or HH:MM',
    'de': 'Suchen Sie nach einem Datum oder einer Uhrzeigt in diesem Format: YYYY-MM-DD oder HH:MM',
    'sv': ''
  },
  'searchForHint2': {
    'fi': '',
    'en': 'Do not include % or kW when searching in column Power Saved [kW] or Overbooking [%]. You also don\'t need any wildcards like * or ?.',
    'de': 'Geben Sie bei Ihrer Suche in den Spalten \'Ersparte Energiemenge [kW] oder \'Überbuchung [%] kein \'%\' oder \'kW\' ein.',
    'sv': ''
  }
};

export function getLanguage() {
  return language;
}

export function setLanguage(lang: string) {
  language = lang;
}

export function _(identifier: string): string {
  return messages[identifier][language];
}