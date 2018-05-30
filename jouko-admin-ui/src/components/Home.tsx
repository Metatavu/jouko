import * as React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';

interface  HomeProps {
    firstName: string;
}

export class Home extends React.Component<HomeProps> {
    render() {
        return(
            <div className="HomeContent">
                <h1>{_('hello')}, {this.props.firstName}!</h1>
                <div className="HomeChart"/>
                <br/>
                <hr/>
                <br/>
                <div className="ExampleContainer">
                    <div className="ExampleContainer1">
                        <NavLink to="/NewInterruptionGroup"><h4>{_('newInterruptionGroups')}
                        </h4></NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewUser"><h4>{_('newUser')}
                        </h4></NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewDevice"><h4>{_('newDevice')}
                        </h4></NavLink>
                    </div>
                </div>
            </div>
        );
    }
}