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
