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
                    {day.morningWorkout[index] ? <li>Morning: {moment(day.morningWorkout[index]).format("h:mm a")} –– {moment(day.morningWorkoutEndTime[index]).format("h:mm a")} <button onClick={() => this.props.insertEvent(day.morningWorkout[index], day.morningWorkoutEndTime[index])}>Add to Calendar</button></li> : null}

                    {day.midDayWorkout[index] ? <li>Midday: {moment(day.midDayWorkout[index]).format("h:mm a")} –– {moment(day.midDayWorkoutEndTime[index]).format("h:mm a")} <button onClick={() => this.props.insertEvent(day.midDayWorkout[index], day.midDayWorkoutEndTime[index])}>Add to Calendar</button></li> : null}

                    {day.eveningWorkout[index] ? <li>Evening: {moment(day.eveningWorkout[index]).format("h:mm a")} –– {moment(day.eveningWorkoutEndTime[index]).format("h:mm a")} <button onClick={() => this.props.insertEvent(day.eveningWorkout[index], day.eveningWorkoutEndTime[index])}>Add to Calendar</button></li>: null}
               </ul>
            </div>
        ));
        console.log(days);
        debugger
        return (
          <div>
            <Header title="Here's your suggested workout times" />
            {days}
          </div>
        )
    }
}