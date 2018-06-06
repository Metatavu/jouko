import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { take } from 'lodash';
import { _ } from '../i18n';

interface NewControllerDevicesProps {
    interruptiongroupId: number;
    starttime: string;
}
interface NewControllerDeviceState {
    eui: string;
    key: string;
    communicationChannel: string;
    rowProps: NewControllerDevicesProps[];
}

export class NewControllerDevice
    extends React.Component<{}, NewControllerDeviceState> {
    constructor(props: {}) {
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
        console.log(this.state.eui);
        console.log(this.state.key);
        console.log(this.state.communicationChannel);
        event.preventDefault();
        alert(_('alertControllerDeviceCreated'));
    }

    componentDidMount() {
        this.fetchNewControllerDevices();
    }
    async fetchNewControllerDevices() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);
        const rowProps: NewControllerDevicesProps[] = [];
        for (const interruptionGroup of interruptionGroups) {
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime,
            });
        }
        this.setState({rowProps: take(rowProps, 100)});
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