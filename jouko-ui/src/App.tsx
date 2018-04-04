import * as React from 'react';
import { InterruptionGroupsTable } from './components/InterruptionGroupsTable';
import { InterruptionGroupsApi, InterruptionGroup } from 'jouko-ts-client';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Bottombar } from './components/Bottombar';

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
              <header className="App-Block1">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">JOUKO - kotiapp</h1>
                <h1>Kirjautuneena: Tero <button>Kirjaudu ulos</button></h1>
              </header>
              <div className="App-Block2">
                <h1 className="App-title">TULEVAT KATKOT</h1>
                <p>Laite 1: pe 9.2.2018 klo 16.05 - 16.35 <button>ESTÄ KATKO</button></p>
                <p>Laite 2: pe 9.2.2018 klo 16.05 - 16.35 <button>ESTÄ KATKO</button></p>
              </div>
              <div className="App-Block1">
                <h1 className="App-title">TEHONKULUTUSTIEDOT</h1>
                <p><button>Laite 1</button>: 1602 W</p>
                <p><button>Laite 2</button>: 2050 W</p>
              </div>
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