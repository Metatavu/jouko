import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { DevicesApi,  } from 'jouko-ts-client';
import { addMinutes, addHours, addDays, subMinutes, subHours, subDays } from 'date-fns';
import { format as formatDate } from 'date-fns';
import * as _ from 'lodash';

interface ChartProps {
  deviceId: number;
  hourLabels: string[];
  hourData: number[];
  hoursLabels: string[];
  hoursData: number[];
  daysLabels: string[];
  daysData: number[];
}
interface StatisticsState {
  rowProps: ChartProps[];
}

interface StatisticsProps {
  deviceId: number;
}

export class Statistics
  extends React.Component<StatisticsProps, StatisticsState> {

  constructor(props: StatisticsProps) {
    super(props);
    this.state = {rowProps: []};
  }

  componentDidMount() {
    this.fetchStatistics();
  }

  async fetchStatistics() {
    const devicesApi = new DevicesApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const rowProps: ChartProps[] = [];
    let lastHour = subMinutes(new Date(), 60);
    let last24Hour = subHours(new Date(), 24);
    let lastDays = subDays(new Date(), 30);

    const hourLabels = [];
    const hourData = [];
    const hoursLabels = [];
    const hoursData = [];
    const daysLabels = [];
    const daysData = [];

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
    this.setState({rowProps: _.take(rowProps, 40)});
  }
  render() {
    const hourChart = this.state.rowProps.map(prop => {
      return (
        <div key={prop.deviceId.toString()}>
          <h1>Statistics | 1 h</h1>
          <Bar
            data={
              {
                labels: prop.hourLabels,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: prop.hourData
                  }
                ]
              }
            }
          />
          <h1>Statistics | 24h</h1>
          <Bar
            data={
              {
                labels: prop.hoursLabels,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: prop.hoursData
                  }
                ]
              }
            }
          />
          <h1>Statistics | 30 days</h1>
          <Line
            data={
            {
              labels: prop.daysLabels,
              datasets: [
                {
                  label: 'My First dataset',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
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
      <div className="Statistics">
        {hourChart}
      </div>
    );
  }
}