const r = require("rethinkdb");
r.connect(
  {
    host: "81.92.192.113",
    port: 28015,
    db: "Revision",
    user: 
    password:
  },
  function (err, conn) {
    // ...
  }
);

module.exports = r;
