import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
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
            userId: 0,
            controllerId: 0,
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
        alert(_('alertDeviceChanged')!);
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
        {/*
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
        */}
        return (
            <div className="">
                <h1>{_('editDevice')}
                    <NavLink to="/ListDevice">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <br/><br/><br/>
                <div className="InformationBox">
                    <div className="InformationBoxIcon">
                        <i className="fa fa-exclamation-triangle"/>
                    </div>
                    <div className="InformationBoxText">
                        <h3>
                            {_('noEditDevicePossible1')}
                            <NavLink to="/ListDevice">
                                {_('noEditDevicePossible2')}
                            </NavLink>
                            {_('noEditDevicePossible3')}
                            <NavLink to="/NewDevice">
                                {_('noEditDevicePossible4')}
                            </NavLink>
                        </h3>
                    </div>
                </div>
                <form className="edit-item-form">
                    <p>ID:</p>
                    <input
                        type="text"
                        name="deviceId"
                        value={this.props.deviceId}
                        disabled={true}
                    />
                    <p>{_('deviceName')}:</p>
                    <input
                        type="text"
                        name="deviceName"
                        value={this.state.deviceName}
                        onChange={this.handleDeviceNameChange}
                        disabled={true}
                    />
                    <p>{_('user')}:</p>
                    <input
                        type="text"
                        name="userId"
                        value={this.state.userId}
                        disabled={true}
                    />
                    <p>{_('controllerDevice')}:</p>
                    <input
                        type="text"
                        name="controllerId"
                        value={this.state.controllerId}
                        disabled={true}
                    />
                    {/*
                    <div className="ActionField">
                        <input type="reset" value={_('cancel')} />
                        <input type="submit" value={_('edit')} onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                    */}
                </form>
            </div>
        );
    }
}