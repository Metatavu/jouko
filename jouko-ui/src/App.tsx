import * as React from 'react';
import { InterruptionGroupsApi, InterruptionGroup } from 'jouko-ts-client';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';

// import { Header } from './components/Header';
import { Bottombar } from './components/Bottombar';
import { UpcomingInterruptions } from './components/UpcomingInterruptions';
import { PowerUsageSummaries } from './components/PowerUsageSummary';
import { InterruptionGroupsTable } from './components/InterruptionGroupsTable';
import { parse as parseDate } from 'date-fns';
import { Header } from './components/Header';

const logo = require('./logo.svg');

interface AppState {
  interruptionGroups: InterruptionGroup[];
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {interruptionGroups: []};
  }

  componentDidMount() {
    this.updateInterruptionGroups();
  }

  async updateInterruptionGroups() {
    const api = new InterruptionGroupsApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const groups = await api.listInterruptionGroups(0, 10000);
    this.setState({interruptionGroups: groups});
  }

  render() {
    const rowProps = this.state.interruptionGroups.map(group => {
      return {
        entityId: group.id,
        startTime: parseDate(group.startTime),
        endTime: parseDate(group.endTime)
      };
    });

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
                <UpcomingInterruptions />
                <div>
                <PowerUsageSummaries /> <InterruptionGroupsTable rowProps={rowProps} />
                </div>
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