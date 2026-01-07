const pool = require("./db");

async function crudOperations() {
    try {
        // CREATE
        const insert = await pool.query(
            "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
            ["Anu", "anu@gmail.com", 21]
        );
        console.log("Inserted:", insert.rows);

        // READ
        const read = await pool.query("SELECT * FROM students");
        console.log("All Students:", read.rows);

        // UPDATE
        const update = await pool.query(
            "UPDATE students SET age=$1 WHERE name=$2 RETURNING *",
            [22, "Anu"]
        );
        console.log("Updated:", update.rows);

        // DELETE
        const del = await pool.query(
            "DELETE FROM students WHERE name=$1 RETURNING *",
            ["Anu"]
        );
        console.log("Deleted:", del.rows);

    } catch (err) {
        console.log(err);
    } finally {
        pool.end();
    }
}

crudOperations();
