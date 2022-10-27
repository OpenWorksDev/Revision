var thinky = require("thinky")({
  host: "***REMOVED***",
  port: 28015,
  db: "revision",
  user: "admin",
  password: "***REMOVED***",
});
var type = thinky.type;

var r = thinky.r;

var User = thinky.createModel("users", {
  id: type.string(),
  username: type.string(),
  email: type.string(),
  last_date_modified: type.date(),
  date_created: type.date().default(r.now()),
  recent: { notes: type.array(), sets: type.array() },
});
var Recent = thinky.createModel("recent", {});

exports.user = User;

var r = require("rethinkdbdash");
let connected = false;
if (connected == false) {
  r = r({
    host: "***REMOVED***",
    port: 28015,
    db: "revision",
    user: "admin",
    password: "***REMOVED***",
  });
  connected = true;
}
module.exports = r;
