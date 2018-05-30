import * as React from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { AdminUserSettings } from './components/AdminUserSettings';
import { ListDevice } from './components/ListDevice';
import { ListInterruptionGroups } from './components/ListInterruptionGroups';
import { ListUser } from './components/ListUser';
import { NewDevice } from './components/NewDevice';
import { NewInterruptionGroup } from './components/NewInterruptionGroup';
import { NewUser } from './components/NewUser';
import { EditDevice } from './components/EditDevice';
import { EditUser } from './components/EditUser';
import { ShowUser } from './components/ShowUser';
import * as Keycloak from 'keycloak-js';
import { UsersApi } from 'jouko-ts-client';
import { EditInterruptionGroup } from './components/EditInterruptionGroup';

interface AppState {
    keycloakInstance?: Keycloak.KeycloakInstance;
    username?: string;
    keycloakId?: string;
    userId?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
    interruptionGroupId: number;
    starttime: string;
    endtime: string;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            interruptionGroupId: 0,
            starttime: '',
            endtime: '',
            powerSavingGoalInWatts: 0,
            overbookingFactor: 0,
        };
    }
    componentDidMount() {
        const kc = Keycloak(
            {
                url: 'http://localhost:9080/auth/',
                realm: 'master',
                clientId: 'admin-jouko'
            }
        );
        kc.init({ onLoad: 'login-required' })
            .success(() => {
                    this.fetchAdmin(kc);
                    // tslint:disable-next-line:no-any
                    // console.log(kc.idTokenParsed as any);
                }
            )
            .error((e) => {console.log(e); } );
    }
    // tslint:disable-next-line:no-any
    async fetchAdmin(kc: any) {

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

  public render() {
      let content;
      if (!this.state.keycloakInstance) {
          content = '';
      } else {
          content = (

              <div>
                  <div className="Navigationbar">
                      <Navigation/>
                      <Topbar logout={() => this.logout()}/>
                  </div>
                  <div className="HomeContainer">
                      <Route
                          path="/"
                          exact={true}
                          render={props => (
                              <Home
                                  firstName={this.state.firstname as string}
                              />
                          )}
                      />
                      <Route
                          path="/AdminUserSettings"
                          render={props => (
                              <AdminUserSettings
                                  userId={this.state.userId as number}
                                  username={this.state.username as string}
                                  keycloakId={this.state.keycloakId as string}
                                  email={this.state.email as string}
                                  firstname={this.state.firstname as string}
                                  lastname={this.state.lastname as string}
                              />
                          )}
                      />
                      <Route path="/ListInterruptionGroups" component={ListInterruptionGroups}/>
                      <Route path="/ListUser" component={ListUser}/>
                      <Route path="/ListDevice" component={ListDevice}/>
                      <Route path="/NewInterruptionGroup" component={NewInterruptionGroup}/>
                      <Route path="/NewUser" component={NewUser}/>
                      <Route path="/NewDevice" component={NewDevice}/>
                      <Route
                          path="/EditInterruptionGroup/"
                          render={props => (
                              <EditInterruptionGroup
                                  interruptionGroupId={props.match.params.id as number}
                              />
                          )}
                      />
                      <Route
                          path="/EditUser/"
                          render={props => (
                              <EditUser
                                  userId={props.match.params.id as number}
                                  currentUserId={this.state.userId as number}
                              />
                          )}
                      />
                      <Route
                          path="/EditDevice/"
                          render={props => (
                              <EditDevice
                                  deviceId={props.match.params.id as number}
                                  currentUserId={this.state.userId as number}
                              />
                          )}
                      />
                      <Route
                          path="/ShowUser/"
                          render={props => (
                              <ShowUser
                                  userId={props.match.params.id as number}
                                  currentUserId={this.state.userId as number}
                              />
                          )}
                      />
                  </div>
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
