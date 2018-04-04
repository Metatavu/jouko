import * as React from 'react';
import './App.css';
import { InterruptionGroupsApi, InterruptionGroup } from 'jouko-ts-client';

// const logo = require('./logo.svg');

interface InterruptionGroupTableRowProps {
  entityId: Number;
  startDate: Date;
  endDate: Date;
}

class InterruptionGroupsTableRow extends React.Component<InterruptionGroupTableRowProps, {}> {
  constructor(props: InterruptionGroupTableRowProps) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
      <tr>
        <td>{this.props.entityId}</td>
        <td>{this.props.startDate.toISOString()}</td>
        <td>{this.props.endDate.toISOString()}</td>
      </tr>
    );
  }
}

interface InterruptionGroupTableProps {
  rowProps: InterruptionGroupTableRowProps[];
}

class InterruptionGroupsTable extends React.Component<InterruptionGroupTableProps> {
  constructor(props: InterruptionGroupTableProps) {
    super(props);
  }

  render() {
    const rows = [];
    for (const rowProp of this.props.rowProps) {
      rows.push(
        <InterruptionGroupsTableRow
          key={rowProp.entityId.toString()}
          entityId={rowProp.entityId}
          startDate={rowProp.startDate}
          endDate={rowProp.endDate}
        />
      );
    }

    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

interface AppState {
  interruptionGroups: InterruptionGroup[];
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {interruptionGroups: []};
  }

  componentDidMount() {
    const api = new InterruptionGroupsApi(undefined, 'http://192.168.100.14:8080/api-0.0.1-SNAPSHOT/v1');

    api.listInterruptionGroups(0, 10000).then(groups => {
      this.setState({interruptionGroups: groups});
    });
  }

  render() {
    return (
      <div className="App">
      {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      */}
        <InterruptionGroupsTable
          rowProps={this.state.interruptionGroups.map(group => {
            console.log(group);
            return {
              entityId: group.id,
              startDate: new Date(group.startTime),
              endDate: new Date(group.endTime)};
            })
          }
        />
      </div>
    );
  }
}

export default App;