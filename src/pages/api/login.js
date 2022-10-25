let db = require("../../config/db");

export default function LoginAPIRoute() {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
}
