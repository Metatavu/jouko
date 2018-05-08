import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

export class Device extends React.Component {
    render() {
        return (
            <div className="">
                <h1>All Devices
                    <NavLink to="/NewDevice">
                        <button className="btn">New Device</button>
                    </NavLink>
                </h1>
                <table>
                    <thead className="DeviceHead">
                    <tr>
                        <th>ID</th>
                        <th>Device Name</th>
                        <th>User ID</th>
                        <th>Controller ID</th>
                    </tr>
                    </thead>
                    <tbody className="DeviceBody">
                    <tr>
                        <th>1</th>
                        <th>Device1</th>
                        <th>User1</th>
                        <th>Controller1</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Device2</th>
                        <th>User2</th>
                        <th>Controller2</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Device3</th>
                        <th>User3</th>
                        <th>Controller3</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}