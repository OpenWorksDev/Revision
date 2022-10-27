var r = require("rethinkdb");

let creds = {
  host: "81.92.192.113",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "?rethink!db",
};

export { creds, r };

//usage:
// r.connect(creds, function (err, conn) {
//     r...run(conn)
// //do things.. then
//     conn.close()
//   });
