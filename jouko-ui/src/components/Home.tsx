import * as React from 'react';
import { UpcomingInterruptions } from './UpcomingInterruptions';
import { PowerUsageSummaries } from './PowerUsageSummary';

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