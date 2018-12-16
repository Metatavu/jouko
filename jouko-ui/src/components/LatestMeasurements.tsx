import * as React from 'react';
import '../App.css';
import { BeatLoader } from 'react-spinners';
import { addDays, format as formatDate, parse as parseDate } from 'date-fns';
import { subHours } from 'date-fns';
import { _ } from '../i18n';
import { DevicesApi, Configuration } from 'jouko-ts-client';
import { apiUrl } from '../config';
import * as Moment from 'moment';
import { KeycloakInstance } from 'keycloak-js';

// tslint:disable-next-line:no-any
let searchbetween: any;

interface LatestMeasurementsProps {
  currentUserId: number;
  kc?: KeycloakInstance;
}

interface MeasurementsType {
  measurementId: number;
  starttime: Date;
  endtime: Date;
  phaseNumber?: number;
  measurementValue: number;
  deviceId: number;
  deviceName?: string;
  realyIsOpen?: boolean;
}

interface LatestMeasurementsState {
  measurements: MeasurementsType[];
  sortingElement: string;
  sortingDirection: string;
  searchTerm: string;
  searchColumn: string;
  searchBetweenA: string;
  searchBetweenB: string;
  disableSearch: boolean;
  disableSearchBetween: boolean;
}

export class LatestMeasurements
    extends React.Component<LatestMeasurementsProps, LatestMeasurementsState> {
    constructor(props: LatestMeasurementsProps) {
        super(props);
        this.state = {
          measurements: [],
          sortingElement: 'starttime',
          sortingDirection: 'DESC',
          searchTerm: '',
          searchColumn: 'id',
          searchBetweenA: '',
          searchBetweenB: '',
          disableSearch: false,
          disableSearchBetween: false
        };

        this.sortByIdASC = this.sortByIdASC.bind(this);
        this.sortByStarttimeASC = this.sortByStarttimeASC.bind(this);
        this.sortByEndtimeASC = this.sortByEndtimeASC.bind(this);
        this.sortByMeasurementValueASC = this.sortByMeasurementValueASC.bind(this);
        this.sortByDeviceASC = this.sortByDeviceASC.bind(this);

        this.sortByIdDESC = this.sortByIdDESC.bind(this);
        this.sortByStarttimeDESC = this.sortByStarttimeDESC.bind(this);
        this.sortByEndtimeDESC = this.sortByEndtimeDESC.bind(this);
        this.sortByMeasurementValueDESC = this.sortByMeasurementValueDESC.bind(this);
        this.sortByDeviceDESC = this.sortByDeviceDESC.bind(this);

        this.search = this.search.bind(this);
        this.searchBetweenA = this.searchBetweenA.bind(this);
        this.searchBetweenB = this.searchBetweenB.bind(this);
        this.searchColumn = this.searchColumn.bind(this);
    }

    componentDidMount() {
        this.fetchAllMeasurements();
    }
    sortByIdASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'measurementId',
            sortingDirection: 'ASC',
        });
        this.fetchAllMeasurements();
    }
    sortByIdDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'measurementId',
            sortingDirection: 'DESC',
        });
        this.fetchAllMeasurements();
    }
    sortByStarttimeASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'starttime',
            sortingDirection: 'ASC',
        });
        this.fetchAllMeasurements();
    }
    sortByStarttimeDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'starttime',
            sortingDirection: 'DESC',
        });
        this.fetchAllMeasurements();
    }
    sortByEndtimeASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'endtime',
            sortingDirection: 'ASC',
        });
        this.fetchAllMeasurements();
    }
    sortByEndtimeDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'endtime',
            sortingDirection: 'DESC',
        });
        this.fetchAllMeasurements();
    }
    sortByMeasurementValueASC(event: React.FormEvent<HTMLOptionElement>) {
      this.setState({
        sortingElement: 'measurementValue',
        sortingDirection: 'ASC',
      });
      this.fetchAllMeasurements();
    }
  sortByMeasurementValueDESC(event: React.FormEvent<HTMLOptionElement>) {
      this.setState({
        sortingElement: 'measurementValue',
        sortingDirection: 'DESC',
      });
      this.fetchAllMeasurements();
    }
    sortByDeviceASC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceId',
            sortingDirection: 'ASC',
        });
        this.fetchAllMeasurements();
    }
    sortByDeviceDESC(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({
            sortingElement: 'deviceId',
            sortingDirection: 'DESC',
        });
        this.fetchAllMeasurements();
    }
    search(event: React.FormEvent<HTMLInputElement>) {
        this.setState({searchTerm: event.currentTarget.value.toString()});
        this.fetchAllMeasurements();
    }
    searchBetweenA(event: React.FormEvent<HTMLInputElement>) {
      this.setState({searchBetweenA: event.currentTarget.value});
      this.fetchAllMeasurements();
    }
    searchBetweenB(event: React.FormEvent<HTMLInputElement>) {
      this.setState({searchBetweenB: event.currentTarget.value});
      this.fetchAllMeasurements();
    }
    searchColumn(event: React.FormEvent<HTMLOptionElement>) {
        this.setState({searchColumn: event.currentTarget.value.toString()});
        if (event.currentTarget.value === 'starttime') {
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
        } else if (event.currentTarget.value === 'endtime') {
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
        }  else if (event.currentTarget.value === 'measurementValue') {
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
        } else {
          searchbetween = '';
          this.fetchAllMeasurements();
        }
    }

    async fetchAllMeasurements() {
      const configuration = new Configuration({
        apiKey: `Bearer ${this.props.kc!.token}`
      });

      const allMeasurementsApi = new DevicesApi(
        configuration,
        apiUrl);

      let lastHour = new Date();

      const allMeasurements = await allMeasurementsApi.listAllMeasurements(
        this.props.currentUserId, formatDate(subHours(lastHour, 24)), formatDate(lastHour));
      
      const measurements: MeasurementsType[] = [];
      allMeasurements.forEach((measurement) => {
        const searchColumn = this.state.searchColumn.toString();
        if (measurement[searchColumn].toString().match(this.state.searchTerm)) {
          let firstDate = parseDate(this.state.searchBetweenA);
          let secondDate = parseDate(this.state.searchBetweenB);
          if (this.state.searchBetweenA && this.state.searchBetweenB) {
            if (
              (searchColumn === 'startTime' || searchColumn === 'endTime') &&
              (parseDate(measurement[searchColumn]) >= firstDate) &&
              (parseDate(measurement[searchColumn]) <= parseDate(formatDate(addDays(secondDate, 1))))
            ) {
              measurements.push({
                measurementId: measurement.id,
                phaseNumber: measurement.phaseNumber,
                starttime: parseDate(measurement.startTime),
                endtime: parseDate(measurement.endTime),
                measurementValue: measurement.measurementValue || 0,
                deviceId: measurement.deviceId || 0,
                deviceName: measurement.device ? measurement.device.name : '',
                realyIsOpen: measurement.relayIsOpen 
              });
            } else if (
              (searchColumn === 'measurementValue') &&
              (Number(measurement[searchColumn]) >= Number(this.state.searchBetweenA)) &&
              (Number(measurement[searchColumn]) <= Number(this.state.searchBetweenB))
            ) {
              measurements.push({
                measurementId: measurement.id,
                phaseNumber: measurement.phaseNumber,
                starttime: parseDate(measurement.startTime),
                endtime: parseDate(measurement.endTime),
                measurementValue: measurement.measurementValue || 0,
                deviceId: measurement.deviceId || 0,
                deviceName: measurement.device ? measurement.device.name : '',
                realyIsOpen: measurement.relayIsOpen 
              });
            }
          } else {
            measurements.push({
              measurementId: measurement.id,
              phaseNumber: measurement.phaseNumber,
              starttime: parseDate(measurement.startTime),
              endtime: parseDate(measurement.endTime),
              measurementValue: measurement.measurementValue || 0,
              deviceId: measurement.deviceId || 0,
              deviceName: measurement.device ? measurement.device.name : '',
              realyIsOpen: measurement.relayIsOpen  
            });
          }
        }
        if (this.state.sortingDirection === 'ASC') {
          measurements.sort((a, b) => {
            const sortingElement = this.state.sortingElement.toString();
            return a[sortingElement] - b[sortingElement];
          });
        } else {
          measurements.sort((a, b) => {
            const sortingElement = this.state.sortingElement.toString();
            return b[sortingElement] - a[sortingElement];
          });
        }
        this.setState({measurements: measurements});
      });
    }
    render() {
        const allMeasurements = this.state.measurements.map((measurements, index) => {
            return (
                <tr key={index.toString()}>
                    <th>{measurements.measurementId}</th>
                    <th>{measurements.measurementValue}</th>
                    <th>{measurements.deviceName}</th>
                    <th>{measurements.phaseNumber}</th>
                    <th>{measurements.realyIsOpen ? 'Katko käynnissä' : '-'}</th>
                    <th>{Moment(measurements.starttime).format('DD.MM.YYYY HH:mm')}</th>
                    <th>{Moment(measurements.endtime).format('DD.MM.YYYY HH:mm')}</th>
                </tr>
            );
        });
        return (
            <div className="Measurements">
                <h1>{_('allMeasurements')}</h1>
                <div className="sweet-loading">
                    <BeatLoader
                        color={'#30C4C9'}
                        loading={false}
                    />
                </div>
                <div className="SearchFilter">
                    <p>{_('sortBy')}:
                    <select>
                        <option onClick={this.sortByIdASC}>
                          ID {_('lowHigh')}
                        </option>
                        <option onClick={this.sortByIdDESC}>
                          ID {_('highLow')}
                        </option>
                        <option onClick={this.sortByStarttimeASC}>
                          {_('starttime')} {_('lowHigh')}
                        </option>
                        <option onClick={this.sortByStarttimeDESC}>
                          {_('starttime')} {_('highLow')}
                        </option>
                        <option onClick={this.sortByEndtimeASC}>
                          {_('endtime')} {_('lowHigh')}
                        </option>
                        <option onClick={this.sortByEndtimeDESC}>
                          {_('endtime')} {_('highLow')}
                        </option>
                        <option onClick={this.sortByMeasurementValueASC}>
                          {_('measurementValue')} {_('lowHigh')}
                        </option>
                        <option onClick={this.sortByMeasurementValueDESC}>
                          {_('measurementValue')} {_('highLow')}
                        </option>
                        <option onClick={this.sortByDeviceASC}>
                          {_('device')} {_('lowHigh')}
                        </option>
                        <option onClick={this.sortByDeviceDESC}>
                          {_('device')} {_('highLow')}
                        </option>
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
                            <option value="id" onClick={this.searchColumn}>
                              ID
                            </option>
                            <option value="starttime" onClick={this.searchColumn}>
                              {_('starttime')}
                              </option>
                            <option value="endtime" onClick={this.searchColumn}>
                              {_('endtime')}
                              </option>
                            <option value="measurementValue" onClick={this.searchColumn}>
                              {_('measurementValue')}
                              </option>
                            <option value="devicename" onClick={this.searchColumn}>
                              {_('devicename')}
                              </option>
                        </select>
                      {searchbetween}
                    </p>
                </div>
                <table className="All">
                    <thead className="MeasurementsHead">
                    <tr>
                        <th>ID</th>
                        <th>{_('measurementValue')}</th>
                        <th>{_('device')}</th>
                        <th>{_('phase')}</th>
                        <th>{_('interruption')}</th>
                        <th>{_('starttime')}</th>
                        <th>{_('endtime')}</th>
                    </tr>
                    </thead>
                    <tbody className="MeasurementsBody">
                        {allMeasurements}
                    </tbody>
                </table>
            </div>
        );
    }
}