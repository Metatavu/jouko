import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import { Bubble } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import { Polar } from 'react-chartjs-2';
import { DevicesApi,  } from 'jouko-ts-client';
import { addMinutes, subMinutes } from 'date-fns';
import { format as formatDate } from 'date-fns';
import * as _ from 'lodash';

interface StatisticsProps {
  deviceId: number;
  name: string;
  hourLabels: string[];
  hourData: number[];
}

/*############################# DoghnutData #############################*/
const doughnutData = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#b01817',
      '#000033',
      '#ffff00'
    ],
    hoverBackgroundColor: [
      '#b01817',
      '#000033',
      '#ffff00'
    ]
  }]
};
/*############################# BarData #############################*/
const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
/*############################# BubbleData #############################*/
const bubbleData = {
  labels: ['January'],
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
      data: [ { x: 10, y: 20, r: 5 } ]
    }
  ]
};
/*############################# LineData #############################*/
const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
/*############################# radarData #############################*/
const radarData = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
};
/*############################# polarData #############################*/
const polarData = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3,
      14
    ],
    backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB'
    ],
    label: 'My dataset' // for legend
  }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ]
};
/*############################# hoursData #############################*/
const hoursData = {
  labels: ['00', '01', '02', '03', '04', '05',
    '06', '07', '08', '09', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 51,
        60, 41, 48, 63, 70, 81, 56, 55, 40,
        55, 68, 22, 24, 85, 94, 25]
    }
  ]
};
/*############################# daysData #############################*/
const daysData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
/*#############################  #############################*/

interface StatisticsState {
  rowProps: StatisticsProps[];
}

export class Statistics
  extends React.Component<{}, StatisticsState> {

  constructor(props: {}) {
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

    const devices = await devicesApi.listDevices(1, 0, 1000);

    const rowProps: StatisticsProps[] = [];
    for (const device of devices) {
      let lastHour = subMinutes(new Date(), 60);

      const hourLabels = [];
      const hourData = [];

      for ( let i = 0; i < 12; i++) {
        let startTime = addMinutes(lastHour, i * 5);
        let endTime = addMinutes(startTime, 5);

        const hourLabelTime = formatDate(startTime, 'HH:mm');
        hourLabels.push(hourLabelTime);
        const hourDataValue = (
          await devicesApi.getPowerConsumption(1, device.id, formatDate(startTime), formatDate(endTime)));
        hourData.push(hourDataValue.averageConsumptionInWatts);
      }
      rowProps.push({
        deviceId: device.id,
        name: device.name,
        hourLabels: hourLabels,
        hourData: hourData
      });
    }
    this.setState({rowProps: _.take(rowProps, 40)});
  }
  render() {
    const hourChart = this.state.rowProps.map(prop => {
      return (
        <Bar

          key={prop.deviceId.toString()}
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
      );
    });
    return (
      <div>
        <div className="Statistics1">
          <h1>Statistics | Pie</h1>
          <Pie data={doughnutData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Doughnut</h1>
          <Doughnut data={doughnutData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Vertical Bar</h1>
          <Bar data={barData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Horizontal</h1>
          <HorizontalBar data={barData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Bubble</h1>
          <Bubble data={bubbleData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Line</h1>
          <Line data={lineData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Radar</h1>
          <Radar data={radarData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | Polar</h1>
          <Polar data={polarData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | 1 h</h1>
          {hourChart}
        </div>
        <div className="Statistics1">
          <h1>Statistics | 24h</h1>
          <Bar data={hoursData} />
        </div>
        <div className="Statistics1">
          <h1>Statistics | 1 Month</h1>
          <Line data={daysData} />
        </div>
      </div>
    );
  }
}