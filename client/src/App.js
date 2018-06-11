/* global gapi */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import config from './config';
import Layout from './Layout'
import Authorize from './Authorize';
import CalculateTime from './CalculateTime';
import PreferencesForm from './PreferencesForm';
import SuggestedTimes from './SuggestedTimes';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Day from './day';
import HorizontalLinearStepper from './HorizontalLinearStepper ';


export default class App extends Component {
   state = {
     fields: {},
     schedule: {},
     day: {}
   }

  
  handleSubmit = (fields, history) => {
    console.log('App comp got: ', fields);
    this.setState({fields});
    //console.log(this.state.fields.hours);
    //console.log('in handle submit')
    history.push('/times');
  }
  
  
  handleClick = (history) => {
    //console.log('App comp got: ' , results)
    console.log(history);
  }
  
  render() {
   console.log('Render App');
    return (
      <div>
        <div>
          <HorizontalLinearStepper />
          <p>WorkoutTime helps you plan your next workout effortlessly. It imports your Google calendar data to calculate your free time, <br/>and suggests workout times based on your preferences, then you just click to add the suggested, workouts that work for you.</p>
          <br/>
        </div>
          <div>
          <Router>
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
              <Route exact path="/preferences" render={({ history }) => <PreferencesForm onSubmit={fields => this.handleSubmit(fields, history)} schedule={this.state.schedule}/>}/>
              <Route exact path="/times" render={() => <SuggestedTimes fields={this.state.fields} schedule={this.state.schedule}/>}/>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}
