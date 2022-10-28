let { hash, compare } = require("../../components/authentication");
import { serialize } from "cookie";
import { userFlake, setFlake } from "../../components/snowflake";
const Joi = require("joi");
let { creds, r } = require("../../../lib/db");

class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ValidationFailed";
  }
}

export default async function registerAPIRoute(req, res) {
  const processItemExists = (itemExists) => {
    /**
     * If email or uname exist in the database this function is to be called
     *
     * This function will respond to the client with the item that exists in the database
     * this will cause the client to report to the user that the item exists and
     * ask for a new entry of said item.
     */
    res.status(200).send({ msg: "failure", reason: itemExists });
  };

  const processUserCreated = () => {
    /**
     * Called when user is succesfully created
     *
     * This will return a message to the client to redirect them to the login page
     */
    res.status(200).send({ msg: "success" });
  };

  let data = JSON.parse(req.body);
  const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    date_created: Joi.date().timestamp().required(),
  });

  const credSchema = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  let snowflake = userFlake.generate().toString();

  let user = {
    id: snowflake,
    username: data.uname,
    email: data.email,
    date_created: Date.now(),
  };

  let cred = {
    id: snowflake,
    email: data.email,
    password: await hash(data.passwd),
  };

  try {
    const userObj = userSchema.validate(user).value;
    const credObj = credSchema.validate(cred).value;

    if (userObj == undefined || userObj == null)
      throw new Error("userSchema did not validate successfully");

    if (credObj == undefined || credObj == null)
      throw new Error("credSchema did not validate successfully");

    await r.connect(creds, (err, conn) => {
      r.table("users")
        .filter((user) => {
          return user("username")
            .eq(userObj.username)
            .or(user("email").eq(userObj.email));
        })
        .run(conn, async (err, c) => {
          var checkItems = (data) => {
            /**
             * Function to check data points for username and email if they exist
             *
             * For each datapoint that exists each is added to a list
             *
             * @return list Datapoints that already exist in the database
             */
            var items = [];

            if (data.email == userObj.email) {
              items.push("email");
            }
            if (data.username == userObj.username) {
              items.push("username");
            }

            return items;
          };

          var manageNext = async (err, result) => {
            /**
             * Callback function for cursor next
             *
             * This function registers users into the database if they have a
             * unique username and email address otherwise it calls processItemExists
             * with the result from checkItems
             *
             * @param string Error
             * @param json Result json of the queried info from the database
             */
            if (err) {
              if (
                err.name === "ReqlDriverError" &&
                err.message === "No more rows in the cursor."
              ) {
                console.log("User does not exist. Creating new user.");
                await r.table("users").insert(userObj).run(conn);
                await r.table("credentials").insert(credObj).run(conn);
                conn.close();
                processUserCreated();
              } else throw err;
            } else {
              processItemExists(checkItems(result));
            }
          };

          await c.next(manageNext);
        });
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log("Val Err");
    } else {
      console.log(err);
      res.status(409).send();
    }
  }
}
