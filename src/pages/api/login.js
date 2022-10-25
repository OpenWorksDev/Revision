let r = require("../../middleware/db");
let { hash, compare } = require("../../components/authentication");
import flake from "../../components/snowflake";

export default async function LoginAPIRoute(req, res) {
  // let formData = JSON.parse(req.body);
  // //check if user exists
  // console.log(flake.nextId());
  // console.log(await hash(data.passwd));
  // console.log(
  //   await compare(
  //     data.passwd,
  //     "$2b$10$NjUpdaaTmh/IeVWCPANDQ.aVHuVt.4YRfSo0zmcoGmYxP8.F4EWXW"
  //   )
  // );

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  res.status(200).end();
}
