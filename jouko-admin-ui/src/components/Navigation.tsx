import '../App.tsx';
import './Navigation.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const logo = require('../logo.svg');

enum State {
    CLOSED,
    OPEN
}

interface NavigationState {
    state: State;
}

export class Navigation extends React.Component<{}, NavigationState> {

    constructor(props: {}) {
        super(props);
        this.state = {state: State.CLOSED};
    }

    onMenuClick() {
        switch (this.state.state) {
            case State.CLOSED:
                this.setState({state: State.OPEN});
                break;
            case State.OPEN:
                this.setState({state: State.CLOSED});
                break;
            default:
                this.setState({state: State.OPEN});
                break;
        }
    }

    render() {
        let classes: string;
        switch (this.state.state) {
            case State.CLOSED:
                classes = 'DropdownNavigation';
                break;
            case State.OPEN:
                classes = 'DropdownNavigation open';
                break;
            default:
                classes = 'DropdownNavigation';
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
                        <a onClick={() => this.onMenuClick()}>Interruptiongroups
                        <i className="fa fa-caret-down"/>
                        </a>
                        <div className={classes}>
                            <li>
                                <NavLink to="/InterruptionGroups">All Interruptiongroups</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewInterruptionGroup">New Interruptiongroup</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick()}>User
                        <i className="fa fa-caret-down"/>
                        </a>
                        <div className={classes}>
                            <li>
                                <NavLink to="/User">All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewUser">New User</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <a onClick={() => this.onMenuClick()}>Device
                        <i className="fa fa-caret-down"/>
                        </a>
                        <div className={classes}>
                            <li>
                                <NavLink to="/Device">All Devices</NavLink>
                            </li>
                            <li>
                                <NavLink to="/NewDevice">New Device</NavLink>
                            </li>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/">Menu5</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Menu6</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}