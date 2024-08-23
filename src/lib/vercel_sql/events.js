import { sql } from "@vercel/postgres";

import { getDatetimeDate, getDatetimeTime } from '@/lib/time';


export async function addEvent({ groupId, name, datetime, location, description, maxSpots, maxMen }) {
  const date = getDatetimeDate(datetime);
  const time = getDatetimeTime(datetime);

  result = await sql`
      INSERT INTO events (group_id, name, date, time, location, description, max_spots, max_men)
      VALUES (${groupId}, '${name}', ${date}, ${time}, '${location}', '${description}', ${maxSpots}, ${maxMen});
  `;
  console.log(`added event ${groupId}, '${name}', ${date}, ${time}, '${location}', '${description}', ${maxSpots}, ${maxMen}:`, result)
  return result;
}

export async function deleteEvent({ id }) {
  result = await sql`
    DELETE FROM events
    WHERE id = ${id};
  `;
  console.log(`deleted event ${id}:`, result)
}

export async function editEvent({ id, name, date, time, location, description, maxSpots, maxMen }) {
  result = await sql`
    UPDATE events
    SET name = '${name}',
        date = ${date},
        time = ${time},
        location = '${location}',
        description = '${description}',
        max_spots = ${maxSpots},
        max_men = ${maxMen}
    WHERE id = ${id};
  `;
  console.log(`updated event ${id}: '${name}', ${date}, ${time}, '${location}', '${description}', ${maxSpots}, ${maxMen}:`, result)
}

export async function getEventsForUser({userId}) {
  const { events } = await sql`
    SELECT
      events.id AS id,
      events.name AS name,
      CONCAT(date, ' ', time) AS datetime,
      groups.name AS group_name

    FROM attending_event
    JOIN events ON events.id = attending_event.event_id
    JOIN groups ON groups.id = events.group_id

    WHERE attending_event.user_id = ${userId}
  `

  // return events.map(event => ({
  //   id: event.id,
  //   name: event.name,
  //   datetime_string : event.datetime,
  //   groupName: event.group_name,
  // }));

  return (
    [
      {
        id: 1,
        name: "Practice",
        datetime_string : '2024-08-15T14:30:00+09:00',
        groupName: "My group",
      },
      {
        id: 2,
        name: "Practice",
        datetime_string : '2024-09-17T14:30:00+09:00',
        groupName: "My group",
      },
      {
        id: 3,
        name: "Practice",
        datetime_string : '2024-09-20T14:30:00+09:00',
        groupName: "My group",
      },
      {
        id: 4,
        name: "Practice",
        datetime_string : '2024-09-22T14:30:00+09:00',
        groupName: "My group",
      }
    ]
  );
}


export async function getEventById({ id }) {
  const { events } = await sql`
    SELECT
      id,
      group_id,
      name,
      CONCAT(date, ' ', time) AS datetime,
      location,
      description,
      max_spots,
      max_men
    FROM events
    WHERE id = ${id}
  `;

  console.log("found events:", events);

  // return events.map(event => ({
  //   id: event.id,
  //   group_id: event.group_id,
  //   name: event.name,
  //   datetime_string : event.datetime,
  //   location: event.location,
  //   description: event.description,
  //   max_spots: event.max_spots,
  //   max_men: event.max_men
  // }));

  return (
    {
      id: 1,
      group_id: 1,
      name: "Practice",
      datetime_string : '2024-06-15T14:30:00+09:00',
      location: "Sakuranomiya beach",
      description: "Weekly practice",
      max_spots: 8,
      max_men: 4
    }
  );
}