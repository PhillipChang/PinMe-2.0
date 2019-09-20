$(function(){
handleClientLoad();
 // Client ID and API key from the Developer Console
      var CLIENT_ID = '602269593939-5eqq385l144j8mu68idmeq0m7kr50kqc.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAdrGEhLW0yhkq2_01pNcM9PvHzvvvjd1o';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

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
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        })
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * //@param {string} message Text to be placed in pre element.
       */
      async function insertEvent(title,description,date) {
        console.log("we signed in and is in insertevent");
        console.log(title,description,date);
        var event = {
    'summary': title,
    'location': 'n/a',
    'description': description,
  'start': {
    'dateTime': date,
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': new Date(moment(date).endOf("day")),
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
});

};
$(document).on("click",".calendar",function(){
    var title = $(this).attr("data-title");
    var description = $(this).attr("data-desc");
    var date = $(this).attr("data-date");
    console.log("title", title);
    console.log("description" , description);
    console.log ("date", date);
            gapi.auth2.getAuthInstance().signIn();
            insertEvent(title,description,date);
       $(this).attr("src","../assets/images/check.png");
});
});