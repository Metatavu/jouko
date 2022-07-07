import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';
import { ControllerDevicesApi, Configuration } from 'jouko-ts-client';
import { take } from 'lodash';
import { apiUrl } from '../config';

interface ControllerDevicesProps {
    controllerDeviceId: number;
    eui: string;
    key: string;
    communicationChannel: string;
}

interface Props {
    kc?: Keycloak.KeycloakInstance;
}

interface ControllerDevicesState {
    controllerDevices: ControllerDevicesProps[];
    sortingElement: string;
    sortingDirection: string;
    searchTerm: string;
    searchColumn: string;
}

export class ListControllerDevice
    extends React.Component<Props, ControllerDevicesState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            controllerDevices: [],
            sortingElement: 'id',
            sortingDirection: 'ASC',
            searchTerm: '',
            searchColumn: 'id'
        };
        this.sortByIdASC = this.sortByIdASC.bind(this);
        this.sortByEuiASC = this.sortByEuiASC.bind(this);
        this.sortByKeyASC = this.sortByKeyASC.bind(this);
        this.sortByCommunicationChannelASC = this.sortByCommunicationChannelASC.bind(this);
        this.sortByIdDESC = this.sortByIdDESC.bind(this);
        this.sortByEuiDESC = this.sortByEuiDESC.bind(this);
        this.sortByKeyDESC = this.sortByKeyDESC.bind(this);
        this.sortByCommunicationChannelDESC = this.sortByCommunicationChannelDESC.bind(this);
        this.search = this.search.bind(this);
        this.searchColumn = this.searchColumn.bind(this);
    }
    componentDidMount() {
        this.fetchAllControllerDevices();
    }
    async handleDeleteControllerDevice(controllerDeviceId: number) {
        if (confirm(_('confirmDeleteControllerDevice'))) {
            console.log('delete');
        }

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const controllerDevicesApi = new ControllerDevicesApi(
            configuration,
            apiUrl);

        await controllerDevicesApi.deleteControllerDevice({controllerId: controllerDeviceId});
        this.forceUpdate();
    }
    sortByIdASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'controllerDeviceId',
            sortingDirection: 'ASC',
        });
        this.fetchAllControllerDevices();
    }
    sortByIdDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'controllerDeviceId',
            sortingDirection: 'DESC',
        });
        this.fetchAllControllerDevices();
    }
    sortByEuiASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'eui',
            sortingDirection: 'ASC',
        });
        this.fetchAllControllerDevices();
    }
    sortByEuiDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'eui',
            sortingDirection: 'DESC',
        });
        this.fetchAllControllerDevices();
    }
    sortByKeyASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'key',
            sortingDirection: 'ASC',
        });
        this.fetchAllControllerDevices();
    }
    sortByKeyDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'key',
            sortingDirection: 'DESC',
        });
        this.fetchAllControllerDevices();
    }
    sortByCommunicationChannelASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'communicationChannel',
            sortingDirection: 'ASC',
        });
        this.fetchAllControllerDevices();
    }
    sortByCommunicationChannelDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'communicationChannel',
            sortingDirection: 'DESC',
        });
        this.fetchAllControllerDevices();
    }
    search(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchTerm: event.currentTarget.value.toString()});
        this.fetchAllControllerDevices();
    }
    searchColumn(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({searchColumn: event.currentTarget.value.toString()});
        this.fetchAllControllerDevices();
    }

    async fetchAllControllerDevices() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const allControllerDevicesApi = new ControllerDevicesApi(
            configuration,
            apiUrl);
        const allControllerDevices = await allControllerDevicesApi.listAllControllerDevices(0, 1000);
        const controllerDevices: ControllerDevicesProps[] = [];
        for (const controllerDevice of allControllerDevices) {
            const searchColumn = this.state.searchColumn.toString();
            if (controllerDevice[searchColumn].toString().match(this.state.searchTerm )) {
                controllerDevices.push({
                    controllerDeviceId: controllerDevice.id!,
                    eui: controllerDevice.eui.toString(),
                    key: controllerDevice.key.toString(),
                    communicationChannel: controllerDevice.communicationChannel!.toString() || ''
                });
            }
        }
        if (this.state.sortingDirection === 'ASC') {
            const sortingElement = this.state.sortingElement.toString();
            if (sortingElement === 'eui') {
                controllerDevices.sort((a, b) => a.eui.localeCompare(b.eui));
            } else if (sortingElement === 'key') {
                controllerDevices.sort((a, b) => a.key.localeCompare(b.key));
            } else if (sortingElement === 'communicationChannel') {
                controllerDevices.sort((a, b) => a.communicationChannel.localeCompare(b.communicationChannel));
            } else {
                controllerDevices.sort((a, b) => {
                    return a[sortingElement] - b[sortingElement];
                });
            }
        } else {
            const sortingElement = this.state.sortingElement.toString();
            if (sortingElement === 'eui') {
                controllerDevices.sort((a, b) => b.eui.localeCompare(a.eui));
            } else if (sortingElement === 'key') {
                controllerDevices.sort((a, b) => b.key.localeCompare(a.key));
            } else if (sortingElement === 'communicationChannel') {
                controllerDevices.sort((a, b) => b.communicationChannel.localeCompare(a.communicationChannel));
            } else {
                controllerDevices.sort((a, b) => {
                    return b[sortingElement] - a[sortingElement];
                });
            }
        }
        this.setState({controllerDevices: take(controllerDevices, 100)});
    }
    render() {
        const allControllerDevices = this.state.controllerDevices.map((controllerDevices, index) => {
            return (
                <tr key={index.toString()}>
                    <th>
                        <div
                            onClick={(event) => this.handleDeleteControllerDevice(controllerDevices.controllerDeviceId)}
                        >
                            <i className="fa fa-trash fa-fh"/>
                        </div>
                    </th>
                    <th>
                        <div>
                            <NavLink to={`/EditControllerDevice/${controllerDevices.controllerDeviceId}`}>
                                <i className="fa fa-edit fa-fh"/>
                            </NavLink>
                        </div>
                    </th>
                    <th>{controllerDevices.controllerDeviceId}</th>
                    <th>{controllerDevices.eui}</th>
                    <th>{controllerDevices.key}</th>
                    <th>{controllerDevices.communicationChannel}</th>
                </tr>
            );
        });
        return (
            <div className="">
                <h1>{_('allControllerDevices')}
                    <NavLink to="/NewControllerDevice">
                        <button className="btn">{_('newControllerDevice')}</button>
                    </NavLink>
                </h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={false}
                    />
                </div>
                <div className="SearchFilter">
                    <p>{_('sortBy')}:
                    <select>
                        <option onClick={this.sortByIdASC}>ID {_('lowHigh')}</option>
                        <option onClick={this.sortByIdDESC}>ID {_('highLow')}</option>
                        <option onClick={this.sortByEuiASC}>EUI {_('lowHigh')}</option>
                        <option onClick={this.sortByEuiDESC}>EUI {_('highLow')}</option>
                        <option onClick={this.sortByKeyASC}>{_('key')} {_('lowHigh')}</option>
                        <option onClick={this.sortByKeyDESC}>{_('key')} {_('highLow')}</option>
                        <option onClick={this.sortByCommunicationChannelASC}>
                            {_('communicationChannel')} {_('lowHigh')}
                            </option>
                        <option onClick={this.sortByCommunicationChannelDESC}>
                            {_('communicationChannel')} {_('highLow')}
                            </option>
                    </select>
                    </p>
                    <p>
                        {_('searchFor')}:
                        <input
                            type="text"
                            name="search"
                            placeholder={_('search')}
                            className="SearchInput"
                            onChange={this.search}
                        />
                        {_('in')}:
                        <select>
                            <option value="id" onClick={this.searchColumn}>ID</option>
                            <option value="eui" onClick={this.searchColumn}>EUI</option>
                            <option value="key" onClick={this.searchColumn}>{_('key')}</option>
                            <option value="communicationChannel" onClick={this.searchColumn}>
                                {_('communicationChannel')}
                            </option>
                        </select>
                    </p>

                </div>
                <table className="All">
                    <thead className="DeviceHead">
                    <tr>
                        <th/>
                        <th/>
                        <th>ID</th>
                        <th>EUI</th>
                        <th>{_('key')}</th>
                        <th>{_('communicationChannel')}</th>
                    </tr>
                    </thead>
                    <tbody className="DeviceBody">
                        {allControllerDevices ? allControllerDevices : <tr><td>{_('noControllerDevices')}</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}