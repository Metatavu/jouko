import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { InterruptionGroupsApi } from 'jouko-ts-client';
// import { Device } from './Device';
import * as _ from 'lodash';
// import { UserApi } from 'jouko-ts-client';

interface NewUsersProps {
    interruptiongroupId: number;
    starttime: string;
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
    extends React.Component<{}, NewUserState> {
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
        this.setState({devices: _.take(devices, 100)});
        event.preventDefault();
        alert('Device added!');
    }
    handleDeleteDevice(event: React.FormEvent<HTMLDivElement>, index: number) {
        if (confirm('This device will be deleted!')) {
            const array = this.state.devices;
            const startIndex = Number(index);
            array.splice(startIndex, 1);
        }
        this.forceUpdate();
    }
    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        console.log(this.state.keycloakId);
        console.log(this.state.firstname);
        console.log(this.state.lastname);
        console.log(this.state.email);
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        console.log(this.state.deviceName);
        console.log(this.state.keycloakId);
        console.log(this.state.firstname);
        console.log(this.state.lastname);
        console.log(this.state.controllerId);
        {/*
        const userApi = new UserApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        userApi.createNewUser(
            {
                id: 0,
                keycloakId: this.state.keycloakId,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                deviceName: this.state.deviceName
            });
        */}
        event.preventDefault();
        alert('User created');
    }

    componentDidMount() {
        this.fetchControllerAndDevices();
    }
    async fetchControllerAndDevices() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: NewUsersProps[] = [];
        for (const interruptionGroup of interruptionGroups) {
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime
            });
        }
        this.setState({rowProps: _.take(rowProps, 100)});
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
        //
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
        {/*
        const deviceRows = this.state.rowProps.map(rowProp => {
            return (
                <Device
                    key={rowProp.interruptiongroupId.toString()}
                    {...rowProp}
                />
            );
        });
        */}
        return (
            <div className="">
                <h1>New User
                    <NavLink to="/ListUser">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    {/*
                    <p>UserID:</p>
                    <input
                        type="text"
                        name="userId"
                        disabled={true}
                        value={this.state.userId}
                        onChange={this.handleUserIdChange}
                    />
                    */}
                    <p>Keycloak ID:</p>
                    <input
                        type="text"
                        name="keycloakId"
                        value={this.state.keycloakId}
                        onChange={this.handleKeycloakIdChange}
                    />
                    <p>Firstname:</p>
                    <input
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleFirstnameChange}
                    />
                    <p>Lastname:</p>
                    <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleLastnameChange}
                    />
                    <p>Email:</p>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <p>Devices:</p>
                    <table className="UserDevice">
                        <thead className="UserDeviceHead">
                        <tr>
                            <th/>
                            <th>Device Name</th>
                            <th>Controller</th>
                        </tr>
                        </thead>
                        <tbody className="UserDeviceBody">
                            {usersDevices}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Device Name</th>
                                <th>Controller</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
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
                                        value="Add Device"
                                        onClick={(event) => this.handleAddDevice(event)}
                                    />
                                </th>
                            </tr>
                        </tbody>
                        <div className="ActionField">
                            <input type="reset" value="Cancel" />
                            <input type="submit" value="Create" onClick={(event) => this.handleSubmit(event)}/>
                        </div>
                    </table>
                    </form>
            </div>
        );
    }
}