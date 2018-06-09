import moment from 'moment';

export default class Day {
    constructor(numOfHours, numOfDays) {
        this.numOfHours = numOfHours;
        this.numOfDays = numOfDays;
        this.results = {};
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
      console.log('workoutTime', workoutTime)
    }
    
    suggestedWorkoutTimes(singleDayEvents, key) {
       let workoutTimeAmount = this.amountOfTimeToWorkoutPerDay();
        this.suggestedMorningWorkoutTime(singleDayEvents, key, workoutTimeAmount);
        this.suggestedMidDayWorkoutTime(singleDayEvents, key, workoutTimeAmount);
        //this.suggestedEveningWorkoutTime()
    }
    
    suggestedMorningWorkoutTime(singleDayEvents, key, workoutTimeAmount) {
        
        let morningWorkoutTime;
        let tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;
        let timeBeforeFirstEvent = this.timeBeforeEvent(singleDayEvents[0].startTime);
        let timeAfterLastEvent = this.remainingTimeAfterEvent(singleDayEvents[lastElement].endTime);

        //console.log('workoutTime in suggested morning workout', workoutTimeAmount );
        //console.log('ten minute buffer', workoutTimeAmount + tenMinutesExtra);
        
        for (let i = 0; i < lastElement; i++) {
            
            if (timeBeforeFirstEvent > (workoutTimeAmount + tenMinutesExtra) || timeAfterLastEvent > workoutTimeAmount) {
                
                if (timeBeforeFirstEvent > 90 || timeAfterLastEvent > 90) {
                    morningWorkoutTime = moment(this.startOfDay(singleDayEvents[0].startTime)).add(20, 'minutes');
                }
                else {
                    morningWorkoutTime = moment(this.startOfDay(singleDayEvents[0].startTime)).add(10, 'minutes');
                }
                //console.log('morning workout:' , moment(morningWorkoutTime).toString());
            }
        }
        // console.log('gap between events:' + timeBeforeFirstEvent + '---' + timeAfterLastEvent);
        return morningWorkoutTime;
    }

    suggestedMidDayWorkoutTime(singleDayEvents, key, workoutTimeAmount) {
        
        let midDayWorkoutTime;
        let tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;
        let timeAfterLastEvent = this.remainingTimeAfterEvent(singleDayEvents[lastElement].endTime);
        console.log('ten minute buffer', workoutTimeAmount + tenMinutesExtra);


        for (let i = 0; i < lastElement; i++) {
            
            let endOfFirstEvent = singleDayEvents[i].endTime;
            let startOfSecondEvent = singleDayEvents[i + 1].startTime;
            let timeBetweenEvents = this.timeBetweenTwoEvents(startOfSecondEvent, endOfFirstEvent);

            if (singleDayEvents.length > 1 && timeBetweenEvents > (workoutTimeAmount + tenMinutesExtra)) {

                    if (timeBetweenEvents > 90) {
                        midDayWorkoutTime = moment(endOfFirstEvent).add(20, 'minutes');
                    }
                    else {
                        midDayWorkoutTime = moment(endOfFirstEvent).add(10, 'minutes');
                    }
                } 
            
        }
        console.log('mid-day workout:', moment(midDayWorkoutTime).toString());
        //console.log('time between events: ', timeBetweenEvents);
        // console.log(endOfFristEvent + '---' + startOfSecondEvent);
        return midDayWorkoutTime;
    }

}