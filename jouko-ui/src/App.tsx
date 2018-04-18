import * as React from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Bottombar } from './components/Bottombar';
import { UpcomingInterruptions } from './components/UpcomingInterruptions';
import { InterruptionGroupsTable } from './components/InterruptionGroupsTable';
import { PowerUsageSummary } from './components/PowerUsageSummary';
import { User } from './components/User';
import { Home } from './components/Home';
import { Settings } from './components/Settings';
import { Statistics } from './components/Statistics';
import { NavLink } from 'react-router-dom';
import * as Keycloak from 'keycloak-js';

const logo = require('./logo.svg');

interface AppState {
  keycloakInstance?: Keycloak.KeycloakInstance;
  username?: Keycloak.KeycloakInstance;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const kc = Keycloak(
      {
        url: 'http://localhost:9080/auth/',
        realm: 'metatavu-realm',
        clientId: 'jouko',
      }
    );
    kc.init({ onLoad: 'login-required' })
      .success(() => {
      // tslint:disable-next-line:no-any
      this.setState({keycloakInstance : kc, username: (kc.idTokenParsed as any).name });
      }
    )
      .error((e) => {console.log(e); } );
  }

  logout() {
    if (this.state.keycloakInstance) {
      this.state.keycloakInstance.logout();
    }
  }

  render() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="Navigationbar">
                  <div className="Navigation">
                    <Header logout={() => this.logout()}/>
                  </div>
                  <div className="Logout">
                    <NavLink to="/" onClick={() => this.logout()}>
                      <i className="fa fa-sign-out"/>
                    </NavLink>
                  </div>
                </div>
                <div className="App-Block1">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">JOUKO - kotiapp</h1>
                  <h1>Kirjautuneena: {this.state.username} </h1>
                </div>
                <Route path="/" exact={true} component={Home} />
                <Route path="/User" component={User} />
                <Route path="/Settings" component={Settings} />
                <Route
                  path="/Statistics/:id"
                  render={props => (
                    <Statistics deviceId={props.match.params.id as number}/>
                  )}
                />
                <Route path="/UpcomingInterruptions" component={UpcomingInterruptions} />
                <Route path="/InterruptionGroupsTable" component={InterruptionGroupsTable} />
                <Route path="/PowerUsageSummary" component={PowerUsageSummary} />
                <div className="Bottombar">
                  <Bottombar />
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;