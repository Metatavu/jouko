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