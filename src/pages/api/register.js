let { hash, compare } = require("../../components/authentication");
import { serialize } from "cookie";
import { userFlake, setFlake } from "../../components/snowflake";
const Joi = require("joi");
let { creds, r } = require("../../../lib/db");

export default async function UnameCheck(req, res) {
  let data = JSON.parse(req.body);
  const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    // last_date_modified: Joi.date().timestamp(),
    date_created: Joi.date().timestamp().required(),
    // accestoken
  });
  let snowflake = userFlake.generate();

  let user = {
    id: snowflake.toString(),
    username: data.uname,
    email: data.email,
    date_created: Date.now(),
  };

  // try {
  //   const u = await userSchema.validateAsync(user);
  //   r.connect(creds, function (conn) {
  //     r.table("users").insert(u).run(conn);
  //   });
  // } catch (err) {
  //   return console.log(err);
  //   res.status(500).send();
  // }

  res.setHeader(
    "Set-Cookie",
    serialize("token", "your acces token", { path: "/" })
  );
  res.status(200).send("test");
}
