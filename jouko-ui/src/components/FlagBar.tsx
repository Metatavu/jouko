import * as React from 'react';
import '../App.tsx';
import './FlagBar.css';
import { NavLink } from 'react-router-dom';

const finland = require('../flags/Finland.png');
const germany = require('../flags/Germany.png');
const sweden = require('../flags/Sweden.png');
const unitedKingdom = require('../flags/United_Kingdom.png');

export class FlagBar
    extends React.Component {

    render() {

        return (
            <ul className="FlagBar">
                <li>
                    <NavLink to="/">
                        <img src={finland} className="flag" alt="flag-finland"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <img src={germany} className="flag" alt="flag-germany"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <img src={sweden} className="flag" alt="flag-sweden"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <img src={unitedKingdom} className="flag" alt="flag-unitedKingdom"/>
                    </NavLink>
                </li>
            </ul>
        );
    }
}
