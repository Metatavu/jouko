import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

export class NewUser extends React.Component {
    render() {
        return (
            <div className="">
                <h1>New User
                    <NavLink to="/User">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>Interruptionsgroup ID:</p>
                    <input type="text" name="userId" />
                    <p>Keycloak ID:</p>
                    <input type="text" name="keycloakId" />
                    <p>Username:</p>
                    <input type="text" name="username" />
                    <p>Firstname:</p>
                    <input type="text" name="firstname" />
                    <p>Lastname:</p>
                    <input type="text" name="lastName" />
                    <p>Email:</p>
                    <input type="email" name="email" />
                    <input type="reset" value="Cancel" /> <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}