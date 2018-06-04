import * as React from 'react';
import '../App.css';
import { take } from 'lodash';
import { NavLink } from 'react-router-dom';
import { format as formatDate, parse as parseDate } from 'date-fns';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';

interface InterruptionGroupProps {
    interruptiongroupId: number;
    starttime: Date;
    endttime: Date;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}
interface InterruptionGroupState {
    interruptiongroupId: number;
    starttime: Date;
    endttime: Date;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}

export class InterruptionGroup
    extends React.Component<InterruptionGroupProps, InterruptionGroupState> {

    constructor(props: InterruptionGroupProps) {
        super(props);
        this.state = {
            interruptiongroupId: this.props.interruptiongroupId,
            starttime: this.props.starttime,
            endttime: this.props.endttime,
            powerSavingGoalInWatts: this.props.powerSavingGoalInWatts,
            overbookingFactor: this.props.overbookingFactor
        };
    }

    handleDeleteInterruptionGroup(event: React.FormEvent<HTMLDivElement>) {
        if (confirm(_('confirmDeleteInterruptionGroup'))) {
            console.log(this.props.interruptiongroupId);
            console.log(this.props.starttime);
            console.log(this.props.endttime);
            console.log(this.props.powerSavingGoalInWatts);
            console.log(this.props.overbookingFactor);
        }
        this.forceUpdate();
    }
    render() {
        let interruptiongroupId = this.props.interruptiongroupId;
        let startdate = formatDate(this.props.starttime, 'dddd DD. MMMM YYYY');
        let starttime = formatDate(this.props.starttime, 'H.mm');
        let enddate = formatDate(this.props.endttime, 'dddd DD. MMMM YYYY');
        let endtime = formatDate(this.props.endttime, 'HH.mm');
        let powerSavingGoalInWatts = this.props.powerSavingGoalInWatts;
        let overbookingFactor = this.props.overbookingFactor;

        return (
            <tr>
                <th>
                    <div
                        onClick={(event) => this.handleDeleteInterruptionGroup(event)}
                    >
                        <i className="fa fa-trash fa-fh"/>
                    </div>
                </th>
                <th>
                    <NavLink
                        to={`/EditInterruptionGroup/${this.props.interruptiongroupId}`}
                    >
                        <i className="fa fa-edit fa-fh"/>
                    </NavLink>
                </th>
                <th>{interruptiongroupId}</th>
                <th>{startdate} | {starttime}</th>
                <th>{enddate} | {endtime}</th>
                <th>{powerSavingGoalInWatts} kW</th>
                <th>{overbookingFactor} %</th>
            </tr>
        );
    }
}

interface InterruptionGroupsState {
    rowProps: InterruptionGroupProps[];
    loading: boolean;
    sortingElement: string;
    sortingDirection: string;
    searchTerm: string;
    searchColumn: string;
}

