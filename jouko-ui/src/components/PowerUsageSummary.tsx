import * as React from 'react';
import { take } from 'lodash';
import { DevicesApi } from 'jouko-ts-client';
import { format as formatDate, subHours } from 'date-fns';
import { NavLink } from 'react-router-dom';
import '../App.css';
import { _ } from '../i18n';
import { apiUrl } from '../config';

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
              <p>{this.props.measurementvalue.toFixed(0)} W</p>
            </NavLink>
          </div>
        </div>
    );
  }
}

interface PowerUsageSummariesState {
  rowProps: PowerUsageSummaryProps[];
}
interface  PowerUsageSummariesProps {
  currentUserId: number;
}

export class PowerUsageSummaries
  extends React.Component<PowerUsageSummariesProps, PowerUsageSummariesState> {

  constructor(props: PowerUsageSummariesProps) {
    super(props);
    this.state = {rowProps: []};
  }

  componentDidMount() {
    this.fetchPowerUsages();
  }

  async fetchPowerUsages() {
    const devicesApi = new DevicesApi(
      undefined,
      apiUrl);
    const devices = await devicesApi.listDevices(this.props.currentUserId, 0, 1000);

    const rowProps: PowerUsageSummaryProps[] = [];

    for (const device of devices) {

      let lastHour = formatDate(subHours(new Date(), 1));
      let today = formatDate(new Date());
      const powerUsage = await devicesApi.getPowerConsumption(this.props.currentUserId, device.id, lastHour, today);
      rowProps.push({
          deviceId: device.id,
          name: device.name,
          measurementvalue: powerUsage.averageConsumptionInWatts
        });
    }

    this.setState({rowProps: take(rowProps, 40)});
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
        <h1>{_('powerConsumption')}</h1>
        <div className="PowerUsageSummaryContent">
          {rows}
          <div className="PowerUsageSummaryCard">
            <NavLink to={'/StatisticsSummary'}>
              <img src={deviceImage} width="100%" className="PowerUsageSummaryCardImage"/>
            </NavLink>
            <div className="PowerUsageSummaryContainer">
              <NavLink to={'/StatisticsSummary'} onClick={() => window.scrollTo(0, 0)}>
                <h4>{_('allStatistics')}</h4>
                <p/>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

    );
  }
}