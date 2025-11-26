import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pranbirisbestt",
    database: "shopdb"
}).promise();

export default db;
