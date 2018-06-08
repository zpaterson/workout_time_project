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
            this.totalFreeTimePerWeek = totalTime;

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
        
        console.log('total time: ', this.totalFreeTimePerWeek);
        //console.log("eventsArray:", eventsArray);
        this.calculateFreeTimePerWeek(this.totalFreeTimePerWeek);
        this.calculateEventsPerDay(eventsArray)

    }

    calculateFreeTimePerWeek(totalFreeTimePerWeek) {
            
    }

    calculateEventsPerDay(eventsArray) {
        if (this.eventsPerDay === undefined) {
            let eventsPerDay = {};
            let endOfWeek = eventsArray[eventsArray.length - 1].endDate;
            let startOfWeek = eventsArray[0].startDate;

            for (let key = startOfWeek; key <= endOfWeek; key++) {
                let sameDayEvent = [];

                for (let i = 0; i < eventsArray.length - 1; i++) {
                    if (eventsArray[i].startDate === key) {
                        sameDayEvent.push(eventsArray[i]);
                        eventsPerDay[key] = sameDayEvent;
                    }
                }

                //console.log('events per day:', eventsPerDay[key]);
            }
            // console.log(eventsPerDay);
            this.eventsPerDay = eventsPerDay;
        }

        let day = new Day()
        day.groupEventsByDay(this.eventsPerDay);
        return this.eventsPerDay;
    }

}