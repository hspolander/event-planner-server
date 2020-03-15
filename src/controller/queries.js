import { query } from '../util/db';

export const getEventsWithDates = () => 
query(`SELECT e.id, e.startDate, e.endDate, e.location, e.activity, DATE_FORMAT(d.date,\'%Y-%m-%d %T\') as date ` +
  `from events e inner join event_dates d on e.id = d.fk_event_id ` + 
  `order by d.date`)
	.then((cursor) => {
		if (cursor[0]) {
			return cursor[0];
		} else {
			return null;
		}
});

export const insertEvent = (activity, startDate, endDate, location) => 
	query(`INSERT INTO events(activity, startDate, endDate, location) VALUES(?, ?, ?, ?)`,
        [activity, startDate, endDate, location])
	.then((cursor) => {
		return(cursor[0].insertId);
});

export const insertDate = (fk_event_id, date) => 
  query(`INSERT INTO event_dates(fk_event_id, date) VALUES(?, ?)`,
  [fk_event_id, date]
);
