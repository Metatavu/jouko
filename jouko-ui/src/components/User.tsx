import * as React from 'react';

interface  UserProps {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}
interface  UserState {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

export class User extends React.Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);
    this.state = {
      username: this.props.username,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
  }
  handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({email: event.currentTarget.value});
  }
  handleFirstnameChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({firstname: event.currentTarget.value});
  }
  handleLastnameChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({lastname: event.currentTarget.value});
  }

  handleSubmit(event: React.FormEvent<HTMLInputElement>) {
    {/*
    let interruptionStartDate = this.state.startDate;
    let interruptionStartTime = this.state.startTime;
    const starttime = parseDate(interruptionStartDate + 'T' + interruptionStartTime);
    let interruptionDuration = this.state.duration;
    let interruptionDurationHour = Number(interruptionDuration.split(':')[0]);
    let interruptionDurationMinutes = Number(interruptionDuration.split(':')[1]);
    let endtime = addMinutes(starttime, interruptionDurationMinutes);
    endtime = addHours(endtime, interruptionDurationHour);
    const interruptionGroupsApi = new InterruptionGroupsApi(
      undefined,
      'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
    interruptionGroupsApi.createInterruptionGroup(
      {
        id: 0,
        startTime: starttime.toISOString(),
        endTime: endtime.toISOString()
      });
      */}

    event.preventDefault();
    alert('User successfully changed!');
  }
   render() {
    return(
      <div className="UserSettings">
        <form>
          <p>Username:</p>
          <input
            type="text"
            name="username"
            placeholder={this.state.username}
            disabled={true}
          />
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <p>Firstname:</p>
          <input
            type="text"
            name="firstName"
            value={this.state.firstname}
            onChange={this.handleFirstnameChange}
          />
          <p>Lastname:</p>
          <input
            type="text"
            name="lastName"
            value={this.state.lastname}
            onChange={this.handleLastnameChange}
          />
          <input
            type="reset"
            value="Cancel"
          />
          <input
            type="submit"
            value="Save"
            onClick={(event) => this.handleSubmit(event)}
          />
        </form>
    </div>
    );
  }
}
