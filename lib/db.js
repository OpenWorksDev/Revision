var r = require("rethinkdb");

let creds = {
  host: "***REMOVED***",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "***REMOVED***",
};

export { creds, r };

//usage:
// r.connect(creds, (err, conn) => {
//     r...run(conn, async (err, c) => {})
// //do things.. then
//     conn.close()
//   });
