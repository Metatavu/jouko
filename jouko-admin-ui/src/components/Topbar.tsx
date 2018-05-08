import '../App.tsx';
import './Topbar.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export function Topbar () {
    return (
        <ul className="Topbar">
            <li>
                <NavLink to="/">
                <i className="fa fa-sign-out fa-fh" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                    <i className="fa fa fa-envelope fa-fh"/>
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                    <i className="fa fa-cogs fa-fh"/>
                </NavLink>
            </li>
            <li>
                <input type="text" name="search" placeholder="Search..." className="inputSearch"/>
            </li>
        </ul>
    );
}