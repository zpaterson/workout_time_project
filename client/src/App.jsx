/* global gapi */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Authorize from './Authorize';
import CalculateTime from './CalculateTime';
import PreferencesForm from './PreferencesForm';
import SuggestedTimes from './SuggestedTimes';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Day from './day';
import HorizontalLinearStepper from './HorizontalLinearStepper ';
import LandingPage from './LandingPage';



export default class App extends Component {
   state = {
     fields : {},
     schedule: {},
     day: {},
   }

  handleChange = (fields) => {
    this.setState({ fields });  
  }
  
  handleSubmit = () => {
    const fields = this.state.fields;
    console.log('App comp got: ', fields.hours, fields.days);

    // axios({
    //   method: 'post',
    //   url: '/user',
    //   data: {
    //     hours: fields.hours,
    //     days: fields.days
    //   }
    // });


    //console.log(this.state.fields.hours);
    //console.log('in handle submit')
  }

  handleStep = (activeStep) => {
    let step = activeStep
    console.log('active step',step)
  }
  
  
  handleClick = (history) => {
    //console.log('App comp got: ' , results)
    console.log(history);
  }
 
  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <LandingPage/>;
      case 1:
        return <Authorize setSchedule={schedule => this.setState({ schedule })}/>;
      case 2:
        return <CalculateTime userSignedIn freeTime={this.state.schedule.totalFreeTimePerWeek} />;
      case 3:
        return <PreferencesForm onChange={fields => this.handleChange(fields)}/>;
      case 4:
        return (
            <SuggestedTimes schedule={this.state.schedule} fields={this.state.fields} insertEvent={this.insertCalendarWorkoutEvent}/>
          )
      default:
        return 'Unknown step';
    }
  };
 
  insertCalendarWorkoutEvent(start, end) {
    console.log('called insert calendar event')
    gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'summary': 'My New Workout',
      'start': {
        'dateTime': start,
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': end,
        'timeZone': 'America/Los_Angeles'
      }
    }).then((response) => {
      console.log('event inserted')
      console.log(response)
    })
  }
  
  
  render() {
   console.log('Render App');

   if(activeStep === 1) {
     return (
       <Authorize />
     )
   }
   return (
      <div>
        <div>
          <HorizontalLinearStepper grabActiveStep={this.handleStep} onSubmit={this.handleSubmit} >
            {step => this.getStepContent(step)}
          </HorizontalLinearStepper>
          <br/>
          </div>
          <div>
          {/* <Router>
            <Switch>
            <Route exact path="/authorize" render={({history}) => 
              <Authorize setSchedule={ (schedule) => {
                  this.setState({ schedule });
                  console.log('Set Shcvedule A');
                  history.push("/preferences");
                  console.log('Set Schedule B');
                }
              }/>
            }/>
              <Route exact path="/" render={({ history }) => (
                <button onClick={() => {
                  history.push('/authorize')}}
                >Setup Calendar</button> )}/>
              {/* <PreferencesForm results={this.state.results} /> */}
              {/* <Route exact path="/preferences" render={({ history }) => <PreferencesForm onSubmit={fields => this.handleSubmit(fields, history)} schedule={this.state.schedule}/>}/>
              <Route exact path="/times" render={() => <SuggestedTimes fields={this.state.fields} schedule={this.state.schedule}/>}/> */}
            {/* </Switch>
          </Router>  */}
        </div>
      </div>
    )
  }
}
