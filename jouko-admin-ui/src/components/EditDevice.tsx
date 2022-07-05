import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
import { InterruptionGroupsApi, DevicesApi, Configuration } from 'jouko-ts-client';
import { take } from 'lodash';
import { apiUrl } from '../config';

interface Props {
    deviceId: number;
    currentUserId: number;
    kc?: Keycloak.KeycloakInstance;
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
    extends React.Component<Props, EditDeviceState> {
    constructor(props: Props) {
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
        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const devicesApi = new DevicesApi(configuration);
        
        const payload = {
            name: this.state.deviceName,
            userId: this.state.userId,
            controllerId: this.state.controllerId
        };

        try {
            devicesApi.updateDevice(Number(this.props.deviceId), payload);
            alert(_('alertDeviceChanged'));
        } catch (error) {
            alert(_('alertDeviceChangedError'));
        }
    }

    componentDidMount() {
        this.fetchEditDevices();
        this.fetchDeviceDetails();
    }
    
    async fetchEditDevices() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(
            configuration,
            apiUrl);
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

    async fetchDeviceDetails() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const devicesApi = new DevicesApi(
            configuration,
            apiUrl);
        const device = await devicesApi.retrieveDevice(this.props.deviceId);
        this.setState({
            deviceName: device.name,
            userId: device.userId as number,
            controllerId: device.controllerId as number
        });
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
                    />
                    <p>{_('user')}:</p>
                    <input
                        type="text"
                        name="userId"
                        value={this.state.userId}
                    />
                    <p>{_('controllerDevice')}:</p>
                    <input
                        type="text"
                        name="controllerId"
                        value={this.state.controllerId}
                    />
                    <div className="ActionField">
                        <input type="reset" value={_('cancel')} />
                        <input type="submit" value={_('edit')} onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                </form>
            </div>
        );
    }
}