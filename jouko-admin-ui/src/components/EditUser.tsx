import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { InterruptionGroupsApi, UsersApi, Configuration } from 'jouko-ts-client';
import { take } from 'lodash';
import { _ } from '../i18n';
import { apiUrl } from '../config';

interface Props {
    kc?: Keycloak.KeycloakInstance;
    userId: number;
    currentUserId: number;
}
interface EditUsersProps {
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
interface EditUserState {
    userId: number;
    keycloakId: string;
    firstname: string;
    lastname: string;
    email: string;
    deviceName: string;
    controllerId: number;
    rowProps: EditUsersProps[];
    devices: DevicesProps[];
    controllers: ControllersProps[];
}

export class EditUser
    extends React.Component<Props, EditUserState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userId: 0,
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
        alert(_('alertDeviceCreated'));
    }
    handleDeleteDevice(event: React.FormEvent<HTMLDivElement>, index: number) {
        if (confirm(_('confirmDeleteDevice'))) {
            const array = this.state.devices;
            const startIndex = Number(index);
            array.splice(startIndex, 1);
        }
        this.forceUpdate();
    }
    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const usersApi = new UsersApi(
            configuration,
            apiUrl);

        const payload = {
            keycloakId: this.state.keycloakId,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            devices: this.state.devices
        };
        try {
            usersApi.updateUser(this.props.userId, payload);
            alert(_('alertUserChanged'));
        } catch (error) {
            alert(_('alertUserChangedError'));
        }   
    }

    componentDidMount() {
        this.fetchControllerAndDevices();
    }
    async fetchControllerAndDevices() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(
            configuration,
            apiUrl);
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: EditUsersProps[] = [];
        for (const interruptionGroup of interruptionGroups) {
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime
            });
        }
        this.setState({rowProps: take(rowProps, 100)});
    }

    async fetchUserDetails() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const usersApi = new UsersApi(
            configuration,
            apiUrl);
        const user = await usersApi.retrieveUser(this.props.userId);
        this.setState({
            userId: user.id as number,
            keycloakId: user.keycloakId as string,
            firstname: user.firstName as string,
            lastname: user.lastName as string,
            email: user.email as string
        });
    }

    render() {
        {/*
        const controllerOption = this.state.rowProps.map(rowProp => {
            return (
                <option
                    key={rowProp.interruptiongroupId.toString()}
                >
                    {rowProp.starttime.toString()}
                </option>
            );
        });
        */}
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
                <h1>{_('editUser')}
                    <NavLink to="/ListUser">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <br/><br/><br/>
                <form className="edit-item-form">
                    <p>{_('userId')}:</p>
                    <input
                        type="text"
                        name="userId"
                        disabled={true}
                        value={this.state.userId}
                    />
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
                        type="text"
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
                        <div className="ActionField">
                            <input type="reset" value={_('cancel')} />
                            <input type="submit" value={_('edit')} onClick={(event) => this.handleSubmit(event)}/>
                        </div>
                    </table>
                    </form>
            </div>
        );
    }
}