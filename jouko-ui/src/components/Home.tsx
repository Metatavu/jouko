import * as React from 'react';
import { UpcomingInterruptions } from './UpcomingInterruptions';
import { PowerUsageSummaries } from './PowerUsageSummary';
import { WelcomeBox } from './WelcomeBox';

interface  HomeProps {
  currentUserId: number;
  firstname: string;
  lastname: string;
}

export class Home extends React.Component<HomeProps> {
  render() {
    return(
    <div>
      <WelcomeBox
        firstname={this.props.firstname as string}
        lastname={this.props.lastname as string}
      />
      <UpcomingInterruptions
        currentUserId={this.props.currentUserId as number}
      />
      <PowerUsageSummaries
        currentUserId={this.props.currentUserId as number}
      />
    </div>
    );
  }
}