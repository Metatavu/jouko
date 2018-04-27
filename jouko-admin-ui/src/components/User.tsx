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
                    <thead className="InterruptionsgroupHead">
                    <tr>
                        <th>ID</th>
                        <th>Keycloak ID</th>
                        <th>Username</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody className="InterruptionsgroupBody">
                    <tr>
                        <th>1</th>
                        <th>Test1</th>
                        <th>Test1</th>
                        <th>Test1</th>
                        <th>Test1</th>
                        <th>Test1</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Test2</th>
                        <th>Test2</th>
                        <th>Test2</th>
                        <th>Test2</th>
                        <th>Test2</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Test3</th>
                        <th>Test3</th>
                        <th>Test3</th>
                        <th>Test3</th>
                        <th>Test3</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}