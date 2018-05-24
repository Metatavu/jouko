import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { DevicesApi } from 'jouko-ts-client';
import { addMinutes, addHours, addDays, subMinutes, subHours, subDays } from 'date-fns';
import { format as formatDate } from 'date-fns';
import * as _ from 'lodash';
import { BeatLoader } from 'react-spinners';
import '../App.css';

interface ChartProps {
  deviceId: number;
  hourLabels: string[];
  hourData: number[];
  hoursLabels: string[];
  hoursData: number[];
  daysLabels: string[];
  daysData: number[];
}
interface AllDevicesProps {
  deviceId: number;
  name: String;
}

interface StatisticsState {
  allDevices: AllDevicesProps[];
  rowProps: ChartProps[];
  loading: boolean;
}

interface StatisticsProps {
  deviceId: number;
  currentUserId: number;
}

export class Statistics
  extends React.Component<StatisticsProps, StatisticsState> {

  constructor(props: StatisticsProps) {
    super(props);
    this.state = {rowProps: [], allDevices: [], loading: true};
  }

  componentDidMount() {
    this.fetchStatistics();
  }

  async fetchStatistics() {
    const devicesApi = new DevicesApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const rowProps: ChartProps[] = [];
    const allDevices: AllDevicesProps[] = [];
    let lastHour = subMinutes(new Date(), 60);
    let last24Hour = subHours(new Date(), 24);
    let lastDays = subDays(new Date(), 30);

    const hourLabels = [];
    const hourData = [];
    const hoursLabels = [];
    const hoursData = [];
    const daysLabels = [];
    const daysData = [];

    const devices = await devicesApi.listDevices(this.props.currentUserId, 0, 1000);
    for (const device of devices) {
      allDevices.push({
        deviceId: device.id,
        name: device.name,
      });
    }

    for ( let i = 0; i < 12; i++) {
      let startTime = addMinutes(lastHour, i * 5);
      let endTime = addMinutes(startTime, 5);

      const hourLabelTime = formatDate(startTime, 'HH:mm');
      hourLabels.push(hourLabelTime);
      const hourDataValue = (
        await devicesApi.getPowerConsumption(1, this.props.deviceId, formatDate(startTime), formatDate(endTime)));
      hourData.push(hourDataValue.averageConsumptionInWatts);
    }
    for ( let i = 0; i < 24; i++) {
      let hoursStartTime = addHours(last24Hour, i);
      let hoursEndTime = addHours(hoursStartTime, 1);

      const hoursLabelTime = formatDate(hoursStartTime, 'HH:mm');
      hoursLabels.push(hoursLabelTime);
      const hoursDataValue = (
        await devicesApi.getPowerConsumption(
          1, this.props.deviceId, formatDate(hoursStartTime), formatDate(hoursEndTime)));
      hoursData.push(hoursDataValue.averageConsumptionInWatts);
    }
    for ( let i = 0; i < 31; i++) {
      let daysStartTime = addDays(lastDays, i);
      let daysEndTime = addDays(daysStartTime, 1);

      const daysLabelTime = formatDate(daysStartTime, 'DD.MM.YYYY');
      daysLabels.push(daysLabelTime);
      const daysDataValue = (
        await devicesApi.getPowerConsumption(
          1, this.props.deviceId, formatDate(daysStartTime), formatDate(daysEndTime)));
      daysData.push(daysDataValue.averageConsumptionInWatts);
    }
    rowProps.push({
      deviceId: this.props.deviceId,
      hourLabels: hourLabels,
      hourData: hourData,
      hoursLabels: hoursLabels,
      hoursData: hoursData,
      daysLabels: daysLabels,
      daysData: daysData
    });
    this.setState({allDevices: _.take(allDevices, 40), rowProps: _.take(rowProps, 40), loading: false});
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
    const hourChart = this.state.rowProps.map(prop => {
      return (
        <div key={prop.deviceId.toString()}>
          <h1>Current Device: {prop.deviceId.toString()}</h1>
          <h2>Statistics | 1 h</h2>
          <Bar
            data={
              {
                labels: prop.hourLabels,
                datasets: [
                  {
                    label: '1 hour',
                    backgroundColor: 'rgba(48,196,201,0.2)',
                    borderColor: 'rgba(48,196,201,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(48,196,201,0.4)',
                    hoverBorderColor: 'rgba(48,196,201,1)',
                    data: prop.hourData
                  }
                ]
              }
            }
          />
          <h2>Statistics | 24h</h2>
          <Bar
            data={
              {
                labels: prop.hoursLabels,
                datasets: [
                  {
                    label: '24 hours',
                    backgroundColor: 'rgba(48,196,201,0.2)',
                    borderColor: 'rgba(48,196,201,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(48,196,201,0.4)',
                    hoverBorderColor: 'rgba(48,196,201,1)',
                    data: prop.hoursData
                  }
                ]
              }
            }
          />
          <h2>Statistics | 30 days</h2>
          <Line
            data={
            {
              labels: prop.daysLabels,
              datasets: [
                {
                  label: '30 days',
                  fill: false,
                  lineTension: 0.1,
                  borderWidth: 1,
                  backgroundColor: 'rgba(48,196,201,0.2)',
                  borderColor: 'rgba(48,196,201,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(48,196,201,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(48,196,201,1)',
                  pointHoverBorderColor: 'rgba(48,196,201,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: prop.daysData
                }
              ]
            }
          }
          />
        </div>
      );
    });
    return (
      <div>
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
        <div className="Statistics">
          {hourChart}
        </div>
      </div>
    );
  }
}