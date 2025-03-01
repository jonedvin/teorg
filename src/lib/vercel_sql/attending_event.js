import { sql } from "@vercel/postgres";
import { getDatetimeDate, getDatetimeTime } from "../time";

function getAttendingValue({attending}) {
  switch(attending) {
    case 'attend':
      return "'attend'";
    case 'maybe':
      return "'maybe'";
    case 'decline':
      return "'decline'";
    case null:
      return 'NULL';
    default:
      console.log("Unknown attending value:", attending)
      return 'NULL';
  }
}



export async function inviteToEvent({ eventId, userId }) {
  result = await sql`
    INSERT INTO attending_event (event_id, user_id)
    VALUES (${eventId}, '${userId}');
  `;
  console.log(`added attending_event ${eventId}, '${userId}':`, result)
}

export async function editAttendingEvent({ eventId, userId, attending, datetime }) {
  const signupDate = getDatetimeDate(datetime);
  const signupTime = getDatetimeTime(datetime);

  result = await sql`
    UPDATE attending_event
    SET attending = ${getAttendingValue(attending)},
        signup_date = ${signupDate},
        signup_time = ${signupTime}
    WHERE event_id = ${eventId} and user_id = '${userId}';
  `;
  console.log(`updated attending_event ${eventId}, '${userId}': ${attending}, ${signupDate}, ${signupTime}:`, result)
}

export async function getAttendance({ eventId }) {
  const { attendance } = await sql`
    SELECT
      users.display_name AS user_name,
      attending,
      CONCAT(signup_date, ' ', signup_time) AS datetime
    FROM attending_event
    JOIN users on users.user_id = attending_event.user_id
    WHERE event_id = ${eventId}
  `;

  // return attendance.map(user => ({
  //   userName: user.user_name,
  //   attending: user.attending,
  //   datetime: user.datetime,
  // }));

  return (
    [
      {
        userName: 'Jon',
        attending: 'attend',
        datetime: '2024-08-15T14:30:00+09:00',
      },
      {
        userName: 'Sheila',
        attending: 'attend',
        datetime: '2024-08-15T14:35:00+09:00',
      },
      {
        userName: 'Paula',
        attending: 'maybe',
        datetime: '2024-08-15T14:30:00+09:00',
      },
      {
        userName: 'Jim',
        attending: 'decline',
        datetime: '2024-08-15T14:30:00+09:00',
      },
      {
        userName: 'Konan',
        attending: null,
        datetime: '2024-08-15T14:30:00+09:00',
      },
    ]
  )
}
