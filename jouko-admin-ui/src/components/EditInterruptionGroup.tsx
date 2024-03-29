import * as React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
// import { parse as parseDate } from 'date-fns';
// import { addMinutes, addHours } from 'date-fns';
import { format as formatDate } from 'date-fns';
import { InterruptionsApi, Configuration } from 'jouko-ts-client';
import { _ } from '../i18n';
import { take } from 'lodash';
import { apiUrl } from '../config';

interface Props {
    kc?: Keycloak.KeycloakInstance;
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
    extends React.Component<Props, EditInterruptionGroupState> {
    constructor(props: Props) {
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
        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionsApi = new InterruptionsApi(
            configuration,
            apiUrl);
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
        event.preventDefault();

        const configuration = new Configuration({
            apiKey: `Bearer ${this.props.kc!.token}`
        });

        const interruptionsApi = new InterruptionsApi(
            configuration,
            apiUrl);
        
        const payload = {
            id: this.state.interruptionGroupId,
            startTime: this.state.startDate + 'T' + this.state.startTime as string, // '2020-01-01T00:00:00'
            endTime: this.state.startDate + 'T' + this.state.startTime as string, // '2020-01-01T00:00:00'
            duration: this.state.duration as string,
            powerSavingGoalInWatts: this.state.powerSavingGoalInWatts as number,
            overbookingFactor: this.state.overbookingFactor as number
        };
        
        try {
            interruptionsApi.updateInterruptionGroup(this.props.interruptionGroupId, payload);
            alert(_('alertInterruptiongroupChanged'));
        } catch (error) {
            alert(_('alertInterruptiongroupChangedError'));
        }
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
                    />
                    <p>{_('endtime')}</p>
                    <input
                        type="text"
                        name="endttime"
                        value={formatDate(interruption.endTime, 'dddd DD. MMMM YYYY | HH:MM')}
                    />
                    <p>{_('powerToBeSaved')}</p>
                    <input
                        type="text"
                        name="powerSavingGoalInWatts"
                        value={`${interruption.powerSavingGoalInWatts} kW`}
                    />
                    <p>{_('overbooking')}</p>
                    <input
                        type="text"
                        name="overbookingFactor"
                        value={`${interruption.overbookingFactor} %`}
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
                {editForm}
            </div>
        );
    }
}
