const mariadb = require("mariadb");

module.exports = Object.freeze({
  pool: mariadb.createPool({
    host: process.env.DB_IP,
    user: "***REMOVED***",
    port: 3306,
    password: process.env.DB_PASSWORD,
    ***REMOVED***,
  }),
});
//usage:
// r.connect(creds, (err, conn) => {
//     r...run(conn, async (err, c) => {})
//     do things.. then
//     conn.close()
//   });
