import moment from 'moment';
export default class Day {
    constructor() {
        this.results = {};

    }

    groupEventsByDay(eventsPerDay) {
        let keyArr = [];
        let keyList;

        for (let key in eventsPerDay) {
            if (eventsPerDay.hasOwnProperty(key)) {
                this.calculateGapsBetweenEventsPerDay(eventsPerDay[key], key);
            }
        }
    }

    startOfDay(day) {
        return moment(day).minutes(0).hours(4);
    }

    endOfDay(day) {
        return moment(day).minutes(0).hours(21);
    }

    timeBeforeEvent(event) {
        const dayStart = this.startOfDay(event);
        return moment.duration(moment(event).diff(dayStart)).asMinutes();
    }

    remainingTimeAfterEvent(event) {
        const endOfTheDay = this.endOfDay(event);
        return moment.duration(moment(endOfTheDay).diff(event)).asMinutes();
    }

    timeBetweenTwoEvents(endOfFristEvent, startOfSecondEvent) {
        return duration = moment.duration(moment(startOfSecondEvent).diff(endOfFristEvent)).asMinutes();
    }

    suggestedWorkoutTimesByDay() {
        let morningWorkoutTime, midDayWorkoutTime, eveningWorkoutTime;
    }


    
    
    timeBetweenEventsInADay(singleDayEvents, key) {

        let lastElement = singleDayEvents.length - 1;
        let timeBeforeFirstEvent = this.timeBeforeEvent(singleDayEvents[0].startTime);
        let timeAfterLastEvent = this.remainingTimeAfterEvent(singleDayEvents[lastElement].endTime);
        
            
        if (singleDayEvents.length > 1) {
            
            for (let i = 0; i < lastElement; i++) {
                duration = moment.duration(moment(singleDayEvents[i + 1].startTime).diff(singleDayEvents[i].endTime)).asMinutes();
                if (duration > 40) {                    
                    if (duration > 90) {
                        midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(20, 'minutes');
                    }
                    else {
                        midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(10, 'minutes');
                    }
                }
            }
        }
        this.results[key] = midDayWorkoutTime;

        if (timeBeforeFirstEvent > 40 || timeAfterLastEvent > 40) {

            if (timeBeforeFirstEvent > 90) {
                morningWorkoutTime = moment(startOfEachDay).add(20, 'minutes');
            }
            else {
                morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');
            }
        }

    }

}