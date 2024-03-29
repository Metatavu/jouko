import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { UsersApi, Configuration } from 'jouko-ts-client';
import { take } from 'lodash';
import { _ } from '../i18n';
import { apiUrl } from '../config';

interface NewUsersProps {
    interruptiongroupId: number;
    starttime: string;
    keycloakId: string;
}
interface Props {
    kc?: Keycloak.KeycloakInstance;
}
interface ControllersProps {
    devicename: string;
    controller: number;
}
interface DevicesProps {
    devicename: string;
    controller: number;
}
interface NewUserState {
    keycloakId: string;
    firstname: string;
    lastname: string;
    email: string;
    deviceName: string;
    controllerId: number;
    rowProps: NewUsersProps[];
    devices: DevicesProps[];
    controllers: ControllersProps[];
}
export class NewUser
    extends React.Component<Props, NewUserState> {
    constructor(props: {}) {
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
        this.handleKeycloakIdChange = this.handleKeycloakIdChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        this.handleControllerIdChange = this.handleControllerIdChange.bind(this);
        this.handleAddDevice = this.handleAddDevice.bind(this);
        this.handleDeleteDevice = this.handleDeleteDevice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleKeycloakIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({keycloakId: event.currentTarget.value});
    }
    handleFirstnameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({firstname: event.currentTarget.value});
    }
    handleLastnameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({lastname: event.currentTarget.value});
    }
    handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({email: event.currentTarget.value});
    }
    handleDeviceNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({deviceName: event.currentTarget.value});
    }
    handleControllerIdChange(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({controllerId: Number(event.currentTarget.value)});
    }
    handleAddDevice(event: React.FormEvent<HTMLInputElement>) {
        const devices: DevicesProps[] = this.state.devices;
        devices.push({
            devicename: this.state.deviceName,
            controller: this.state.controllerId
        });
        this.setState({devices: take(devices, 100)});
        event.preventDefault();
    }
    handleDeleteDevice(event: React.FormEvent<HTMLDivElement>, index: number) {
        if (confirm(_('confirmDeleteDevice'))) {
            const array = this.state.devices;
            const startIndex = Number(index);
            array.splice(startIndex, 1);
        }
        this.forceUpdate();
    }
    async handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const usersApi = new UsersApi(
            configuration,
            apiUrl);

        const payload = {
            username: this.state.keycloakId,
            email: this.state.email,
            firstName: this.state.firstname,
            lastName: this.state.lastname
        };

        try {
            await usersApi.createUser(payload, this.props.kc!.token);
            alert(_('alertUserCreated'));
        } catch (error) {
            alert(_('alertUserCreatedError'));
        }
        
    }

    render() {
        const controllerOption = this.state.rowProps.map(rowProp => {
            return (
                <option
                    key={rowProp.interruptiongroupId.toString()}
                >
                    {rowProp.starttime.toString()}
                </option>
            );
        });
        const usersDevices = this.state.devices.map((devices, index) => {
            return (
                <tr key={index.toString()}>
                    <th>
                        <div
                            onClick={(event) => this.handleDeleteDevice(event, index)}
                        >
                            <i className="fa fa-trash fa-fh"/>
                        </div>
                    </th>
                    <th>{devices.devicename}</th>
                    <th>{devices.controller}</th>
                </tr>
            );
        });

        return (
            <div className="">
                <h1>{_('newUser')}
                    <NavLink to="/ListUser">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>{_('keycloakId')}:</p>
                    <input
                        type="text"
                        name="keycloakId"
                        value={this.state.keycloakId}
                        onChange={this.handleKeycloakIdChange}
                    />
                    <p>{_('firstname')}:</p>
                    <input
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleFirstnameChange}
                    />
                    <p>{_('lastname')}:</p>
                    <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleLastnameChange}
                    />
                    <p>{_('email')}:</p>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <p>{_('devices')}:</p>
                    <table className="UserDevice">
                        <thead className="UserDeviceHead">
                        <tr>
                            <th/>
                            <th>{_('deviceName')}</th>
                            <th>{_('controllerDevice')}</th>
                        </tr>
                        </thead>
                        <tbody className="UserDeviceBody">
                            {usersDevices}
                        </tbody>
                    </table>
                    <table className="NewUserDevice">
                        <thead className="NewUserDeviceHead">
                            <tr>
                                <th>{_('deviceName')}</th>
                                <th>{_('controllerDevice')}</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody className="NewUserDeviceBody">
                            <tr>
                                <th>
                                    <input
                                        type="text"
                                        name="deviceName"
                                        value={this.state.deviceName}
                                        onChange={this.handleDeviceNameChange}
                                    />
                                </th>
                                <th>
                                    <select
                                        name="controllerId"
                                        onChange={this.handleControllerIdChange}
                                    >
                                        // {controllerOption}
                                        <option
                                            value={1}
                                        >
                                            1
                                        </option>
                                        <option
                                            value={2}
                                        >
                                            2
                                        </option>
                                        <option
                                            value={3}
                                        >
                                            3
                                        </option>
                                    </select>
                                </th>
                                <th>
                                    <input
                                        type="submit"
                                        className="btn-add"
                                        value={_('addDevice')}
                                        onClick={(event) => this.handleAddDevice(event)}
                                    />
                                </th>
                            </tr>
                        </tbody>
                        <div className="ActionField">
                            <input type="reset" value={_('cancel')} />
                            <input type="submit" value={_('create')} onClick={(event) => this.handleSubmit(event)}/>
                        </div>
                    </table>
                    </form>
            </div>
        );
    }
}