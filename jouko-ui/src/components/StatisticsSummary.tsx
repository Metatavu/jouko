import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { DevicesApi  } from 'jouko-ts-client';
import { take } from 'lodash';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';

const device1 = {
  labels: [
    _('interruptions'),
    _('powerConsumption')
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
    _('interruptions'),
    _('powerConsumption')
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
    _('interruptions'),
    _('powerConsumption')
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
    _('interruptions'),
    _('powerConsumption')
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

interface AllDevicesProps {
  deviceId: number;
  name: String;
}
interface StatisticsSummaryState {
  allDevices: AllDevicesProps[];
  loading: boolean;
}

interface StatisticsSummaryProps {
  currentUserId: number;
  firstname: string;
  lastname: string;
}

export class StatisticsSummary

  extends React.Component<StatisticsSummaryProps, StatisticsSummaryState> {
  constructor(props: StatisticsSummaryProps) {
    super(props);
    this.state = {allDevices: [], loading: true};
  }

  componentDidMount() {
    this.fetchDevices();
  }

  async fetchDevices() {
    const devicesApi = new DevicesApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const allDevices: AllDevicesProps[] = [];

    const devices = await devicesApi.listDevices(this.props.currentUserId, 0, 1000);
    for (const device of devices) {
      allDevices.push({
        deviceId: device.id,
        name: device.name,
      });
    }
    this.setState({allDevices: take(allDevices, 40), loading: false});
  }
  onUrlSelected(event: React.FormEvent<HTMLOptionElement>) {
    const url = event.currentTarget.value;
    console.log(url);
    console.log(typeof url);
    location.replace(url);
  }
  render() {

    const filterOptions = this.state.allDevices.map(device => {
      return (
        <option
          key={device.deviceId.toString()}
          value={`/Statistics/${device.deviceId.toString()}`}
          onClick={this.onUrlSelected}
        >
          {device.deviceId.toString()} | {device.name.toString()}
        </option>
      );
    });
    const statisticsSummary = (
      <div>
        <div className="DeviceInterruptionTitle">
          <h2>{_('totalEnergy')}</h2>
        </div>
        <div className="DeviceInterruption">
          <div className="DeviceInterruptionCharts">
            <div className="DeviceInterruptionChart">
              <h4>{_('device')} 1 | {_('totalSaving')}: 100</h4>
              <Pie data={device1} />
            </div>
            <div className="DeviceInterruptionChart">
              <h4>{_('device')} 2 | {_('totalSaving')}: 150</h4>
              <Pie data={device2} />
            </div>
            <div className="DeviceInterruptionChart">
              <h4>{_('device')} 3 | {_('totalSaving')}: 120</h4>
              <Pie data={device3} />
            </div>
          </div>
        </div>
        <div className="BuildingInterruptionTitle">
          <h2>{_('buildingEnergy')}</h2>
        </div>
        <div className="BuildingInterruption">
          <div className="BuildingInterruptionCharts">
            <div className="BuildingInterruptionChart">
              <h4>{_('building')} | {_('totalSaving')}: 470</h4>
              <Pie data={building} />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="StatisticsSummaryContainer">
        <div className="StatisticsFilter">
          <select>
            <option>Select Statistics ...</option>
            <option
              value="/StatisticsSummary"
              onClick={this.onUrlSelected}
            >
              All Statistics
            </option>
            {filterOptions}
          </select>
        </div>
        <div className="sweet-loading">
          <BeatLoader
            color={'#30C4C9'}
            loading={this.state.loading}
          />
        </div>
        <div>
          {statisticsSummary}
        </div>
      </div>
    );
  }
}