export class ListInterruptionGroups
    extends React.Component<InterruptionGroupProps, InterruptionGroupsState> {

    constructor(props: InterruptionGroupProps) {
        super(props);
        this.state = {
            rowProps: [],
            loading: true,
            sortingElement: 'interruptiongroupId',
            sortingDirection: 'ASC',
            searchTerm: '',
            searchColumn: 'id',
        };
        this.sortByIdASC = this.sortByIdASC.bind(this);
        this.sortByStarttimeASC = this.sortByStarttimeASC.bind(this);
        this.sortByEndtimeASC = this.sortByEndtimeASC.bind(this);
        this.sortByPowerSavedASC = this.sortByPowerSavedASC.bind(this);
        this.sortByOverbookingASC = this.sortByOverbookingASC.bind(this);
        this.sortByIdDESC = this.sortByIdDESC.bind(this);
        this.sortByStarttimeDESC = this.sortByStarttimeDESC.bind(this);
        this.sortByEndtimeDESC = this.sortByEndtimeDESC.bind(this);
        this.sortByPowerSavedDESC = this.sortByPowerSavedDESC.bind(this);
        this.sortByOverbookingDESC = this.sortByOverbookingDESC.bind(this);
        this.search = this.search.bind(this);
        this.searchColumn = this.searchColumn.bind(this);
    }
    sortByIdASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'interruptiongroupId',
            sortingDirection: 'ASC',
        });
        this.fetchInterruptionGroups();
    }
    sortByIdDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'interruptiongroupId',
            sortingDirection: 'DESC',
        });
        this.fetchInterruptionGroups();
    }
    sortByStarttimeASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'starttime',
            sortingDirection: 'ASC',
        });
        this.fetchInterruptionGroups();
    }
    sortByStarttimeDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'starttime' ,
            sortingDirection: 'DESC',
        });
        this.fetchInterruptionGroups();
    }
    sortByEndtimeASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'endttime',
            sortingDirection: 'ASC',
        });
        this.fetchInterruptionGroups();
    }
    sortByEndtimeDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'endttime',
            sortingDirection: 'DESC',
        });
        this.fetchInterruptionGroups();
    }
    sortByPowerSavedASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'powerSavingGoalInWatts',
            sortingDirection: 'ASC',
        });
        this.fetchInterruptionGroups();
    }
    sortByPowerSavedDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'powerSavingGoalInWatts',
            sortingDirection: 'DESC',
        });
        this.fetchInterruptionGroups();
    }
    sortByOverbookingASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'overbookingFactor',
            sortingDirection: 'ASC',
        });
        this.fetchInterruptionGroups();
    }
    sortByOverbookingDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'overbookingFactor',
            sortingDirection: 'DESC',
        });
        this.fetchInterruptionGroups();
    }
    search(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchTerm: event.currentTarget.value});
        this.fetchInterruptionGroups();
    }
    searchColumn(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({searchColumn: event.currentTarget.value});
        this.fetchInterruptionGroups();
    }

    componentDidMount() {
        this.fetchInterruptionGroups();
    }
    async fetchInterruptionGroups() {
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);

        const rowProps: InterruptionGroupProps[] = [];

        for (const interruptionGroup of interruptionGroups) {
            const searchColumn = this.state.searchColumn.toString();
            if (interruptionGroup[searchColumn].toString().match(this.state.searchTerm )) {
                rowProps.push({
                    interruptiongroupId: interruptionGroup.id,
                    starttime: parseDate(interruptionGroup.startTime),
                    endttime: parseDate(interruptionGroup.endTime),
                    powerSavingGoalInWatts: interruptionGroup.powerSavingGoalInWatts || 0.0,
                    overbookingFactor: interruptionGroup.overbookingFactor || 0.0
                });
            }
        }
        if (this.state.sortingDirection === 'ASC') {
            rowProps.sort((a, b) => {
                const sortingElement = this.state.sortingElement.toString();
                return a[sortingElement] - b[sortingElement];
            });
        } else {
            rowProps.sort((a, b) => {
                const sortingElement = this.state.sortingElement.toString();
                return b[sortingElement] - a[sortingElement];
            });
        }
        this.setState({
            rowProps: take(rowProps, 100),
            loading: false
        });
    }
    render() {
        const rows = this.state.rowProps.map(rowProp => {
            return (
                <InterruptionGroup
                    key={rowProp.interruptiongroupId.toString()}
                    {...rowProp}
                />
            );
        });

        return (
            <div className="">
                <h1>{_('allInterruptionGroups')}
                    <NavLink to="/NewInterruptionGroup">
                        <button className="btn">{_('newInterruptionGroups')}</button>
                    </NavLink>
                </h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={this.state.loading}
                    />
                </div>
                <div className="SearchFilter">
                    <p>{_('sortBy')}:
                    <select>
                        <option onClick={this.sortByIdASC}>ID {_('lowHigh')}</option>
                        <option onClick={this.sortByIdDESC}>ID {_('highLow')}</option>
                        <option onClick={this.sortByStarttimeASC}>{_('starttime')} {_('lowHigh')}</option>
                        <option onClick={this.sortByStarttimeDESC}>{_('starttime')} {_('highLow')}</option>
                        <option onClick={this.sortByEndtimeASC}>{_('endtime')} {_('lowHigh')}</option>
                        <option onClick={this.sortByEndtimeDESC}>{_('endtime')} {_('highLow')}</option>
                        <option onClick={this.sortByPowerSavedASC}>{_('powerSaved')} {_('lowHigh')}</option>
                        <option onClick={this.sortByPowerSavedDESC}>{_('powerSaved')} {_('highLow')}</option>
                        <option onClick={this.sortByOverbookingASC}>{_('overbooking')} {_('lowHigh')}</option>
                        <option onClick={this.sortByOverbookingDESC}>{_('overbooking')} {_('highLow')}</option>
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
                            <option value="startTime" onClick={this.searchColumn}>{_('starttime')}</option>
                            <option value="endTime" onClick={this.searchColumn}>{_('endtime')}</option>
                            <option
                                value="powerSavingGoalInWatts"
                                onClick={this.searchColumn}
                            >{_('powerSaved')}
                            </option>
                            <option value="overbookingFactor" onClick={this.searchColumn}>{_('overbooking')}</option>
                        </select>
                    </p>
                    <p className="SearchNote">
                        {_('searchForHint1')}
                    </p>
                    <p className="SearchNote">
                        {_('searchForHint2')}
                    </p>
                </div>
                <table className="All">
                    <thead className="InterruptionsgroupHead">
                        <tr>
                            <th/>
                            <th/>
                            <th>ID</th>
                            <th>{_('starttime')}</th>
                            <th>{_('endtime')}</th>
                            <th>{_('powerSaved')}</th>
                            <th>{_('overbooking')}</th>
                        </tr>
                    </thead>
                    <tbody className="InterruptionsgroupBody">
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}