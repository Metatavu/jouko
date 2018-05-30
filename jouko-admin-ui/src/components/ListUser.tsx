import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

interface UserProps {
    userId: number;
    keycloakId: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
}

export class ListUser extends React.Component<UserProps> {
    handleDeleteUser(event: React.FormEvent<HTMLDivElement>) {
        if (confirm('This user will be deleted!')) {
            console.log(this.props.userId);
            console.log(this.props.keycloakId);
            console.log(this.props.username);
            console.log(this.props.firstname);
            console.log(this.props.lastname);
        }
        this.forceUpdate();
    }
    sortById(event: React.FormEvent<HTMLOptionElement>) {
        alert('Sort by ID');
    }
    sortByUsername(event: React.FormEvent<HTMLOptionElement>) {
        alert('Sort by Username');
    }
    sortByFirstname(event: React.FormEvent<HTMLOptionElement>) {
        alert('Sort by Firstname');
    }
    sortByLastname(event: React.FormEvent<HTMLOptionElement>) {
        alert('Sort by Lastname');
    }

    render() {
        return (
            <div className="">
                <h1>All Users
                    <NavLink to="/NewUser">
                        <button className="btn">New User</button>
                    </NavLink>
                </h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={false}
                    />
                </div>
                <div className="SearchFilter">
                    <p>Sort by:
                    <select>
                        <option onClick={this.sortById}>ID</option>
                        <option onClick={this.sortByUsername}>Username</option>
                        <option onClick={this.sortByFirstname}>Firstname</option>
                        <option onClick={this.sortByLastname}>Lastname</option>
                    </select>
                    </p>
                </div>
                <table className="AllUser">
                    <thead>
                    <tr>
                        <th/>
                        <th/>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>
                            <div
                                onClick={(event) => this.handleDeleteUser(event)}
                            >
                                <i className="fa fa-trash fa-fh"/>
                            </div>
                        </th>
                        <th>
                            <div>
                                <NavLink to={`/EditUser/${this.props.userId}`}>
                                    <i className="fa fa-edit fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                        <th>1</th>
                        <th>Username1</th>
                        <th>Firstname1</th>
                        <th>Lastname1</th>
                        <th>
                            <div>
                                <NavLink to={`/ShowUser/${this.props.userId}`}>
                                    <i className="fa fa-arrow-circle-right fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div
                                onClick={(event) => this.handleDeleteUser(event)}
                            >
                                <i className="fa fa-trash fa-fh"/>
                            </div>
                        </th>
                        <th>
                            <div>
                                <NavLink to={`/EditUser/${this.props.userId}`}>
                                    <i className="fa fa-edit fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                        <th>2</th>
                        <th>Username2</th>
                        <th>Firstname2</th>
                        <th>Lastname2</th>
                        <th>
                            <div>
                                <NavLink to={`/ShowUser/${this.props.userId}`}>
                                    <i className="fa fa-arrow-circle-right fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div
                                onClick={(event) => this.handleDeleteUser(event)}
                            >
                                <i className="fa fa-trash fa-fh"/>
                            </div>
                        </th>
                        <th>
                            <div>
                                <NavLink to={`/EditUser/${this.props.userId}`}>
                                    <i className="fa fa-edit fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                        <th>3</th>
                        <th>Username3</th>
                        <th>Firstname3</th>
                        <th>Lastname3</th>
                        <th>
                            <div>
                                <NavLink to={`/ShowUser/${this.props.userId}`}>
                                    <i className="fa fa-arrow-circle-right fa-fh"/>
                                </NavLink>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}