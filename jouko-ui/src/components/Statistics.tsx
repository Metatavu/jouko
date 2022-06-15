import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { DevicesApi, Configuration } from 'jouko-ts-client';
import { addMinutes, addHours, addDays, subMinutes, subHours, subDays } from 'date-fns';
import { format as formatDate } from 'date-fns';
import { take } from 'lodash';
import { BeatLoader } from 'react-spinners';
import '../App.css';
import { _ } from '../i18n';
import { apiUrl } from '../config';
import { KeycloakInstance } from 'keycloak-js';

interface ChartProps {
  deviceId: number;
  hourLabels: string[];
  hourData: number[];
  phaseOneData: number[];
  phaseTwoData: number[];
  phaseThreeData: number[];
  threePhaseLabels: string[];
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
  currentDeviceName: String;
}

interface StatisticsProps {
  deviceId: number;
  currentUserId: number;
  kc?: KeycloakInstance;
}

export class Statistics
  extends React.Component<StatisticsProps, StatisticsState> {

  constructor(props: StatisticsProps) {
    super(props);
    this.state = {rowProps: [], allDevices: [], loading: true, currentDeviceName: ''};
  }

  componentDidMount() {
    this.fetchStatistics();
  }

  // Fetch statistics from the API using the jouko-ts-client library
  async fetchStatistics() {
    const configuration = new Configuration({
      apiKey: `Bearer ${this.props.kc!.token}`
    });

    // Fetch the devices data from the API using the jouko-ts-client library
    const devicesApi = new DevicesApi(
      configuration,
      apiUrl);

    // Fetch all measurements from the API using the jouko-ts-client library
    const allMeasurementsApi = new DevicesApi(
      configuration,
      apiUrl);

    const rowProps: ChartProps[] = [];
    const allDevices: AllDevicesProps[] = [];
    let lastHour = subMinutes(new Date(), 60);
    let last24Hour = subHours(new Date(), 24);
    let lastDays = subDays(new Date(), 30);

    const hourLabels = [];
    const hourData = [];
    const hoursLabels = [];
    const phaseOneData: number[] = [];
    const phaseTwoData: number[] = [];
    const phaseThreeData: number[] = [];
    const threePhaseLabels = [];
    const hoursData = [];
    const daysLabels = [];
    const daysData = [];

    const devices = await devicesApi.listDevices(this.props.currentUserId, 0, 1000);
    
    for (const device of devices) {
      if (device.id.toString() === this.props.deviceId.toString()) {
        this.setState({currentDeviceName: device.name.toString()});
      }
      allDevices.push({
        deviceId: device.id,
        name: device.name,
      });
    }

    for (let i = 0; i < 12; i++) {
      let startTime = addMinutes(lastHour, i * 5);
      let endTime = i === 11 ? addMinutes(startTime, 10) : addMinutes(startTime, 5);

      const values = (
        await allMeasurementsApi.listMeasurementsByDevice(
          this.props.currentUserId, this.props.deviceId, formatDate(startTime), formatDate(endTime))
        );

      threePhaseLabels.push(formatDate(startTime, 'HH:mm'));
      
      values.forEach((value) => {
        switch (value.phaseNumber) {
          case 1:
            phaseOneData.push(value.measurementValue);
            break;
          case 2:
            phaseTwoData.push(value.measurementValue);
            break;
          case 3:
            phaseThreeData.push(value.measurementValue);
            break; 
          default:
            break;
        }
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
      threePhaseLabels: threePhaseLabels,
      phaseOneData: phaseOneData,
      phaseTwoData: phaseTwoData,
      phaseThreeData: phaseThreeData,
      hoursData: hoursData,
      daysLabels: daysLabels,
      daysData: daysData
    });
    this.setState({allDevices: take(allDevices, 40), rowProps: take(rowProps, 40), loading: false});
  }
  render() {
    {/*
    const filterOptions = this.state.allDevices.map(device => {
        if (this.props.deviceId.toString() === device.deviceId.toString()) {
          return (
            <option
              key={device.deviceId.toString()}
              value={`/Statistics/${device.deviceId.toString()}`}
              selected={true}
              onClick={() => location.replace(`/Statistics/${device.deviceId.toString()}`)}
            >
              {device.deviceId.toString()} | {device.name.toString()}
            </option>
          );
        } else {
          return (
            <option
              key={device.deviceId.toString()}
              value={`/Statistics/${device.deviceId.toString()}`}
              selected={false}
              onClick={() => location.replace(`/Statistics/${device.deviceId.toString()}`)}
            >
              {device.deviceId.toString()} | {device.name.toString()}
            </option>
          );
        }
    });
    */}
    const hourChart = this.state.rowProps.map(prop => {
      return (
        <div key={prop.deviceId.toString()}>
          <h3>{this.state.currentDeviceName.toString()}</h3>
          <h4>{_('statistics')} | {_('1hour')}</h4>
          <Bar
            data={
              {
                labels: prop.hourLabels,
                datasets: [
                  {
                    label: _('1hourlegend'),
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
          <h4>{_('statistics')} | {_('24hours')}</h4>
          <Bar
            data={
              {
                labels: prop.hoursLabels,
                datasets: [
                  {
                    label: _('24hourslegend'),
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
          <h4>{_('statistics')} | {_('30days')}</h4>
          <Line
            data={
            {
              labels: prop.daysLabels,
              datasets: [
                {
                  label: _('30dayslegend'),
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
          <h4>{_('phase')} | {_('1hour')}</h4>
          <Line
            data={
            {
              labels: prop.threePhaseLabels,
              datasets: [
                {
                  label: '1',
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
                  data: prop.phaseOneData
                },
                {
                  label: '2',
                  fill: false,
                  lineTension: 0.1,
                  borderWidth: 1,
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'blue',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'blue',
                  pointHoverBorderColor: 'blue',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: prop.phaseTwoData
                },
                {
                  label: '3',
                  fill: false,
                  lineTension: 0.1,
                  borderWidth: 1,
                  backgroundColor: 'red',
                  borderColor: 'red',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(48,196,201,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'red',
                  pointHoverBorderColor: 'red',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: prop.phaseThreeData
                }
              ]
            }
          }
          />
        </div>
      );
    });
    {/*
    let statisticsFilter;
    if (this.state.loading === false) {
      statisticsFilter = (
          <select>
            <option
              value="/StatisticsSummary"
              onClick={() => location.replace('/StatisticsSummary')}
            >
              {_('allStatistics')}
            </option>
            {filterOptions}
          </select>
        );
      }
      */}
    return (
      <div>
        <div className="sweet-loading">
          <BeatLoader
            color={'#30C4C9'}
            loading={this.state.loading}
          />
        </div>
        <div className="Statistics">
          {hourChart}
        </div>
        {/*
        <div className="StatisticsFilter">
          {statisticsFilter}
        </div>
        */}
      </div>
    );
  }
}