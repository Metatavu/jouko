import * as React from 'react';
import { InterruptionsApi, DevicesApi } from 'jouko-ts-client';
import { addYears } from 'date-fns';
import * as _ from 'lodash';

interface UpcomingInterruptionProps {
  id: Number;
  deviceName: String;
  startTime: Date;
  endTime: Date;
}

export class UpcomingInterruption
    extends React.Component<UpcomingInterruptionProps> {
  render() {
    return (
      <p>{this.props.deviceName}: 
        {this.props.startTime.toISOString()} -
        {this.props.endTime.toISOString()}
        <button>ESTÄ KATKO</button>
      </p>
    );
  }
}

interface UpcomingInterruptionsState {
  rowProps: UpcomingInterruptionProps[];
}

export class UpcomingInterruptions
    extends React.Component<{}, UpcomingInterruptionsState> {

  constructor(props: {}) {
    super(props);

    this.state = {rowProps: []};
  }

  componentDidMount() {
    this.fetchInterruptions();
  }

  async fetchInterruptions() {
    const interruptionsApi = new InterruptionsApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const devicesApi = new DevicesApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    const devices = await devicesApi.listDevices(1, 0, 1000);

    const rowProps: UpcomingInterruptionProps[] = [];

    for (const device of devices) {
      const interruptions = await interruptionsApi.listInterruptions(
        1,
        new Date(),
        addYears(new Date(), 1),
        device.id);

      for (const interruption of interruptions) {
        rowProps.push({
          id: interruption.id,
          deviceName: device.name,
          startTime: new Date(interruption.startTime),
          endTime: new Date(interruption.endTime)
        });
      }
    }

    this.setState({rowProps: _.take(rowProps, 5)});
  }

  render() {
    var rows = this.state.rowProps.map(prop => {
      return (
        <UpcomingInterruption
          key={prop.id.toString()}
          {...prop}
        />
      );
    });

    return (
      <div className="App-Block2">
        <h1 className="App-title">TULEVAT KATKOT</h1>
        {rows}
      </div>
    );
  }
}