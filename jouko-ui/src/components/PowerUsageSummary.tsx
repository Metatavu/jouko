import * as React from 'react';

export class PowerUsageSummary extends React.Component {
  render() {
    return (
      <div className="App-Block1">
        <h1 className="App-title">TEHONKULUTUSTIEDOT</h1>
        <p><button>Laite 1</button>: 1602 W</p>
        <p><button>Laite 2</button>: 2050 W</p>
      </div>
    );
  }
}