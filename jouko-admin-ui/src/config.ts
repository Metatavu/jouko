// Configuration file for the application.
// Java API URL (default: http://localhost:8080/v1)
export const apiUrl =
  process.env.NODE_ENV === 'production'
  ? 'https://jouko-api.metatavu.io/v1'
  : 'http://dev.jouko.local:8080/v1';

// Keycloak auth URL (default: http://localhost:9080/auth)
export const authUrl =
  process.env.NODE_ENV === 'production'
  ? 'https://jouko-auth.metatavu.io/auth/'
  : 'http://localhost:9080/auth/';

// React app URL (default: http://localhost:3000)
export const uploadUrl =
  process.env.NODE_ENV === 'production'
  ? 'https://jouko-api.metatavu.io/fileUpload'
  : 'http://dev.jouko.local:8080/fileUpload';

// Keycloak realm name, if you followed the README instructions, this should be "jouko-realm"
export const keycloakRealm =
  process.env.NODE_ENV === 'production'
  ? 'jouko-realm'
  : 'jouko-realm';

// Keycloak ClientID for the application, if you followed the README instructions, this should be "jouko-api"
export const keycloakClientId =
  process.env.NODE_ENV === 'production'
  ? 'jouko-admin'
  : 'jouko-api';