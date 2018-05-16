import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

export class User extends React.Component {
    render() {
        return (
            <div className="">
                <h1>All Users
                    <NavLink to="/NewUser">
                        <button className="btn">New User</button>
                    </NavLink>
                </h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Keycloak ID</th>
                        <th>Username</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>1</th>
                        <th>KeycloakId1</th>
                        <th>Username1</th>
                        <th>Firstname1</th>
                        <th>Lastname1</th>
                        <th>Email1</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>KeycloakId2</th>
                        <th>Username2</th>
                        <th>Firstname2</th>
                        <th>Lastname2</th>
                        <th>Email2</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>KeycloakId3</th>
                        <th>Username3</th>
                        <th>Firstname3</th>
                        <th>Lastname3</th>
                        <th>Email3</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}