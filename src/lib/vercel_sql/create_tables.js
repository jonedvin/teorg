import { sql } from "@vercel/postgres";

export async function createTables() {

    let result = await sql`
        CREATE TABLE IF NOT EXISTS groups (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );
    `;
    console.log("groups:", result)

    result = await sql`
        CREATE TABLE IF NOT EXISTS access_levels (
            name VARCHAR(50) PRIMARY KEY,
            value INT
        );
    `;
    console.log("access_levels:", result)

    result = await sql`
        CREATE TABLE IF NOT EXISTS users (
            user_id VARCHAR(50) PRIMARY KEY,

            display_name VARCHAR(50),
            gender VARCHAR(10)
        );
    `;
    console.log("users:", result)

    result = await sql`
        CREATE TABLE IF NOT EXISTS member_of_group (
            group_id INT,
            user_id VARCHAR(50),

            access_level VARCHAR(50),

            FOREIGN KEY (group_id) REFERENCES groups(id),
            FOREIGN KEY (access_level) REFERENCES access_levels(name),

            PRIMARY KEY (group_id, user_id)
        );
    `;
    console.log("member_of_group:", result)

    result = await sql`
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,

            group_id INT,

            name VARCHAR(50),
            date DATE,
            time TIME,
            location VARCHAR(50),
            description VARCHAR(500),
            max_spots INT,
            max_men INT,

            FOREIGN KEY (group_id) REFERENCES groups(id)
        );
    `;
    console.log("events:", result)

    result = await sql`
        CREATE TABLE IF NOT EXISTS attending_event (
            event_id INT,
            user_id VARCHAR(50),

            attending VARCHAR(10),
            signup_date DATE,
            signup_time TIME,

            PRIMARY KEY (event_id, user_id),

            FOREIGN KEY (event_id) REFERENCES events(id)
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `;
    console.log("attending_event:", result)

    result = await sql`CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,

        event_id INT,
        user_id VARCHAR(50),
        date DATE,
        time TIME,
        content VARCHAR(500),

        FOREIGN KEY (event_id) REFERENCES events(id)
    );`;
    console.log("comments:", result)

    console.log("Created tables")
}

// await sql`ALTER TABLE groups
//     ADD COLUMN IF NOT EXISTS description VARCHAR(500)
// ;`;

/*
                                    access_levels________
                                    | P name VARCHAR(50) |
                                    |   value INT        |
                                    '---------,----------'
                                              |
groups____________________    member_of_group_|_____________    users________________________
| P id SERIAL PRIMARY KEY |   | PF group_id INT             |   | P user_id VARCHAR(50)      |
|   name VARCHAR(50)      |---| PF user_id VARCHAR(50)      |---|   display_name VARCHAR(50) |
'-------------,-----------'   |  F access_level VARCHAR(50) |   |   gender VARCHAR(10)       |
              |               '-----------------------------'   '-,----------|---------------'
              |                                                   |          |
events________|______________    attending_event____________      |          |
| P id SERIAL                |   | PF event_id INT          |     |          |
| F group_id INT             |   | PF user_id VARCHAR(50)   |     |          |
|   name VARCHAR(50)         |---|    attending VARCHAR(10) |-----'          |
|   date DATE                |   |    signup_date DATE      |                |
|   time TIME                |   |    signup_time TIME      |   comments_____|___________
|   location VARCHAR(50)     |   '--------------------------'   | P id SERIAL            |
|   description VARCHAR(500) |                                  | F event_id INT         |
|   max_spots INT            |----------------------------------|   user_id VARCHAR(50)  |
|   max_men INT              |                                  |   date DATE            |
'----------------------------'                                  |   time TIME            |
                                                                |   content VARCHAR(500) |
                                                                '------------------------'

NOTES:
- Events are based on a group, but others may be invited separately

ENUMS:
attending_event.attending: [attend, maybe, decline], null means unanswered
*/
