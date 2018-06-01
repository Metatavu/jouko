let language = localStorage.getItem('language') || 'en';

const messages = {
    'addDevice': {
        'fi': 'Lisää laite',
        'en': 'Add Device',
        'de': 'Gerät hinzufügen',
        'sv': 'Lägg till enhet'
    },
    'adminUserData': {
        'fi': 'Hallinnoijan tiedot',
        'en': 'Admin-User Data',
        'de': 'Admin-Benutzerdaten',
        'sv': 'Admin-användardata'
    },
    'alertAdminDataChanged': {
        'fi': '',
        'en': 'Admin data successfully changed!',
        'de': 'Admin-Benutzerdaten erfolgreich geändert!',
        'sv': ''
    },
    'alertDeviceChanged': {
        'fi': '',
        'en': 'Device successfully changed!',
        'de': 'Gerät erfolgreich geändert!',
        'sv': ''
    },
    'alertDeviceCreated': {
        'fi': '',
        'en': 'Device successfully created!',
        'de': 'Gerät erfolgreich hinzugefügt!',
        'sv': ''
    },
    'alertInterruptiongroupChanged': {
        'fi': '',
        'en': 'Interruptiongroup successfully changed!',
        'de': 'Unterbrechung erfolgreich geändert!',
        'sv': ''
    },
    'alertInterruptiongroupCreated': {
        'fi': '',
        'en': 'Interruptiongroup successfully created!',
        'de': 'Unterbrechung erfolgreich hinzugefügt!',
        'sv': ''
    },
    'alertUserChanged': {
        'fi': '',
        'en': 'User successfully changed!',
        'de': 'Benutzer erfolgreich geändert!',
        'sv': ''
    },
    'alertUserCreated': {
        'fi': '',
        'en': 'User successfully created!',
        'de': 'Benutzer erfolgreich hinzugefügt!',
        'sv': ''
    },
    'allDevices': {
        'fi': 'Kaikki laitteet',
        'en': 'All Devices',
        'de': 'Alle Geräte',
        'sv': 'Alla enheter'
    },
    'allInterruptionGroups': {
        'fi': 'Kaikki katkoryhmät',
        'en': 'All Interruptiongroups',
        'de': 'Alle Unterbrechungsgruppen',
        'sv': 'Alla avbrott grupper'
    },
    'allUsers': {
        'fi': 'Kaikki käyttäjät',
        'en': 'All Users',
        'de': 'Alle Benutzer',
        'sv': 'Alla användare'
    },
    'cancel': {
        'fi': 'Peruuta',
        'en': 'Cancel',
        'de': 'Abbrechen',
        'sv': 'Annullera'
    },
    'confirmDeleteDevice': {
        'fi': 'Tämä laite poistetaan!',
        'en': 'This device will be deleted!',
        'de': 'Dieses Gerät wird gelöscht!',
        'sv': 'Denna enhet kommer att tas bort!'
    },
    'confirmDeleteInterruptionGroup': {
        'fi': 'Tämä katkoryhmä poistetaan!',
        'en': 'This interruptiongroup will be deleted!',
        'de': 'Diese Unterbrechung wird gelöscht!',
        'sv': 'Detta avbrottsgrupper kommer att tas bort!'
    },
    'confirmDeleteUser': {
        'fi': 'Tämä käyttäjä poistetaan!',
        'en': 'This user will be deleted!',
        'de': 'Dieser Benutzer wird gelöscht!',
        'sv': 'Den här användaren kommer att raderas!'
    },
    'controllerDevice': {
        'fi': 'Ohjauslaite',
        'en': 'Controller device',
        'de': 'Steuervorrichtung',
        'sv': 'Styranordning'
    },
    'create': {
        'fi': 'Luo',
        'en': 'Create',
        'de': 'Erstellen',
        'sv': 'Skapa'
    },
    'date': {
        'fi': 'Päivämäärä',
        'en': 'Date',
        'de': 'Datum',
        'sv': 'Datum'
    },
    'device': {
        'fi': 'Laite',
        'en': 'Device',
        'de': 'Gerät',
        'sv': 'Anordning'
    },
    'deviceName': {
        'fi': 'Laitteen nimi',
        'en': 'Device name',
        'de': 'Gerätename',
        'sv': 'Enhetsnamn'
    },
    'devices': {
        'fi': 'Laitteet',
        'en': 'Devices',
        'de': 'Geräte',
        'sv': 'Enheter'
    },
    'duration': {
        'fi': 'Kesto (TT:MM)',
        'en': 'Duration (HH:MM)',
        'de': 'Dauer (HH:MM)',
        'sv': 'Längd (TT: MM)'
    },
    'edit': {
        'fi': 'Muokkaa',
        'en': 'Edit',
        'de': 'Bearbeiten',
        'sv': 'Redigera'
    },
    'editDevice': {
        'fi': '',
        'en': 'Edit Device',
        'de': 'Gerät bearbeiten',
        'sv': ''
    },
    'editInterruptiongroup': {
        'fi': '',
        'en': 'Edit Interruptiongroup',
        'de': 'Unterbrechung bearbeiten',
        'sv': ''
    },
    'editUser': {
        'fi': '',
        'en': 'Edit User',
        'de': 'Benutzer bearbeiten',
        'sv': ''
    },
    'email': {
        'fi': 'Sähköposti',
        'en': 'Email',
        'de': 'E-Mail',
        'sv': 'E-post'
    },
    'endtime': {
        'fi': 'Loppuaika',
        'en': 'Endtime',
        'de': 'Endzeit',
        'sv': 'Sluttid'
    },
    'firstname': {
        'fi': 'Etunimi',
        'en': 'Firstname',
        'de': 'Vorname',
        'sv': 'Förnamn'
    },
    'hello': {
        'fi': 'Hei',
        'en': 'Hello',
        'de': 'Hallo',
        'sv': 'Hallå'
    },
    'highLow': {
        'fi': '',
        'en': 'descending',
        'de': 'absteigend',
        'sv': ''
    },
    'in': {
        'fi': '',
        'en': 'in',
        'de': 'in',
        'sv': ''
    },
    'interruptionGroups': {
        'fi': 'Katkoryhmät',
        'en': 'Interruption groups',
        'de': 'Unterbrechungsgruppen',
        'sv': 'Avbrottsgrupper'
    },
    'interruptions': {
        'fi': 'Katkot',
        'en': 'Interruptions',
        'de': 'Unterbrechungen',
        'sv': 'Avbrott'
    },
    'keycloakId': {
        'fi': 'Keycloak-tunnus',
        'en': 'Keycloak ID',
        'de': 'Keycloak-ID',
        'sv': 'Keycloak ID'
    },
    'lastname': {
        'fi': 'Sukunimi',
        'en': 'Lastname',
        'de': 'Familienname',
        'sv': 'Efternamn'
    },
    'lowHigh': {
        'fi': '',
        'en': 'ascending',
        'de': 'aufsteigend',
        'sv': ''
    },
    'newDevice': {
        'fi': 'Uusi laite',
        'en': 'New Device',
        'de': 'Neues Gerät',
        'sv': 'Ny enhet'
    },
    'newInterruptionGroups': {
        'fi': 'Uusi katkoryhmä',
        'en': 'New Interruptiongroups',
        'de': 'Neue Unterbrechungsgruppe',
        'sv': 'Nya avbrott grupper'
    },
    'newUser': {
        'fi': 'Uusi käyttäjä',
        'en': 'New User',
        'de': 'Neuer Benutzer',
        'sv': 'Ny användare'
    },
    'noEditInterruptiongroupPossible1': {
        'fi': '',
        'en': 'Unfortunately, you cannot edit this interruption group. ' +
        'You may, however, delete them. Please have a look at the ',
        'de': 'Leider können Sie diese Unterbrechungsgruppe nicht bearbeiten. ' +
        'Sie können sie jedoch löschen. Bitte werfen Sie einen Blick auf die ',
        'sv': ''
    },
    'noEditInterruptiongroupPossible2': {
        'fi': '',
        'en': 'overview',
        'de': 'Übersicht',
        'sv': ''
    },
    'noEditInterruptiongroupPossible3': {
        'fi': '',
        'en': ' or create a new interruption group ',
        'de': ' oder erstellen Sie eine neue Unterbrechungsgruppe ',
        'sv': ''
    },
    'noEditInterruptiongroupPossible4': {
        'fi': '',
        'en': 'here.',
        'de': 'hier.',
        'sv': ''
    },
    'overbooking': {
        'fi': 'Ylibuukkaus [%]',
        'en': 'Overbooking [%]',
        'de': 'Überbuchung [%]',
        'sv': 'Överbokning [%]'
    },
    'powerConsumption': {
        'fi': 'Tehonkulutus',
        'en': 'Power consumption',
        'de': 'Energieverbrauch (Leistung)',
        'sv': 'Energiförbrukning'
    },
    'powerConsumptionLastMonths': {
        'fi': 'Viime kuukausien tehonkulutus',
        'en': 'Power consumption of the last months',
        'de': 'Energieverbrauch (Leistung) der letzten Monate',
        'sv': 'Strömförbrukningen för de senaste månaderna'
    },
    'powerSaved': {
        'fi': 'Tehonsäästö [kW]',
        'en': 'Power Saved [kW]',
        'de': 'Ersparte Energiemenge [kW]',
        'sv': 'Effekt sparade [kW]'
    },
    'powerToBeSaved': {
        'fi': 'Säästettävä keskimääräinen teho [kW]',
        'en': 'The Average Power to be saved [kW]',
        'de': 'Menge der einzusparenden Energie [kWh]',
        'sv': 'Den genomsnittliga effekten som ska sparas [kW]'
    },
    'search': {
        'fi': 'Haku...',
        'en': 'Search...',
        'de': 'Suche...',
        'sv': 'Sök...'
    },
    'searchFor': {
        'fi': '',
        'en': 'Search for',
        'de': 'Suche nach',
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
        'en': 'Do not include \'%\' or \'kW\' when searching in ' +
        'column \'Power Saved [kW]\' or \'Overbooking [%]\'. ' +
        'You also don\'t need any wildcards like \'*\' or \'?\'.',
        'de': 'Geben Sie bei Ihrer Suche in den ' +
        'Spalten \'Ersparte Energiemenge [kW] oder \'Überbuchung ' +
        '[%] kein \'%\' oder \'kW\' ein.',
        'sv': ''
    },
    'showAll': {
        'fi': '',
        'en': 'Show all',
        'de': 'Alle anzeigen',
        'sv': ''
    },
    'sortBy': {
      'fi': '',
      'en': 'Sort by',
      'de': 'Sortieren nach',
      'sv': ''
    },
    'starttime': {
        'fi': 'Alkuaika',
        'en': 'Starttime',
        'de': 'Startzeit',
        'sv': 'Starttid'
    },
    'switchingDevice': {
        'fi': 'Kytkinlaite',
        'en': 'Switching device',
        'de': 'Schaltvorrichtung',
        'sv': 'Omkopplingsanordning'
    },
    'time': {
        'fi': 'Aika (TT:MM)',
        'en': 'Time (HH:MM)',
        'de': 'Zeit (HH:MM)',
        'sv': 'Tid (HH: MM)'
    },
    'user': {
        'fi': 'Käyttäjä',
        'en': 'User',
        'de': 'Benutzer',
        'sv': 'Användare'
    },
    'userId': {
        'fi': 'Käyttäjätunniste',
        'en': 'User ID',
        'de': 'User-ID',
        'sv': 'Användar ID'
    },
    'username': {
        'fi': 'Käyttäjänimi',
        'en': 'Username',
        'de': 'Benutzername',
        'sv': 'Användarnamn'
    }
};

export function getLanguage() {
  return language;
}

export function setLanguage(lang: string) {
  language = lang;
  localStorage.setItem('language', lang);
}

export function _(identifier: string): string {
  return messages[identifier][language];
}