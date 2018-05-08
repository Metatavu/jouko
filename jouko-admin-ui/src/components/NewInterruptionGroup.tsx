import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { parse as parseDate, addMinutes, addHours } from 'date-fns';
import { InterruptionGroupsApi } from 'jouko-ts-client';

interface NewInterruptionGroupProps {
    createNewInterruptionGroup(): void;
}
interface NewInterruptionGroupState {
    interruptionGroupId: number;
    startDate: string;
    startTime: string;
    duration: string;
}

export class NewInterruptionGroup
    extends React.Component<NewInterruptionGroupProps, NewInterruptionGroupState> {
    constructor(props: NewInterruptionGroupProps) {
        super(props);
        this.state = {
            interruptionGroupId: 0,
            startDate: '',
            startTime: '',
            duration: '',
        };
        this.handleInterruptionGroupIdChange = this.handleInterruptionGroupIdChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
    }
    handleInterruptionGroupIdChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({interruptionGroupId: event.currentTarget.valueAsNumber});
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

    handleSubmit(event: React.FormEvent<HTMLInputElement>) {
        let interruptionStartDate = this.state.startDate;
        let interruptionStartTime = this.state.startTime;
        const starttime = parseDate(interruptionStartDate + 'T' + interruptionStartTime);
        let interruptionDuration = this.state.duration;
        let interruptionDurationHour = Number(interruptionDuration.split(':')[0]);
        let interruptionDurationMinutes = Number(interruptionDuration.split(':')[1]);
        let endtime = addMinutes(starttime, interruptionDurationMinutes);
        endtime = addHours(endtime, interruptionDurationHour);
        const interruptionGroupsApi = new InterruptionGroupsApi(
            undefined,
            'http://127.0.0.1:8080/api-0.0.1-SNAPSHOT/v1');
        interruptionGroupsApi.createInterruptionGroup(
            {
                id: 0,
                startTime: starttime.toISOString(),
                endTime: endtime.toISOString()
            });

        event.preventDefault();
        alert('Interruptiongroup created');
    }
    render() {
        return (
            <div className="">
                <h1>New Interruptiongroup
                    <NavLink to="/Interruptiongroups">
                        <button className="btn">Show all</button>
                    </NavLink>
                </h1>
                <form className="new-item-form">
                    <p>Interruptionsgroup ID:</p>
                    <input
                        type="text"
                        name="interruptionGroupId"
                        value={this.state.interruptionGroupId}
                        onChange={this.handleInterruptionGroupIdChange}
                    />
                    <p>Date:</p>
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                    />
                    <p>Time:</p>
                    <input
                        type="time"
                        name="starttime"
                        placeholder="Starttime"
                        value={this.state.startTime}
                        onChange={this.handleStartTimeChange}
                    />
                    <p>Duration:</p>
                    <input
                        type="time"
                        name="duration"
                        placeholder="Duration"
                        value={this.state.duration}
                        onChange={this.handleDurationChange}
                    />
                    <input type="reset" value="Cancel" />
                    <input type="submit" value="Create" onClick={(event) => this.handleSubmit(event)}/>
                </form>
            </div>
        );
    }
}
