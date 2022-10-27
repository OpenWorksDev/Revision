let { creds, r } = require("../../../../lib/db");

export default function UnameCheck(req, res) {
  const { uname } = req.query;

  // TODO: Username Query Check
  // Query the database for usernames in use
  // Only return true if no one else has said username
  r.connect(creds, function (err, conn) {
    console.log(r.table("users").filter({ username: uname }).run(conn));
  });
  console.log(uname);

  // Currently defaults to a used username thus not allowing call to register.js
  res.status(200).send({ valid: true });
}
