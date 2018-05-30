import * as React from 'react';
import '../App.css';
import * as _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { format as formatDate } from 'date-fns';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { BeatLoader } from 'react-spinners';

interface InterruptionGroupProps {
    interruptiongroupId: number;
    starttime: string;
    endttime: string;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}
interface InterruptionGroupState {
    interruptiongroupId: number;
    starttime: string;
    endttime: string;
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
        if (confirm('This interruptiongroup will be deleted!')) {
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
                <th>{startdate} klo {starttime}</th>
                <th>{enddate} klo {endtime}</th>
                <th>{powerSavingGoalInWatts} kW</th>
                <th>{overbookingFactor} %</th>
            </tr>
        );
    }
}

interface InterruptionGroupsState {
    rowProps: InterruptionGroupProps[];
    loading: boolean;
}

export class ListInterruptionGroups
    extends React.Component<InterruptionGroupProps, InterruptionGroupsState> {

    constructor(props: InterruptionGroupProps) {
        super(props);
        this.state = {
            rowProps: [],
            loading: true
        };
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
            rowProps.push({
                interruptiongroupId: interruptionGroup.id,
                starttime: interruptionGroup.startTime,
                endttime: interruptionGroup.endTime,
                powerSavingGoalInWatts: interruptionGroup.powerSavingGoalInWatts || 0.0,
                overbookingFactor: interruptionGroup.overbookingFactor || 0.0
            });
        }

        this.setState({rowProps: _.take(rowProps, 100), loading: false});
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
                <h1>All Interruptiongroups
                    <NavLink to="/NewInterruptionGroup">
                        <button className="btn">New Interruptiongroup</button>
                    </NavLink>
                </h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={this.state.loading}
                    />
                </div>
                <table className="All">
                    <thead className="InterruptionsgroupHead">
                        <tr>
                            <th/>
                            <th/>
                            <th>ID</th>
                            <th>Starttime</th>
                            <th>Endtime</th>
                            <th>Power Saved [kW]</th>
                            <th>Overbooking [%]</th>
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