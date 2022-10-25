let r = require("../../middleware/db");
let { hash } = require("../../components/authentication");
import { Worker as snow } from "../../components/snowflake";
const flake = new snow();
// const { Worker } = require('snowflake-uuid');

export default function LoginAPIRoute(req, res) {
  let data = JSON.parse(req.body);
  console.log(hash(data.passwd));

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  res.status(200).end();
}
