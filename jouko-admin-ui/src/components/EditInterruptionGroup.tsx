import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { parse as parseDate, addMinutes, addHours } from 'date-fns';
import { InterruptionGroupsApi } from 'jouko-ts-client';
import { _ } from '../i18n';

interface EditInterruptionGroupProps {
    interruptionGroupId: number;
}
interface EditInterruptionGroupState {
    interruptionGroupId: number;
    startDate: string;
    startTime: string;
    duration: string;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}

export class EditInterruptionGroup
    extends React.Component<EditInterruptionGroupProps, EditInterruptionGroupState> {
    constructor(props: EditInterruptionGroupProps) {
        super(props);
        this.state = {
            interruptionGroupId: this.props.interruptionGroupId,
            startDate: '',
            startTime: '',
            duration: '',
            powerSavingGoalInWatts: 0,
            overbookingFactor: 0
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handlePowerSavingGoalInWattsChange = this.handlePowerSavingGoalInWattsChange.bind(this);
        this.handleOverbookingFactorChange = this.handleOverbookingFactorChange.bind(this);
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
        const interruptionGroupsApi = new InterruptionGroupsApi(
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
        event.preventDefault();
        alert(_('alertInterruptiongroupChanged'));
    }
    render() {
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
                {/*
                <form className="edit-item-form">
                    <p>{_('date')}:</p>
                    <input
                        type="text"
                        name="date"
                        value={this.state.startDate}
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
