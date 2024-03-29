import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { parse as parseDate, addMinutes, addHours } from 'date-fns';
import { InterruptionGroupsApi, Configuration } from 'jouko-ts-client';
import { _ } from '../i18n';
import { apiUrl } from '../config';

interface NewInterruptionGroupState {
    startDate: string;
    startTime: string;
    duration: string;
    powerSavingGoalInWatts: number;
    overbookingFactor: number;
}

interface Props {
    kc?: Keycloak.KeycloakInstance;
}

export class NewInterruptionGroup
    extends React.Component<Props, NewInterruptionGroupState> {
    constructor(props: Props) {
        super(props);
        this.state = {
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

    async handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        let interruptionStartDate = this.state.startDate;
        let interruptionStartTime = this.state.startTime;
        // Add current date to start time
        const starttime = parseDate(`${interruptionStartDate} ${interruptionStartTime}`);
        let interruptionDuration = this.state.duration;
        let interruptionDurationHour = Number(interruptionDuration.split(':')[0]);
        let interruptionDurationMinutes = Number(interruptionDuration.split(':')[1]);
        let endtime = addMinutes(starttime, interruptionDurationMinutes);
        endtime = addHours(endtime, interruptionDurationHour);
        let powerSavingGoalInWatts = this.state.powerSavingGoalInWatts;
        let overbookingFactor = this.state.overbookingFactor;

        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionGroupsApi = new InterruptionGroupsApi(
            configuration,
            apiUrl);

        const payload = {
            id: 1,
            startTime: starttime.toISOString(),
            endTime: endtime.toISOString(),
            powerSavingGoalInWatts: powerSavingGoalInWatts,
            overbookingFactor: overbookingFactor
        };
        
        try {
            await interruptionGroupsApi.createInterruptionGroup(payload, this.props.kc!.token);
            alert(_('alertInterruptiongroupCreated'));
        } catch (error) {
            alert(_('alertInterruptiongroupCreatedError'));
        }
    }
    
    render() {
        return (
            <div className="">
                <h1>{_('newInterruptionGroups')}
                    <NavLink to="/ListInterruptiongroups">
                        <button className="btn">{_('showAll')}</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>{_('date')}:</p>
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                    />
                    <p>{_('time')}</p>
                    <input
                        type="time"
                        name="starttime"
                        placeholder="Starttime"
                        value={this.state.startTime}
                        onChange={this.handleStartTimeChange}
                    />
                    <p>{_('duration')}</p>
                    <input
                        type="time"
                        name="duration"
                        placeholder="HH:MM"
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
                        <input type="submit" value={_('create')} onClick={(event) => this.handleSubmit(event)}/>
                    </div>
                </form>
            </div>
        );
    }
}