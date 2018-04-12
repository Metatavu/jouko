import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Bottombar.css';
import '../App.tsx';

export function Bottombar () {
    return (
        <ul className="bottombar">
            <li>
                <NavLink activeClassName="active" to="/User"><i className="fa fa-user fa-user"/></NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="../App"><i className="fa fa-home fa-home"/></NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/Settings"><i className="fa fa-cogs fa-cogs" /></NavLink>
            </li>
        </ul>
    );
}