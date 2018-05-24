import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Bottombar.css';
import '../App.tsx';

export function Bottombar () {
    return (
        <ul className="bottombar">
            <li>
                <NavLink to="/User">
                  <i className="fa fa-user fa-user"/>
                  <p>User</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                  <i className="fa fa-home fa-home"/>
                  <p>Home</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="/StatisticsSummary" onClick={() => window.scrollTo(0, 0)}>
                  <i className="fa fa-line-chart fa-line-chart"/>
                  <p>Statistics</p>
                </NavLink>
            </li>
            {/*
            <li>
                <NavLink to="/Settings">
                  <i className="fa fa-cogs fa-cogs" />
                  <p>Settings</p>
                </NavLink>
            </li>
            */}
        </ul>
    );
}