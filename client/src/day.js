import moment from 'moment';

export default class Day {
    constructor(numOfHours, numOfDays) {
        this.numOfHours = numOfHours;
        this.numOfDays = numOfDays;
        this.days = [];
        this.morningWorkout = [];
        this.midDayWorkout = [];
        this.eveningWorkout = [];
        this.morningWorkoutEndTime = [];
        this.midDayWorkoutEndTime  = [];
        this.eveningWorkoutEndTime  = [];
    }
    
    groupEventsByDay(eventsPerDay) {
        let keyArr = [];
        let keyList;
        
        for (let key in eventsPerDay) {
            if (eventsPerDay.hasOwnProperty(key)) {
                this.suggestedWorkoutTimes(eventsPerDay[key], key);
            }
        }
    }
    //4am
    startOfDay(day) {
        return moment(day).minutes(0).hours(4);
    }
    
    // 9pm
    endOfDay(day) {
        return moment(day).minutes(0).hours(21);
    }
    
    timeBeforeEvent(event) {
        const dayStart = this.startOfDay(event);
        return moment.duration(moment(event).diff(dayStart)).asMinutes();
    }
    
    //determines the amount of time between end of the day (9pm) and the last event of the day
    remainingTimeAfterEvent(event) {
        const endOfTheDay = this.endOfDay(event);
        return moment.duration(moment(endOfTheDay).diff(event)).asMinutes();
    }
    
    timeBetweenTwoEvents(startOfSecondEvent, endOfFirstEvent) {
        return moment.duration(moment(startOfSecondEvent).diff(endOfFirstEvent)).asMinutes();
    }
    
    amountOfTimeToWorkoutPerDay(numOfDays, numOfHours) {
        let workoutTime = (this.numOfHours / this.numOfDays) * 60;
            workoutTime = Math.round(workoutTime * 100) / 100;
        this.workoutTimePerDayAsHoursOrMinutes(workoutTime);
        return workoutTime;
    }

    workoutTimePerDayAsHoursOrMinutes(workoutTime) {
        if (workoutTime < 1) {
          workoutTime = workoutTime * 60;
        }
        else {
          workoutTime = workoutTime;
        }
      //console.log('workoutTime', workoutTime)
    }
    
    suggestedWorkoutTimes(singleDayEvents, key) {
       let workoutTimeAmount = this.amountOfTimeToWorkoutPerDay();
        this.suggestedMorningWorkoutTime(singleDayEvents, key, workoutTimeAmount);
        this.suggestedMidDayWorkoutTime(singleDayEvents, key, workoutTimeAmount);
        this.suggestedEveningWorkoutTime(singleDayEvents, key, workoutTimeAmount);
        this.displayResults();
    }
    
    suggestedMorningWorkoutTime(singleDayEvents, key, workoutTimeAmount) {
        
        let morningWorkoutTime;
        let morningWorkoutEndTime;
        let tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;
        let timeBeforeFirstEvent = this.timeBeforeEvent(singleDayEvents[0].startTime);
                    
            if (timeBeforeFirstEvent > (workoutTimeAmount + tenMinutesExtra)) {
                
                if (timeBeforeFirstEvent > 90) {
                    morningWorkoutTime = moment(this.startOfDay(singleDayEvents[0].startTime)).add(20, 'minutes');
                    morningWorkoutEndTime = moment(morningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');
                    //console.log('ten minute buffer', workoutTimeAmount + tenMinutesExtra);
                    //console.log(moment(morningWorkoutEndTime).format("dddd, MMMM Do, h:mm a"));
                    //console.log('morning workout:', moment(morningWorkoutTime).toString());
                    //console.log(morningWorkoutTime);
                }
                else {
                    morningWorkoutTime = moment(this.startOfDay(singleDayEvents[0].startTime)).add(10, 'minutes');
                    morningWorkoutEndTime = moment(morningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');
                }
                // console.log('morning workout:' , moment(morningWorkoutTime).toString());
                this.days.push(moment(morningWorkoutTime).format("dddd, MMMM Do"));
                this.morningWorkout.push(moment(morningWorkoutTime).format("h:mm a"));
                this.morningWorkoutEndTime.push(moment(morningWorkoutEndTime).format("h:mm a"));
            }
        return morningWorkoutTime;
    }

    
    suggestedMidDayWorkoutTime(singleDayEvents, key, workoutTimeAmount) {
        
        let midDayWorkoutTime;
        let midDayWorkoutEndTime;
        let tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;
        let timeAfterLastEvent = this.remainingTimeAfterEvent(singleDayEvents[lastElement].endTime);
        //console.log('ten minute buffer', workoutTimeAmount + tenMinutesExtra);

        // if (singleDayEvents.length === 1 && timeAfterLastEvent > (workoutTimeAmount + tenMinutesExtra)) {
        //     console.log('there is no time to workout')
        // }

        for (let i = 0; i < lastElement; i++) {
            //console.log(i)
            
            let endOfFirstEvent = singleDayEvents[i].endTime;
            let startOfSecondEvent = singleDayEvents[i + 1].startTime;
            let timeBetweenEvents = this.timeBetweenTwoEvents(startOfSecondEvent, endOfFirstEvent);
            
            if(singleDayEvents.length > 2 && timeBetweenEvents > (workoutTimeAmount + tenMinutesExtra)) {
                
                    if (timeBetweenEvents > 90) {
                        midDayWorkoutTime = moment(endOfFirstEvent).add(20, 'minutes');
                        midDayWorkoutEndTime = moment(midDayWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');

                        //console.log('added 20 mins')
                    }
                    else {
                        midDayWorkoutTime = moment(endOfFirstEvent).add(10, 'minutes');
                        midDayWorkoutEndTime = moment(midDayWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');

                        //console.log('added 10 mins')

                    }
                //console.log('mid-day workout:', moment(midDayWorkoutTime).toString());
                   
                this.midDayWorkout.push(moment(midDayWorkoutTime).format("h:mm a"));
                this.midDayWorkoutEndTime.push(moment(midDayWorkoutEndTime).format("h:mm a"))
            }
  
        }
        //console.log('time between events: ', timeBetweenEvents);
        // console.log(endOfFristEvent + '---' + startOfSecondEvent);
        return midDayWorkoutTime;
    }
    suggestedEveningWorkoutTime(singleDayEvents, key, workoutTimeAmount) {

        let eveningWorkoutTime;
        let eveningWorkoutEndTime;
        let tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;
        let timeAfterLastEvent = this.remainingTimeAfterEvent(singleDayEvents[lastElement].endTime);

            if (timeAfterLastEvent > (workoutTimeAmount + tenMinutesExtra) ) {

                if (timeAfterLastEvent > 90) {
                    eveningWorkoutTime = moment(singleDayEvents[lastElement].endTime).add(20, 'minutes');
                    eveningWorkoutEndTime = moment(eveningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');

                    //this.results.eveningWorkout = moment(eveningWorkoutTime).toString();
                }
                else {
                    eveningWorkoutTime = moment(singleDayEvents[lastElement].endTime).add(10, 'minutes');
                    eveningWorkoutEndTime = moment(eveningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');
                    //this.results.eveningWorkout = moment(eveningWorkoutTime).toString();
                }
                //console.log('evening workout:', moment(eveningWorkoutTime).toString());
                this.eveningWorkout.push(moment(eveningWorkoutTime).format("h:mm a"));
                this.eveningWorkoutEndTime.push(moment(eveningWorkoutEndTime).format("h:mm a"));

            }
        return eveningWorkoutTime;
    }
   
    displayResults() {
        //console.log('results for workout suggestions: ', moment(this.results).toString());
    }

}