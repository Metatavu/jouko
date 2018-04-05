import * as React from 'react';
import { InterruptionsApi, DevicesApi } from 'jouko-ts-client';
import { addYears } from 'date-fns';
import * as _ from 'lodash';

interface UpcomingInterruptionProps {
  id: number;
  deviceName: String;
  startTime: Date;
  endTime: Date;
  cancelled: Boolean;
  cancelInterruption(interruptionId: number): void;
}

export class UpcomingInterruption
    extends React.Component<UpcomingInterruptionProps> {

  render() {
    let button;

    if (!this.props.cancelled) {
      button = <button onClick={() => (this.props.cancelInterruption(this.props.id))}>ESTÄ KATKO</button>;
    } else {
      button = null;
    }

    return (
      <p>{this.props.deviceName}:
        {this.props.startTime.toISOString()} -
        {this.props.endTime.toISOString()}
        {button}
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

  async cancellInterruption(interruptionId: number) {
    const interruptionsApi = new InterruptionsApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');

    await interruptionsApi.setInterruptionCancelled(1, interruptionId, {cancelled: true});
    await this.fetchInterruptions();
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

    const cancelInterruption = (id: number) => {
      this.cancellInterruption(id).then(() => {/**/
      });
    };

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
          endTime: new Date(interruption.endTime),
          cancelled: interruption.cancelled,
          cancelInterruption: cancelInterruption
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