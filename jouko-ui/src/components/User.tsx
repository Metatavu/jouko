import * as React from 'react';
import { _ } from '../i18n';
import { authUrl } from '../config';

const editLink = authUrl + 'realms/jouko-realm/account/';

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
            value={this.state.username}
            disabled={true}
          />
          <p>{_('email')}:</p>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            disabled={true}
          />
          <p>{_('firstname')}:</p>
          <input
            type="text"
            name="firstName"
            value={this.state.firstname}
            onChange={this.handleFirstnameChange}
            disabled={true}
          />
          <p>{_('lastname')}:</p>
          <input
            type="text"
            name="lastName"
            value={this.state.lastname}
            onChange={this.handleLastnameChange}
            disabled={true}
          />
          <input
            type="submit"
            value={_('edit')}
            onClick={() => window.open(editLink, '_blank')}
          />

          {/*
          <input
            type="reset"
            value={_('cancel')}
          />
          <input
            type="submit"
            value={_('save')}
            onClick={(event) => this.handleSubmit(event)}
          />
          */}
        </form>
    </div>
    );
  }
}
