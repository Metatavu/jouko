import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';

interface DeviceProps {
    deviceId: number;
    deviceName: string;
    firstname: string;
    lastname: string;
    controllerId: number;
}
export class ListDevice extends React.Component<DeviceProps> {
    handleDeleteDevice(event: React.FormEvent<HTMLDivElement>) {
        if (confirm(_('confirmDeleteDevice'))) {
            console.log(this.props.deviceId);
            console.log(this.props.deviceName);
            console.log(this.props.firstname);
            console.log(this.props.lastname);
            console.log(this.props.controllerId);
        }
        this.forceUpdate();
    }
    sortById(event: React.FormEvent<HTMLOptionElement>) {
        alert(_('sortBy'));
    }
    sortByDeviceName(event: React.FormEvent<HTMLOptionElement>) {
        alert(_('sortBy'));
    }
    sortByUser(event: React.FormEvent<HTMLOptionElement>) {
        alert(_('sortBy'));
    }
    sortByController(event: React.FormEvent<HTMLOptionElement>) {
        alert(_('sortBy'));
    }
    render() {
        return (
            <div className="">
                <h1>{_('allDevices')}
                    <NavLink to="/NewDevice">
                        <button className="btn">{_('newDevice')}</button>
                    </NavLink>
                </h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={false}
                    />
                </div>
                <div className="SearchFilter">
                    <p>{_('sortBy')}:
                    <select>
                        <option onClick={this.sortById}>ID</option>
                        <option onClick={this.sortByDeviceName}>{_('deviceName')}</option>
                        <option onClick={this.sortByUser}>{_('user')}</option>
                        <option onClick={this.sortByController}>{_('controllerDevice')}</option>
                    </select>
                    </p>
                </div>
                <table className="All">
                    <thead className="DeviceHead">
                    <tr>
                        <th/>
                        <th/>
                        <th>ID</th>
                        <th>{_('deviceName')}</th>
                        <th>{_('user')}</th>
                        <th>{_('controllerDevice')}</th>
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
                        <th>1</th>
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
                        <th>2</th>
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