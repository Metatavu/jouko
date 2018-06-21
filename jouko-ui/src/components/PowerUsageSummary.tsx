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

export class PowerUsageSummary
  extends React.Component<PowerUsageSummaryProps> {

  render() {
    return (
        <div className="PowerUsageSummaryCard">
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
        <h3>{_('powerConsumption')}</h3>
        <div className="PowerUsageSummaryContent">
          {rows}
          <div className="PowerUsageSummaryCard">
            <div className="PowerUsageSummaryContainer">
              <NavLink to={'/StatisticsSummary'} onClick={() => window.scrollTo(0, 0)}>
                <h4>{_('allStatistics')}</h4>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

    );
  }
}