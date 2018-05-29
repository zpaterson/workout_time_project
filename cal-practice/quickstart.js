// Client ID and API key from the Developer Console
//var moment = require('moment');
var cli_id = config.CLIENT_ID;
var app_key = config.API_KEY;

// var startTime;
// var endTime;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: app_key,
    clientId: cli_id,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'alwaysIncludeEmail': true,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 40,
    'orderBy': 'startTime'
  }).then(function (response) {

    let events = response.result.items;
    calculateIfDateIsInWeek();

    //determines if a calendar event is within the specified week, if it is, it calls the 
    //calculateEventDuration function to calculate the duration of each event, otherwise it doesn't do anything
    function calculateIfDateIsInWeek() {
      let start, end, isInWeek, totalTime = 0;
      let startOfWeek = events[0].start.dateTime;
      let endOfWeek = moment(startOfWeek).add(7, 'days');

      for (var i in events) {
        start = events[i].start.dateTime;
        end = events[i].end.dateTime;
        
        isInWeek = moment(start).isBetween(startOfWeek, endOfWeek);
        //isInWeek = moment('2018-05-25T22:00:00-07:00').isBetween(startOfWeek, endOfWeek);
        let totalCalTime = calculateEventDuration(isInWeek);
      }
    
      //calculates the duration of each calendar event that's within the specified week 
      function calculateEventDuration(isInWeek) {
        if (isInWeek) {
          let duration = moment.duration(moment(end).diff(start));
          let minutes = duration.asMinutes();
          let timeFrame;
          
          totalTime += minutes;

          if (minutes > 60) {
            timeFrame = duration.asHours() + ' hours';
          }
          else {
            timeFrame = minutes + ' minutes';
          }
          console.log('this is event: ' + i + '\n start time: ' + start + ' --- end time: ' + end + '\n and the event is: ' + timeFrame + ' long \n');
          calculateTotalFreeTime();
          return totalTime;
        }
      } 
      
      //calculates the total free time a user has for a specified week
      function calculateTotalFreeTime() {
        let sleepTime = 8;
        let minsInWeek = 10080 - sleepTime;
        let totalFreeTime = (minsInWeek - totalTime) / 60;

        console.log('You have ' + (Math.round(10 * totalFreeTime) / 10) + ' hours of free time this week');
      }

      console.log(totalTime);
    }

    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}