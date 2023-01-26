let { hash, compare } = require("../../../components/authentication");
import { serialize } from "cookie";
import { userFlake, setFlake } from "../../../components/snowflake";
const Joi = require("joi");
let db = require("../../../../lib/db");

class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ValidationFailed";
  }
}
export default async function registerAPIRoute(req, res) {
  let data = JSON.parse(req.body);
  const userSchema = Joi.object({
    id: Joi.string().alphanum().required(),
    username: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
  });

  const credSchema = Joi.object({
    password: Joi.string().required(),
  });
  let user = {
    id: userFlake.generate().toString(),
    email: data.email,
    username: data.username,
  };

  let cred = {
    password: await hash(data.passwd),
  };

  try {
    const userObj = userSchema.validate(user);
    const credObj = credSchema.validate(cred);
    if (userObj.error)
      throw new ValidationError(
        "userSchema did not validate successfully: " + userObj.error
      );

    if (credObj.error)
      throw new ValidationError(
        "credSchema did not validate successfully: " + credObj.error
      );
    try {
      let exists = await db.pool.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [userObj.value.username, userObj.value.email]
      );
      if (exists.length > 0) {
        console.log(exists);
        var items = [];
        var checkItems = (data) => {
          if (data.email == userObj.value.email) {
            items.push("email");
          }
          if (data.username == userObj.value.username) {
            items.push("username");
          }
        };

        checkItems(exists[0]);
        if (exists[1] !== undefined) checkItems(exists[1]);
        return res.status(200).send({ msg: "exists", reason: items });
      }
      if (exists.length === 0) {
        db.pool.query(
          "INSERT INTO users (id, email, username) VALUES (?, ?, ?)",
          [userObj.value.id, userObj.value.email, userObj.value.username]
        );
        db.pool.query("INSERT INTO credentials (id, password) VALUES (?, ?)", [
          userObj.value.id,
          credObj.value.password,
        ]);
        res.status(200).send({ msg: "success" });
      }
    } catch (err) {
      console.log(err);
    }

    // await r.connect(credentials, (err, conn) => {
    //   r.table("users")
    //     .filter((user) => {
    //       return user("username")
    //         .eq(userObj.username)
    //         .or(user("email").eq(userObj.email));
    //     })
    //     .run(conn, async (err, c) => {
    //       /**
    //        * Function to check data points for username and email if they exist
    //        *
    //        * For each datapoint that exists each is added to a list
    //        *
    //        * @return list Datapoints that already exist in the database
    //        */
    //       var checkItems = (data) => {
    //         var items = [];

    //         if (data.email == userObj.email) {
    //           items.push("email");
    //         }
    //         if (data.username == userObj.username) {
    //           items.push("username");
    //         }

    //         return items;
    //       };

    //       /**
    //        * Callback function for cursor next
    //        *
    //        * This function registers users into the database if they have a
    //        * unique username and email address otherwise it calls processItemExists
    //        * with the result from checkItems
    //        *
    //        * @param string Error
    //        * @param json Result json of the queried info from the database
    //        */
    //       var manageNext = async (err, result) => {
    //         if (err) {
    //           if (
    //             err.name === "ReqlDriverError" &&
    //             err.message === "No more rows in the cursor."
    //           ) {
    //             console.log("User does not exist. Creating new user.");
    //             await r.table("users").insert(userObj).run(conn);
    //             await r.table("credentials").insert(credObj).run(conn);
    //             conn.close();
    //             processUserCreated();
    //           } else throw err;
    //         } else {
    //           processItemExists(checkItems(result));
    //         }
    //       };

    //       await c.next(manageNext);
    //     });
    // });
  } catch (err) {
    console.log(err);
    if (err instanceof ValidationError) {
      res.status(400).send();
    } else {
      res.status(409).send();
    }
  }
}
