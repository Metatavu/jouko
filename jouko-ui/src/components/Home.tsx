import * as React from 'react';
import { PowerUsageSummaries } from './PowerUsageSummary';
import { UpcomingInterruptions } from './UpcomingInterruptions';

export class Home extends React.Component {
  render() {
    return(
    <div>
      <UpcomingInterruptions />
      <PowerUsageSummaries />
    </div>
    );
  }
}