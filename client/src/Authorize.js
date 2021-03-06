/* global gapi */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import config from './config';
import moment from 'moment';
import Schedule from './schedule';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
    withStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: 240,
    },
    paper1: {
        padding: theme.spacing.unit * 2,
        height: '300%',
        //textAlign: 'center',
        color: theme.palette.text.primary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


var CLIENT_ID = config.CLIENT_ID;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

class Authorize extends Component {

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
            direction: 'row',
            justify: 'center',
            alignItems: 'center', 
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
        console.log('handleClient');
        window.gapi.load('client:auth2', this.initClient);
    }

    initClient() {
        //this.updateSigninStatus = this.updateSigninStatus.bind(this);
        console.log('init Client');

        gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(function () {
            console.log('inside then in initClient')
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        }.bind(this));
    }
    updateSigninStatus(isSignedIn) {
        console.log('update sign-in')
        if (isSignedIn) {
            console.log('if statement inside of update sign-in')
            this.setState({
                userIsSignedIn: true 
            })
            this.getDateRange();
        } else {
            this.setState({
                userIsSignedIn: false
            })
        }
    }
    getDateRange() {
        console.log('get date range')
        let currentDate = moment().format();
        let weekFromCurrentDate = moment(currentDate).add(7, 'days').format();
        // console.log('currentDate ' + currentDate + '--- weekFromCurrentDate' +  weekFromCurrentDate);
        this.listUpcomingEvents(currentDate, weekFromCurrentDate);
    }


    listUpcomingEvents(currentDate, weekFromCurrentDate) {
        console.log('list of upcoming events')
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
            console.log('AaaaaaaaBbbbb');
            console.log(response)
            let schedule = new Schedule(response.result.items);
            schedule.processEventsArray();
            this.props.setSchedule(schedule);
            console.log(schedule);
            //this.insertCalendarWorkoutEvent();
        })
    }
    
    componentDidMount() {
        console.log('componentDidMount called')
        this.handleClientLoad();
        
    }
    
    render() {
        const { classes } = this.props;  
        let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize Google</button>
        let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>

        if (!this.state.userIsSignedIn) {
            return (
                <div>
                  <Grid container className={classes.root}>
                    <Grid container  spacing={24}>
                    <Grid item xs={12}>
                    <Paper className={classes.paper1}>
                    <h1>Let's figure out how much free time you have this week"</h1>
                    <p>Please sign-in with your Google calendar service </p>
                    {this.state.userIsSignedIn ? signOutButton : authButton}
                    </Paper>
                    </Grid>
                    </Grid>
                    </Grid>
                </div>
            )
        }
        else if (this.state.userIsSignedIn) {
            return (
                <div>
                    <p>You're signed-in!</p>
                </div>
            )
        }
       
        // return (
        //  <div className="container">
        //          <Layout title="Let's figure out how much free time you have this week" />
        //         <p>Please sign-in with your Google calendar service </p>
        //         {this.state.userIsSignedIn ? signOutButton : authButton}
        //         <br/>
        //         <CalculateTime userSignedIn={this.state.userIsSignedIn}/>
        //         {/* <Route render={({ history }) => (<button onClick={() => { { results => this.handleClick(this.state.results) } history.push('/preferences') }}>Chose your workout time preferences</button>)} /> */}
        //         {/* /* <button><Link to="/preferences">Chose your workout time preferences</Link></button> */}
        //  </div>
        //)
    }
}

Authorize.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Authorize);
