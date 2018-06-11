import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
import { DevicesApi } from 'jouko-ts-client';
import { take } from 'lodash';
import { apiUrl } from '../config';

interface ShowUserProps {
    userId: number;
}
interface ControllersProps {
    deviceId: number;
    devicename: string;
}
interface DevicesProps {
    deviceId: number;
    devicename: string;
    controller: number;
}
interface ShowUserState {
    keycloakId: string;
    firstname: string;
    lastname: string;
    email: string;
    deviceName: string;
    controllerId: number;
    rowProps: ShowUserProps[];
    devices: DevicesProps[];
    controllers: ControllersProps[];
}

export class ShowUser
    extends React.Component<ShowUserProps, ShowUserState> {
    constructor(props: ShowUserProps) {
        super(props);
        this.state = {
            keycloakId: '',
            firstname: '',
            lastname: '',
            email: '',
            deviceName: '',
            controllerId: 1,
            rowProps: [],
            devices: [],
            controllers: []
        };
    }
    componentDidMount() {
        this.fetchUsersDevices();
    }
    async fetchUsersDevices() {
        const usersDevicesApi = new DevicesApi(
            undefined,
            apiUrl);
        const usersDevices = await usersDevicesApi.listDevices(5, 0, 1000);

        const devices: DevicesProps[] = [];

        for (const usersDevice of usersDevices) {
            devices.push({
                deviceId: usersDevice.id,
                devicename: usersDevice.name,
                controller: usersDevice.id
            });
        }
        this.setState({devices: take(devices, 100)});
    }

    render() {
        const usersDevices = this.state.devices.map((devices, index) => {
            return (
                <tr key={index.toString()}>
                    <th>{devices.deviceId}</th>
                    <th>{devices.devicename}</th>
                    <th>{devices.controller}</th>
                </tr>
            );
        });
        return (
            <div className="">
                <h1>{_('user')}: {this.state.firstname} {this.state.lastname}
                    <NavLink to={`/EditUser/${this.props.userId}`}>
                        <button className="btn">{_('edit')}</button>
                    </NavLink>
                    <NavLink to="/ListUser">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <form className="edit-item-form">
                    <p>{_('userId')}:</p>
                    <input
                        type="text"
                        name="userId"
                        value={Number(this.props.userId)}
                    />
                    <p>{_('keycloakId')}:</p>
                    <input
                        type="text"
                        name="keycloakId"
                        disabled={true}
                        value={this.state.keycloakId}
                    />
                    <p>{_('firstname')}:</p>
                    <input
                        type="text"
                        name="firstname"
                        disabled={true}
                        value={this.state.firstname}
                    />
                    <p>{_('lastname')}:</p>
                    <input
                        type="text"
                        name="lastname"
                        disabled={true}
                        value={this.state.lastname}
                    />
                    <p>{_('email')}:</p>
                    <input
                        type="text"
                        name="email"
                        disabled={true}
                        value={this.state.email}
                    />
                    <p>{_('devices')}:</p>
                    <table className="ShowUserDevice">
                        <thead className="ShowUserDeviceHead">
                        <tr>
                            <th>ID</th>
                            <th>{_('deviceName')}</th>
                            <th>{_('controllerDevice')}</th>
                        </tr>
                        </thead>
                        <tbody className="ShowUserDeviceBody">
                            {usersDevices}
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}