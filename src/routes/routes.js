import fetch from 'node-fetch';
let moment = require('moment');

import {
  getEventsWithDates,
  insertEvent,
  insertDate,
} from '../controller/queries'


export default (server) => {
  server.get("/api/getEventsWithDates", async (req, res, next) => {
    const eventsWithDates = await getEventsWithDates();
      res.json({
        "error" : false,
        "eventsWithDates": eventsWithDates,
    });
  });
    
    server.get("/api/populateDatabase", async (req, res, next) => {
      const url = "http://www.mocky.io/v2/5c9cdca03300004d003f2151";
      try {
        const response = await fetch(url)
        const json = await response.json();
        await parseIntoDateStructure(json);
        res.json({
          "error" : false, 
          "message" : "Database populated"
        });
      } catch (error) {
        console.log(error);
      }
    });
    
    const parseIntoDateStructure = async (scheduele) => {
      scheduele.forEach(async (event) => {
        const { activity, startDate, endDate, location } = event;
        const eventId = await insertEvent(activity, startDate, endDate, location);
        const dateTimeCurrent = moment(event.startDate);
        const dateTimeEnd = moment(event.endDate);
        //Events spanning more than one day gets several dates associated with them
        while(dateTimeCurrent.format("YYYY-MM-DD").localeCompare(dateTimeEnd.format("YYYY-MM-DD")) < 1) {
          await insertDate(eventId, dateTimeCurrent.format("YYYY-MM-DD HH:mm:ss"));
          /*
          Add one day and set time to 00:01 to make sure events can be listed 
          in the correct order if the occur on the same day
          */
          dateTimeCurrent.hour(0).minute(0).second(1).add(1, 'd');
        }
      });
    };
};
