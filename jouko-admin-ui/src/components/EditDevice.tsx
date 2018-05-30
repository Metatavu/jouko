import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
// import { DeviceApi } from 'jouko-ts-client';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { take } from 'lodash';

interface EditDeviceProps {
    deviceId: number;
    currentUserId: number;
}

interface EditDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface EditDeviceState {
    deviceName: string;
    userId: number;
    controllerId: number;
    rowProps: EditDevicesProps[];
}

export class EditDevice
    extends React.Component<EditDeviceProps, EditDeviceState> {
    constructor(props: EditDeviceProps) {
        super(props);
        this.state = {
            deviceName: '',
            userId: 5,
            controllerId: 6,
            rowProps: []
        };
        this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleControllerIdChange = this.handleControllerIdChange.bind(this);
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
        this.fetchEditDevices();
    }
    async fetchEditDevices() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: EditDevicesProps[] = [];
        for (const interruptionGroup of interruptionGroups) {
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime,
            });
        }
        this.setState({rowProps: take(rowProps, 100)});
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
                <h1>Edit Device
                    <NavLink to="/ListDevice">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="edit-item-form">
                    {/*
                    <p>Device ID:</p>
                    <input
                        type="text"
                        name="deviceId"
                        disabled={true}
                        value={this.state.deviceId}
                        onChange={this.handleDeviceIdChange}
                    />
                    */}
                    <p>Devicename:</p>
                    <input
                        type="text"
                        name="deviceName"
                        value={this.state.deviceName}
                        onChange={this.handleDeviceNameChange}
                    />
                    <p>User:</p>
                    <select name="userId">
                        {userOption}
                    </select>
                    <p>Controller:</p>
                    <select name="controllerId">
                        {controllerOption}
                    </select>
                    <div className="ActionField">
                        <input type="reset" value="Cancel" />
                        <input type="submit" value="Edit" onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                </form>
            </div>
        );
    }
}