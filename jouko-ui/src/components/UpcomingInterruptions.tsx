import * as React from 'react';
import { InterruptionsApi, DevicesApi } from 'jouko-ts-client';
import { addYears, format as formatDate, parse as parseDate } from 'date-fns';
import * as _ from 'lodash';
import '../App.css';

interface UpcomingInterruptionProps {
  id: number;
  deviceName: String;
  startTime: Date;
  endTime: Date;
  cancelled: Boolean;

  cancelInterruption(): void;
}

export class UpcomingInterruption
    extends React.Component<UpcomingInterruptionProps> {

  render() {
    let button;

    if (!this.props.cancelled) {
      button = <button className="btn2" onClick={() => (this.props.cancelInterruption())}>ESTÄ KATKO</button>;
    } else {
      button = null;
    }

    let startdate = formatDate(this.props.startTime, 'dd DD.MM.YYYY');
    let starttime = formatDate(this.props.startTime, 'H.mm');
    let enddate = formatDate(this.props.endTime, 'dd DD.MM.YYYY');
    let endtime = formatDate(this.props.endTime, 'H.mm');

    if (enddate === startdate) {
      enddate = '';
    }

    return (
        <tr>
          <td id="column1">
            {this.props.deviceName}:
            {startdate} klo {starttime} - {enddate} klo {endtime}
          </td>
          <td id="column2">
            {button}
          </td>
        </tr>
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

  async cancelInterruption(interruptionId: number) {
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

    for (const device of devices) {
      const interruptions = await interruptionsApi.listInterruptions(
        1,
        formatDate(new Date()),
        formatDate(addYears(new Date(), 1)),
        device.id);

      for (const interruption of interruptions) {

        const cancelInterruption = () => {
          // tslint:disable-next-line:no-empty
          this.cancelInterruption(interruption.id).then(() => {});
        };

        rowProps.push({
          id: interruption.id,
          deviceName: device.name,
          startTime: parseDate(interruption.startTime),
          endTime: parseDate(interruption.endTime),
          cancelled: interruption.cancelled,
          cancelInterruption: cancelInterruption
        });
      }
    }

    rowProps.sort((a, b) => {
      return b.startTime.getTime() - a.startTime.getTime();
    });
    this.setState({rowProps: _.take(rowProps, 40)});
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
        <table><tbody>{rows}</tbody></table>
      </div>
    );
  }
}