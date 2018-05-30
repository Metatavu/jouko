import * as React from 'react';
import { _ } from '../i18n';

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
    event.preventDefault();
    alert(_('alertUserDataChanged'));
  }
   render() {
    return(
      <div className="UserSettings">
        <form>
          <p>{_('username')}:</p>
          <input
            type="text"
            name="username"
            placeholder={this.state.username}
            disabled={true}
          />
          <p>{_('email')}:</p>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <p>{_('firstname')}:</p>
          <input
            type="text"
            name="firstName"
            value={this.state.firstname}
            onChange={this.handleFirstnameChange}
          />
          <p>{_('lastname')}:</p>
          <input
            type="text"
            name="lastName"
            value={this.state.lastname}
            onChange={this.handleLastnameChange}
          />
          <input
            type="reset"
            value={_('cancel')}
          />
          <input
            type="submit"
            value={_('save')}
            onClick={(event) => this.handleSubmit(event)}
          />
        </form>
    </div>
    );
  }
}
