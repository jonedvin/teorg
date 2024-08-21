import { sql } from "@vercel/postgres";

export async function addUser({ userId, displayName, gender }) {
  result = await sql`
    INSERT INTO users (user_id, display_name, gender)
    VALUES ('${userId}', '${displayName}', '${gender}');
  `;
  console.log(`added user '${userId}', '${displayName}', '${gender}':`, result)
}

export async function deleteUser({ userId }) {
  result = await sql`
    DELETE FROM users
    WHERE user_id = '${userId}';
  `;
  console.log(`deleted user '${userId}':`, result)
}

export async function editUser({ userId, displayName, gender }) {
  result = await sql`
    UPDATE users
    SET display_name = '${displayName}',
        gender = '${gender}'
    WHERE user_id = '${userId}';
  `;
  console.log(`updated user '${userId}': '${displayName}', '${gender}':`, result)
}
