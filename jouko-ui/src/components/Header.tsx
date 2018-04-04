import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
export function Header () {
    return (
        <ul className="header">
            <li>
                <NavLink activeClassName="active" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/">Menu2</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/">Menu3</NavLink>
            </li>
        </ul>
    );
}