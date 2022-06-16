
export const apiUrl =
  process.env.NODE_ENV === 'production'
  ? 'https://jouko-api.metatavu.io/v1'
  : 'http://dev.jouko.fi:8080/v1';

export const authUrl =
  process.env.NODE_ENV === 'production'
  ? 'https://jouko-auth.metatavu.io/auth/'
  : 'http://localhost:9080/auth/';

export const appUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://jouko2018.github.io/'
    : 'http://localhost:3000/';

export const keycloakRealm =
  process.env.NODE_ENV === 'production'
  ? 'jouko-realm'
  : 'jouko-realm';

export const keycloakClientId =
  process.env.NODE_ENV === 'production'
  ? 'jouko-admin'
  : 'jouko-api';