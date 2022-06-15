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
import * as Keycloak from 'keycloak-js';
import { UsersApi, Configuration } from 'jouko-ts-client';
import { PowerUsageSummaries } from './components/PowerUsageSummary';
import { WelcomeBox } from './components/WelcomeBox';
import { apiUrl, authUrl, appUrl } from './config';
import { LatestMeasurements } from './components/LatestMeasurements';

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
        url: authUrl,
        realm: 'jouko-realm',
        clientId: 'jouko',
      }
    );
    kc.init({
      checkLoginIframe: false,
      onLoad: 'login-required'
    })
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
    const configuration = new Configuration({
      apiKey: `Bearer ${kc.token}`
    });

    // tslint:disable-next-line:no-any
    const keycloakId = (kc.idTokenParsed as any).sub;
    const usersApi = new UsersApi(
      configuration,
      apiUrl);
      // Uses the jouko-ts-client to fetch the Keycloak ID of the current user
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
      this.state.keycloakInstance.logout({redirectUri: appUrl});
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
              <Header
                logout={() => this.logout()}
                currentUserId={this.state.userId as number}
                kc={this.state.keycloakInstance}
              />
            </div>
          </div>
          <WelcomeBox
            firstname={this.state.firstname as string}
            lastname={this.state.lastname as string}
          />
        <Route
          path="/"
          exact={true}
          render={props => (
            <Home
              currentUserId={this.state.userId as number}
              kc={this.state.keycloakInstance}
            />
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
          path="/LatestMeasurements"
          render={props => (
            <LatestMeasurements
              currentUserId={this.state.userId as number}
              kc={this.state.keycloakInstance}
            />
          )}
        />
        <Route
          path="/WelcomeBox"
          exact={true}
          render={props => (
            <WelcomeBox
              firstname={this.state.firstname as string}
              lastname={this.state.lastname as string}
            />
          )}
        />
        <Route
          path="/StatisticsSummary/"
          exact={true}
          render={props => (
            <StatisticsSummary
              currentUserId={this.state.userId as number}
              firstname={this.state.firstname as string}
              lastname={this.state.lastname as string}
              kc={this.state.keycloakInstance}
            />
          )}
        />
        <Route
          path="/Statistics/:id"
          exact={true}
          render={props => (
            <Statistics
              deviceId={props.match.params.id as number}
              currentUserId={this.state.userId as number}
              kc={this.state.keycloakInstance}
            />
          )}
        />
        <Route
          path="/UpcomingInterruptions"
          exact={true}
          render={props => (
            <UpcomingInterruptions
              currentUserId={this.state.userId as number}
              kc={this.state.keycloakInstance}
            />
          )}
        />
        <Route
          path="/PowerUsageSummary/"
          exact={true}
          render={props => (
            <PowerUsageSummaries
              currentUserId={this.state.userId as number}
              kc={this.state.keycloakInstance}
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