import { sql } from "@vercel/postgres";

export async function addAccessLevel({ name, value }) {
  result = await sql`
    INSERT INTO access_levels (name, value)
    VALUES ('${name}', ${value});
  `;
  console.log(`added access_level '${name}', ${value}:`, result)
}

export async function deleteAccessLevel({ name }) {
  result = await sql`
    DELETE FROM access_levels
    WHERE name = '${name}';
  `;
  console.log(`deleted access_level '${name}':`, result)
}

export async function editAccessLevel({ name, value }) {
  result = await sql`
    UPDATE access_levels
    SET value = ${value}
    WHERE name = '${name}';
  `;
  console.log(`updated access_level '${name}': ${value}:`, result)
}
