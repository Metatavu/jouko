import * as React from 'react';
import * as _ from 'lodash';
import { DevicesApi,  } from 'jouko-ts-client';
import { format as formatDate, subHours } from 'date-fns';
import '../App.css';

interface PowerUsageSummaryProps {
  deviceId: number;
  name: String;
  measurementvalue: number;
}

export class PowerUsageSummary
  extends React.Component<PowerUsageSummaryProps> {

  render() {
    return (
      <div>
        <p>
          <button className="btn">{this.props.name}</button>  {this.props.measurementvalue} Watt</p>
      </div>
    );
  }
}

interface PowerUsageSummariesState {
  rowProps: PowerUsageSummaryProps[];
}

export class PowerUsageSummaries
  extends React.Component<{}, PowerUsageSummariesState> {

  constructor(props: {}) {
    super(props);

    this.state = {rowProps: []};
  }

  componentDidMount() {
    this.fetchPowerUsages();
  }

  async fetchPowerUsages() {
    const devicesApi = new DevicesApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const devices = await devicesApi.listDevices(1, 0, 1000);

    const rowProps: PowerUsageSummaryProps[] = [];

    for (const device of devices) {

      let lastHour = formatDate(subHours(new Date(), 1));
      let today = formatDate(new Date());
      const powerUsage = await devicesApi.getPowerConsumption(1, device.id, lastHour, today);
      rowProps.push({
          deviceId: device.id,
          name: device.name,
          measurementvalue: powerUsage.averageConsumptionInWatts
        });
    }

    this.setState({rowProps: _.take(rowProps, 40)});
  }

  render() {
    const rows = this.state.rowProps.map(prop => {
      return (
        <PowerUsageSummary
          key={prop.deviceId.toString()}
          deviceId={prop.deviceId}
          name={prop.name}
          measurementvalue={prop.measurementvalue}
        />
      );
    });

    return (
      <div  className="App-Block3">
        <div>
        <h1 className="App-title">TEHONKULUTUSTIEDOT</h1>
        {rows}
        </div>
      </div>
    );
  }
}