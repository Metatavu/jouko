import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';
import { take } from 'lodash';
import { UsersApi } from 'jouko-ts-client';

interface UserProps {
    userId: number;
    keycloakId: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
}
interface UserState {
    users: UserProps[];
    sortingElement: string;
    sortingDirection: string;
    searchTerm: string;
    searchColumn: string;
}
export class ListUser extends
    React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            users: [],
            sortingElement: 'id',
            sortingDirection: 'ASC',
            searchTerm: '',
            searchColumn: 'id'
        };
        this.sortByIdASC = this.sortByIdASC.bind(this);
        this.sortByUsernameASC = this.sortByUsernameASC.bind(this);
        this.sortByFirstnameASC = this.sortByFirstnameASC.bind(this);
        this.sortByLastnameASC = this.sortByLastnameASC.bind(this);
        this.sortByIdDESC = this.sortByIdDESC.bind(this);
        this.sortByUsernameDESC = this.sortByUsernameDESC.bind(this);
        this.sortByFirstnameDESC = this.sortByFirstnameDESC.bind(this);
        this.sortByLastnameDESC = this.sortByLastnameDESC.bind(this);
        this.search = this.search.bind(this);
        this.searchColumn = this.searchColumn.bind(this);
    }

    componentDidMount() {
        this.fetchAllUsers();
    }
    handleDeleteUser(event: React.FormEvent<HTMLDivElement>) {
        if (confirm(_('confirmDeleteUser'))) {
            console.log(this.props.userId);
            console.log(this.props.keycloakId);
            console.log(this.props.username);
            console.log(this.props.firstname);
            console.log(this.props.lastname);
        }
        this.forceUpdate();
    }
    sortByIdASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceId',
            sortingDirection: 'ASC',
        });
        this.fetchAllUsers();
    }
    sortByIdDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceId',
            sortingDirection: 'DESC',
        });
        this.fetchAllUsers();
    }
    sortByUsernameASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'username',
            sortingDirection: 'ASC',
        });
        this.fetchAllUsers();
    }
    sortByUsernameDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'username',
            sortingDirection: 'DESC',
        });
        this.fetchAllUsers();
    }
    sortByFirstnameASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'firstname',
            sortingDirection: 'ASC',
        });
        this.fetchAllUsers();
    }
    sortByFirstnameDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'firstname',
            sortingDirection: 'DESC',
        });
        this.fetchAllUsers();
    }
    sortByLastnameASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'lastname',
            sortingDirection: 'ASC',
        });
        this.fetchAllUsers();
    }
    sortByLastnameDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'lastname',
            sortingDirection: 'DESC',
        });
        this.fetchAllUsers();
    }
    search(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchTerm: event.currentTarget.value.toString()});
        this.fetchAllUsers();
    }
    searchColumn(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({searchColumn: event.currentTarget.value.toString()});
        this.fetchAllUsers();
    }
    async fetchAllUsers() {
        const allUsersApi = new UsersApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const allUsers = await allUsersApi.listUsers(0, 1000);
        const users: UserProps[] = [];
        for (const user of allUsers) {
            const searchColumn = this.state.searchColumn.toString();
            if (user[searchColumn].toString().match(this.state.searchTerm )) {
                user.push({
                    userId: user.id,
                    username: user.username.toString(),
                    firstname: user.firstname.toString(),
                    lastname: user.lastname.toString()
                });
            }
        }
        if (this.state.sortingDirection === 'ASC') {
            const sortingElement = this.state.sortingElement.toString();
            if (sortingElement === 'username') {
                users.sort((a, b) => a.username.localeCompare(b.username));
            } else if (sortingElement === 'firstname') {
                users.sort((a, b) => a.firstname.localeCompare(b.firstname));
            } else if (sortingElement === 'lastname') {
                users.sort((a, b) => a.lastname.localeCompare(b.lastname));
            } else {
                users.sort((a, b) => {
                    return a[sortingElement] - b[sortingElement];
                });
            }
        } else {
            const sortingElement = this.state.sortingElement.toString();
            if (sortingElement === 'username') {
                users.sort((a, b) => b.username.localeCompare(a.username));
            } else if (sortingElement === 'firstname') {
                users.sort((a, b) => b.firstname.localeCompare(a.firstname));
            } else if (sortingElement === 'deviceName') {
                users.sort((a, b) => b.lastname.localeCompare(a.lastname));
            } else {
                users.sort((a, b) => {
                    return b[sortingElement] - a[sortingElement];
                });
            }
        }
        this.setState({users: take(users, 100)});
    }

    render() {
        const allUsers = this.state.users.map((users, index) => {
            return (
                <tr key={index.toString()}>
                    <th>
                        <div
                            onClick={(event) => this.handleDeleteUser(event)}
                        >
                            <i className="fa fa-trash fa-fh"/>
                        </div>
                    </th>
                    <th>
                        <div>
                            <NavLink to={`/EditUser/${users.userId}`}>
                                <i className="fa fa-edit fa-fh"/>
                            </NavLink>
                        </div>
                    </th>
                    <th>{users.userId}</th>
                    <th>{users.username}</th>
                    <th>{users.firstname}</th>
                    <th>{users.lastname}</th>
                    <th>
                        <div>
                            <NavLink to={`/ShowUser/${users.userId}`}>
                                <i className="fa fa-arrow-circle-right fa-fh"/>
                            </NavLink>
                        </div>
                    </th>
                </tr>
            );
        });
        return (
            <div className="">
                <h1>{_('allUsers')}
                    <NavLink to="/NewUser">
                        <button className="btn">{_('newUser')}</button>
                    </NavLink>
                </h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={false}
                    />
                </div>
                <div className="SearchFilter">
                    <p>{_('sortBy')}
                    <select>
                        <option onClick={this.sortByIdASC}>ID {_('lowHigh')}</option>
                        <option onClick={this.sortByIdDESC}>ID {_('highLow')}</option>
                        <option onClick={this.sortByUsernameASC}>{_('username')} {_('lowHigh')}</option>
                        <option onClick={this.sortByUsernameDESC}>{_('username')} {_('highLow')}</option>
                        <option onClick={this.sortByFirstnameASC}>{_('firstname')} {_('lowHigh')}</option>
                        <option onClick={this.sortByFirstnameDESC}>{_('firstname')} {_('highLow')}</option>
                        <option onClick={this.sortByLastnameASC}>{_('lastname')} {_('lowHigh')}</option>
                        <option onClick={this.sortByLastnameDESC}>{_('lastname')} {_('highLow')}</option>
                    </select>
                    </p>
                    <p>
                        {_('searchFor')}:
                        <input
                            type="text"
                            name="search"
                            placeholder={_('search')}
                            className="SearchInput"
                            onChange={this.search}
                        />
                        {_('in')}:
                        <select>
                            <option value="id" onClick={this.searchColumn}>ID</option>
                            <option value="username" onClick={this.searchColumn}>{_('username')}</option>
                            <option value="firstname" onClick={this.searchColumn}>{_('firstname')}</option>
                            <option value="lastname" onClick={this.searchColumn}>{_('lastname')}</option>
                        </select>
                    </p>
                </div>
                <table className="AllUser">
                    <thead>
                    <tr>
                        <th/>
                        <th/>
                        <th>ID</th>
                        <th>{_('username')}</th>
                        <th>{_('firstname')}</th>
                        <th>{_('lastname')}</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                        {allUsers}
                    </tbody>
                </table>
            </div>
        );
    }
}