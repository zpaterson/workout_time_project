/* global gapi */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import config from './config';
import CalculateTime from './CalculateTime';

var CLIENT_ID = config.CLIENT_ID;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthButton: false,
      showSignOutButton: false,
      event: [],
      start: null ,
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
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }
  initClient(/****here you've had parameters that made config vars unaccessible*****/) {
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
        showAuthButton: false,
        showSignOutButton: true
      })
      this.listUpcomingEvents();
      //insertNewEvent();
    } else {
      this.setState({
        showAuthButton: true,
        showSignOutButton: false
      })
    }
  }

  listUpcomingEvents() {
    gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'alwaysIncludeEmail': true,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 40,
    'orderBy': 'startTime'
  }).then(function (response) {
     let event = response.result.items;
       this.setState({
         event: event
       })
     console.log(this.state.event);
  }.bind(this));
}
  componentDidMount() {
    this.handleClientLoad();
  }
  render() {
    let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize</button>
    let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
    //console.log(this.state.event);
    return (
      <div className="container">
       <h1>Display Events</h1>
        {this.state.showAuthButton ? authButton : null}
        {this.state.showSignOutButton ? signOutButton : null}
        <ul>
          {this.state.event.map(event  => 
            <li key={event.id}>
              <p>{event.summary}</p>
              <p>start-time: {event.start.dateTime} –– end-time: {event.end.dateTime}</p>
            </li>
        )}
        </ul>

        <CalculateTime events={this.state.event}/>

        
      </div>
    )
  }
}


export default App;
