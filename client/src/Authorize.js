/* global gapi */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import config from './config';
import moment from 'moment';
import Layout from "./Layout";
import CalculateTime from './CalculateTime';
import PreferencesForm from './PreferencesForm'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

var CLIENT_ID = config.CLIENT_ID;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

class Day {
    constructor() {

    } 
}

class Schedule  {
  constructor(eventsArray) {
    this.eventsArray = eventsArray;
    this.results = {};
    this.getDays();
  }



  processEventsArray() {
        let eventsArray = [];
        let summary, startTime, endTime, startDate, endDate;
        
        this.eventsArray.forEach(event => {
            let duration = moment.duration(moment(event.end.dateTime).diff(event.start.dateTime)).asMinutes();
            let eventObj = {
                summary : event.summary,
                startDate: moment(event.start.dateTime).get('date'),
                startTime : event.start.dateTime,
                endDate: moment(event.end.dateTime).get('date'),
                endTime : event.end.dateTime,
                timeframe: duration
            }
            eventsArray.push(eventObj);
        });

        console.log("eventsArray:",eventsArray);
        this.calculateEventsPerDay(eventsArray)

    }

    calculateEventsPerDay(eventsArray) {
        if (this.eventsPerDay === undefined) {
            let eventsPerDay = {};
            let endOfWeek = eventsArray[eventsArray.length - 1 ].endDate;
            let startOfWeek = eventsArray[0].startDate;

            // console.log(endOfWeek);
            // console.log(startOfWeek);
            //console.log(eventsArray);

            for (let key = startOfWeek; key <= endOfWeek; key ++) { 
                let sameDayEvent = [];

                for(let i = 0; i < eventsArray.length - 1; i++) {
                    if(eventsArray[i].startDate === key) {
                        sameDayEvent.push(eventsArray[i]);
                        // sameDayEvent.push(eventsArray[i].summary, eventsArray[i].startTime, eventsArray[i].endTime);
                        eventsPerDay[key] = sameDayEvent;
                    } 
                }
                
                //console.log('events per day:', eventsPerDay[key]);
            }
            // console.log(eventsPerDay);
            this.eventsPerDay = eventsPerDay
            this.getListOfKeys(eventsPerDay);
        }
        return this.eventsPerDay;
    }

    groupEventsBy(eventsPerDay) {
        let keyArr = [];
        let keyList;

        for(let key in eventsPerDay) {
            
            if(eventsPerDay.hasOwnProperty(key)) {
                // keyArr.push(key);
                // keyList = keyArr;
                this.calculateTimeFramePerDay(eventsPerDay[key], key);
            }
            //console.log(key);
        }
        //console.log(eventsPerDay);
    }

