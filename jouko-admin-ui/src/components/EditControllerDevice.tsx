import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
import { InterruptionGroupsApi, ControllerDevicesApi, Configuration } from 'jouko-ts-client';
import { take } from 'lodash';
import { apiUrl } from '../config';

interface Props {
    kc?: Keycloak.KeycloakInstance;
    controllerDeviceId: number;
    currentUserId: number;
}

interface EditControllerDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface EditControllerDeviceState {
    eui: string;
    key: string;
    communicationChannel: string;
    rowProps: EditControllerDevicesProps[];
}

export class EditControllerDevice
    extends React.Component<Props, EditControllerDeviceState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            eui: '',
            key: '',
            communicationChannel: '',
            rowProps: []
        };
        this.handleEuiChange = this.handleEuiChange.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleCommunicationChannelChange = this.handleCommunicationChannelChange.bind(this);
    }
    handleEuiChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({eui: event.currentTarget.value});
    }
    handleKeyChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({key: event.currentTarget.value});
    }
    handleCommunicationChannelChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({communicationChannel: event.currentTarget.value});
    }
    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const controllerDevicesApi = new ControllerDevicesApi(configuration);

        const payload = {
            eui: this.state.eui,
            key: this.state.key,
            communicationChannel: this.state.communicationChannel
        };

        try {
            controllerDevicesApi.updateControllerDevice(Number(this.props.controllerDeviceId), payload);
            alert(_('alertControllerDeviceChanged'));
        } catch (error) {
            alert(_('alertControllerDeviceChangedError'));
        }
    }

    componentDidMount() {
        this.fetchEditControllerDevices();
        this.fetchControllerDevices();
    }
    async fetchEditControllerDevices() {
        const configuration = new Configuration({
            apiKey: 'Bearer ' + this.props.kc!.token
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(
            configuration,
            apiUrl);

        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: EditControllerDevicesProps[] = [];
        for (const interruptionGroup of interruptionGroups) {
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime,
            });
        }
        this.setState({rowProps: take(rowProps, 100)});
    }

    async fetchControllerDevices() {
        const configuration = new Configuration({
            apiKey: 'Bearer ' + this.props.kc!.token
        });

        const controllerDevicesApi = new ControllerDevicesApi(
            configuration,
            apiUrl);

        const controllerDevice = await controllerDevicesApi.retrieveControllerDevice(this.props.controllerDeviceId);
        this.setState({
            eui: controllerDevice.eui,
            key: controllerDevice.key,
            communicationChannel: controllerDevice.communicationChannel as string
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
                <h1>{_('editControllerDevice')}
                    <NavLink to="/ListControllerDevice">
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
                            {_('noEditControllerDevicePossible1')}
                            <NavLink to="/ListControllerDevice">
                                {_('noEditControllerDevicePossible2')}
                            </NavLink>
                            {_('noEditControllerDevicePossible3')}
                            <NavLink to="/NewControllerDevice">
                                {_('noEditControllerDevicePossible4')}
                            </NavLink>
                        </h3>
                    </div>
                </div>
                <form className="edit-item-form">
                    <p>ID:</p>
                    <input
                        type="text"
                        name="controllerDeviceId"
                        value={this.props.controllerDeviceId}
                        disabled={true}
                    />
                    <p>EUI:</p>
                    <input
                        type="text"
                        name="eui"
                        value={this.state.eui}
                        onChange={this.handleEuiChange}
                        disabled={true}
                    />
                    <p>{_('key')}:</p>
                    <input
                        type="text"
                        name="key"
                        value={this.state.key}
                        onChange={this.handleKeyChange}
                        disabled={true}
                    />
                    <p>{_('communicationChannel')}:</p>
                    <input
                        type="text"
                        name="communicationChannel"
                        value={this.state.communicationChannel}
                        onChange={this.handleCommunicationChannelChange}
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