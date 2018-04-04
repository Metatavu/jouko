import * as React from 'react';
import './App.css';

// const logo = require('./logo.svg');

class App extends React.Component {
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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2018-04-04T11:11:33+03:00</td>
            <td>2018-04-04T12:11:33+03:00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2018-04-04T15:11:33+03:00</td>
            <td>2018-04-04T16:11:33+03:00</td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
}

export default App;