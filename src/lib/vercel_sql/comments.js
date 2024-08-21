import { sql } from "@vercel/postgres";

export async function addComment({ eventId, userId, date, time, content }) {
  result = await sql`
    INSERT INTO comments (event_id, user_id, date, time, content)
    VALUES (${eventId}, '${userId}', ${date}, ${time}, '${content}');
  `;
  console.log(`added comment ${eventId}, '${userId}', ${date}, ${time}, '${content}:`, result)
}

export async function deleteComment({ id }) {
  result = await sql`
    DELETE FROM comments
    WHERE id = ${id};
  `;
  console.log(`deleted comment ${id}:`, result)
}
