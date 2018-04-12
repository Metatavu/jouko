import * as React from 'react';
import { format as formatDate } from 'date-fns';

export interface InterruptionGroupTableRowProps {
  entityId: number;
  startTime: Date;
  endTime: Date;
}

export class InterruptionGroupsTableRow
    extends React.Component<InterruptionGroupTableRowProps> {
  constructor(props: InterruptionGroupTableRowProps) {
    super(props);
  }

  render() {
    let startdate = formatDate(this.props.startTime, 'DD.MM.YYYY');
    let starttime = formatDate(this.props.startTime, 'HH.mm');
    let enddate = formatDate(this.props.endTime, 'DD.MM.YYYY');
    let endtime = formatDate(this.props.endTime, 'HH.mm');
    return (
      <tr>
        <td>{this.props.entityId}</td>
        <td>{startdate}, klo {starttime}</td>
        <td>{enddate}, klo {endtime}</td>
      </tr>
    );
  }
}

export interface InterruptionGroupTableProps {
  rowProps: InterruptionGroupTableRowProps[];
}

export class InterruptionGroupsTable
    extends React.Component<InterruptionGroupTableProps> {
  constructor(props: InterruptionGroupTableProps) {
    super(props);
  }

  render() {
    const rows = this.props.rowProps.map(rowProp => {
      return (
        <InterruptionGroupsTableRow
          key={rowProp.entityId.toString()}
          {...rowProp}
        />
      );
    });

    return (
      <div  className="App-Block3">
      <table>
        <thead className="InterruptionsgroupHead">
          <tr>
            <th>ID</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody className="InterruptionsgroupBody">
          {rows}
        </tbody>
      </table>
      </div>
    );
  }
}