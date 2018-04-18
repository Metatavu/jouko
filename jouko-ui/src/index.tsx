import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as Keycloak from 'keycloak-js';

export const kc: Keycloak.KeycloakInstance = Keycloak(
  {
    url: 'http://localhost:9080/auth/',
    realm: 'metatavu-realm',
    clientId: 'jouko',
  }
);

kc.init({ onLoad: 'login-required' })
  .success(() => {
    ReactDOM.render(
      <App />,
      document.getElementById('root') as HTMLElement
    );
    // registerServiceWorker();
  })
  .error(error => console.log('Der Fehler ist:' + error));