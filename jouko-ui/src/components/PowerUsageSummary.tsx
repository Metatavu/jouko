import * as React from 'react';
import * as _ from 'lodash';
import { DevicesApi,  } from 'jouko-ts-client';
import { format as formatDate, subHours } from 'date-fns';
import { NavLink } from 'react-router-dom';
import '../App.css';

interface PowerUsageSummaryProps {
  deviceId: number;
  name: String;
  measurementvalue: number;
}
const deviceImage = require('../img/device.JPG');
export class PowerUsageSummary
  extends React.Component<PowerUsageSummaryProps> {

  render() {
    return (
        <div className="PowerUsageSummaryCard">
          <NavLink to={`/Statistics/${this.props.deviceId}`}>
            <img src={deviceImage} width="100%" className="PowerUsageSummaryCardImage"/>
          </NavLink>
          <div className="PowerUsageSummaryContainer">
            <NavLink to={`/Statistics/${this.props.deviceId}`}>
              <h4>{this.props.name} </h4>
              <p>{this.props.measurementvalue} Watt</p>
            </NavLink>
          </div>
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
      <div>
        <h1>TEHONKULUTUS</h1>
        <div className="PowerUsageSummaryContent">
          {rows}
        </div>
      </div>

    );
  }
}