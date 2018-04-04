import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Bottombar.css';

export function Bottombar () {
    return (
        <ul className="bottombar">
            <li>
                <NavLink activeClassName="active" to="/">Bottom 1</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/">Bottom 2</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/">Bottom 3</NavLink>
            </li>
        </ul>
    );
}