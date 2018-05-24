import '../App.tsx';
import './Navigation.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const logo = require('../logo.svg');
let classes1: string;
let classes2: string;
let classes3: string;

enum State {
    OPEN,
    CLOSED,
    START
}

interface NavigationState {
    state: State;
    currentmenu: string;
}

export class Navigation extends React.Component<{}, NavigationState> {

    constructor(props: {}) {
        super(props);
        this.state = {state: State.START, currentmenu: ''};
    }
    onMenuClick(menu: string) {
        switch (this.state.state) {
            case State.OPEN:
                this.setState({state: State.CLOSED, currentmenu: menu});
                break;
            case State.CLOSED:
                this.setState({state: State.OPEN, currentmenu: menu});
                break;
            case State.START:
                this.setState({state: State.OPEN, currentmenu: menu});
                break;
            default:
                this.setState({state: State.START, currentmenu: menu});
                break;
        }
    }

    render() {
        switch (this.state.state) {
            case State.OPEN:
                if (this.state.currentmenu === 'Interruptiongroups') {
                    if (classes1 === 'DropdownNavigation open') {
                        classes1 = 'DropdownNavigation';
                    } else {
                        classes1 = 'DropdownNavigation open';
                    }
                    classes2 = 'DropdownNavigation';
                    classes3 = 'DropdownNavigation';
                }
                if (this.state.currentmenu === 'User') {
                    classes1 = 'DropdownNavigation';
                    if (classes2 === 'DropdownNavigation open') {
                        classes2 = 'DropdownNavigation';
                    } else {
                        classes2 = 'DropdownNavigation open';
                    }
                    classes3 = 'DropdownNavigation';
                }
                if (this.state.currentmenu === 'Device') {
                    classes1 = 'DropdownNavigation';
                    classes2 = 'DropdownNavigation';
                    if (classes3 === 'DropdownNavigation open') {
                        classes3 = 'DropdownNavigation';
                    } else {
                        classes3 = 'DropdownNavigation open';
                    }
                }
                break;
            case State.CLOSED:
                if (this.state.currentmenu === 'Interruptiongroups') {
                    if (classes1 === 'DropdownNavigation open') {
                        classes1 = 'DropdownNavigation';
                    } else {
                        classes1 = 'DropdownNavigation open';
                    }
                    classes2 = 'DropdownNavigation';
                    classes3 = 'DropdownNavigation';
                }
                if (this.state.currentmenu === 'User') {
                    classes1 = 'DropdownNavigation';
                    if (classes2 === 'DropdownNavigation open') {
                        classes2 = 'DropdownNavigation';
                    } else {
                        classes2 = 'DropdownNavigation open';
                    }
                    classes3 = 'DropdownNavigation';
                }
                if (this.state.currentmenu === 'Device') {
                    classes1 = 'DropdownNavigation';
                    classes2 = 'DropdownNavigation';
                    if (classes3 === 'DropdownNavigation open') {
                        classes3 = 'DropdownNavigation';
                    } else {
                        classes3 = 'DropdownNavigation open';
                    }
                }
                break;
            case State.START:
                classes1 = 'DropdownNavigation';
                classes2 = 'DropdownNavigation';
                classes3 = 'DropdownNavigation';
                break;
            default:
                classes1 = 'DropdownNavigation';
                classes2 = 'DropdownNavigation';
                classes3 = 'DropdownNavigation';
                break;
        }
        return (
            <div>
                <ul className="Navigation">
                    <li className="Home">
                        <NavLink to="/">
                            <img src={logo} className="Navigation-logo" alt="logo"/>
                        </NavLink>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('Interruptiongroups')}>Interruptiongroups
                        <i className="fa fa-caret-down"/>
                        </a>
                        <div className={classes1}>
                            <li>
                                <NavLink to="/InterruptionGroups">All Interruptiongroups</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewInterruptionGroup">New Interruptiongroup</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('User')}>User
                        <i className="fa fa-caret-down"/>
                        </a>
                        <div className={classes2}>
                            <li>
                                <NavLink to="/User">All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewUser">New User</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('Device')}>Device
                        <i className="fa fa-caret-down"/>
                        </a>
                        <div className={classes3}>
                            <li>
                                <NavLink to="/Device">All Devices</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewDevice">New Device</NavLink>
                            </li>
                        </div>
                    </li>
                    {/*
                    <li>
                        <a onClick={() => this.onMenuClick('Menu5')}>Menu5
                            <i className="fa fa-caret-down"/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('Menu6')}>Menu6
                            <i className="fa fa-caret-down"/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('Menu7')}>Menu7
                            <i className="fa fa-caret-down"/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('Menu8')}>Menu8
                            <i className="fa fa-caret-down"/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick('Menu9')}>Menu9
                            <i className="fa fa-caret-down"/>
                        </a>
                    </li>
                    */}
                </ul>
            </div>
        );
    }
}