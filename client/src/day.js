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
        for (let key in eventsPerDay) {
            if (eventsPerDay.hasOwnProperty(key)) {
                this.suggestedWorkoutTimes(eventsPerDay[key]);
            }
        }
        
    }

    // storeDates() {
        
    //     let currentDate = moment().date();
    //     let weekFromCurrentDate = moment().add(7, 'days').date();
    //     let datesArr = [];
    //     for(let i = currentDate; i <= weekFromCurrentDate; i++) {
    //         datesArr.push('' + i);
    //     }
    //     //console.log('this is an array of the days in this week', datesArr);
    //     return datesArr;
    // }

     
    // findFreeDays(eventsPerDay) {
    //     let daysInWeek = this.storeDates();
    //     let busy = Object.keys(eventsPerDay);
    //     //busy = parseInt(busy);

    //     let free = [];
    //     for(let i = 0; i < daysInWeek.length; i++) {
    //         //console.log('this is my busy array', busy[i]);
    //         //let busyIndex = parseInt(busy[i]);
    //         if(!busy.includes(daysInWeek[i])) {
    //            //console.log('days in week', daysInWeek[i], 'and busy arr:', busyIndex);
    //           free.push(daysInWeek[i]);
    //         }
    //     }
    //     console.log('free days:', free);
    //     return free;
    // }
   

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
    
    amountOfTimeToWorkoutPerDay() {
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
    
    suggestedWorkoutTimes(singleDayEvents) {
       let workoutTimeAmount = this.amountOfTimeToWorkoutPerDay();
       //let freeDays = this.findFreeDays(eventsPerDay);
        //this.defaultWorkoutTimes(freeDays, workoutTimeAmount);
        this.suggestedMorningWorkoutTime(singleDayEvents, workoutTimeAmount);
        this.suggestedMidDayWorkoutTime(singleDayEvents, workoutTimeAmount);
        this.suggestedEveningWorkoutTime(singleDayEvents, workoutTimeAmount);
    }

    //defaultWorkoutTimes(freeDays, workoutTimeAmount) {
        // this.morningWorkoutTime = moment().minutes(0).hours(9);
        // this.morningWorkoutEndTime = moment(morningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');
    //}
    
    suggestedMorningWorkoutTime(singleDayEvents, workoutTimeAmount) {
        
        let morningWorkoutTime;
        let morningWorkoutEndTime;
        let tenMinutesExtra = 10;
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
                this.morningWorkout.push(moment(morningWorkoutTime).format());
                this.morningWorkoutEndTime.push(moment(morningWorkoutEndTime).format());
                // this.morningWorkout.push(moment(morningWorkoutTime).format("h:mm a"));
                // this.morningWorkoutEndTime.push(moment(morningWorkoutEndTime).format("h:mm a"));
            }
        return morningWorkoutTime;
    }

    
    suggestedMidDayWorkoutTime(singleDayEvents, workoutTimeAmount) {
        
        let midDayWorkoutTime;
        let midDayWorkoutEndTime;
        const midDayStart = "12:00:00";
        const midDayEnd = "16:59:59";
        let tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;
        //console.log('ten minute buffer', workoutTimeAmount + tenMinutesExtra);

        // if (singleDayEvents.length === 1 && timeAfterLastEvent > (workoutTimeAmount + tenMinutesExtra)) {
        //     console.log('there is no time to workout')
        // }

        function findFirstEventInMidday() {
            for (let i = 0; i < lastElement; i++) {
                //console.log(i)
                
                if (moment(singleDayEvents[i].endTime).format("H:mm") > midDayStart && moment(singleDayEvents[i].endTime).format("H:mm") < midDayEnd) {
                    //console.log('in the findFirstEventInMidday ',singleDayEvents[i]);
                    return i;
                }
            }  
            return -1;   
        }

        const firstEventInMidday = findFirstEventInMidday();
        //console.log('firstEventInMidday:', firstEventInMidday);
            // add logic to deal with the index being -1

            if(firstEventInMidday !== -1) {
                 let endOfFirstEvent = singleDayEvents[firstEventInMidday].endTime;
                 let startOfSecondEvent = singleDayEvents[firstEventInMidday + 1].startTime;
                 let timeBetweenEvents = this.timeBetweenTwoEvents(startOfSecondEvent, endOfFirstEvent);

                 if (singleDayEvents.length > 2 && timeBetweenEvents > (workoutTimeAmount + tenMinutesExtra)) {

                     if (timeBetweenEvents > 90) {
                         midDayWorkoutTime = moment(endOfFirstEvent).add(20, 'minutes');
                         midDayWorkoutEndTime = moment(midDayWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');

                         //console.log('added 20 mins')
                     } else {
                         midDayWorkoutTime = moment(endOfFirstEvent).add(10, 'minutes');
                         midDayWorkoutEndTime = moment(midDayWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');

                         //console.log('added 10 mins')

                     }
                     //console.log('mid-day workout:', moment(midDayWorkoutTime).toString());

                     this.midDayWorkout.push(moment(midDayWorkoutTime).format());
                     this.midDayWorkoutEndTime.push(moment(midDayWorkoutEndTime).format());
                     // this.midDayWorkout.push(moment(midDayWorkoutTime).format("h:mm a"));
                     // this.midDayWorkoutEndTime.push(moment(midDayWorkoutEndTime).format("h:mm a"))
                 }
            }
           
        
        //console.log('time between events: ', timeBetweenEvents);
        // console.log(endOfFristEvent + '---' + startOfSecondEvent);
        return midDayWorkoutTime;
    }
    suggestedEveningWorkoutTime(singleDayEvents, workoutTimeAmount) {

        let eveningWorkoutTime;
        let eveningWorkoutEndTime;
        const eveningStart = 17;
        const eveningEndTime = 21;
        const tenMinutesExtra = 10;
        let lastElement = singleDayEvents.length - 1;

        //checks to see if an event is in the evening or spans past the evening timeframe (5p-9p)
        function findFirstEventInEvening() {
            for (let i = 0; i <= lastElement; i++) {
                if (moment(singleDayEvents[i].endTime).hours() > eveningStart && moment(singleDayEvents[i].endTime).hours() < eveningEndTime) {
                    // console.log('in evening span summary:', singleDayEvents[i].summary, 'end:', singleDayEvents[i].endTime);
                    return i;
                }
                else if (moment(singleDayEvents[i].startTime).hours() <= eveningStart && moment(singleDayEvents[i].endTime).hours() >= eveningEndTime) {
                    // console.log('in evening span summary:', singleDayEvents[i].summary, 'end:', singleDayEvents[i].endTime);
                    return -2;
                }
                else if(singleDayEvents[i] === null) {
                    //console.log('there are no events for this day')
                }
            }
            return -1;
        }

        const firstEventInEvening = findFirstEventInEvening();
        //console.log('firstEventInEvening', firstEventInEvening);

        // add logic to deal with the index being -1

        if (firstEventInEvening >= 0) {
            // console.log('in evening span title', singleDayEvents[firstEventInEvening].summary, 'start', singleDayEvents[firstEventInEvening].startTime, 'end:', singleDayEvents[firstEventInEvening].endTime);
                const findEndOfPotentialWorkoutPeriod = () => {
                    if(singleDayEvents[(firstEventInEvening + 1)] != null) {

                        //console.log('not null event summary', singleDayEvents[firstEventInEvening + 1].summary, 'start of next event when next event is not null', singleDayEvents[firstEventInEvening + 1].startTime);

                        singleDayEvents[firstEventInEvening + 1].startTime
                    } else {

                        //   console.log('not null event summary', singleDayEvents[firstEventInEvening + 1].summary, 'start of next event when next event is not null', singleDayEvents[firstEventInEvening + 1].startTime);
                        
                        moment(singleDayEvents[firstEventInEvening].startTime).minutes(0).hours(21);
                    }
                }

                let endOfPotentialWorkoutPeriod = findEndOfPotentialWorkoutPeriod()
                let timeAfterFirstEveningEvent = moment.duration(moment(singleDayEvents[firstEventInEvening].endTime).diff(endOfPotentialWorkoutPeriod)).asMinutes();
                // console.log('timeAfterFirstEveningEvent', timeAfterFirstEveningEvent)
                // console.log('timeAfterFirstEveningEvent', typeof(timeAfterFirstEveningEvent));


            if (timeAfterFirstEveningEvent > (workoutTimeAmount + tenMinutesExtra)) {

                //console.log("eveningWorkout", singleDayEvents[firstEventInEvening].endTime);
                if (timeAfterFirstEveningEvent > 90) {
                    eveningWorkoutTime = moment(singleDayEvents[firstEventInEvening].endTime).add(20, 'minutes');
                    eveningWorkoutEndTime = moment(eveningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');
                    //console.log("eveningWorkout")
                    //this.results.eveningWorkout = moment(eveningWorkoutTime).toString();
                }
                else {
                    eveningWorkoutTime = moment(singleDayEvents[firstEventInEvening].endTime).add(10, 'minutes');
                    eveningWorkoutEndTime = moment(eveningWorkoutTime).add((workoutTimeAmount + tenMinutesExtra), 'minutes');
                    //console.log('something different')
                    //this.results.eveningWorkout = moment(eveningWorkoutTime).toString();
                }
                //console.log('evening workout:', moment(eveningWorkoutTime).toString());
                this.eveningWorkout.push(moment(eveningWorkoutTime).format());
                this.eveningWorkoutEndTime.push(moment(eveningWorkoutEndTime).format());
                // this.eveningWorkout.push(moment(eveningWorkoutTime).format("h:mm a"));
                // this.eveningWorkoutEndTime.push(moment(eveningWorkoutEndTime).format("h:mm a"));

            }
        }
        else if(firstEventInEvening === -2 ) {
            this.eveningWorkout.push(null);
            this.eveningWorkoutEndTime.push(null);
        }
        else {
            this.eveningWorkout.push(moment(singleDayEvents[0].startTime).minutes(30).hours(17));
            //console.log('workouttimeamount', workoutTimeAmount);
            this.eveningWorkoutEndTime.push(moment(singleDayEvents[0].startTime).minutes(30).hours(17).add(workoutTimeAmount + tenMinutesExtra, 'minutes'));
        }
        
        return eveningWorkoutTime;
    }  
}