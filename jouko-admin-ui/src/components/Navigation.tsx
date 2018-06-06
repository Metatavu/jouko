import '../App.tsx';
import './Navigation.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
import { FlagBar } from './FlagBar';

const logo = require('../logo.svg');

export class Navigation extends React.Component {
    render() {
        return (
            <div>
                <ul className="Navigation">
                    <li className="Home">
                        <NavLink to="/">
                            <img src={logo} className="Navigation-logo" alt="logo"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ListInterruptionGroups">{_('interruptionGroups')}</NavLink>
                        <div>
                            <li>
                                <NavLink to="/ListInterruptionGroups">{_('allInterruptionGroups')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewInterruptionGroup">{_('newInterruptionGroups')}</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/ListUser">{_('user')}</NavLink>
                        <div>
                            <li>
                                <NavLink to="/ListUser">{_('allUsers')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewUser">{_('newUser')}</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/ListDevice">{_('device')}</NavLink>
                        <div>
                            <li>
                                <NavLink to="/ListDevice">{_('allDevices')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewDevice">{_('newDevice')}</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/ListControllerDevice">{_('controllerDevice')}</NavLink>
                        <div>
                            <li>
                                <NavLink to="/ListControllerDevice">{_('allControllerDevices')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewControllerDevice">{_('newControllerDevice')}</NavLink>
                            </li>
                        </div>
                    </li>
                    <li className="FlagBarLi">
                        <FlagBar/>
                    </li>
                </ul>
            </div>
        );
    }
}