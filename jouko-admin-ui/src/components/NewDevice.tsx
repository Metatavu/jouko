import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { 
    InterruptionGroupsApi,
    DevicesApi,
    ControllerDevicesApi, 
    UsersApi, 
    Configuration 
} from 'jouko-ts-client';
import { take } from 'lodash';
import { _ } from '../i18n';
import { apiUrl } from '../config';

interface NewDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface Props {
    kc?: Keycloak.KeycloakInstance;
}
interface NewDeviceState {
    users: UserType[];
    controllerDevices: ControllerDevicesProps[];
    deviceName: string;
    userId: number;
    controllerId: number;
    rowProps: NewDevicesProps[];
}

interface UserType {
    userId: number;
    firstName?: string;
    lastName?: string;
}

interface ControllerDevicesProps {
    controllerDeviceId: number;
    eui: string;
    key: string;
    communicationChannel: string;
}

export class NewDevice
    extends React.Component<Props, NewDeviceState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            users: [],
            controllerDevices: [],
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
    handleUserIdChange(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({userId: parseInt(event.currentTarget.value, 10)});
    }
    handleControllerIdChange(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({controllerId: parseInt(event.currentTarget.value, 10)});
    }
    async handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const devicesApi = new DevicesApi(
            configuration,
            apiUrl);

        const device = {
            name: this.state.deviceName,
            userId: this.state.userId,
            controllerId: this.state.controllerId
        };
        try {
        await devicesApi.createDevice(device);
        alert(_('alertDeviceCreated'));
        } catch (error) {
            alert(_('alertDeviceCreatedError'));
        }
    }

    componentDidMount() {
        this.fetchControllerDevices();
        this.fetchUsers();
    }

    async fetchControllerDevices() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const allControllerDevicesApi = new ControllerDevicesApi(
            configuration,
            apiUrl);
        const allControllerDevices = await allControllerDevicesApi.listAllControllerDevices(0, 1000);
        const controllerDevices: ControllerDevicesProps[] = [];
        for (const controllerDevice of allControllerDevices) {
            controllerDevices.push({
                controllerDeviceId: controllerDevice.id!,
                eui: controllerDevice.eui.toString(),
                key: controllerDevice.key.toString(),
                communicationChannel: controllerDevice.communicationChannel!.toString() || ''
            });
        }

        this.setState({controllerDevices: take(controllerDevices, 100)});
    }

    async fetchUsers() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const allUsersApi = new UsersApi(
            configuration,
            apiUrl);
        
        const allUsers = await allUsersApi.listKeycloakUsers(this.props.kc!.token);
        
        const users: UserType[] = [];
        for (const user of allUsers) {
            users.push({
                userId: user.id!,
                firstName: user.firstName,
                lastName: user.lastName
            });
        }

        this.setState({users: take(users, 100)});
    }

    async fetchNewDevices() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(
            configuration,
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
        const controllerOption = this.state.controllerDevices.map(controllerDevice => {
            return (
                <option
                    key={controllerDevice.controllerDeviceId}
                    value={controllerDevice.controllerDeviceId}
                >
                    {controllerDevice.controllerDeviceId}
                </option>
            );
        });
        const userOption = this.state.users.map(user => {
            return (
                <option
                    key={user.userId.toString()}
                    value={user.userId.toString()}
                >
                    {`(${user.userId}) ${user.firstName} ${user.lastName}`}
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
                    <select name="userId" onChange={this.handleUserIdChange} value={this.state.userId}>
                        {userOption}
                    </select>
                    <p>{_('controllerDevice')}:</p>
                    <select 
                        name="controllerId" 
                        onChange={this.handleControllerIdChange} 
                        value={this.state.controllerId}
                    >
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