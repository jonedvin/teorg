import { sql } from "@vercel/postgres";

export async function addGroup({ name }) {
  result = await sql`
    INSERT INTO groups (name)
    VALUES ('${name}');
  `;
  console.log(`added group '${name}':`, result)
}

export async function deleteGroup({ id }) {
  result = await sql`
    DELETE FROM groups
    WHERE id = ${id};
  `;
  console.log(`deleted group ${id}:`, result)
}

export async function editGroup({ id, name }) {
  result = await sql`
    UPDATE groups
    SET name = '${name}'
    WHERE id = ${id};
  `;
  console.log(`updated group ${id}: '${name}':`, result)
}

export async function getGroupsForUser({userId}) {
  const { groups } = await sql`
  SELECT
    groups.id AS id,
    groups.name AS name,
    access_levels.value AS access_level_value

  FROM member_of_group
  JOIN groups ON groups.id = member_of_group.group_id
  JOIN access_levels ON access_levels.name = member_of_group.access_level

  WHERE member_of_group.user_id = ${userId}
`

// return groups
//     .filter(group => group.access_level_value >= 3)
//     .map(group => ({
//         id: group.id,
//         name: group.name,
//     }));

return (
    [
        {
            id: 1,
            name: "Inne"
        },
        {
            id: 2,
            name: "Ute"
        },
    ]
)
}
