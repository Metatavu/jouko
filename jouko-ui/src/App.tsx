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

const logo = require('./logo.svg');

class App extends React.Component {

  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
        <BrowserRouter>
            <div className="wrapper">
              <div className="App">
                <div className="Navigation">
                  <Header/>
                </div>
                <div className="Logout">
                  <i className="fa fa-sign-out" />
                </div>
                <header className="App-Block1">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">JOUKO - kotiapp</h1>
                  <h1>Kirjautuneena: Tero </h1>
                </header>
                <Route path="/" exact={true} component={Home} />
                <Route path="/User" component={User} />
                <Route path="/Settings" component={Settings} />
                <Route path="/UpcomingInterruptions" component={UpcomingInterruptions} />
                <Route path="/InterruptionGroupsTable" component={InterruptionGroupsTable} />
                <Route path="/PowerUsageSummary" component={PowerUsageSummary} />
              </div>
              <div className="Bottombar">
                <Bottombar />
              </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;