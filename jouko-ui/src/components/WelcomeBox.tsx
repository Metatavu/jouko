import * as React from 'react';
import '../App.css';
import { _ } from '../i18n';

interface WelcomeBoxProps {
  firstname: string;
  lastname: string;
}

export class WelcomeBox
  extends React.Component<WelcomeBoxProps> {

  render() {
    return (
      <div className="App-Block1">
        <h2 className="App-title">JOUKO - {_('appname')}</h2>
        <h4>{_('signed')}: {this.props.lastname} {this.props.firstname}</h4>
      </div>
    );
  }
}