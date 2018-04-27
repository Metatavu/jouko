import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

export class NewDevice extends React.Component {
    render() {
        return (
            <div className="">
                <h1>New Device
                    <NavLink to="/Device">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>Device ID:</p>
                    <input type="text" name="deviceId" />
                    <p>Devicename:</p>
                    <input type="text" name="deviceName" />
                    <p>User ID:</p>
                    <input type="text" name="userId" />
                    <p>Controller ID:</p>
                    <input type="text" name="controllerId" />
                    <input type="reset" value="Cancel" /> <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}