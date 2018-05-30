let language = 'fi';

const messages = {
  'appname': {
    'fi': 'Koti-app',
    'en': 'Home-app',
    'sv': 'Hem-app'
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