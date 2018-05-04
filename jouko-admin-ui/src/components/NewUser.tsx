import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
// import { UserApi } from 'jouko-ts-client';

interface NewUserProps {
    createNewUser(): void;
}
interface NewUserState {
    userId: number;
    keycloakId: string;
    firstname: string;
    lastname: string;
}

export class NewUser
    extends React.Component<NewUserProps, NewUserState> {
    constructor(props: NewUserProps) {
        super(props);
        this.state = {
            userId: 0,
            keycloakId: '',
            firstname: '',
            lastname: ''
        };
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleKeycloakIdChange = this.handleKeycloakIdChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
    }
    handleUserIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({userId: event.currentTarget.valueAsNumber});
    }
    handleKeycloakIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({keycloakId: event.currentTarget.value});
    }
    handleFirstnameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({firstname: event.currentTarget.value});
    }
    handleLastnameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({lastname: event.currentTarget.value});
    }
    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        const fullName = lastname + ' ' + firstname;
        console.log(this.state.userId);
        console.log(this.state.keycloakId);
        console.log(fullName);
        {/*
        const userApi = new UserApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        userApi.createUser(
            {
                id: 0,
                keycloakId: this.state.keycloakId,
                name: fullName
            });
        */}
        event.preventDefault();
        alert('User created');
    }

    render() {

        return (
            <div className="">
                <h1>New User
                    <NavLink to="/User">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                {/*
                <form className="new-item-form">
                    <p>User ID:</p>
                    <input type="text" name="userId" />
                    <p>Keycloak ID:</p>
                    <input type="text" name="keycloakId" />
                    <p>Username:</p>
                    <input type="text" name="username" />
                    <p>Firstname:</p>
                    <input type="text" name="firstname" />
                    <p>Lastname:</p>
                    <input type="text" name="lastName" />
                    <p>Email:</p>
                    <input type="email" name="email" />
                    <input type="reset" value="Cancel" /> <input type="submit" value="Create" />
                </form>
                */}
                <form className="new-item-form">
                    <p>UserID:</p>
                    <input
                        type="text"
                        name="userId"
                        value={this.state.userId}
                        onChange={this.handleUserIdChange}
                    />
                    <p>Keycloak ID:</p>
                    <input
                        type="text"
                        name="keycloakId"
                        value={this.state.keycloakId}
                        onChange={this.handleKeycloakIdChange}
                    />
                    <p>Firstname:</p>
                    <input
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleFirstnameChange}
                    />
                    <p>Lastname:</p>
                    <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleLastnameChange}
                    />
                    <input type="reset" value="Cancel" />
                    <input type="submit" value="Create" onClick={(event) => this.handleSubmit(event)}/>
                </form>
            </div>
        );
    }
}