import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import moment from 'moment';

class CalculateTime extends Component {
    calculateIfDateIsInWeek (events) {
        let startTime, endTime, startOfWeek, endOfWeek, isInWeek, totalTime = 0;
        events.map(event => {
            startTime = event.start.dateTime;
            endTime = event.end.dateTime;
            startOfWeek = this.props.events[0].start.dateTime;
            endOfWeek = moment(startOfWeek).add(7, 'days');
            console.log('this is my start time: ' + startTime);
            isInWeek = moment(startTime).isBetween(startOfWeek, endOfWeek, 'day', []);
            //isInWeek = moment('2018-05-25T22:00:00-07:00').isBetween(startOfWeek, endOfWeek, 'day', []);
            //console.log(event);
            if (isInWeek) {
                let duration = moment.duration(moment(endTime).diff(startTime));
                let minutes = duration.asMinutes();
                let timeFrame;

                totalTime += minutes;

                if (minutes > 60) {
                    timeFrame = duration.asHours() + ' hours';
                }
                else {
                    timeFrame = minutes + ' minutes';
                }
                console.log('start:' + startTime + ' --- end: ' + endTime);
                console.log('duration: ' + timeFrame);
                console.log('isInWeek: ' + isInWeek);
                console.log('total time: ' + totalTime);
            }
        })
        console.log('startOfWeek: ' + startOfWeek + '--- endOfWeek: ' + endOfWeek);
        console.log(totalTime)
        return totalTime;
    }


    render() {
        this.calculateIfDateIsInWeek(this.props.events);        
        return (
          <div></div>
        )
    }
}

export default CalculateTime;