    calculateTimeFramePerDay(singleDayEvents, key) {

        let startOfEachDay = moment(singleDayEvents[0].startTime).minutes(0).hours(4);
        let endOfEachDay = moment(singleDayEvents[0].endTime).minutes(0).hours(21);;
        
        let lastElement = singleDayEvents.length - 1;
        
        let timeBeforeFirstEvent = moment.duration(moment(singleDayEvents[0].startTime).diff(startOfEachDay)).asMinutes();

        let timeAfterLastEvent = moment.duration(moment(endOfEachDay).diff(singleDayEvents[lastElement].endTime)).asMinutes();
        
        
        console.log(singleDayEvents);
        // console.log(singleDayEvents[0].summary + ' --- ' +  timeBeforeFirstEvent);
        // console.log(singleDayEvents[lastElement].summary + ' --- ' + timeAfterLastEvent);

            let duration = 0; 
            let morningWorkoutTime, midDayWorkoutTime, eveningWorkoutTime;
            if(singleDayEvents.length > 1) {

                for(let i = 0; i < lastElement ; i++) {
                    
                    duration = moment.duration(moment(singleDayEvents[i + 1].startTime).diff(singleDayEvents[i].endTime)).asMinutes();

                    console.log(singleDayEvents[i + 1].summary + ': ' + singleDayEvents[i + 1].startTime + ' --- ' + singleDayEvents[i].summary + ': ' + singleDayEvents[i].endTime);

                    //console.log(duration + '\n');
                    if (duration > 40) {
                        console.log('**** time between events ' + duration + ' *** you have time after this event: ' + singleDayEvents[ i].summary + ': ' + singleDayEvents[i].endTime + ' and before this event: ' + singleDayEvents[i + 1].summary + ': ' + singleDayEvents[i + 1].startTime + ' to workout *** \n');

                        if(duration > 90) {
                            midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(20, 'minutes');
                        }
                        else {
                            midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(10, 'minutes');
                        }
                    }
                }

            }
            console.log( moment(startOfEachDay).toString() + ': morningWorkoutTime suggestion: ' + moment(morningWorkoutTime).toString());
            console.log('midDayWorkoutTime suggestion FOR KEY ' + key + ': ' + midDayWorkoutTime);
            this.results[key] = midDayWorkoutTime;

            if (timeBeforeFirstEvent > 40 || timeAfterLastEvent > 40) {
                console.log('time before first event: ' + timeBeforeFirstEvent + ' *** you have time to workout within this timeframe *** \n');
                console.log('time after last event: ' + timeAfterLastEvent + ' *** you have time to workout within this timeframe *** \n');

                morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');

                // if (timeBeforeFirstEvent > 120) {
                //     morningWorkoutTime = moment(startOfEachDay).add(20, 'minutes');
                // }
                // else {
                //     morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');
                // }
            }

    }
}
export default class Authorize extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userIsSignedIn: false,
            // showAuthButton: false,
            // showSignOutButton: false,
            events: [],
            results: 0,
            start: null,
            end: null,
        };
        this.initClient = this.initClient.bind(this);
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    }

    handleAuthClick() {
        gapi.auth2.getAuthInstance().signIn();
    }

    handleSignoutClick() {
        gapi.auth2.getAuthInstance().signOut();
    }

    handlePreferencesClick() {

    }
  
    handleClientLoad() {
        window.gapi.load('client:auth2', this.initClient);
    }

    initClient() {
        //this.updateSigninStatus = this.updateSigninStatus.bind(this);

        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
            //console.log(window.gapi);
            // Listen for sign-in state changes.

            // ************* to access instance method you have to use `this.updateSigninStatus` 
            //console.log(updateSigninStatus); 
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        }.bind(this));
    }
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.setState({
                userIsSignedIn: true
            })
            this.getDateRange();
            //insertNewEvent();
        } else {
            this.setState({
                userIsSignedIn: false
            })
        }
    }
    getDateRange() {
        let currentDate = moment().format();
        let weekFromCurrentDate = moment(currentDate).add(7, 'days').format();
        // console.log('currentDate ' + currentDate + '--- weekFromCurrentDate' +  weekFromCurrentDate);
        this.listUpcomingEvents(currentDate, weekFromCurrentDate);
    }


    listUpcomingEvents(currentDate, weekFromCurrentDate) {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'alwaysIncludeEmail': true,
            'timeMax': weekFromCurrentDate,
            'timeMin': currentDate,
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 40,
            'orderBy': 'startTime'
        }).then((response) => {
            let schedule = new Schedule(response.result.items);
            schedule.processEventsArray();
            this.props.setSchedule(schedule);
    })
}
    componentDidMount() {
        this.handleClientLoad();
    }

    
    



    // handleClick = (event) => {
    //     this.state.results
    //     console.log(this.state.results);
    // }


    render() {
        let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize Google</button>
        let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
       
        return (
         <div className="container">
                 <Layout title="Let's figure out how much free time you have this week" />
                <p>Please sign-in with your Google calendar service </p>
                {this.state.userIsSignedIn ? signOutButton : authButton}
                <br/>
                <br/>
                <CalculateTime logIn={this.state.userIsSignedIn} freeTime={this.state.results}/>
                <br/>
                <PreferencesForm results={this.state.results}/>
                {/* <Route render={({ history }) => (<button onClick={() => { { results => this.handleClick(this.state.results) } history.push('/preferences') }}>Chose your workout time preferences</button>)} /> */}
                {/* <button><Link to="/preferences">Chose your workout time preferences</Link></button> */}
         </div>
        )
    }
}

