// Check what language is selected or return Finnish language as default
let language = localStorage.getItem('language') || 'fi';

const messages = {
  '1hourlegend': {
    'fi': '5 min ka.',
    'en': '5 min avg.',
    'de': '1 Stunde',
    'sv': '1 timme'
  },
  '24hourslegend': {
    'fi': '1 h ka.',
    'en': '1 h avg.',
    'de': '24 Stunden',
    'sv': '24 timmar'
  },
  '30dayslegend': {
    'fi': '1 vrk ka.',
    'en': '1 d avg.',
    'de': '30 Tage',
    'sv': '30 dagar'
  },
  '1hour': {
    'fi': '1 tunti',
    'en': '1 hour',
    'de': '1 Stunde',
    'sv': '1 timme'
  },
  '24hours': {
    'fi': '24 tuntia',
    'en': '24 hours',
    'de': '24 Stunden',
    'sv': '24 timmar'
  },
  '30days': {
    'fi': '30 vuorokautta',
    'en': '30 days',
    'de': '30 Tage',
    'sv': '30 dagar'
  },
  'alertUserDataChanged': {
    'fi': 'Tiedot päivitetty onnistuneesti!',
    'en': 'User data successfully changed!',
    'de': 'Benutzerdaten erfolgreich geändert!',
    'sv': 'Användardata ändras framgångsrikt!'
  },
  'allMeasurements': {
    'fi': 'Kaikki mittaukset',
    'en': 'All Measurements',
    'de': 'Alle Messungen',
    'sv': 'Alla Mätningar'
  },
  'allStatistics': {
    'fi': 'Kaikki tilastot',
    'en': 'All Statistics',
    'de': 'Alle Statistiken',
    'sv': 'All statistik'
  },
  'appname': {
    'fi': 'Koti-app',
    'en': 'Home-app',
    'de': 'Home-App',
    'sv': 'Hem-app'
  },
  'building': {
    'fi': 'Rakennus',
    'en': 'Building',
    'de': 'Gebäude',
    'sv': 'Byggnad'
  },
  'buildingEnergy': {
    'fi': 'Katkojen energia verrattuna koko rakennuksen kulutukseen',
    'en': 'Energy saved during the interruptions compared to overall consumption of the building',
    'de': 'Energieeinsparung während der Unterbrechungen im Vergleich zum Gesamtverbrauch des Gebäudes',
    'sv': 'Energi sparas under avbrott jämfört med den totala konsumtionen av byggnaden'
  },
  'cancel': {
    'fi': 'Peruuta',
    'en': 'Cancel',
    'de': 'Abbrechen',
    'sv': 'Annullera'
  },
  'cancelled': {
    'fi': 'Katkon esto lähetetty',
    'en': 'Cancelled',
    'de': 'Verhindert',
    'sv': 'Avbokad'
  },
  'confirmCancelInterruption': {
    'fi': 'Oletko varma että haluat peruttaa tämän katkon?',
    'en': 'Are you sure that you want to cancel this interruption?',
    'de': 'Sind Sie sich sicher, dass Sie diese Unterbrechung verhindern wollen?',
    'sv': 'Är du säker på att du vill avbryta detta avbrott?'
  },
  'device': {
    'fi': 'Laite',
    'en': 'Device',
    'de': 'Gerät',
    'sv': 'Enhet'
  },
  'devicename': {
    'fi': 'Laitteen nimi',
    'en': 'Device name',
    'de': 'Device name',
    'sv': 'Enhet name'
  },
  'edit': {
    'fi': 'Muokkaa',
    'en': 'Edit',
    'de': 'Bearbeiten',
    'sv': 'Redigera'
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
    'en': 'First name',
    'de': 'Vorname',
    'sv': 'Förnamn'
  },
  'highLow': {
    'fi': 'aleneva',
    'en': 'descending',
    'de': 'absteigend',
    'sv': 'fallande'
  },
  'home': {
    'fi': 'Koti',
    'en': 'Home',
    'de': 'Home',
    'sv': 'Hem'
  },
  'in': {
    'fi': 'sisään',
    'en': 'in',
    'de': 'in',
    'sv': 'i'
  },
  'incomingInterruptions': {
    'fi': 'Tulevat katkot',
    'en': 'Incoming interruptions',
    'de': 'Bevorstehende Unterbrechungen',
    'sv': 'Inkommande avbrott'
  },
  'interruptions': {
    'fi': 'Katkot',
    'en': 'Interruptions',
    'de': 'Unterbrechung',
    'sv': 'Avbrott'
  },
  'interruption': {
    'fi': 'Katko',
    'en': 'Interruption',
    'de': 'Interruption',
    'sv': 'Avbrott'
  },
  'latestMeasurements': {
    'fi': 'Viimeisimmät mittaukset',
    'en': 'Latest Measurements',
    'de': 'Neueste Messungen',
    'sv': 'Senaste Mätningarna'
  },
  'lastname': {
    'fi': 'Sukunimi',
    'en': 'Surname',
    'de': 'Familienname',
    'sv': 'Efternamn'
  },
  'logout': {
    'fi': 'Kirjaudu ulos',
    'en': 'Logout',
    'de': 'Abmelden',
    'sv': 'Logga ut'
  },
  'lowHigh': {
    'fi': 'nuoseva',
    'en': 'ascending',
    'de': 'aufsteigend',
    'sv': 'stigande'
  },
  'measurementValue': {
    'fi': 'Mittausarvo',
    'en': 'Measurement Value',
    'de': 'Messwert',
    'sv': 'Mätvärde'
  },
  'noInterruptionsFound': {
    'fi': 'Ei tulevia katkoja',
    'en': 'No interruptions found',
    'de': 'No interruptions found',
    'sv': 'Ingen inkommande avbrott'
  },
  'powerConsumption': {
    'fi': 'Tehonkulutus',
    'en': 'Power Consumption',
    'de': 'Energieverbrauch (Leistung)',
    'sv': 'Energiförbrukning'
  },
  'phase': {
    'fi': 'Vaihe',
    'en': 'Phase',
    'de': 'Phase',
    'sv': 'Fas'
  },
  'preventInterruptions': {
    'fi': 'Estä katko',
    'en': 'Cancel interruption',
    'de': 'Unterbrechung verhindern',
    'sv': 'Avbryt avbrott'
  },
  'save': {
    'fi': 'Tallenna',
    'en': 'Save',
    'de': 'Speichern',
    'sv': 'Spara'
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
  'selectStatistics': {
    'fi': 'Valitse tilasto',
    'en': 'Select Statistics',
    'de': 'Statistik auswählen',
    'sv': 'Välj statistik'
  },
  'signed': {
    'fi': 'Kirjautuneena',
    'en': 'Signed in',
    'de': 'Angemeldet',
    'sv': 'Inloggad'
  },
  'starttime': {
    'fi': 'Alkuaika',
    'en': 'Starttime',
    'de': 'Startzeit',
    'sv': 'Starttid'
  },
  'sortBy': {
    'fi': 'Lajittele',
    'en': 'Sort by',
    'de': 'Sortieren nach',
    'sv': 'Sortera efter'
  },
  'statistics': {
    'fi': 'Tilastot',
    'en': 'Statistics',
    'de': 'Statistiken',
    'sv': 'Statistik'
  },
  'totalEnergy': {
    'fi': 'Katkojen energia verrattuna kokonaiskulutukseen',
    'en': 'Energy saved during the interruptions compared to the measured overall consumption of the device',
    'de': 'Energieeinsparung während der Unterbrechungen im Vergleich zu dem gemessenen Gesamtverbrauch des Gerätes',
    'sv': 'Energi sparas under avbrotten jämfört med den uppmätta totala förbrukningen av anordningen'
  },
  'totalSaving': {
    'fi': 'Kokonaissäästö',
    'en': 'Total saving',
    'de': 'Gesamteinsparnis',
    'sv': 'Total besparing'
  },
  'user': {
    'fi': 'Käyttäjä',
    'en': 'User',
    'de': 'Benutzer',
    'sv': 'Användare'
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