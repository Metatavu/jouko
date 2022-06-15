import * as React from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { AdminUserSettings } from './components/AdminUserSettings';
import { ListControllerDevice } from './components/ListControllerDevice';
import { ListDevice } from './components/ListDevice';
import { ListInterruptionGroups } from './components/ListInterruptionGroups';
import { ListUser } from './components/ListUser';
import { NewControllerDevice } from './components/NewControllerDevice';
import { NewDevice } from './components/NewDevice';
import { NewUpdateFile } from './components/NewUpdateFile';
import { NewInterruptionGroup } from './components/NewInterruptionGroup';
import { NewUser } from './components/NewUser';
import { EditControllerDevice } from './components/EditControllerDevice';
import { EditDevice } from './components/EditDevice';
import { EditUser } from './components/EditUser';
import { ShowUser } from './components/ShowUser';
import * as Keycloak from 'keycloak-js';
import { UsersApi, Configuration } from 'jouko-ts-client';
import { EditInterruptionGroup } from './components/EditInterruptionGroup';
import { apiUrl, authUrl } from './config';

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
                url: authUrl,
                realm: 'jouko-realm',
                clientId: 'jouko-api'
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
        const configuration = new Configuration({
            apiKey: 'Bearer ' + kc!.token
        });

        // tslint:disable-next-line:no-any
        const keycloakId = (kc.idTokenParsed as any).sub;
        const usersApi = new UsersApi(
            configuration,
            apiUrl);
        const user = await usersApi.getUserByKeycloakId(keycloakId);
        console.log('ahahhaa');
        console.log(kc);
        if (user) {
            console.log('javol');
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
                                  kc={this.state.keycloakInstance}
                              />
                          )}
                      />
                      <Route
                          path="/AdminUserSettings"
                          render={props => (
                              <AdminUserSettings
                                  kc={this.state.keycloakInstance}
                                  userId={this.state.userId as number}
                                  username={this.state.username as string}
                                  keycloakId={this.state.keycloakId as string}
                                  email={this.state.email as string}
                                  firstname={this.state.firstname as string}
                                  lastname={this.state.lastname as string}
                              />
                          )}
                      />
                      <Route 
                            path="/ListInterruptionGroups" 
                            render={props => (
                                <ListInterruptionGroups
                                    kc={this.state.keycloakInstance}
                                />
                            )}
                      />
                      <Route 
                            path="/ListUser"
                            render={props => (
                                <ListUser
                                    kc={this.state.keycloakInstance}
                                />
                            )}
                      />
                      <Route 
                        path="/ListControllerDevice"
                        render={props => (
                            <ListControllerDevice
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route 
                        path="/ListDevice"
                        render={props => (
                            <ListDevice
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route 
                        path="/NewInterruptionGroup" 
                        render={props => (
                            <NewInterruptionGroup
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route 
                        path="/NewUpdateFile" 
                        render={props => (
                            <NewUpdateFile
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route 
                        path="/NewUser" 
                        render={props => (
                            <NewUser
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route 
                        path="/NewControllerDevice" 
                        render={props => (
                            <NewControllerDevice
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route 
                        path="/NewDevice" 
                        render={props => (
                            <NewDevice
                                kc={this.state.keycloakInstance}
                            />
                        )}
                      />
                      <Route
                          path="/EditInterruptionGroup/:interruptionGroupId"
                          render={props => (
                              <EditInterruptionGroup
                                  interruptionGroupId={props.match.params.interruptionGroupId as number}
                                  kc={this.state.keycloakInstance}
                              />
                          )}
                      />
                      <Route
                          path="/EditUser/:userId"
                          render={props => (
                              <EditUser
                                  userId={props.match.params.id as number}
                                  currentUserId={this.state.userId as number}
                                  kc={this.state.keycloakInstance}
                              />
                          )}
                      />
                      <Route
                          path="/EditControllerDevice/:controllerDeviceId"
                          render={props => (
                              <EditControllerDevice
                                  kc={this.state.keycloakInstance}
                                  controllerDeviceId={props.match.params.controllerDeviceId as number}
                                  currentUserId={this.state.userId as number}
                              />
                          )}
                      />
                      <Route
                          path="/EditDevice/:deviceId"
                          render={props => (
                              <EditDevice
                                  kc={this.state.keycloakInstance}
                                  deviceId={props.match.params.deviceId as number}
                                  currentUserId={this.state.userId as number}
                              />
                          )}
                      />
                      <Route
                          path="/ShowUser/"
                          render={props => (
                              <ShowUser
                                  userId={props.match.params.id as number}
                                  kc={this.state.keycloakInstance}
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
