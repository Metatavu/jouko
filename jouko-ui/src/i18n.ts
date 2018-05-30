let language = 'fi';

const messages = {
  'appname': {
    'fi': 'Koti-app',
    'en': 'Home-app',
    'de': 'Home-App',
    'sv': 'Hem-app'
  },
  'signed': {
    'fi': 'Kirjautuneena',
    'en': 'Signed in',
    'de': 'Angemeldet',
    'sv': 'Inloggad'
  },
  'incomingInterruptions': {
    'fi': 'Tulevat katkot',
    'en': 'Incoming interruptions',
    'de': 'Bevorstehende Unterbrechungen',
    'sv': 'inkommande avbrott'
  },
  'preventInterruptions': {
    'fi': 'Estä katko',
    'en': 'Prevent interruption',
    'de': 'Unterbrechungen verhindern',
    'sv': 'Förhindra avbrott'
  },
  'powerConsumption': {
    'fi': 'Tehonkulutus',
    'en': 'Power Consumption',
    'de': 'Energieverbrauch (Leistung)',
    'sv': 'Energiförbrukning'
  },
  'confirmCancelInterruption': {
    'fi': 'Oletko varma että haluat peruttaa tämän katkon?',
    'en': 'Are you sure that you want to cancel this interruption?',
    'de': 'Sind Sie sich sicher, dass Sie diese Unterbrechung verhindern wollen?',
    'sv': 'Är du säker på att du vill avbryta detta avbrott?'
  },
  'cancelled': {
    'fi': 'Katkon esto lähetetty',
    'en': 'Cancelled',
    'de': 'Verhindert',
    'sv': 'Avbokad'
  },
  'home': {
    'fi': 'Koti',
    'en': 'Home',
    'de': 'Home',
    'sv': 'Hem'
  },
  'user': {
    'fi': 'Käyttäjä',
    'en': 'User',
    'de': 'Benutzer',
    'sv': 'Användare'
  },
  'statistics': {
    'fi': 'Tilastot',
    'en': 'Statistics',
    'de': 'Statistiken',
    'sv': 'Statistik'
  },
  'logout': {
    'fi': 'Kirjaudu ulos',
    'en': 'Logout',
    'de': 'Abmelden',
    'sv': 'Logga ut'
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
  'cancel': {
    'fi': 'Peruuta',
    'en': 'Cancel',
    'de': 'Abbrechen',
    'sv': 'Annullera'
  },
  'save': {
    'fi': 'Tallenna',
    'en': 'Save',
    'de': 'Speichern',
    'sv': 'Spara'
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
    'sv': 'total besparing'
  },
  'interruptions': {
    'fi': 'Katkot',
    'en': 'Interruptions',
    'de': 'Unterbrechung',
    'sv': 'avbrott'
  },
  'buildingEnergy': {
    'fi': 'Katkojen energia verrattuna koko rakennuksen kulutukseen',
    'en': 'Energy saved during the interruptions compared to overall consumption of the building',
    'de': 'Energieeinsparung während der Unterbrechungen im Vergleich zum Gesamtverbrauch des Gebäudes',
    'sv': 'Energi sparas under avbrott jämfört med den totala konsumtionen av byggnaden'
  },
  'building': {
    'fi': 'Rakennus',
    'en': 'Building',
    'de': 'Gebäude',
    'sv': 'Byggnad'
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
  'selectStatistics': {
    'fi': 'Valitse tilasto',
    'en': 'Select Statistics',
    'de': 'Statistik auswählen',
    'sv': 'Välj statistik'
  },
  'allStatistics': {
    'fi': 'Kaikki tilastot',
    'en': 'All Statistics',
    'de': 'Alle Statistiken',
    'sv': 'all statistik'
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