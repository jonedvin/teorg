import { sql } from "@vercel/postgres";

export async function dropAllTables() {

    await sql`DROP TABLE IF EXISTS comments;`
    await sql`DROP TABLE IF EXISTS attending_event;`
    await sql`DROP TABLE IF EXISTS events;`
    await sql`DROP TABLE IF EXISTS member_of_group;`
    await sql`DROP TABLE IF EXISTS users;`
    await sql`DROP TABLE IF EXISTS access_levels;`
    await sql`DROP TABLE IF EXISTS groups;`

    console.log("Dropped all tables")
}
