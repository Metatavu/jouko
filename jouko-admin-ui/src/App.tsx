import * as React from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { Navigation } from './components/Navigation';
import { InterruptionGroups } from './components/InterruptionGroups';
import { NewInterruptionGroup } from './components/NewInterruptionGroup';
import { Home } from './components/Home';
import { User } from './components/User';
import { Device } from './components/Device';
import { NewUser } from './components/NewUser';
import { NewDevice } from './components/NewDevice';

class App extends React.Component {
  public render() {
    return (
        /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
      */
        <BrowserRouter>
            <div>
                <div className="Navigationbar">
                    <Topbar />
                    <Navigation />
                </div>
                <div className="HomeContainer">
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/InterruptionGroups" component={InterruptionGroups} />
                    <Route path="/User" component={User} />
                    <Route path="/Device" component={Device} />
                    <Route path="/NewInterruptionGroup" component={NewInterruptionGroup} />
                    <Route path="/NewUser" component={NewUser} />
                    <Route path="/NewDevice" component={NewDevice} />
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
