const mariadb = require("mariadb");
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const pool = mariadb.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  connectionLimit: 10,
});

/**
 * Returns an active database connection
 *
 * Remember to close the connection
 **/
export async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.log("Error in getting connection: " + err);
  }
}
