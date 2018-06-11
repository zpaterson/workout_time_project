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
        console.log(day)
        return (
         <div>
          <Header title="Here's your suggested workout times" />
            <div>
                 <h3>{day.days[0]}</h3>
                    <ul>
                        <li>Morning: {day.morningWorkout[0]} –– {day.morningWorkoutEndTime[0]} <button>Add to Calendar</button></li>
                        <li>Midday: {day.midDayWorkout[0]}–– {day.midDayWorkoutEndTime[0]} <button>Add to Calendar</button></li>
                        <li>Evening: {day.eveningWorkout[0]}–– {day.eveningWorkoutEndTime[0]} <button>Add to Calendar</button></li>
                    </ul>
            </div>
            <div>
                 <h3>{day.days[1]}</h3>
                    <ul>
                        <li>Morning: {day.morningWorkout[1]} –– {day.morningWorkoutEndTime[1]} <button>Add to Calendar</button></li>
                        <li>Midday: {day.midDayWorkout[1]}–– {day.midDayWorkoutEndTime[1]} <button>Add to Calendar</button></li>
                        <li>Evening: {day.eveningWorkout[1]}–– {day.eveningWorkoutEndTime[1]} <button>Add to Calendar</button></li>
                    </ul>
            </div>
            <div>
                 <h3>{day.days[2]}</h3>
                    <ul>
                        <li>Morning: {day.morningWorkout[2]} –– {day.morningWorkoutEndTime[2]} <button>Add to Calendar</button></li>
                        <li>Midday: {day.midDayWorkout[2]}–– {day.midDayWorkoutEndTime[2]} <button>Add to Calendar</button></li>
                        <li>Evening: {day.eveningWorkout[2]}–– {day.eveningWorkoutEndTime[2]} <button>Add to Calendar</button></li>
                    </ul>
            </div>
            <div>
                 <h3>{day.days[3]}</h3>
                    <ul>
                        <li>Morning: {day.morningWorkout[3]} –– {day.morningWorkoutEndTime[3]} <button>Add to Calendar</button></li>
                        <li>Midday: {day.midDayWorkout[3]}–– {day.midDayWorkoutEndTime[3]} <button>Add to Calendar</button></li>
                        <li>Evening: {day.eveningWorkout[3]}–– {day.eveningWorkoutEndTime[3]} <button>Add to Calendar</button></li>
                    </ul>
            </div>
            <div>
                 <h3>{day.days[4]}</h3>
                    <ul>
                        <li>Morning: {day.morningWorkout[4]} –– {day.morningWorkoutEndTime[4]} <button>Add to Calendar</button></li>
                        <li>Midday: {day.midDayWorkout[4]}–– {day.midDayWorkoutEndTime[4]} <button>Add to Calendar</button></li>
                        <li>Evening: {day.eveningWorkout[4]}–– {day.eveningWorkoutEndTime[4]} <button>Add to Calendar</button></li>
                    </ul>
            </div>
            <div>
                 <h3>{day.days[5]}</h3>
                    <ul>
                        <li>Morning: {day.morningWorkout[5]} –– {day.morningWorkoutEndTime[5]} <button>Add to Calendar</button></li>
                        <li>Midday: {day.midDayWorkout[5]}–– {day.midDayWorkoutEndTime[5]} <button>Add to Calendar</button></li>
                        <li>Evening: {day.eveningWorkout[5]}–– {day.eveningWorkoutEndTime[5]} <button>Add to Calendar</button></li>
                    </ul>
            </div>
          </div>
        )
    }
}