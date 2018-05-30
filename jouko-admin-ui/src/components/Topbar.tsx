import * as React from 'react';
import '../App.tsx';
import './Topbar.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';

interface TopbarProps {
    logout(): void;
}

export class Topbar
    extends React.Component<TopbarProps> {

    constructor(props: TopbarProps) {
        super(props);
    }

    render() {

        return (
            <ul className="Topbar">
                <li>
                    <NavLink to="/" onClick={() => this.props.logout()}>
                        <i className="fa fa-sign-out fa-fh"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/AdminUserSettings">
                        <i className="fa fa-cogs fa-fh"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <i className="fa fa-home fa-fh"/>
                    </NavLink>
                </li>
                <li>
                    <input
                        type="text"
                        name="search"
                        placeholder={_('search')}
                        className="inputSearch"
                    />
                </li>
            </ul>
        );
    }
}
