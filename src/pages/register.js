import styles from "../styles/auth.module.css";
import {
  passwd_check,
  email_check,
  uname_check,
} from "../components/validators";
import Head from "next/head";
import { useEffect } from "react";

export default function Register() {
  async function verifyValues() {
    /**
     * Verifies entered email and password
     * @returns boolean True if all are valid
     */

    // TODO: Better alerts and messages

    var email = document.getElementById("email").value.trim();
    var email_valid = email_check(email);
    if (!email_valid) {
      console.log(email_valid);
      alert("Please enter a valid email");
      return;
    }

    var passwd = document.getElementById("passwd").value.trim();
    var passwd_valid = passwd_check(passwd);
    if (!(passwd_valid == null)) {
      alert(passwd_valid);
      return;
    }
    if (!(passwd == document.getElementById("re-passwd").value.trim())) {
      alert("Passwords do not match");
      return;
    }

    var uname = document.getElementById("uname").value.trim();

    if (!uname_check(uname)) {
      alert("Invalid username");
      return;
    }

    {
      var ajax = new XMLHttpRequest();

      ajax.onreadystatechange = async () => {
        if (ajax.readyState == XMLHttpRequest.DONE) {
          var uname_validation = JSON.parse(ajax.responseText);
          if (!uname_validation["valid"]) {
            alert("Username is already in use");
            return;
          }
          register();
        }
      };

      ajax.open("GET", `/api/validation/${uname}`);
      ajax.send();
    }
  }

  function register() {
    /// Triggered on login button click

    var formData = new FormData();

    formData.set("email", document.getElementById("email").value.trim());
    formData.set("uname", document.getElementById("uname").value.trim());
    formData.set("passwd", document.getElementById("passwd").value.trim());

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = async () => {
      if (ajax.readyState == XMLHttpRequest.DONE) {
        if (ajax.responseType == "") {
          console.log("Empty Response");
          return;
        }
        // TODO: Get a success or a failure from the server and react accordingly
        // If it is a success make sure all cookies are correctly set and redirect to home page

        var response = JSON.parse(ajax.responseText);
        // window.location.replace(`/`);
      }
    };

    ajax.open("POST", "/api/register");
    var formObj = {};
    formData.forEach((value, key) => (formObj[key] = value));
    var formData = JSON.stringify(formObj);
    ajax.send(formData);
  }

  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      if (event.key == "Enter") login();
    });
  });

  return (
    <div className={styles["login-page"]}>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles["main-wrapper"]}>
        <div className={styles["sub-wrapper"]}>
          <h1 className={styles["title"]}>Register</h1>
          <form>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className={styles["text-input"]}
            />
            <br />
            <input
              type="text"
              id="uname"
              name="uname"
              placeholder="user name"
              className={styles["text-input"]}
            />
            <br />
            <div className={styles["break-div"]} />
            <input
              type="password"
              id="passwd"
              name="passwd"
              autoComplete="off"
              placeholder="password"
              className={styles["text-input"]}
            />
            <br />
            <input
              type="password"
              id="re-passwd"
              name="re-passwd"
              autoComplete="off"
              placeholder="re-enter password"
              className={styles["text-input"]}
            />
          </form>
          <button
            className={styles["btn-submit"]}
            id="btnLogin"
            onClick={verifyValues}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}
