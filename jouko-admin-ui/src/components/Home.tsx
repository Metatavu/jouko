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
                        <NavLink to="/NewInterruptionGroup">
                            <i className="fa fa-hand-paper-o"/>
                            <h3>{_('newInterruptionGroups')}</h3>
                        </NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewUser">
                            <i className="fa fa-user-o"/>
                            <h3>{_('newUser')}</h3>
                        </NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewDevice">
                            <i className="fa fa-tablet"/>
                            <h3>{_('newDevice')}</h3>
                        </NavLink>
                    </div>
                    <div className="ExampleContainer1">
                        <NavLink to="/NewControllerDevice">
                            <i className="fa fa-server"/>
                            <h3>{_('newControllerDevice')}</h3>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}