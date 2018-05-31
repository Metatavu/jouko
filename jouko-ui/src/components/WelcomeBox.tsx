import * as React from 'react';
import '../App.css';
import { _ } from '../i18n';

const logo = require('../logo.svg');

interface WelcomeBoxProps {
  firstname: string;
  lastname: string;
}

export class WelcomeBox
  extends React.Component<WelcomeBoxProps> {

  render() {
    return (
      <div className="App-Block1">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">JOUKO - {_('appname')}</h1>
        <h1>{_('signed')}: {this.props.lastname} {this.props.firstname}</h1>
      </div>
    );
  }
}