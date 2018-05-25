import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

interface ShowUserProps {
    userId: number;
    currentUserId: number;
}
interface ControllersProps {
    devicename: string;
    controller: number;
}
interface DevicesProps {
    devicename: string;
    controller: number;
}
interface ShowUserState {
    keycloakId: string;
    firstname: string;
    lastname: string;
    email: string;
    deviceName: string;
    controllerId: number;
    rowProps: ShowUserProps[];
    devices: DevicesProps[];
    controllers: ControllersProps[];
}

export class ShowUser
    extends React.Component<ShowUserProps, ShowUserState> {
    constructor(props: ShowUserProps) {
        super(props);
        this.state = {
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
    }

    render() {
        const usersDevices = this.state.devices.map((devices, index) => {
            return (
                <tr key={index.toString()}>
                    <th>{devices.devicename}</th>
                    <th>{devices.controller}</th>
                </tr>
            );
        });
        return (
            <div className="">
                <h1>User: {this.state.firstname} {this.state.lastname}
                    <NavLink to={`/EditUser/${this.props.userId}`}>
                        <button className="btn">Edit</button>
                    </NavLink>
                    <NavLink to="/ListUser">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="edit-item-form">
                    <p>UserID:</p>
                    <input
                        type="text"
                        name="userId"
                        disabled={true}
                        value={this.props.userId}
                    />
                    <p>Keycloak ID:</p>
                    <input
                        type="text"
                        name="keycloakId"
                        disabled={true}
                        value={this.state.keycloakId}
                    />
                    <p>Firstname:</p>
                    <input
                        type="text"
                        name="firstname"
                        disabled={true}
                        value={this.state.firstname}
                    />
                    <p>Lastname:</p>
                    <input
                        type="text"
                        name="lastname"
                        disabled={true}
                        value={this.state.lastname}
                    />
                    <p>Email:</p>
                    <input
                        type="text"
                        name="email"
                        disabled={true}
                        value={this.state.email}
                    />
                    <p>Devices:</p>
                    <table className="ShowUserDevice">
                        <thead className="ShowUserDeviceHead">
                        <tr>
                            <th>Device Name</th>
                            <th>Controller</th>
                        </tr>
                        </thead>
                        <tbody className="ShowUserDeviceBody">
                            {usersDevices}
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}