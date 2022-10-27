var r = require("rethinkdb");

let creds = {
  host: "***REMOVED***",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "***REMOVED***",
  pool: false,
};

export { creds, r };

//usage:
// r.connect(creds, function (err, conn) {
//     r...run(conn)
//   });
