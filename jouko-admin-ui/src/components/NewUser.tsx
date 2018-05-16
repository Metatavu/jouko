import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { Device } from './Device';
import * as _ from 'lodash';
// import { UserApi } from 'jouko-ts-client';

interface NewUserProps {
    createNewUser(): void;
}
interface NewUsersProps {
    interruptiongroupId: number;
    starttime: string;
}
interface NewUserState {
    userId: number;
    keycloakId: string;
    firstname: string;
    lastname: string;
    deviceId: number;
    deviceName: string;
    controllerId: number;
    rowProps: NewUsersProps[];
}

export class NewUser
    extends React.Component<NewUserProps, NewUserState> {
    constructor(props: NewUserProps) {
        super(props);
        this.state = {
            userId: 0,
            keycloakId: '',
            firstname: '',
            lastname: '',
            deviceId: 0,
            deviceName: '',
            controllerId: 6,
            rowProps: []
        };
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleKeycloakIdChange = this.handleKeycloakIdChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleDeviceIdChange = this.handleDeviceIdChange.bind(this);
        this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        this.handleControllerIdChange = this.handleControllerIdChange.bind(this);
    }
    handleUserIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({userId: event.currentTarget.valueAsNumber});
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
    handleDeviceIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({deviceId: event.currentTarget.valueAsNumber});
    }
    handleDeviceNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({deviceName: event.currentTarget.value});
    }
    handleControllerIdChange(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({controllerId: event.currentTarget.index});
    }
    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        const fullName = lastname + ' ' + firstname;
        console.log(this.state.userId);
        console.log(this.state.keycloakId);
        console.log(fullName);
        {/*
        const userApi = new UserApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        userApi.createNewUser(
            {
                id: 0,
                keycloakId: this.state.keycloakId,
                name: fullName
            });
        */}
        event.preventDefault();
        alert('User created');
    }

    componentDidMount() {
        this.fetchNewDevices();
    }
    async fetchNewDevices() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: NewUsersProps[] = [];
        for (const interruptionGroup of interruptionGroups) {
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime,
            });
        }
        this.setState({rowProps: _.take(rowProps, 100)});
    }

    render() {
        const controllerOption = this.state.rowProps.map(rowProp => {
            return (
                <option
                    key={rowProp.interruptiongroupId.toString()}
                    onChange={this.handleControllerIdChange}
                >
                    {rowProp.interruptiongroupId.toString()}
                </option>
            );
        });
        const deviceRows = this.state.rowProps.map(rowProp => {
            return (
                <Device
                    key={rowProp.interruptiongroupId.toString()}
                    {...rowProp}
                />
            );
        });
        return (
            <div className="">
                <h1>New User
                    <NavLink to="/User">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>UserID:</p>
                    <input
                        type="text"
                        name="userId"
                        disabled={true}
                        value={this.state.userId}
                        onChange={this.handleUserIdChange}
                    />
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
                    <p>Devices:</p>
                    <table className="UserDevice">
                        <thead className="UserDeviceHead">
                        <tr>
                            <th>ID</th>
                            <th>Device Name</th>
                            <th>Controller ID</th>
                        </tr>
                        </thead>
                        <tbody className="UserDeviceBody">
                            {deviceRows}
                            <th>ID 1</th>
                            <th>Device Name 1</th>
                            <th>Controller ID 1</th>
                        </tbody>
                    </table>
                    <table>
                        <thead className="DeviceHead">
                            <tr>
                                <th>Device Name</th>
                                <th>Controller ID</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody className="DeviceBody">
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
                                    <select name="controllerId">
                                        {controllerOption}
                                    </select>
                                </th>
                                <th>
                                    <button className="btn-add">
                                        Add Device
                                    </button>
                                </th>
                            </tr>
                        </tbody>
                        <input type="reset" value="Cancel" />
                        <input type="submit" value="Create User" onClick={(event) => this.handleSubmit(event)}/>
                    </table>
                    </form>
            </div>
        );
    }
}