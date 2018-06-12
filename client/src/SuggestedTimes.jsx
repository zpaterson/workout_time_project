import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Day from './day';
import Header from './Header';
import moment from 'moment';
   
export default class SuggestedTimes extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        let day = new Day(this.props.fields.hours, this.props.fields.days);
        day.amountOfTimeToWorkoutPerDay(this.props.fields.hours, this.props.fields.days);
        day.groupEventsByDay(this.props.schedule.eventsPerDay);
        console.log(day);
        let days = day.days.map((nameOfDay, index) => (
            <div key={index}>
                <h3>{nameOfDay}</h3>
                <ul>
                    {day.morningWorkout[index] ? <li>Morning: {day.morningWorkout[index]} –– {day.morningWorkoutEndTime[index]} <button>Add to Calendar</button></li> : null}
                    {day.midDayWorkout[index] ? <li>Midday: {day.midDayWorkout[index]} –– {day.midDayWorkoutEndTime[index]} <button>Add to Calendar</button></li> : null}
                    {day.eveningWorkout[index] ? <li>Evening: {day.eveningWorkout[index]} –– {day.eveningWorkoutEndTime[index]} <button>Add to Calendar</button></li>: null}
               </ul>
            </div>
        ));
        console.log(days);
        return (
          <div>
            <Header title="Here's your suggested workout times" />
            {days}
          </div>
        )
    }
}