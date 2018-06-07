/* global gapi */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import config from './config';
import Layout from './Layout'
import Authorize from './Authorize';
import CalculateTime from './CalculateTime';
import PreferencesForm from './PreferencesForm';
import SuggetedTimes from './SuggestedTimes';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'


export default class App extends Component {
   state = {
     fields: {},
     schedule: {}
   }
  
  handleSubmit = (fields) => {
    console.log('App comp got: ', fields);
    //console.log(this.props.fields.hours);
    this.setState({ fields});
  }
  
  handleClick = (history) => {
   //console.log('App comp got: ' , results)
   console.log(history);
  }

  render() {
   
    return (
      <div>
        <div>
          <Layout />
          <p>WorkoutTime helps you plan your next workout effortlessly. It imports your Google calendar data to calculate your free time, <br/>and suggests workout times based on your preferences, then you just click to add the suggested, workouts that work for you.</p>
          <p>{JSON.stringify(this.state.schedule.results)}</p>
          <br/>
        </div>
          <div>
          <Router>
            <Switch>
            <Route exact path="/authorize" render={() => <Authorize setSchedule={(schedule) => this.setState({schedule})} />} />
              <Route exact path="/" render={({ history }) => (<button onClick={() => {history.push('/authorize')}}>Setup Calendar</button> )}/>
            <Route exact path="/preferences" render={() => <PreferencesForm onSubmit={fields => this.handleSubmit(fields)} schedule={this.state.schedule}/>}/>
              <Route exact path="/times" render={() => <SuggetedTimes fields={this.state.fields} />} schedule={this.state.schedule}/>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}
