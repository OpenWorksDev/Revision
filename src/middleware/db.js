const r = require("rethinkdb");
r.connect({
  host: "***REMOVED***",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "***REMOVED***",
}).then((c) => console.log("connected"));

module.exports = r;
