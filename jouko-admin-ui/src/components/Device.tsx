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
                        <th>Test1</th>
                        <th>Test1</th>
                        <th>Test1</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Test2</th>
                        <th>Test2</th>
                        <th>Test2</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Test3</th>
                        <th>Test3</th>
                        <th>Test3</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}