
export const apiUrl =
  process.env.NODE_ENV === 'production'
  ? 'https://jouko-api.metatavu.io/api-0.0.1-SNAPSHOT/v1'
  : 'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1';

export const authUrl =
  process.env.NODE_ENV === 'production'
  ? 'http://jouko-auth.metatavu.io/auth/'
  : 'http://localhost:9080/auth/';