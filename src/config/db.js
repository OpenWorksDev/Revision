const r = require("rethinkdb");
r.connect(
  {
    host: "***REMOVED***",
    port: 28015,
    db: "Revision",
    user: "",
    password: "",
  },
  function (err, conn) {
    // ...
  }
);

module.exports = r;
