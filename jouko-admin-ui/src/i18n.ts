// Check what language is selected or return Finnish language as default
let language = localStorage.getItem('language') || 'fi';

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
        'fi': 'Hallinnoijan tiedot muutettu onnistuneesti!',
        'en': 'Admin data successfully changed!',
        'de': 'Admin-Benutzerdaten erfolgreich geändert!',
        'sv': 'Admin-användardata har ändrats framgångsrikt!'
    },
    'alertDeviceChanged': {
        'fi': 'Laitetta on muokattu onnistuneesti!',
        'en': 'Device successfully changed!',
        'de': 'Gerät erfolgreich geändert!',
        'sv': 'Enheten har ändrats framgångsrikt!'
    },
    'alertDeviceCreated': {
        'fi': 'Laite on luotu!',
        'en': 'Device successfully created!',
        'de': 'Gerät erfolgreich hinzugefügt!',
        'sv': 'Enheten har lagts till framgångsrikt!'
    },
    'alertControllerDeviceCreated': {
        'fi': 'Laite luotu'
    },
    'alertInterruptiongroupChanged': {
        'fi': 'Keskeytysryhmää on muokattu onnistuneesti!',
        'en': 'Interruptiongroup successfully changed!',
        'de': 'Unterbrechung erfolgreich geändert!',
        'sv': 'Avbrottsgrupper har ändrats framgångsrikt!'
    },
    'alertInterruptiongroupCreated': {
        'fi': 'Keskeytys onnistuneesti luotu!',
        'en': 'Interruptiongroup successfully created!',
        'de': 'Unterbrechung erfolgreich hinzugefügt!',
        'sv': 'Avbrottsgrupper har lagt till till framgångsrikt!'
    },
    'alertUserChanged': {
        'fi': 'Käyttäjä on muokattu onnistuneesti!',
        'en': 'User successfully changed!',
        'de': 'Benutzer erfolgreich geändert!',
        'sv': 'Användaren har ändrats framgångsrikt!'
    },
    'alertUserCreated': {
        'fi': 'Käyttäjä on onnistuneesti luotu!',
        'en': 'User successfully created!',
        'de': 'Benutzer erfolgreich hinzugefügt!',
        'sv': 'Användaren har lagts till framgångsrikt!'
    },
    'alertUserCreatedError': {
        'fi': 'Tapahtui virhe käyttäjää luodessa. Onko sähköpostiosoite jo käytössä?',
        'en': 'Error while creating user. Maybe email is taken?',
        'de': 'Error while creating user. Maybe email is taken?',
        'sv': 'Error while creating user. Maybe email is taken?'
    },
    'alertUpdateCreated': {
        'fi': 'Päivitys luotu!',
        'en': 'Update created!',
        'de': 'Update created!',
        'sv': 'Update created!'
    },
    'allControllerDevices': {
        'fi': 'Kaikki Ohjauslaitteet',
        'en': 'All Controller Devices',
        'de': 'Alle Steuervorrichtungen',
        'sv': 'Alla Styranordning'
    },
    'allDevices': {
        'fi': 'Kaikki laitteet',
        'en': 'All Devices',
        'de': 'Alle Geräte',
        'sv': 'Alla Enheter'
    },
    'allInterruptionGroups': {
        'fi': 'Kaikki katkoryhmät',
        'en': 'All Interruption Groups',
        'de': 'Alle Unterbrechungsgruppen',
        'sv': 'Alla Avbrott Grupper'
    },
    'allUsers': {
        'fi': 'Kaikki Käyttäjät',
        'en': 'All Users',
        'de': 'Alle Benutzer',
        'sv': 'Alla Användare'
    },
    'cancel': {
        'fi': 'Peruuta',
        'en': 'Cancel',
        'de': 'Abbrechen',
        'sv': 'Annullera'
    },
    'communicationChannel': {
        'fi': 'Viestintäkanava',
        'en': 'Communication Channel',
        'de': 'Kommunikationskanal',
        'sv': 'Kommunikationskanal '
    },
    'confirmControllerDeleteDevice': {
        'fi': 'Tämä ohjauslaite poistetaan!',
        'en': 'This controller device will be deleted!',
        'de': 'Diese Steuervorrichtung wird gelöscht!',
        'sv': 'Detta styranordning kommer att tas bort!'
    },
    'confirmDeleteControllerDevice': {
        'fi': 'Tämä ohjauslaite poistetaan!',
        'en': 'This controller device will be deleted!',
        'de': 'Diese Steuervorrichtung wird gelöscht!',
        'sv': 'Denna styranordning kommer att tas bort!'
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
        'fi': 'Kytkinlaite',
        'en': 'Device',
        'de': 'Gerät',
        'sv': 'Anordning'
    },
    'deviceName': {
        'fi': 'Kytkinlaitteen nimi',
        'en': 'Device name',
        'de': 'Gerätename',
        'sv': 'Enhetsnamn'
    },
    'devices': {
        'fi': 'Kytkinlaitteet',
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
    'editControllerDevice': {
        'fi': 'Muokkaa ohjauslaitetta',
        'en': 'Edit Controller Device',
        'de': 'Steuervorrichtung bearbeiten',
        'sv': 'Redigera Styranordning'
    },
    'editDevice': {
        'fi': 'Muokkaa kytkinlaitetta',
        'en': 'Edit Device',
        'de': 'Gerät bearbeiten',
        'sv': 'Redigera Enhet'
    },
    'editInterruptiongroup': {
        'fi': 'Muokkaa katkoryhmää',
        'en': 'Edit Interruptiongroup',
        'de': 'Unterbrechung bearbeiten',
        'sv': 'Redigera avbrottsgrupper'
    },
    'editUser': {
        'fi': 'Muokkaa käyttäjää',
        'en': 'Edit User',
        'de': 'Benutzer bearbeiten',
        'sv': 'Redigera användare'
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
    'file': {
        'fi': 'Tiedosto',
        'en': 'File',
        'de': 'File',
        'sv': 'File'
    },
    'filename': {
        'fi': 'Tiedostonimi',
        'en': 'File name',
        'de': 'File name',
        'sv': 'File namen'
    },
    'filenameInfo': {
        'fi': 'Käytetään ladatun tiedoston nimeä, jos ei asetettu',
        'en': 'If empty uploaded filename is used',
        'de': 'If empty uploaded filename is used',
        'sv': 'If empty uploaded filename is used'
    },
    'hello': {
        'fi': 'Hei',
        'en': 'Hello',
        'de': 'Hallo',
        'sv': 'Hallå'
    },
    'highLow': {
        'fi': 'aleneva',
        'en': 'descending',
        'de': 'absteigend',
        'sv': 'fallande'
    },
    'in': {
        'fi': 'sisään',
        'en': 'in',
        'de': 'in',
        'sv': 'i'
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
    'key': {
        'fi': 'Avain',
        'en': 'Key',
        'de': 'Schlüssel',
        'sv': 'Nyckel'
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
        'fi': 'nuoseva',
        'en': 'ascending',
        'de': 'aufsteigend',
        'sv': 'stigande'
    },
    'newControllerDevice': {
        'fi': 'Uusi Ohjauslaite',
        'en': 'New Controller Device',
        'de': 'Neue Steuervorrichtung',
        'sv': 'Ny Styranordning'
    },
    'newDevice': {
        'fi': 'Uusi kytkinlaite',
        'en': 'New Device',
        'de': 'Neues Gerät',
        'sv': 'Ny Enhet'
    },
    'newInterruptionGroups': {
        'fi': 'Uusi katkoryhmä',
        'en': 'New Interruption Group',
        'de': 'Neue Unterbrechungsgruppe',
        'sv': 'Nya Avbrott Grupper'
    },
    'newUpdatefile': {
        'fi': 'Uusi päivitys',
        'en': 'New Update',
        'de': 'New update',
        'sv': 'Ny update'
    },
    'newUser': {
        'fi': 'Uusi käyttäjä',
        'en': 'New User',
        'de': 'Neuer Benutzer',
        'sv': 'Ny användare'
    },
    'noEditControllerDevicePossible1': {
        'fi': 'Valitettavasti et voi muokata tätä ohjauslaitetta. Voit kuitenkin poistaa ohjauslaitteet. Katso ',
        'en': 'Unfortunately, you cannot edit this controller device. ' +
        'You may, however, delete controller devices. Please have a look at the ',
        'de': 'Leider können Sie diese Steuervorrichtung nicht bearbeiten. ' +
        'Sie können jedoch Steuervorrichtungen löschen. Bitte werfen Sie einen Blick auf die ',
        'sv': 'Tyvärr kan du inte redigera den här styranordning. Du kan dock radera styrenhetsanordningar. Titta på '
    },
    'noEditControllerDevicePossible2': {
        'fi': 'yleiskatsaus',
        'en': 'overview',
        'de': 'Übersicht',
        'sv': 'översikten'
    },
    'noEditControllerDevicePossible3': {
        'fi': ' tai luo uusi ohjauslaite ',
        'en': ' or create a new controller device ',
        'de': ' oder erstellen Sie eine neue Steuervorrichtung ',
        'sv': ' eller skapa en ny styranordning '
    },
    'noEditControllerDevicePossible4': {
        'fi': 'tähän.',
        'en': 'here.',
        'de': 'hier.',
        'sv': 'här.'
    },
    'noEditDevicePossible1': {
        'fi': 'Valitettavasti et voi muokata tätä kytkinlaitetta. Voit kuitenkin poistaa laitteita. Katso ',
        'en': 'Unfortunately, you cannot edit this device. ' +
        'You may, however, delete devices. Please have a look at the ',
        'de': 'Leider können Sie dieses Gerät nicht bearbeiten. ' +
        'Sie können jedoch Geräte löschen. Bitte werfen Sie einen Blick auf die ',
        'sv': 'Tyvärr kan du inte redigera den här enhet. Du kan dock radera enheter. Titta på '
    },
    'noEditDevicePossible2': {
        'fi': 'yleiskatsaus',
        'en': 'overview',
        'de': 'Übersicht',
        'sv': 'översikten'
    },
    'noEditDevicePossible3': {
        'fi': ' tai luo uusi laite ',
        'en': ' or create a new device ',
        'de': ' oder erstellen Sie ein neues Gerät ',
        'sv': ' eller skapa en ny enhet '
    },
    'noEditDevicePossible4': {
        'fi': 'tähän.',
        'en': 'here.',
        'de': 'hier.',
        'sv': 'här.'
    },
    'noEditInterruptiongroupPossible1': {
        'fi': 'Valitettavasti et voi muokata tätä katkoryhmää. Voit kuitenkin poistaa katkoryhmiä. Katso ',
        'en': 'Unfortunately, you cannot edit this interruption group. ' +
        'You may, however, delete interruption groups. Please have a look at the ',
        'de': 'Leider können Sie diese Unterbrechungsgruppe nicht bearbeiten. ' +
        'Sie können jedoch Unterbrechungsgruppen löschen. Bitte werfen Sie einen Blick auf die ',
        'sv': 'Tyvärr kan du inte redigera den här avbrytargruppen. Du kan dock radera avbrytargrupper. Titta på '
    },
    'noEditInterruptiongroupPossible2': {
        'fi': 'yleiskatsaus',
        'en': 'overview',
        'de': 'Übersicht',
        'sv': 'översikten'
    },
    'noEditInterruptiongroupPossible3': {
        'fi': ' tai luo uusi katkoryhmä ',
        'en': ' or create a new interruption group ',
        'de': ' oder erstellen Sie eine neue Unterbrechungsgruppe ',
        'sv': ' eller skapa en ny avbrottsgrupp '
    },
    'noEditInterruptiongroupPossible4': {
        'fi': 'tähän.',
        'en': 'here.',
        'de': 'hier.',
        'sv': 'här.'
    },
    'noEditUserPossible1': {
        'fi': 'Valitettavasti et voi muokata tätä käyttäjää. Voit kuitenkin poistaa käyttäjiä. Katso ',
        'en': 'Unfortunately, you cannot edit this user. ' +
        'You may, however, delete users. Please have a look at the ',
        'de': 'Leider können Sie diesen Benutzer nicht bearbeiten. ' +
        'Sie können jedoch Benutzer löschen. Bitte werfen Sie einen Blick auf die ',
        'sv': 'Tyvärr kan du inte redigera den här användare. Du kan dock radera användare. Titta på '
    },
    'noEditUserPossible2': {
        'fi': 'yleiskatsaus',
        'en': 'overview',
        'de': 'Übersicht',
        'sv': 'översikten'
    },
    'noEditUserPossible3': {
        'fi': ' tai luo uusi käyttäjä ',
        'en': ' or create a new user ',
        'de': ' oder erstellen Sie einen neuen Benutzer ',
        'sv': ' eller skapa en ny användare '
    },
    'noEditUserPossible4': {
        'fi': 'tähän.',
        'en': 'here.',
        'de': 'hier.',
        'sv': 'här.'
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
        'fi': 'Etsi',
        'en': 'Search for',
        'de': 'Suche nach',
        'sv': 'Sök efter'
    },
    'searchForHint1': {
        'fi': '* Etsi päivämäärät ja kellonajat näin: YYYY-MM-DD tai HH:MM',
        'en': '* Search for dates and times like this YYYY-MM-DD or HH:MM',
        'de': '* Suchen Sie nach einem Datum oder einer Uhrzeigt in diesem Format: YYYY-MM-DD oder HH:MM',
        'sv': '* Sök efter datum och tider så här: YYYY-MM-DD och HH:MM'
    },
    'searchForHint2': {
        'fi': 'Eivät sisällä \'%\' tai \'kW\' etsittäessä sarakkeessa \'Tehonsäästö ' +
        '[kW]\' tai \'Ylibuukkaus [%]\'. Sinun ei myöskään tarvitse yleismerkkejä, ' +
        'kuten \'*\' tai \'?\'.',
        'en': 'Do not include \'%\' or \'kW\' when searching in ' +
        'column \'Power Saved [kW]\' or \'Overbooking [%]\'. ' +
        'You also don\'t need any wildcards like \'*\' or \'?\'.',
        'de': 'Geben Sie bei Ihrer Suche in den ' +
        'Spalten \'Ersparte Energiemenge [kW] oder \'Überbuchung ' +
        '[%] kein \'%\' oder \'kW\' ein.',
        'sv': 'Inkludera inte \'%\' och \'kW\' när du söker i ' +
        'kolumn \'Effekt sparade [kW]\' eller \'Överbokning [%]\'. ' +
        'Du behöver inte heller några wildcard som "*" eller "?".'
    },
    'showAll': {
        'fi': 'Näytä kaikki',
        'en': 'Show all',
        'de': 'Alle anzeigen',
        'sv': 'Visa allt'
    },
    'sortBy': {
      'fi': 'Lajittele',
      'en': 'Sort by',
      'de': 'Sortieren nach',
      'sv': 'Sortera efter'
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
    ,
    'version': {
        'fi': 'Versionumero',
        'en': 'Version',
        'de': 'Version',
        'sv': 'Version'
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