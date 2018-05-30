import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Bottombar.css';
import '../App.tsx';
import { _ } from '../i18n';

export function Bottombar () {
    return (
        <ul className="bottombar">
            <li>
                <NavLink to="/User">
                  <i className="fa fa-user fa-user"/>
                  <p>{_('user')}</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                  <i className="fa fa-home fa-home"/>
                  <p>{_('home')}</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="/StatisticsSummary" onClick={() => window.scrollTo(0, 0)}>
                  <i className="fa fa-line-chart fa-line-chart"/>
                  <p>{_('statistics')}</p>
                </NavLink>
            </li>
        </ul>
    );
}