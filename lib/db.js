var rdb = require("rethinkdb");

let creds = {
  host: "81.92.192.113",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "?rethink!db",
};

export { creds, rdb };

//usage:
// r.connect(creds, (err, conn) => {
//     r...run(conn, async (err, c) => {})
// //do things.. then
//     conn.close()
//   });
