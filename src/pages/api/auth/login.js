import { compare } from "../../../components/api/auth/hashing";
let db = require("../../../../lib/db");

export default async function LoginAPIRoute(req, res) {
  let data = JSON.parse(req.body);

  let id_query = await db.pool.query(
    "SELECT id FROM users WHERE username = ? or email = ?",
    [data.email, data.email]
  );
  if (id_query.length === 0)
    return (
      res.status(200).send({ msg: "failure", reason: "noUser" }),
      console.log("noUser")
    );
  console.log(id_query[0].id);
  let pass_query = await db.pool.query(
    "SELECT password FROM credentials WHERE id = ?",
    [id_query[0].id]
  );
  const password_correct = await compare(data.password, pass_query[0].password);
  if (!password_correct)
    return res.status(200).send({ msg: "failure", reason: "password" });

  res.status(200).send({ msg: "success" });
}
