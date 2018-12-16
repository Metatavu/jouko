import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';
import { DevicesApi, Configuration } from 'jouko-ts-client';
import { take } from 'lodash';
import { apiUrl } from '../config';

interface DevicesProps {
    deviceId: number;
    deviceName: string;
    userId: number;
    controllerId: number;
}

interface Props {
    kc?: Keycloak.KeycloakInstance;
}

interface DevicesState {
    devices: DevicesProps[];
    sortingElement: string;
    sortingDirection: string;
    searchTerm: string;
    searchColumn: string;
}

export class ListDevice
    extends React.Component<Props, DevicesState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            devices: [],
            sortingElement: 'id',
            sortingDirection: 'ASC',
            searchTerm: '',
            searchColumn: 'id'
        };
        this.sortByIdASC = this.sortByIdASC.bind(this);
        this.sortByDeviceNameASC = this.sortByDeviceNameASC.bind(this);
        this.sortByUserASC = this.sortByUserASC.bind(this);
        this.sortByControllerASC = this.sortByControllerASC.bind(this);
        this.sortByIdDESC = this.sortByIdDESC.bind(this);
        this.sortByDeviceNameDESC = this.sortByDeviceNameDESC.bind(this);
        this.sortByUserDESC = this.sortByUserDESC.bind(this);
        this.sortByControllerDESC = this.sortByControllerDESC.bind(this);
        this.search = this.search.bind(this);
        this.searchColumn = this.searchColumn.bind(this);
    }
    componentDidMount() {
        this.fetchAllDevices();
    }
    handleDeleteDevice(event: React.FormEvent<HTMLDivElement>) {
        if (confirm(_('confirmDeleteDevice'))) {
            console.log('delete');
        }
        this.forceUpdate();
    }
    sortByIdASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceId',
            sortingDirection: 'ASC',
        });
        this.fetchAllDevices();
    }
    sortByIdDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceId',
            sortingDirection: 'DESC',
        });
        this.fetchAllDevices();
    }
    sortByDeviceNameASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceName',
            sortingDirection: 'ASC',
        });
        this.fetchAllDevices();
    }
    sortByDeviceNameDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceName',
            sortingDirection: 'DESC',
        });
        this.fetchAllDevices();
    }
    sortByUserASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'userId',
            sortingDirection: 'ASC',
        });
        this.fetchAllDevices();
    }
    sortByUserDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'userId',
            sortingDirection: 'DESC',
        });
        this.fetchAllDevices();
    }
    sortByControllerASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'controllerId',
            sortingDirection: 'ASC',
        });
        this.fetchAllDevices();
    }
    sortByControllerDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'controllerId',
            sortingDirection: 'DESC',
        });
        this.fetchAllDevices();
    }
    search(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchTerm: event.currentTarget.value.toString()});
        this.fetchAllDevices();
    }
    searchColumn(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({searchColumn: event.currentTarget.value.toString()});
        this.fetchAllDevices();
    }

    async fetchAllDevices() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const allDevicesApi = new DevicesApi(
            configuration,
            apiUrl);
        const allDevices = await allDevicesApi.listAllDevices(0, 1000);
        const devices: DevicesProps[] = [];
        for (const device of allDevices) {
            const searchColumn = this.state.searchColumn.toString();
            if (device[searchColumn].toString().match(this.state.searchTerm )) {
                devices.push({
                    deviceId: device.id!,
                    deviceName: device.name.toString(),
                    userId: device.userId || 0,
                    controllerId: device.controllerId || 0
                });
            }
        }
        if (this.state.sortingDirection === 'ASC') {
            const sortingElement = this.state.sortingElement.toString();
            if (sortingElement === 'deviceName') {
                devices.sort((a, b) => a.deviceName.localeCompare(b.deviceName));
            } else {
                devices.sort((a, b) => {
                    return a[sortingElement] - b[sortingElement];
                });
            }
        } else {
            const sortingElement = this.state.sortingElement.toString();
            if (sortingElement === 'deviceName') {
                devices.sort((a, b) => b.deviceName.localeCompare(a.deviceName));
            } else {
                devices.sort((a, b) => {
                    return b[sortingElement] - a[sortingElement];
                });
            }
        }
        this.setState({devices: take(devices, 100)});
    }
    render() {
        const allDevices = this.state.devices.map((devices, index) => {
            return (
                <tr key={index.toString()}>
                    <th>
                        <div
                            onClick={(event) => this.handleDeleteDevice(event)}
                        >
                            <i className="fa fa-trash fa-fh"/>
                        </div>
                    </th>
                    <th>
                        <div>
                            <NavLink to={`/EditDevice/${devices.deviceId}`}>
                                <i className="fa fa-edit fa-fh"/>
                            </NavLink>
                        </div>
                    </th>
                    <th>{devices.deviceId}</th>
                    <th>{devices.deviceName}</th>
                    <th>{devices.userId}</th>
                    <th>{devices.controllerId}</th>
                </tr>
            );
        });
        return (
            <div className="">
                <h1>{_('allDevices')}
                    <NavLink to="/NewDevice">
                        <button className="btn">{_('newDevice')}</button>
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
                        <option onClick={this.sortByDeviceNameASC}>{_('deviceName')} {_('lowHigh')}</option>
                        <option onClick={this.sortByDeviceNameDESC}>{_('deviceName')} {_('highLow')}</option>
                        <option onClick={this.sortByUserASC}>{_('user')} {_('lowHigh')}</option>
                        <option onClick={this.sortByUserDESC}>{_('user')} {_('highLow')}</option>
                        <option onClick={this.sortByControllerASC}>{_('controllerDevice')} {_('lowHigh')}</option>
                        <option onClick={this.sortByControllerDESC}>{_('controllerDevice')} {_('highLow')}</option>
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
                            <option value="name" onClick={this.searchColumn}>{_('deviceName')}</option>
                            <option value="userId" onClick={this.searchColumn}>{_('user')}</option>
                            <option value="controllerId" onClick={this.searchColumn}>{_('controllerDevice')}</option>
                        </select>
                    </p>

                </div>
                <table className="All">
                    <thead className="DeviceHead">
                    <tr>
                        <th/>
                        <th/>
                        <th>ID</th>
                        <th>{_('deviceName')}</th>
                        <th>{_('user')}</th>
                        <th>{_('controllerDevice')}</th>
                    </tr>
                    </thead>
                    <tbody className="DeviceBody">
                        {allDevices}
                    </tbody>
                </table>
            </div>
        );
    }
}