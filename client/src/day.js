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
                // keyArr.push(key);
                // keyList = keyArr;
                this.calculateTimeFramePerDay(eventsPerDay[key], key);
            }
            //console.log(key);
        }
        //console.log(eventsPerDay);
    }

    calculateTimeFramePerDay(singleDayEvents, key) {

        let startOfEachDay = moment(singleDayEvents[0].startTime).minutes(0).hours(4);
        let endOfEachDay = moment(singleDayEvents[0].endTime).minutes(0).hours(21);;

        let lastElement = singleDayEvents.length - 1;
        let timeBeforeFirstEvent = moment.duration(moment(singleDayEvents[0].startTime).diff(startOfEachDay)).asMinutes();
        let timeAfterLastEvent = moment.duration(moment(endOfEachDay).diff(singleDayEvents[lastElement].endTime)).asMinutes();


        //console.log(singleDayEvents);
        // console.log(singleDayEvents[0].summary + ' --- ' +  timeBeforeFirstEvent);
        // console.log(singleDayEvents[lastElement].summary + ' --- ' + timeAfterLastEvent);

        let duration = 0;
        let morningWorkoutTime, midDayWorkoutTime, eveningWorkoutTime;
        if (singleDayEvents.length > 1) {

            for (let i = 0; i < lastElement; i++) {

                duration = moment.duration(moment(singleDayEvents[i + 1].startTime).diff(singleDayEvents[i].endTime)).asMinutes();

                //console.log(singleDayEvents[i + 1].summary + ': ' + singleDayEvents[i + 1].startTime + ' --- ' + singleDayEvents[i].summary + ': ' + singleDayEvents[i].endTime);

                //console.log(duration + '\n');
                if (duration > 40) {
                    // console.log('**** time between events ' + duration + ' *** you have time after this event: ' + singleDayEvents[i].summary + ': ' + singleDayEvents[i].endTime + ' and before this event: ' + singleDayEvents[i + 1].summary + ': ' + singleDayEvents[i + 1].startTime + ' to workout *** \n');

                    if (duration > 90) {
                        midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(20, 'minutes');
                    }
                    else {
                        midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(10, 'minutes');
                    }
                }
            }

        }
        // console.log(moment(startOfEachDay).toString() + ': morningWorkoutTime suggestion: ' + moment(morningWorkoutTime).toString());
        // console.log('midDayWorkoutTime suggestion FOR KEY ' + key + ': ' + midDayWorkoutTime);
        this.results[key] = midDayWorkoutTime;

        if (timeBeforeFirstEvent > 40 || timeAfterLastEvent > 40) {
            // console.log('time before first event: ' + timeBeforeFirstEvent + ' *** you have time to workout within this timeframe *** \n');
            // console.log('time after last event: ' + timeAfterLastEvent + ' *** you have time to workout within this timeframe *** \n');

            morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');

            // if (timeBeforeFirstEvent > 120) {
            //     morningWorkoutTime = moment(startOfEachDay).add(20, 'minutes');
            // }
            // else {
            //     morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');
            // }
        }

    }

}