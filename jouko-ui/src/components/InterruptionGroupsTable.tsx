import * as React from 'react';

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
    return (
      <tr>
        <td>{this.props.entityId}</td>
        <td>{this.props.startTime.toISOString()}</td>
        <td>{this.props.endTime.toISOString()}</td>
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
        <thead>
          <tr>
            <th>id</th>
            <th>startTime</th>
            <th>endTime</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    );
  }
}