import { hash, compare } from "../../components/authentication";
let { creds, r } = require("../../../lib/db");
export default async function LoginAPIRoute(req, res) {
  const Joi = require("joi");
  let data = JSON.parse(req.body);
  r.connect(creds, (err, conn) => {
    r.table("credentials")
      .filter((c) => {
        return user("username").eq(data.email).or(user("email").eq(data.email));
      })
      .run(conn, async (err, c) => {
        c.next();
        function manageNext(err, result) {
          if (err) {
            if (
              err.name === "ReqlDriverError" &&
              err.message === "No more rows in the cursor."
            ) {
              //TODO: return error if user doesn't exist
            } else throw err;

            // Checks if the form password is the same as the db password
            if (compare(data.password, result.password)) {
              return processUserValid(); //TODO: write access token cookie and redirect
            }
          }
        }
        await c.next(manageNext);
      });
    //do things.. then
    conn.close();
  });
}
