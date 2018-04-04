import * as React from 'react';

export interface InterruptionGroupTableRowProps {
  entityId: Number;
  startDate: Date;
  endDate: Date;
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
        <td>{this.props.startDate.toISOString()}</td>
        <td>{this.props.endDate.toISOString()}</td>
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
          entityId={rowProp.entityId}
          startDate={rowProp.startDate}
          endDate={rowProp.endDate}
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}