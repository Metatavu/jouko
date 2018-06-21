import * as React from 'react';
import { InterruptionsApi, DevicesApi } from 'jouko-ts-client';
import { addYears, format as formatDate, parse as parseDate } from 'date-fns';
import { take } from 'lodash';
import '../App.css';
import { _ } from '../i18n';
import { apiUrl } from '../config';

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
      button = (
        <button
          className="btn2"
          onClick={() => {
            if (confirm(_('confirmCancelInterruption'))) {
              this.props.cancelInterruption();
            }
          }}

        >
          {_('preventInterruptions')}
        </button>

      );

    } else {
      button = <button className="btn3" >{_('cancelled')}</button>;
    }

    let startdate = formatDate(this.props.startTime, 'dd DD.MM.YYYY');
    let starttime = formatDate(this.props.startTime, 'H.mm');
    let enddate = formatDate(this.props.endTime, 'dd DD.MM.YYYY');
    let endtime = formatDate(this.props.endTime, 'H.mm');

    if (enddate === startdate) {
      enddate = '';
    }

    return (
      <div className="UpcomingInterruptionsContainer">
        <div className="UpcomingInterruptionsHead">
          {this.props.deviceName}
        </div>
        <div className="UpcomingInterruptionsBody">
          <b>From: </b>{startdate} klo {starttime}<br/>
          <b>To: </b>{enddate} klo {endtime}
          <div className="UpcomingInterruptionsButton">
            {button}
          </div>
        </div>
      </div>
    );
  }
}

interface UpcomingInterruptionsState {
  rowProps: UpcomingInterruptionProps[];
  errorMessage: string;
}
interface  UpcomingInterruptionsProps {
  currentUserId: number;
}

export class UpcomingInterruptions
    extends React.Component<UpcomingInterruptionsProps, UpcomingInterruptionsState> {

  constructor(props: UpcomingInterruptionsProps) {
    super(props);

    this.state = {rowProps: [], errorMessage: ''};
  }

  componentDidMount() {
    this.fetchInterruptions();
  }

  async cancelInterruption(interruptionId: number) {
    const interruptionsApi = new InterruptionsApi(
      undefined,
      apiUrl);

    await interruptionsApi.setInterruptionCancelled(this.props.currentUserId, interruptionId, {cancelled: true});
    await this.fetchInterruptions();
  }

  async fetchInterruptions() {
    const interruptionsApi = new InterruptionsApi(
      undefined,
      apiUrl);

    const devicesApi = new DevicesApi(
      undefined,
      apiUrl);

    const devices = await devicesApi.listDevices(this.props.currentUserId, 0, 1000);

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
      if (rowProps.length === 0) {
        this.setState({errorMessage: 'No interruptions found'});
      }
    }

    rowProps.sort((a, b) => {
      return b.startTime.getTime() - a.startTime.getTime();
    });
    this.setState({rowProps: take(rowProps, 6)});
  }

  render() {
    let rows = this.state.rowProps.map(prop => {
      return (
          <UpcomingInterruption
            key={prop.id.toString()}
            {...prop}
          />
      );

    });
    return (
      <div className="UpcomingInterruptions">
        <h3 className="App-title">{_('incomingInterruptions')}</h3>
        <div className="UpcomingInterruptionsContent">
          {rows}
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }
}