import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
import * as language from '../i18n';

const finland = require('../flags/Finland.png');
const germany = require('../flags/Germany.png');
const sweden = require('../flags/Sweden.png');
const unitedKingdom = require('../flags/United_Kingdom.png');

enum State {
  CLOSED,
  OPEN
}

interface HeaderState {
  state: State;
}
interface HeaderProps {
  logout(): void;
}

export class Header
  extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = { state: State.CLOSED };
  }

  onMenuClick() {
    switch (this.state.state) {
      case State.CLOSED:
        this.setState({ state: State.OPEN });
        break;
      case State.OPEN:
        this.setState({ state: State.CLOSED });
        break;
      default:
        this.setState({ state: State.OPEN });
        break;
    }
  }

  render() {
    let classes: string;
    switch (this.state.state) {
      case State.CLOSED:
        classes = 'overlay';
        break;
      case State.OPEN:
        classes = 'overlay open';
        break;
      default:
        classes = 'overlay';
        break;
    }

    return (
      <div className="navigation" onClick={() => this.onMenuClick()}>
        <div className="menu">
          <i className="fa fa-bars" />
        </div>
        <div className={classes}>
          <ul>
            <li className="menuItems"><NavLink to="/"><i className="fa fa-home fa-fw"/>{_('home')}</NavLink></li>
            <li className="menuItems"><NavLink to="/User"><i className="fa fa-user fa-fw"/>{_('user')}</NavLink></li>
            <li className="menuItems"><NavLink to="/StatisticsSummary" onClick={() => window.scrollTo(0, 0)}>
              <i className="fa fa-line-chart fa-fw"/>{_('statistics')}
            </NavLink></li>
            <li className="menuItems"><NavLink to="/" onClick={() => this.props.logout()}>
              <i className="fa fa-sign-out fa-fw" />{_('logout')}</NavLink></li>
            <li className="flagBar">
              <NavLink to={location.pathname}>
                <img
                  src={finland}
                  className="flag"
                  alt="flag-finland"
                  onClick={() => language.setLanguage('fi')}
                />
              </NavLink>
              <NavLink to={location.pathname}>
                <img
                  src={germany}
                  className="flag"
                  alt="flag-germany"
                  onClick={() => language.setLanguage('de')}
                />
              </NavLink>
              <NavLink to={location.pathname}>
                <img
                  src={sweden}
                  className="flag"
                  alt="flag-sweden"
                  onClick={() => language.setLanguage('sv')}
                />
              </NavLink>
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
        </div>
      </div>
    );
  }
}