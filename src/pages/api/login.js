let db = require("../../config/db");

export default function LoginAPIRoute(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  res.status(200).end();
}
