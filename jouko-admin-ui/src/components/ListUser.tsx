import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

interface UserProps {
    userId: number;
}

export class ListUser extends React.Component<UserProps> {
    handleDeleteUser(event: React.FormEvent<HTMLDivElement>) {
        if (confirm('This user will be deleted!')) {
            {/*
            const array = this.state.devices;
            const startIndex = Number(index);
            array.splice(startIndex, 1);
            */
            }
        }
        this.forceUpdate();
    }
    render() {
        return (
            <div className="">
                <h1>All Users
                    <NavLink to="/NewUser">
                        <button className="btn">New User</button>
                    </NavLink>
                </h1>
                <table className="All">
                    <thead>
                    <tr>
                        <th/>
                        <th/>
                        <th>Username</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
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
                        <th>Username1</th>
                        <th>Firstname1</th>
                        <th>Lastname1</th>
                        <th>Email1</th>
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
                        <th>Username2</th>
                        <th>Firstname2</th>
                        <th>Lastname2</th>
                        <th>Email2</th>
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
                        <th>Username3</th>
                        <th>Firstname3</th>
                        <th>Lastname3</th>
                        <th>Email3</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}