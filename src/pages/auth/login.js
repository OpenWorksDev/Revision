import styles from "../styles/auth.module.css";
import Head from "next/head";
import { useEffect } from "react";

export default function Login() {
  function verifyValues() {
    /// Verifies entered email and password
    ///
    /// :returns (bool) - true if all are valid
    var email = document.getElementById("email").value.trim();
    var passwd = document.getElementById("passwd").value.trim();

    // TODO: Better alerts and messages
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Not a valid email");
      return false;
    }

    if (passwd.length == 0) {
      alert("Please enter a password");
      return false;
    }

    return true;
  }

  function login() {
    /// Triggered on login button click

    if (!verifyValues()) return;
    var formData = new FormData();

    formData.set("email", document.getElementById("email").value.trim());
    formData.set("password", document.getElementById("passwd").value.trim());

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = async () => {
      if (ajax.readyState == XMLHttpRequest.DONE) {
        if (ajax.responseType == "") {
          return;
        }
        // TODO: Get a success or a failure from the server and react accordingly
        // If it is a success make sure all cookies are correctly set and redirect to home page

        var response = JSON.parse(ajax.responseText);
        // window.location.replace(`/`);
      }
    };
    ajax.open("POST", "/api/auth/login");
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
        <title>Login</title>
      </Head>
      <div className={styles["main-wrapper"]}>
        <div className={styles["sub-wrapper"]}>
          <h1 className={styles["title"]}>Login</h1>
          <form>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              className={styles["text-input"]}
            />
            <br />
            <input
              type="password"
              id="passwd"
              name="passwd"
              autoComplete="off"
              placeholder="password"
              className={styles["text-input"]}
            />
          </form>
          <button
            className={styles["btn-submit"]}
            id="btnLogin"
            onClick={login}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
