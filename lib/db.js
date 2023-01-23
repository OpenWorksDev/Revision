const mariadb = require("mariadb");
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
module.exports = Object.freeze({
  pool: mariadb.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
  }),
});
//usage:
// r.connect(creds, (err, conn) => {
//     r...run(conn, async (err, c) => {})
//     do things.. then
//     conn.close()
//   });
