import moment from 'moment';
import Day from './day';


export default class Schedule {
    constructor(eventsArray) {
        this.eventsArray = eventsArray;
        this.totalFreeTimePerWeek = 0;
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

    calculateEventsPerDay(eventsArray) {
        if (this.eventsPerDay === undefined) {
            let eventsPerDay = {};
            // let startOfWeek = 16;
            // let endOfWeek = 23;
            let endOfWeek = eventsArray[eventsArray.length - 1].endDate;
            let startOfWeek = eventsArray[0].startDate;
            console.log(endOfWeek)

            for (let key = startOfWeek; key <= endOfWeek; key++) {
                let sameDayEvent = [];

                for (let i = 0; i < eventsArray.length - 1; i++) {
                    if(eventsArray[i].startDate === key) {
                        sameDayEvent.push(eventsArray[i]);
                        eventsPerDay[key] = sameDayEvent;
                        //console.log(key)
                    }
                    // else if(eventsArray[i].startDate !== key) {
                    //     console.log('this is the key', key)
                    // }

                }

                //console.log('events per day:', eventsPerDay[key]);
            }
            // console.log(eventsPerDay);
            this.eventsPerDay = eventsPerDay;
            let day = new Day();
        } 
        return this.eventsPerDay;
    }

}