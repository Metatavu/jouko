import * as React from 'react';
import './App.css';
import { InterruptionGroupsTable } from './InterruptionGroupsTable';
import { InterruptionGroupsApi, InterruptionGroup } from 'jouko-ts-client';

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

  onRefreshClick() {
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
    return (
      <div className="App">
        <InterruptionGroupsTable
          rowProps={this.state.interruptionGroups.map(group => {
            return {
              entityId: group.id,
              startDate: new Date(group.startTime),
              endDate: new Date(group.endTime)};
            })
          }
        />
        <button onClick={() => this.onRefreshClick()}>Refresh</button>
      </div>
    );
  }
}

export default App;