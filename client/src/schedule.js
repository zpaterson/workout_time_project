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
        console.log('process events');
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
            //console.log('duration: ', duration)
        });
        
        //console.log("eventsArray:", eventsArray);
        
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
            console.log('got here in the for loop of create weekly')
            let date = moment().add(i, 'days');
            daysOfTheWeek.push(date);
        }
        console.log('daysOfTheWeek', daysOfTheWeek)

        let timesOfDay = {
            morning: [],
            afternoon: [],
            evening: []
        }

        daysOfTheWeek.forEach(eventDay => {
            console.log('this is the foreach of days of the week')
            console.log('eventDay', eventDay)
            weeklySchedule[moment(eventDay).format('DDMMYYYY')] = timesOfDay;
            console.log(moment(eventDay).format('DDMMYYYY'));
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
             // let startOfWeek = 16;
             // let endOfWeek = 23;
             let endOfWeek = eventsArray[eventsArray.length - 1].endDate;
             let startOfWeek = eventsArray[0].startDate;
             console.log('endOfWeek', endOfWeek, 'startOfWeek', startOfWeek);
             console.log('eventsArray in events per day function', eventsArray);
             
               let datesInWeek = [];
               let sameDayEvent = [];
             for (let i = 0 ; i <= 6; i++) {
                 //console.log('eventsArray in events per day for loop');
                 //console.log('this is my key', key);
                 datesInWeek.push(moment().add(i , 'days').date());
             }
            for (let i = 0; i < eventsArray.length - 1; i++) {
                     //console.log('event start date', eventsArray[i].startDate,' ', datesInWeek[i]);
             if (datesInWeek.includes(eventsArray[i].startDate)) {
                         sameDayEvent.push(eventsArray[i]);
                         eventsPerDay[datesInWeek[i]] = sameDayEvent;
                     }
                     //console.log('datesInWeek[i]',datesInWeek[i])
            }
                //console.log('events per day:', eventsPerDay[key]);
            
            // console.log(eventsPerDay);
            console.log('dates in the week', datesInWeek);
             this.eventsPerDay = eventsPerDay;
             let day = new Day();
         }
         return this.eventsPerDay;
     }

}

