import { sql } from "@vercel/postgres";

export async function addMemberOfGroup({ groupId, userId, accessLevel }) {
  result = await sql`
    INSERT INTO member_of_group (group_id, user_id, access_level)
    VALUES (${groupId}, '${userId}', '${accessLevel}');
  `;
  console.log(`added member_of_group ${groupId}, '${userId}', '${accessLevel}':`, result)
}

export async function deleteMemberOfGroup({ groupId, userId }) {
  result = await sql`
    DELETE FROM member_of_group
    WHERE group_id = ${groupId} AND user_id = '${userId}';
  `;
  console.log(`deleted member_of_group ${groupId}, '${userId}':`, result)
}

export async function editMemberOfGroup({ groupId, userId, accessLevel }) {
  result = await sql`
    UPDATE member_of_group
    SET access_level = '${accessLevel}'
    WHERE group_id = ${groupId} AND user_id = '${userId}';
  `;
  console.log(`updated member_of_group ${groupId}, '${userId}': ${accessLevel}:`, result)
}
