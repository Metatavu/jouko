import * as React from 'react';
import { PowerUsageSummaries } from './PowerUsageSummary';
import { UpcomingInterruptions } from './UpcomingInterruptions';

interface  HomeProps {
  currentUserId: number;
}

export class Home extends React.Component<HomeProps> {
  render() {
    return(
    <div>
      <UpcomingInterruptions currentUserId={this.props.currentUserId as number}/>
      <PowerUsageSummaries currentUserId={this.props.currentUserId as number}/>
    </div>
    );
  }
}