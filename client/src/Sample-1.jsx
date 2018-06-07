class PerDaySchedule {
    constructor(gapi_events) {

    }
    getHoursOfFreeTime();
    getPossibleWorkoutSlots();
    getMorningWorkoutSlot();
    getEveningWorkoutSlot();
    getEveningWorkoutSlot();
}

class TimeSlot {
    start_time,
    end_time

    is_valid_workout_slot() {
        duration(end_time - start_time) > 40
    }
}

export default class ScheduleFigureouter {
    figureOutSchedule() {
        for(day in days this week) {
            for (time_slots in day.possibleWorkoutSlots()) {
                if time_slot.is_valid_workout_slot {
                    // Offer them this time slot!
                }
            }
        }
    }
}

//-- other File

import ScheduleFigureouter from './ScheduleFigureouter';

new ScheduleFigureouter().figureOutSchedule();

//


filterGapsInDay(gapsInDay) {
    let filteredGaps = [];
    for (gap in gapsInDay) {
        if filteredGaps
        filteredGaps.push(gap)
    }
}

calculateTimeFramePerDay(singleDayEvents) {

    const gapsInDay = singleDayEvents.getGapsInDay();

    let validWorkoutGaps = filterGapsInDay(gapsInDay);

    let startOfEachDay = moment(singleDayEvents[0].startTime).minutes(0).hours(4);
    let endOfEachDay = moment(singleDayEvents[0].endTime).minutes(0).hours(21);;
    let lastElement = singleDayEvents.length - 1;

    let timeBeforeFirstEvent = moment.duration(moment(singleDayEvents[0].startTime).diff(startOfEachDay)).asMinutes();
    let timeAfterLastEvent = moment.duration(moment(endOfEachDay).diff(singleDayEvents[lastElement].endTime)).asMinutes();


    console.log(singleDayEvents);
    // console.log(singleDayEvents[0].summary + ' --- ' +  timeBeforeFirstEvent);
    // console.log(singleDayEvents[lastElement].summary + ' --- ' + timeAfterLastEvent);

    let duration = 0;
    let morningWorkoutTime, midDayWorkoutTime, eveningWorkoutTime;
    if (singleDayEvents.length > 1) {

        for (let i = 0; i < lastElement; i++) {

            duration = moment.duration(moment(singleDayEvents[i + 1].startTime).diff(singleDayEvents[i].endTime)).asMinutes();

            console.log(singleDayEvents[i + 1].summary + ': ' + singleDayEvents[i + 1].startTime + ' --- ' + singleDayEvents[i].summary + ': ' + singleDayEvents[i].endTime);

            //console.log(duration + '\n');
            if (duration > 40) {
                console.log('**** time between events ' + duration + ' *** you have time after this event: ' + singleDayEvents[i].summary + ': ' + singleDayEvents[i].endTime + ' and before this event: ' + singleDayEvents[i + 1].summary + ': ' + singleDayEvents[i + 1].startTime + ' to workout *** \n');

                if (duration > 90) {
                    midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(20, 'minutes');
                }
                else {
                    midDayWorkoutTime = moment(singleDayEvents[i].endTime).add(10, 'minutes');
                }
            }
        }

    }
    console.log(moment(startOfEachDay).toString() + ': morningWorkoutTime suggestion: ' + moment(morningWorkoutTime).toString());
    console.log('midDayWorkoutTime suggestion: ' + midDayWorkoutTime);

    if (timeBeforeFirstEvent > 40 || timeAfterLastEvent > 40) {
        console.log('time before first event: ' + timeBeforeFirstEvent + ' *** you have time to workout within this timeframe *** \n');
        console.log('time after last event: ' + timeAfterLastEvent + ' *** you have time to workout within this timeframe *** \n');

        morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');

        // if (timeBeforeFirstEvent > 120) {
        //     morningWorkoutTime = moment(startOfEachDay).add(20, 'minutes');
        // }
        // else {
        //     morningWorkoutTime = moment(startOfEachDay).add(10, 'minutes');
        // }
    }

}




    // handleClick = (event) => {
    //     this.state.results
    //     console.log(this.state.results);
    // }
