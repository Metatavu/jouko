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

export class Header
  extends React.Component<{}, HeaderState> {

  constructor(props: {}) {
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
      <div className="navigation">
        <div className="menu" onClick={() => this.onMenuClick()}>
          <i className="fa fa-bars" />
        </div>
        <div className={classes}>
          <ul>
            <li><NavLink to="/"><i className="fa fa-home fa-fw"/> Home</NavLink></li>
            <li><NavLink to="/User"><i className="fa fa-user fa-fw"/> User</NavLink></li>
            <li><NavLink to="/Statistics"><i className="fa fa-line-chart fa-fw"/> Statistics</NavLink></li>
            <li><NavLink to="/Settings"><i className="fa fa-cogs fa-fw"/> Settings</NavLink></li>
            <li><NavLink to="/"><i className="fa fa-sign-out fa-fw" /> Logout</NavLink></li>
          </ul>
        </div>
      </div>
    );
  }
}