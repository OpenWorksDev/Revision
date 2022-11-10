import styles from "../styles/auth.module.css";
import {
  passwd_check,
  email_check,
  uname_check,
} from "../components/validators";
import Head from "next/head";
import { useEffect } from "react";

export default function Register() {
  function aAlert(field, alert, func) {
    alert = "* " + alert;
    var a = document.querySelector(`[data-alert="${field}"]`);
    if (a.dataset.current_alert == alert) return;
    let f = document.getElementById(field);

    let t;
    if (a.dataset.current_alert == "null" || !a.dataset.current_alert)
      a.style.opacity = 100;
    if (a.dataset.current_alert != alert) a.innerHTML = alert;

    a.dataset.current_alert = alert;
  }
  function aClear(field) {
    var a = document.querySelector(`[data-alert="${field}"]`);
    a.style.opacity = 0;
    a.dataset.current_alert = "null";

    //TODO: add transitions
  }
  function verifyEmail() {
    var email_valid = email_check(
      document.getElementById("email").value.trim()
    );
    if (!email_valid) {
      aAlert("email", "Please enter a valid email", verifyEmail);
      return false;
    }
    aClear("email");
    return true;
  }
  function verifyUsername() {
    var uname_valid = uname_check(document.getElementById("uname").value);
    if (uname_valid != undefined) {
      aAlert("uname", uname_valid, verifyUsername);
      return false;
    }
    aClear("uname");
    return true;
  }
  function verifyPassword() {
    var passwd_valid = passwd_check(document.getElementById("passwd").value);
    if (passwd_valid !== undefined) {
      aAlert("passwd", passwd_valid, verifyPassword);
      return false;
    }
    aClear("passwd");
    return true;
  }
  function verifyRePassword() {
    if (
      !(
        document.getElementById("passwd").value ==
        document.getElementById("re-passwd").value
      )
    ) {
      aAlert("re-passwd", "Passwords do not match", verifyRePassword);
      return false;
    }
    aClear("re-passwd");
    return true;
  }
  function verifyValues() {
    /**
     * Verifies entered email and password
     * @returns boolean True if all are valid
     */
    let valid = true;
    if (!verifyEmail()) valid = false;
    if (!verifyUsername()) valid = false;
    if (!verifyPassword()) valid = false;
    if (!verifyRePassword()) valid = false;

    return valid;
  }

  function register() {
    if (!verifyValues()) return;
    /// Triggered on login button click

    var formData = new FormData();

    formData.set("email", document.getElementById("email").value.trim());
    formData.set("uname", document.getElementById("uname").value.trim());
    formData.set("passwd", document.getElementById("passwd").value.trim());

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = async () => {
      if (ajax.readyState == XMLHttpRequest.DONE) {
        // if (ajax.responseType == "") {
        //   console.log("Empty Response");
        //   return;
        // }
        // TODO: Get a success or a failure from the server and react accordingly
        // If it is a success make sure all cookies are correctly set and redirect to home page

        try {
          console.log(ajax.responseText);
          var response = JSON.parse(ajax.responseText);
          console.log(response);
          if (response.msg == "success") window.location.replace(`/`);
        } catch (e) {
          console.log(e);
        }
      }
    };

    ajax.open("POST", "/api/auth/register");
    var formObj = {};
    formData.forEach((value, key) => (formObj[key] = value));
    var formData = JSON.stringify(formObj);
    ajax.send(formData);
  }

  useEffect(() => {
    // document.addEventListener("keyup", (event) => {
    //   if (event.key == "Enter") login();
    // });

    document.addEventListener("input", (event) => {
      let n = event.target.name;
      let f = document.getElementById(n);
      if (f.value == "") return aClear(n);
      if (n == "email") verifyEmail();
      if (n == "uname") verifyUsername();
      if (n == "passwd") verifyPassword();
      if (n == "re-passwd") verifyRePassword();
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
              data-form
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="email"
              className={styles["text-input"]}
            />
            <p data-alert="email" className={styles["field-alert"]}></p>
            <br />
            <input
              data-form
              type="text"
              id="uname"
              name="uname"
              autoComplete="off"
              placeholder="user name"
              className={styles["text-input"]}
            />
            <p data-alert="uname" className={styles["field-alert"]}></p>
            <br />
            <input
              data-form
              type="password"
              id="passwd"
              name="passwd"
              autoComplete="off"
              placeholder="password"
              className={styles["text-input"]}
            />
            <p data-alert="passwd" className={styles["field-alert"]}></p>
            <br />
            <input
              data-form
              type="password"
              id="re-passwd"
              name="re-passwd"
              autoComplete="off"
              placeholder="re-enter password"
              className={styles["text-input"]}
            />
            <p data-alert="re-passwd" className={styles["field-alert"]}></p>
          </form>
          <button
            className={styles["btn-submit"]}
            id="btnLogin"
            onClick={register}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}
