import * as React from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Bottombar } from './components/Bottombar';
import { UpcomingInterruptions } from './components/UpcomingInterruptions';
import { User } from './components/User';
import { Home } from './components/Home';
import { Statistics } from './components/Statistics';
import { StatisticsSummary } from './components/StatisticsSummary';
import { NavLink } from 'react-router-dom';
import * as Keycloak from 'keycloak-js';
import { UsersApi } from 'jouko-ts-client';
import { PowerUsageSummaries } from './components/PowerUsageSummary';
import { _ } from './i18n';
import { FlagBar } from './components/FlagBar';
const logo = require('./logo.svg');

interface AppState {
  keycloakInstance?: Keycloak.KeycloakInstance;
  username?: string;
  keycloakId?: string;
  userId?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
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
        realm: 'jouko-realm',
        clientId: 'jouko',
      }
    );
    kc.init({ onLoad: 'login-required' })
      .success(() => {
      this.fetchUsers(kc);
      // tslint:disable-next-line:no-any
      // console.log(kc.idTokenParsed as any);
    }
    )
      .error((e) => {console.log(e); } );
  }
  // tslint:disable-next-line:no-any
  async fetchUsers(kc: any) {

    // tslint:disable-next-line:no-any
    const keycloakId = (kc.idTokenParsed as any).sub;
    const usersApi = new UsersApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
    const user = await usersApi.getUserByKeycloakId(keycloakId);
    console.log(kc);
    if (user) {
      this.setState({
        keycloakInstance : kc,
        // tslint:disable-next-line:no-any
        username: (kc.idTokenParsed as any).preferred_username,
        // tslint:disable-next-line:no-any
        email: (kc.idTokenParsed as any).email,
        // tslint:disable-next-line:no-any
        firstname: (kc.idTokenParsed as any).given_name,
        // tslint:disable-next-line:no-any
        lastname: (kc.idTokenParsed as any).family_name,
        // tslint:disable-next-line:no-any
        keycloakId: (kc.idTokenParsed as any).sub,
        userId: user.id});
    }
  }

  logout() {
    if (this.state.keycloakInstance) {
      this.state.keycloakInstance.logout();
    }
  }

  render() {
    let content;
    if (!this.state.keycloakInstance) {
      content = '';
    } else {
      content = (
        <div>
          <div className="Navigationbar">
            <div className="Navigation">
              <Header logout={() => this.logout()}/>
            </div>
            <FlagBar/>
            <div className="Logout">
              <NavLink to="/" onClick={() => this.logout()}>
                <i className="fa fa-sign-out"/>
              </NavLink>
            </div>
          </div>
          <div className="App-Block1">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">JOUKO - {_('appname')}</h1>
            <h1>{_('signed')}: {this.state.lastname} {this.state.firstname} </h1>
          </div>
        <Route
          path="/"
          exact={true}
          render={props => (
            <Home currentUserId={this.state.userId as number}/>
          )}
        />
        <Route
          path="/User"
          exact={true}
          render={props => (
            <User
              username={this.state.username as string}
              firstname={this.state.firstname as string}
              lastname={this.state.lastname as string}
              email={this.state.email as string}
            />
          )}
        />
        <Route
          path="/StatisticsSummary/"
          render={props => (
            <StatisticsSummary
              currentUserId={this.state.userId as number}
            />
          )}
        />
        <Route
          path="/Statistics/:id"
          render={props => (
            <Statistics
              deviceId={props.match.params.id as number}
              currentUserId={this.state.userId as number}
            />
          )}
        />
        <Route
          path="/UpcomingInterruptions"
          render={props => (
            <UpcomingInterruptions
              currentUserId={this.state.userId as number}
            />
          )}
        />
        <Route
          path="/PowerUsageSummary/"
          render={props => (
            <PowerUsageSummaries
              currentUserId={this.state.userId as number}
            />
          )}
        />
        <div className="Bottombar"><Bottombar /></div>
      </div>
      );
    }

    return (
        <BrowserRouter>
            <div className="wrapper">
              {content}
            </div>
        </BrowserRouter>
    );
  }
}

export default App;