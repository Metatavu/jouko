import * as React from 'react';
import '../App.css';
import { take } from 'lodash';
import { NavLink } from 'react-router-dom';
import { addDays, format as formatDate, parse as parseDate } from 'date-fns';
import { InterruptionGroupsApi, Configuration } from 'jouko-ts-client';
import { BeatLoader } from 'react-spinners';
import { _ } from '../i18n';
import { apiUrl } from '../config';

// tslint:disable-next-line:no-any
let searchbetween: any;

interface InterruptionGroupProps {
    interruptiongroupId: number;
    starttime: Date;
    endttime: Date;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}

interface Props {
    kc?: Keycloak.KeycloakInstance;
}

interface InterruptionGroupsState {
    rowProps: InterruptionGroupProps[];
    loading: boolean;
    sortingElement: string;
    sortingDirection: string;
    searchTerm: string;
    searchBetweenA: string;
    searchBetweenB: string;
    searchColumn: string;
    disableSearch: boolean;
    disableSearchBetween: boolean;
}

export class ListInterruptionGroups
    extends React.Component<Props, InterruptionGroupsState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            rowProps: [],
            loading: true,
            sortingElement: 'interruptiongroupId',
            sortingDirection: 'ASC',
            searchTerm: '',
            searchBetweenA: '',
            searchBetweenB: '',
            searchColumn: 'id',
            disableSearch: false,
            disableSearchBetween: false,
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
        this.searchBetweenA = this.searchBetweenA.bind(this);
        this.searchBetweenB = this.searchBetweenB.bind(this);
        this.searchColumn = this.searchColumn.bind(this);
    }
    // The methods below filter the list of interruption groups based on the sortingElement and sortingDirection
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
    searchBetweenA(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchBetweenA: event.currentTarget.value});
        this.fetchInterruptionGroups();
    }
    searchBetweenB(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchBetweenB: event.currentTarget.value});
        this.fetchInterruptionGroups();
    }
    searchColumn(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({searchColumn: event.currentTarget.value});
        if (event.currentTarget.value === 'startTime') {
            searchbetween = (
                <h5>Search between
                    <input
                        type="text"
                        name="searchBetweenA"
                        placeholder="2018-01-01"
                        className="SearchBetweenA"
                        onChange={this.searchBetweenA}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenB !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    /> and
                    <input
                        type="text"
                        name="searchBetweenB"
                        placeholder="2018-01-25"
                        className="SearchBetweenB"
                        onChange={this.searchBetweenB}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenA !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    />
                </h5>
            );
        } else if (event.currentTarget.value === 'endTime') {
            searchbetween = (
                <h5>Search between
                    <input
                        type="text"
                        name="searchBetweenA"
                        placeholder="2018-01-01"
                        className="SearchBetweenA"
                        onChange={this.searchBetweenA}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenB !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    /> and
                    <input
                        type="text"
                        name="searchBetweenB"
                        placeholder="2018-01-25"
                        className="SearchBetweenB"
                        onChange={this.searchBetweenB}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenA !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    />
                </h5>
            );
        }  else if (event.currentTarget.value === 'powerSavingGoalInWatts') {
            searchbetween = (
                <h5>Search between
                    <input
                        type="text"
                        name="searchBetweenA"
                        placeholder="0"
                        className="SearchBetweenA"
                        onChange={this.searchBetweenA}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenB !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    /> and
                    <input
                        type="text"
                        name="searchBetweenB"
                        placeholder="100"
                        className="SearchBetweenB"
                        onChange={this.searchBetweenB}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenA !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    />
                </h5>
            );
        }  else if (event.currentTarget.value === 'overbookingFactor') {
            searchbetween = (
                <h5>Search between
                    <input
                        type="text"
                        name="search"
                        placeholder="0"
                        className="SearchBetweenA"
                        onChange={this.searchBetweenA}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenB !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    /> and
                    <input
                        type="text"
                        name="search"
                        placeholder="100"
                        className="SearchBetweenB"
                        onChange={this.searchBetweenB}
                        disabled={this.state.disableSearchBetween}
                        onInput={(ev) => this.setState({
                            disableSearch: ((this.state.searchBetweenA !== '') && (ev.currentTarget.value !== ''))}
                        )}
                    />
                </h5>
            );
        } else {
            searchbetween = '';
            this.fetchInterruptionGroups();
        }

    }

    componentDidMount() {
        console.log(this.props);
        this.fetchInterruptionGroups();
    }

    async fetchInterruptionGroups() {
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(
            configuration,
            apiUrl);
        const interruptionGroups = await interruptionGroupsApi.listInterruptionGroups(0, 1000);

        const rowProps: InterruptionGroupProps[] = [];
    
        // For each interruption group, create a row in the table
        for (const interruptionGroup of interruptionGroups) {
            const searchColumn = this.state.searchColumn.toString();
            if (interruptionGroup[searchColumn].toString().match(this.state.searchTerm )) {
                let firstDate = parseDate(this.state.searchBetweenA);
                let secondDate = parseDate(this.state.searchBetweenB);
                if (this.state.searchBetweenA && this.state.searchBetweenB) {
                    if (
                        (searchColumn === 'startTime' || searchColumn === 'endTime') &&
                        (parseDate(interruptionGroup[searchColumn]) >= firstDate) &&
                        (parseDate(interruptionGroup[searchColumn]) <= parseDate(formatDate(addDays(secondDate, 1))))
                    ) {
                        rowProps.push({
                            interruptiongroupId: interruptionGroup.id,
                            starttime: parseDate(interruptionGroup.startTime),
                            endttime: parseDate(interruptionGroup.endTime),
                            powerSavingGoalInWatts: interruptionGroup.powerSavingGoalInWatts || 0.0,
                            overbookingFactor: interruptionGroup.overbookingFactor || 0.0
                        });
                    } else if (
                        (searchColumn === 'powerSavingGoalInWatts' || searchColumn === 'overbookingFactor') &&
                        (Number(interruptionGroup[searchColumn]) >= Number(this.state.searchBetweenA)) &&
                        (Number(interruptionGroup[searchColumn]) <= Number(this.state.searchBetweenB))
                    ) {
                        rowProps.push({
                            interruptiongroupId: interruptionGroup.id,
                            starttime: parseDate(interruptionGroup.startTime),
                            endttime: parseDate(interruptionGroup.endTime),
                            powerSavingGoalInWatts: interruptionGroup.powerSavingGoalInWatts || 0.0,
                            overbookingFactor: interruptionGroup.overbookingFactor || 0.0
                        });
                    }
                } else {
                    rowProps.push({
                        interruptiongroupId: interruptionGroup.id,
                        starttime: parseDate(interruptionGroup.startTime),
                        endttime: parseDate(interruptionGroup.endTime),
                        powerSavingGoalInWatts: interruptionGroup.powerSavingGoalInWatts || 0.0,
                        overbookingFactor: interruptionGroup.overbookingFactor || 0.0
                    });
                }
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

    async handleDeleteInterruptionGroup(event: number) {
        if (confirm(_('confirmDeleteInterruptionGroup'))) {
            console.log(event);
        }

        const configuration = new Configuration({
            apiKey: 'Bearer ' + this.props.kc!.token
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(configuration, apiUrl);
        await interruptionGroupsApi.deleteInterruption(event);
        this.fetchInterruptionGroups();
    }

    render() {
        const rows = this.state.rowProps.map(rowProp => {
            let interruptiongroupId = rowProp.interruptiongroupId;
            let startdate = formatDate(rowProp.starttime, 'dddd DD. MMMM YYYY');
            let starttime = formatDate(rowProp.starttime, 'H:mm');
            let enddate = formatDate(rowProp.endttime, 'dddd DD. MMMM YYYY');
            let endtime = formatDate(rowProp.endttime, 'HH:mm');
            let powerSavingGoalInWatts = rowProp.powerSavingGoalInWatts;
            let overbookingFactor = rowProp.overbookingFactor;

            return (
                <tr key={rowProp.interruptiongroupId}>
                    <th>
                        <div
                            onClick={() => this.handleDeleteInterruptionGroup(interruptiongroupId)}
                        >
                            <i className="fa fa-trash fa-fh"/>
                        </div>
                    </th>
                    <th>
                        <NavLink
                            to={`/EditInterruptionGroup/${interruptiongroupId}`}
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
                                disabled={this.state.disableSearch}
                                onInput={(ev) => this.setState({
                                    disableSearch: false,
                                    disableSearchBetween: ev.currentTarget.value !== ''}
                                )}

                            />
                            {_('in')}:
                            <select>
                                <option value="id" onClick={this.searchColumn}>ID</option>
                                <option value="startTime" onClick={this.searchColumn}>{_('starttime')}</option>
                                <option value="endTime" onClick={this.searchColumn}>{_('endtime')}</option>
                                <option
                                    value="powerSavingGoalInWatts"
                                    onClick={this.searchColumn}
                                >
                                    {_('powerSaved')}
                                </option>
                                <option
                                    value="overbookingFactor"
                                    onClick={this.searchColumn}
                                >
                                    {_('overbooking')}
                                </option>
                            </select>
                        {searchbetween}
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