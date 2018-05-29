import * as React from 'react';
import './Home.css';
import { Line, Pie } from 'react-chartjs-2';
import { NavLink } from 'react-router-dom';

interface  HomeProps {
    firstName: string;
}

const data = {
    labels: ['November', 'December', 'January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Power Consumption',
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
const data2 = {
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

export class Home extends React.Component<HomeProps> {
    render() {
        return(
            <div className="HomeContent">
                <h1>Hello, {this.props.firstName}</h1>
                <div className="HomeChart">
                    <div className="HomeChart1">
                        <h3>Power consumption of the last months:</h3>
                        <Line
                            data={data}
                        />
                    </div>
                    <div className="HomeChart2">
                        <Pie data={data2} />
                    </div>
                </div>
                <br/>
                <hr/>
                <br/>
                <div className="ExampleContainer">
                    <div className="ExampleContainer1">
                        <NavLink to="/NewInterruptionGroup"><h4>New Interruptiongroup</h4></NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewUser"><h4>New User</h4></NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewDevice"><h4>New Device</h4></NavLink>
                    </div>
                </div>
            </div>
        );
    }
}