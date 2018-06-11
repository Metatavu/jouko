import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { take } from 'lodash';
import { _ } from '../i18n';
import { apiUrl } from '../config';

interface NewDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface NewDeviceState {
    deviceName: string;
    userId: number;
    controllerId: number;
    rowProps: NewDevicesProps[];
}

export class NewDevice
    extends React.Component<{}, NewDeviceState> {
    constructor(props: {}) {
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
        event.preventDefault();
        alert(_('alertDeviceCreated'));
    }

    componentDidMount() {
        this.fetchNewDevices();
    }
    async fetchNewDevices() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            apiUrl);
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: NewDevicesProps[] = [];
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
                <h1>{_('newDevice')}
                    <NavLink to="/ListDevice">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>{_('deviceName')}:</p>
                    <input
                        type="text"
                        name="deviceName"
                        value={this.state.deviceName}
                        onChange={this.handleDeviceNameChange}
                    />
                    <p>{_('user')}:</p>
                    <select name="userId">
                        {userOption}
                    </select>
                    <p>{_('controllerDevice')}:</p>
                    <select name="controllerId">
                        {controllerOption}
                    </select>
                    <div className="ActionField">
                        <input type="reset" value={_('cancel')} />
                        <input type="submit" value={_('create')} onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                </form>
            </div>
        );
    }
}