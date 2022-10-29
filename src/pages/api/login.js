import { hash, compare } from "../../components/authentication";
let { creds, r } = require("../../../lib/db");
export default async function LoginAPIRoute(req, res) {
  const Joi = require("joi");
  let data = JSON.parse(req.body);
  r.connect(creds, (err, conn) => {
    r.table("credentials")
      .filter((c) => {
        return c("email").eq(data.email);
      })
      .run(conn, async (err, c) => {
        async function manageNext(err, result) {
          console.log(data);
          if (err) {
            if (
              err.name === "ReqlDriverError" &&
              err.message === "No more rows in the cursor."
            ) {
              //TODO: return error if user doesn't exist
              res.status(200).send({ msg: "failure", reason: "email" });
            } else throw err;
          }
          // Checks if the given password matches the password hash of the user (REDO MY DOCUMENTATION PLEASE)
          let passwordValid = compare(data.password, result.password);

          if (passwordValid) {
            return processUserValid(); //TODO: write access token cookie and redirect
          } else {
            res.status(200).send({ msg: "failure", reason: "password" });
          }
        }
        c.next(manageNext);
      });
  });
}
