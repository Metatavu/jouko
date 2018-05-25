import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

interface DeviceProps {
    deviceId: number;
}

export class ListDevice extends React.Component<DeviceProps> {
    handleDeleteDevice(event: React.FormEvent<HTMLDivElement>) {
        if (confirm('This device will be deleted!')) {
            {/*
            const array = this.state.devices;
            const startIndex = Number(index);
            array.splice(startIndex, 1);
            */}
        }
        this.forceUpdate();
    }
    render() {
        return (
            <div className="">
                <h1>All Devices
                    <NavLink to="/NewDevice">
                        <button className="btn">New Device</button>
                    </NavLink>
                </h1>
                <table className="All">
                    <thead className="DeviceHead">
                    <tr>
                        <th/>
                        <th/>
                        <th>Device Name</th>
                        <th>User</th>
                        <th>Controller</th>
                    </tr>
                    </thead>
                    <tbody className="DeviceBody">
                    <tr>
                        <th>
                            <div
                                onClick={(event) => this.handleDeleteDevice(event)}
                            >
                                <i className="fa fa-trash fa-fh"/>
                            </div>
                        </th>
                        <th>
                            <div>
                                <NavLink to={`/EditDevice/${this.props.deviceId}`}>
                                    <i className="fa fa-edit fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                        <th>Device1</th>
                        <th>User1</th>
                        <th>Controller1</th>
                    </tr>
                    <tr>
                        <th>
                            <div
                                onClick={(event) => this.handleDeleteDevice(event)}
                            >
                                <i className="fa fa-trash fa-fh"/>
                            </div>
                        </th>
                        <th>
                            <div>
                                <NavLink to={`/EditDevice/${this.props.deviceId}`}>
                                    <i className="fa fa-edit fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                        <th>Device2</th>
                        <th>User2</th>
                        <th>Controller2</th>
                    </tr>
                    <tr>
                        <th>
                            <div
                                onClick={(event) => this.handleDeleteDevice(event)}
                            >
                                <i className="fa fa-trash fa-fh"/>
                            </div>
                        </th>
                        <th>
                            <div>
                                <NavLink to={`/EditDevice/${this.props.deviceId}`}>
                                    <i className="fa fa-edit fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
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