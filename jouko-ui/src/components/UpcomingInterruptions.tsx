import * as React from 'react';
import { InterruptionsApi, DevicesApi } from 'jouko-ts-client';
import { addYears, format } from 'date-fns';
import * as _ from 'lodash';
import { processSwaggerDate } from '../ProcessSwaggerDate';

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
      button = <button onClick={() => (this.props.cancelInterruption())}>ESTÄ KATKO</button>;
    } else {
      button = null;
    }

    let startdate = format(this.props.startTime, 'dd DD.MM.YYYY');
    let starttime = format(this.props.startTime, 'H.mm');
    let enddate = format(this.props.endTime, 'dd DD.MM.YYYY');
    let endtime = format(this.props.endTime, 'H.mm');

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
        new Date(),
        addYears(new Date(), 1),
        device.id);

      for (const interruption of interruptions) {

        const cancelInterruption = () => {
          this.cancelInterruption(interruption.id).then(() => {/**/
          });
        };

        rowProps.push({
          id: interruption.id,
          deviceName: device.name,
          startTime: processSwaggerDate(interruption.startTime),
          endTime: processSwaggerDate(interruption.endTime),
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