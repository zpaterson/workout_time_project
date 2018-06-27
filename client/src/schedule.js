import moment from 'moment';
import Day from './day';
//import { SIGPROF } from 'constants';


export default class Schedule {
    constructor(eventsArray) {
        this.eventsArray = eventsArray;
        this.totalFreeTimePerWeek = 0;
        this.weeklySchedule = this.createWeeklyEventsTemplate();
    }

    processEventsArray() {
        let eventsArray = [];
        let totalTime = 0;
        let summary, startTime, endTime, startDate, endDate;

        this.eventsArray.forEach(event => {
            let duration = moment.duration(moment(event.end.dateTime).diff(event.start.dateTime)).asMinutes();
            totalTime += duration;

            let eventObj = {
                summary: event.summary,
                startDate: moment(event.start.dateTime).get('date'),
                startTime: event.start.dateTime,
                endDate: moment(event.end.dateTime).get('date'),
                endTime: event.end.dateTime,
                timeframe: duration
            }
            eventsArray.push(eventObj);
        });
        let totalMinsInAWeek = this.calculateTotalMinsInAWeek()
        this.calculateTotalFreeTimePerWeek(totalMinsInAWeek, totalTime);
        this.calculateEventsPerDay(eventsArray)
        
    }
    
    calculateTotalMinsInAWeek() {
        let sleepTime = 8;
        let numMinsInAWeek = 10080;
        return numMinsInAWeek - sleepTime;
    }
    
    calculateTotalFreeTimePerWeek(totalMinsInAWeek, totalTime) {
        this.totalFreeTimePerWeek = Math.round(((totalMinsInAWeek - totalTime) / 60));
    }

    groupEvents(eventsArray) {
        for(let event of eventsArray) {
            let morningStart = moment(event.startTime).minutes(0).hours(4);
            let afternoonStart = moment(event.startTime).minutes(0).hours(12);
            let eveningStart = moment(event.startTime).minutes(0).hours(17);
            let endOfDay = moment(event.startTime).minutes(0).hours(21);

            if(event.startTime < afternoonStart) {
                this.sortOrSplit(event, morningStart, afternoonStart, 'morning', 'afternoon');
            }
            else if(event.startTime < eveningStart) {
                this.sortOrSplit(event, afternoonStart, eveningStart,'afternoon', 'evening');
            }
            else {
                this.sortOrSplit(event, eveningStart, endOfDay, 'evening', 'morning');
            }
        }
    }

    createWeeklyEventsTemplate() {
        let weeklySchedule = {};
        //let currentDate = moment().format();
        let daysOfTheWeek = [];

        for(let i = 0; i <= 6; i++) {
            let date = moment().add(i, 'days');
            daysOfTheWeek.push(date);
        }
        let timesOfDay = {
            morning: [],
            afternoon: [],
            evening: []
        }

        daysOfTheWeek.forEach(eventDay => {
            weeklySchedule[moment(eventDay).format('DDMMYYYY')] = timesOfDay;
        });

        return weeklySchedule;
    }

    sortOrSplit(event, firsTimeOfDayStart, secondTimeOfDayStart, firstTimeOfDay, secondTimeOfDay) {
        let date = moment(event.startTime).format('DDMMYYYY');
        if (event.startTime >= firsTimeOfDayStart && event.endTime <= secondTimeOfDayStart) {
            let simpleEvent = {
                summary: event.summary,
                startTime: event.startTime,
                endTime: event.endTime
            };
            this.weeklySchedule[date][firstTimeOfDay].push(event);
        }
        else {
          let firstHalfOfEvent = {
              summary: event.summary,
              startTime: event.startTime,
              endTime: event.endTime
          };
          let secondHalfOfEvent = {
              summary: event.summary,
              startTime: event.startTime,
              endTime: event.endTime
          };

        }
    }

     calculateEventsPerDay(eventsArray) {
         
         if (this.eventsPerDay === undefined) {
             let eventsPerDay = {};
             let datesInWeek = [];
             
            for (let i = 0; i <= 6; i++) {
                datesInWeek.push(moment().add(i , 'days').format());
            }  
                          
            for (let i = 0 ; i <= 6; i++) {
                let sameDayEvent = [];
                for (let j = 0; j < eventsArray.length - 1; j++) {
                    let formattedDate = moment(datesInWeek[i]).date();
                    if (formattedDate === eventsArray[j].startDate) {
                        sameDayEvent.push(eventsArray[j]);
                        eventsPerDay[datesInWeek[i]] = sameDayEvent;
                    }
                }
            }
             this.eventsPerDay = eventsPerDay;
             let day = new Day();
         }
         return this.eventsPerDay;
     }

}

