import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
// import { DeviceApi } from 'jouko-ts-client';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import * as _ from 'lodash';

interface NewDeviceProps {
    createNewUser(): void;
}
interface NewDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface NewDeviceState {
    deviceId: number;
    deviceName: string;
    userId: number;
    controllerId: number;
    rowProps: NewDevicesProps[];
}

export class NewDevice
    extends React.Component<NewDeviceProps, NewDeviceState> {
    constructor(props: NewDeviceProps) {
        super(props);
        this.state = {
            deviceId: 0,
            deviceName: '',
            userId: 5,
            controllerId: 6,
            rowProps: []
        };
        this.handleDeviceIdChange = this.handleDeviceIdChange.bind(this);
        this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleControllerIdChange = this.handleControllerIdChange.bind(this);
    }
    handleDeviceIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({deviceId: event.currentTarget.valueAsNumber});
    }
    handleDeviceNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({deviceName: event.currentTarget.value});
    }
    handleUserIdChange(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({userId: event.currentTarget.index});
    }
    handleControllerIdChange(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({controllerId: event.currentTarget.index});
    }
    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        console.log(this.state.deviceId);
        console.log(this.state.deviceName);
        console.log(this.state.userId);
        console.log(this.state.controllerId);
        {/*
        const deviceApi = new DeviceApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        deviceApi.createDevice(
            {
                deviceId: 0,
                deviceName: deviceName,
                userId: userId,
                controllerId: controllerId
            });
        */}
        event.preventDefault();
        alert('Device created');
    }

    componentDidMount() {
        this.fetchNewDevices();
    }
    async fetchNewDevices() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: NewDevicesProps[] = [];
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
        const userOption = this.state.rowProps.map(rowProp => {
            return (
                <option
                    key={rowProp.interruptiongroupId.toString()}
                    onChange={this.handleUserIdChange}
                >
                    {rowProp.starttime.toString()}
                </option>
            );
        });
        return (
            <div className="">
                <h1>New Device
                    <NavLink to="/Device">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>Device ID:</p>
                    <input
                        type="text"
                        name="deviceId"
                        disabled={true}
                        value={this.state.deviceId}
                        onChange={this.handleDeviceIdChange}
                    />
                    <p>Devicename:</p>
                    <input
                        type="text"
                        name="deviceName"
                        value={this.state.deviceName}
                        onChange={this.handleDeviceNameChange}
                    />
                    <p>User ID:</p>
                    <select name="userId">
                        {userOption}
                        {/*
                        <option
                            value={this.state.userId}
                            onChange={this.handleUserIdChange}
                        >User1
                        </option>
                        <option
                            value={this.state.userId}
                            onChange={this.handleUserIdChange}
                        >User2
                        </option>
                        <option
                            value={this.state.userId}
                            onChange={this.handleUserIdChange}
                        >User3
                        </option>
                        */}
                    </select>
                    <p>Controller ID:</p>
                    <select name="controllerId">
                        {controllerOption}
                        {/*
                        <option
                            value={this.state.controllerId}
                            onChange={this.handleControllerIdChange}
                        >Controller1
                        </option>
                        <option
                            value={this.state.controllerId}
                            onChange={this.handleControllerIdChange}
                        >Controller2
                        </option>
                        <option
                            value={this.state.controllerId}
                            onChange={this.handleControllerIdChange}
                        >Controller3
                        </option>
                        */}
                    </select>
                    <input type="reset" value="Cancel" />
                    <input type="submit" value="Create"  onClick={(event) => this.handleSubmit(event)} />
                </form>
            </div>
        );
    }
}