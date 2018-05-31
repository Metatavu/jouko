import * as React from 'react';
import '../App.tsx';
import './FlagBar.css';
import * as language from '../i18n';
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
                    <NavLink to={location.pathname}>
                        <img
                            src={finland}
                            className="flag"
                            alt="flag-finland"
                            onClick={() => language.setLanguage('fi')}
                        />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={location.pathname}>
                        <img
                            src={germany}
                            className="flag"
                            alt="flag-germany"
                            onClick={() => language.setLanguage('de')}
                        />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={location.pathname}>
                        <img
                            src={sweden}
                            className="flag"
                            alt="flag-sweden"
                            onClick={() => language.setLanguage('sv')}
                        />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={location.pathname}>
                        <img
                            src={unitedKingdom}
                            className="flag"
                            alt="flag-unitedKingdom"
                            onClick={() => language.setLanguage('en')}
                        />
                    </NavLink>
                </li>
            </ul>
        );
    }
}
