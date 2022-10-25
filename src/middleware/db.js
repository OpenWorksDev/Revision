const r = require("rethinkdb");
r.connect({
  host: "81.92.192.113",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "?rethink!db",
}).then((c) => console.log("connected"));

module.exports = r;
