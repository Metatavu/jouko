import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { _ } from '../i18n';
import { DevicesApi, Configuration } from 'jouko-ts-client';
import { apiUrl } from '../config';
import * as language from '../i18n';
import { take } from 'lodash';
import { KeycloakInstance } from 'keycloak-js';

const finland = require('../flags/Finland.png');
const sweden = require('../flags/Sweden.png');
const germany = require('../flags/Germany.png');
const unitedKingdom = require('../flags/United_Kingdom.png');

enum State {
  CLOSED,
  OPEN
}
interface DeviceProps {
  deviceId: number;
  deviceName: string;
}
interface HeaderState {
  state: State;
  rowProps: DeviceProps[];
}
interface HeaderProps {
  logout(): void;
  kc: KeycloakInstance;
  currentUserId: number;
}

export class Header
  extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      state: State.CLOSED,
      rowProps: []
    };
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

  componentDidMount() {
    this.fetchDevices();
  }

  async fetchDevices() {
    const configuration = new Configuration({
      apiKey: `Bearer ${this.props.kc!.token}`
    });

    const devicesApi = new DevicesApi(
      configuration,
      apiUrl);
    const devices = await devicesApi.listDevices(this.props.currentUserId, 0, 1000);

    const rowProps: DeviceProps[] = [];

    for (const device of devices) {
      rowProps.push({
        deviceId: device.id,
        deviceName: device.name,
      });
    }

    this.setState({rowProps: take(rowProps, 40)});
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

    const devices = this.state.rowProps.map(prop => {
      return (
        <li className="menuItems" key={prop.deviceId}>
          <NavLink
            to={`/Statistics/${prop.deviceId.toString()}`}
            onClick={() => location.replace(`/Statistics/${prop.deviceId.toString()}`)}
          >
            <i className="fa fa-server fa-fw"/>{prop.deviceName}
          </NavLink>
        </li>
      );
    });

    return (
      <div className="navigation" onClick={() => this.onMenuClick()}>
        <div className="menu">
          <i className="fa fa-bars" />
        </div>
        <div className={classes}>
          <ul>
            <li className="menuItems">
              <NavLink to="/">
                <i className="fa fa-home fa-fw"/>{_('home')}
                </NavLink>
            </li>
            <li className="menuItems">
              <NavLink to="/LatestMeasurements">
                <i className="fa fa-table fa-fw"/>{_('latestMeasurements')}
              </NavLink>
            </li>
            <li className="menuItems">
              <NavLink to="/StatisticsSummary">
                <i className="fa fa-line-chart fa-fw"/>{_('statistics')}
              </NavLink>
            </li>

            {devices}

            <li className="menuItems">
              <NavLink to="/User">
                <i className="fa fa-user fa-fw"/>{_('user')}
              </NavLink>
            </li>
            <li className="menuItems">
              <NavLink to="/" onClick={() => this.props.logout()}>
                <i className="fa fa-sign-out fa-fw" />{_('logout')}
              </NavLink>
            </li>

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
                  src={sweden}
                  className="flag"
                  alt="flag-sweden"
                  onClick={() => language.setLanguage('sv')}
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