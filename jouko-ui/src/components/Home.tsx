import * as React from 'react';
import { UpcomingInterruptions } from './UpcomingInterruptions';
import { PowerUsageSummaries } from './PowerUsageSummary';
import { KeycloakInstance } from 'keycloak-js';

interface  HomeProps {
  currentUserId: number;
  kc?: KeycloakInstance;
}

export class Home extends React.Component<HomeProps> {
  render() {
    return(
    <div>
      <UpcomingInterruptions
        currentUserId={this.props.currentUserId as number}
        kc={this.props.kc!}
      />
      <PowerUsageSummaries
        currentUserId={this.props.currentUserId as number}
        kc={this.props.kc!}
      />
    </div>
    );
  }
}