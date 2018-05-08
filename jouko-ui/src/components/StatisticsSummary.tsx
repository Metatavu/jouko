import * as React from 'react';
import { Pie } from 'react-chartjs-2';

const device1 = {
  labels: [
    'Interruptions',
    'Power Consumption'
  ],
  datasets: [{
    data: [5, 300],
    backgroundColor: [
      '#c4c930',
      '#269ca0'
    ],
    hoverBackgroundColor: [
      '#c4c930',
      '#269ca0'
    ]
  }]
};

const device2 = {
  labels: [
    'Interruptions',
    'Power Consumption'
  ],
  datasets: [{
    data: [10, 400],
    backgroundColor: [
      '#c4c930',
      '#269ca0'
    ],
    hoverBackgroundColor: [
      '#c4c930',
      '#269ca0'
    ]
  }]
};

const device3 = {
  labels: [
    'Interruptions',
    'Power Consumption'
  ],
  datasets: [{
    data: [6, 500],
    backgroundColor: [
      '#c4c930',
      '#269ca0'
    ],
    hoverBackgroundColor: [
      '#c4c930',
      '#269ca0'
    ]
  }]
};

const building = {
  labels: [
    'Interruptions',
    'Power Consumption'
  ],
  datasets: [{
    data: [50, 1500],
    backgroundColor: [
      '#c4c930',
      '#269ca0'
    ],
    hoverBackgroundColor: [
      '#c4c930',
      '#269ca0'
    ]
  }]
};

export class StatisticsSummary
  extends React.Component {

  render() {
      return (
        <div className="StatisticsSummaryContainer">
          {/*
          <div className="StatisticsFilter">
            <select>
              <option value="/StatisticsSummary">All</option>
              <option value="/Statistics/1">Device1</option>
              <option value="/Statistics/2">Device2</option>
              <option value="/Statistics/3">Device3</option>
            </select>
          </div>
          */}
          <div className="DeviceInterruptionTitle">
            <h3>Amount of interruptions compared to the measured overall consumption of the device</h3>
            <p>(This uses real data gathered by Jouko)</p>
          </div>
          <div className="DeviceInterruption">
            <div className="DeviceInterruptionCharts">
              <div className="DeviceInterruptionChart">
                <h4>Device 1</h4>
                <Pie data={device1} />
              </div>
              <div className="DeviceInterruptionChart">
                <h4>Device 2</h4>
                <Pie data={device2} />
              </div>
              <div className="DeviceInterruptionChart">
                <h4>Device 3</h4>
                <Pie data={device3} />
              </div>
            </div>
          </div>
          <div className="BuildingInterruptionTitle">
            <h3>Amount of interruptions compared to overall consumption of the building</h3>
            <p>(This uses imaginary data "from el. Companies")</p>
          </div>
          <div className="BuildingInterruption">
            <div className="BuildingInterruptionCharts">
              <div className="BuildingInterruptionChart">
                <h4>Building</h4>
                <Pie data={building} />
              </div>
            </div>
          </div>

        </div>
      );
    }
}