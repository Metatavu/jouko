import * as React from 'react';
import { InterruptionGroupsApi, InterruptionGroup } from 'jouko-ts-client';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './components/Header';
import { Bottombar } from './components/Bottombar';
import { UpcomingInterruptions } from './components/UpcomingInterruptions';
import { PowerUsageSummary } from './components/PowerUsageSummary';
import { InterruptionGroupsTable } from './components/InterruptionGroupsTable';
import { processSwaggerDate } from './ProcessSwaggerDate';

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
        startTime: processSwaggerDate(group.startTime),
        endTime: processSwaggerDate(group.endTime)
      };
    });

    return (
        <BrowserRouter>
          <div>
            <div className="Header">
                <Header />
            </div>

            <div className="App">
              <header className="App-Block1">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">JOUKO - kotiapp</h1>
                <h1>Kirjautuneena: Tero <button>Kirjaudu ulos</button></h1>
              </header>
              <UpcomingInterruptions />
              <PowerUsageSummary />
              <div className="Bottombar">
                <Bottombar />
              </div>
            </div>
            <InterruptionGroupsTable rowProps={rowProps} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;