import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
// import { parse as parseDate } from 'date-fns';
// import { addMinutes, addHours } from 'date-fns';
import { format as formatDate } from 'date-fns';
import { InterruptionsApi } from 'jouko-ts-client';
import { _ } from '../i18n';
import { take } from 'lodash';

interface InterruptionGroupProps {
    interruptionGroupId: number;
}
interface InterruptionProps {
    interruptionGroupId: number;
    startTime: string;
    endTime: string;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}
interface EditInterruptionGroupState {
    interruptionGroupId: number;
    startDate: string;
    startTime: string;
    duration: string;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
    interruption: InterruptionProps[];
}

export class EditInterruptionGroup
    extends React.Component<InterruptionGroupProps, EditInterruptionGroupState> {
    constructor(props: InterruptionGroupProps) {
        super(props);
        this.state = {
            interruptionGroupId: this.props.interruptionGroupId,
            startDate: '',
            startTime: '',
            duration: '',
            powerSavingGoalInWatts: 0,
            overbookingFactor: 0,
            interruption: []
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handlePowerSavingGoalInWattsChange = this.handlePowerSavingGoalInWattsChange.bind(this);
        this.handleOverbookingFactorChange = this.handleOverbookingFactorChange.bind(this);
    }
    componentDidMount() {
        this.fetchSingleInterruption();
    }
    async fetchSingleInterruption() {
        const interruptionsApi = new InterruptionsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        const interruptions = await interruptionsApi.retrieveInterruptionGroup(Number(this.props.interruptionGroupId));

        const interruption: InterruptionProps[] = [];
        interruption.push({
            interruptionGroupId: interruptions.id,
            startTime: interruptions.startTime,
            endTime: interruptions.endTime,
            powerSavingGoalInWatts: interruptions.powerSavingGoalInWatts || 0.0,
            overbookingFactor: interruptions.overbookingFactor || 0.0
        });

        this.setState({interruption: take(interruption, 100)});
    }

    handleStartDateChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({startDate: event.currentTarget.value});
    }
    handleStartTimeChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({startTime: event.currentTarget.value});
    }
    handleDurationChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({duration: event.currentTarget.value});
    }
    handlePowerSavingGoalInWattsChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({powerSavingGoalInWatts: event.currentTarget.valueAsNumber});
    }
    handleOverbookingFactorChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({overbookingFactor: event.currentTarget.valueAsNumber});
    }

    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        {/*
        let interruptionStartDate = this.state.startDate;
        let interruptionStartTime = this.state.startTime;
        const starttime = parseDate(interruptionStartDate + 'T' + interruptionStartTime);
        let interruptionDuration = this.state.duration;
        let interruptionDurationHour = Number(interruptionDuration.split(':')[0]);
        let interruptionDurationMinutes = Number(interruptionDuration.split(':')[1]);
        let endtime = addMinutes(starttime, interruptionDurationMinutes);
        endtime = addHours(endtime, interruptionDurationHour);
        let powerSavingGoalInWatts = this.state.powerSavingGoalInWatts;
        let overbookingFactor = this.state.overbookingFactor;
        const interruptionGroupsApi = new InterruptionsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        interruptionGroupsApi.createInterruptionGroup(
            {
                id: 0,
                startTime: starttime.toISOString(),
                endTime: endtime.toISOString(),
                powerSavingGoalInWatts: powerSavingGoalInWatts,
                overbookingFactor: overbookingFactor
            });
            */}
        event.preventDefault();
        alert(_('alertInterruptiongroupChanged'));
    }
    render() {
        const editForm = this.state.interruption.map((interruption, index) => {
            return (
                <form className="edit-item-form" key={index.toString()}>
                    <p>ID:</p>
                    <input
                        type="text"
                        name="id"
                        value={interruption.interruptionGroupId}
                        disabled={true}
                    />
                    <p>{_('starttime')}</p>
                    <input
                        type="text"
                        name="starttime"
                        value={formatDate(interruption.startTime, 'dddd DD. MMMM YYYY | HH:MM')}
                        disabled={true}
                    />
                    <p>{_('endtime')}</p>
                    <input
                        type="text"
                        name="endttime"
                        value={formatDate(interruption.endTime, 'dddd DD. MMMM YYYY | HH:MM')}
                        disabled={true}
                    />
                    <p>{_('powerToBeSaved')}</p>
                    <input
                        type="text"
                        name="powerSavingGoalInWatts"
                        value={`${interruption.powerSavingGoalInWatts} kW`}
                        disabled={true}
                    />
                    <p>{_('overbooking')}</p>
                    <input
                        type="text"
                        name="overbookingFactor"
                        value={`${interruption.overbookingFactor} %`}
                        disabled={true}
                    />
                </form>
            );
        });
        return (
            <div className="">
                <h1>{_('editInterruptiongroup')}
                    <NavLink to="/ListInterruptiongroups">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <br/><br/><br/>
                <div className="InformationBox">
                    <div className="InformationBoxIcon">
                        <i className="fa fa-exclamation-triangle"/>
                    </div>
                    <div className="InformationBoxText">
                        <h3>
                            {_('noEditInterruptiongroupPossible1')}
                            <NavLink to="/ListInterruptiongroups">
                                {_('noEditInterruptiongroupPossible2')}
                            </NavLink>
                            {_('noEditInterruptiongroupPossible3')}
                            <NavLink to="/NewInterruptionGroup">
                                {_('noEditInterruptiongroupPossible4')}
                            </NavLink>
                        </h3>
                    </div>
                </div>
                {editForm}
                {/*
                <form className="edit-item-form" key={index.toString()}>
                    <p>{_('date')}:</p>
                    <input
                        type="text"
                        name="date"
                        value={interruption.id}
                        onChange={this.handleStartDateChange}
                    />
                    <p>{_('time')}</p>
                    <input
                        type="text"
                        name="starttime"
                        value={this.state.startTime}
                        onChange={this.handleStartTimeChange}
                    />
                    <p>{_('duration')}</p>
                    <input
                        type="text"
                        name="duration"
                        value={this.state.duration}
                        onChange={this.handleDurationChange}
                    />
                    <p>{_('powerToBeSaved')}</p>
                    <input
                        type="number"
                        name="powerSavingGoalInWatts"
                        value={this.state.powerSavingGoalInWatts}
                        onChange={this.handlePowerSavingGoalInWattsChange}
                    />
                    <p>{_('overbooking')}</p>
                    <input
                        type="number"
                        name="overbookingFactor"
                        value={this.state.overbookingFactor}
                        onChange={this.handleOverbookingFactorChange}
                    />
                    <div className="ActionField">
                        <input type="reset" value={_('cancel')} />
                        <input type="submit" value={_('edit')} onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                </form>
                */}
            </div>
        );
    }
}
