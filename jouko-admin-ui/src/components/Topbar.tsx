import '../App.tsx';
import './Topbar.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export function Topbar () {
    return (
        <ul className="Topbar">
            <li>
                <NavLink to="/">Logout</NavLink>
            </li>
            <li>
                <NavLink to="/">Topbar4</NavLink>
            </li>
            <li>
                <NavLink to="/">Topbar3</NavLink>
            </li>
            <li>
                <NavLink to="/">Topbar2</NavLink>
            </li>
            <li>
                <NavLink to="/">Topbar1</NavLink>
            </li>

        </ul>
    );
}