import * as React from 'react';
import '../App.css';

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
        classes = 'overlay anim';
        break;
      default:
        classes = 'overlay';
        break;
    }

    return (
      <div className="navigation">
        <div className="menu" onClick={() => this.onMenuClick()}>
          <div id="hamburger1" />
          <div id="hamburger2" />
          <div id="hamburger3" />
        </div>
          <div className={classes}>
          <ul>
            <li><a href="#">Menu 1</a></li>
            <li><a href="#">Menu 2</a></li>
            <li><a href="#">Menu 3</a></li>
            <li><a href="#">Menu 4</a></li>
            <li><a href="#">Menu 5</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
