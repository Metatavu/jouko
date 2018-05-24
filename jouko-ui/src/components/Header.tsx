import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

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
            <li><NavLink to="/"><i className="fa fa-home fa-fw"/>Home</NavLink></li>
            <li><NavLink to="/User"><i className="fa fa-user fa-fw"/>User</NavLink></li>
            <li><NavLink to="/StatisticsSummary" onClick={() => window.scrollTo(0, 0)}>
              <i className="fa fa-line-chart fa-fw"/>Statistics
            </NavLink></li>
            {/*
            <li><NavLink to="/Settings"><i className="fa fa-cogs fa-fw"/>Settings</NavLink></li>
            */}
            <li><NavLink to="/" onClick={() => this.props.logout()}>
              <i className="fa fa-sign-out fa-fw" />Logout</NavLink></li>
          </ul>
        </div>
      </div>
    );
  }
}