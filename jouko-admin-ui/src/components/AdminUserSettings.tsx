import * as React from 'react';
import { _ } from '../i18n';

interface Props {
    kc?: Keycloak.KeycloakInstance;
    userId: number;
    username: string;
    keycloakId: string;
    email: string;
    firstname: string;
    lastname: string;
}

interface  AdminUserSettingsState {
    userId: number;
    username: string;
    keycloakId: string;
    email: string;
    firstname: string;
    lastname: string;
}

export class AdminUserSettings extends React.Component<Props, AdminUserSettingsState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            username: this.props.username,
            keycloakId: this.props.keycloakId,
            email: this.props.email,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
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
    alert(_('alertAdminDataChanged'));
    }
    render() {
        return(
            <div>
                <h1>{_('adminUserData')}</h1>
                <div className="edit-item-form">
                    <form>
                        <p>{_('username')}:</p>
                        <input
                            type="text"
                            name="username"
                            value={this.props.username}
                            disabled={true}
                        />
                        <p>{_('email')}:</p>
                        <input
                            type="text"
                            name="email"
                            value={this.props.email}
                            onChange={this.handleEmailChange}
                            disabled={true}
                        />
                        <p>{_('firstname')}:</p>
                        <input
                            type="text"
                            name="firstName"
                            value={this.props.firstname}
                            onChange={this.handleFirstnameChange}
                            disabled={true}
                        />
                        <p>{_('lastname')}:</p>
                        <input
                            type="text"
                            name="lastName"
                            value={this.props.lastname}
                            onChange={this.handleLastnameChange}
                            disabled={true}
                        />
                        {/*
                        <div className="ActionField">
                            <input type="reset" value={_('cancel')} />
                            <input type="submit" value={_('edit')} onClick={(event) => this.handleSubmit(event)}/>
                        </div>
                        */}
                    </form>
                </div>
            </div>
        );
    }
}