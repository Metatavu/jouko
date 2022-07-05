import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { ControllerDevicesApi, Configuration } from 'jouko-ts-client';
// import { take } from 'lodash';
import { _ } from '../i18n';
import { apiUrl } from '../config';

interface NewControllerDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface Props {
    kc?: Keycloak.KeycloakInstance;
}
interface NewControllerDeviceState {
    eui: string;
    key: string;
    communicationChannel: string;
    rowProps: NewControllerDevicesProps[];
}

export class NewControllerDevice
    extends React.Component<Props, NewControllerDeviceState> {
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
    async handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const controllerDevicesApi = new ControllerDevicesApi(
            configuration,
            apiUrl);

        const payload = {
            eui: this.state.eui,
            key: this.state.key,
            communicationChannel: this.state.communicationChannel
        };
        
        try {
            await controllerDevicesApi.createControllerDevice(payload, this.props.kc!.token);
            alert(_('alertControllerDeviceCreated'));
        } catch (error) {
            alert(_('alertControllerDeviceCreatedError'));
        }
    }

    render() {
        return (
            <div className="">
                <h1>{_('newDevice')}
                    <NavLink to="/ListDevice">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>EUI:</p>
                    <input
                        type="text"
                        name="eui"
                        value={this.state.eui}
                        onChange={this.handleEuiChange}
                    />
                    <p>{_('key')}:</p>
                    <input
                        type="text"
                        name="key"
                        value={this.state.key}
                        onChange={this.handleKeyChange}
                    />
                    <p>{_('communicationChannel')}:</p>
                    <input
                        type="text"
                        name="eui"
                        value={this.state.communicationChannel}
                        onChange={this.handleCommunicationChannelChange}
                    />
                    <div className="ActionField">
                        <input type="reset" value={_('cancel')} />
                        <input type="submit" value={_('create')} onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                </form>
            </div>
        );
    }
}