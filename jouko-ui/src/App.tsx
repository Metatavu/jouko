import * as React from 'react';
import { InterruptionGroupsTable } from './components/InterruptionGroupsTable';
import { InterruptionGroupsApi, InterruptionGroup } from 'jouko-ts-client';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
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
      'http://192.168.100.14:8080/api-0.0.1-SNAPSHOT/v1');

    const groups = await api.listInterruptionGroups(0, 10000);
    this.setState({interruptionGroups: groups});
  }

  render() {
    const rowProps = this.state.interruptionGroups.map(group => {
      return {
        entityId: group.id,
        startDate: new Date(group.startTime),
        endDate: new Date(group.endTime)
      };
    });

    return (
        <BrowserRouter>
          <div>
            <div className="Header">
                <Header />
            </div>

            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.tsx</code> and save to reload.
              </p>
            </div>

            <InterruptionGroupsTable rowProps={rowProps} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;