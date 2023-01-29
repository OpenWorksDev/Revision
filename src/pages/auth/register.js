import styles from "../../styles/auth.module.css";
import {
  passwd_check,
  email_check,
  uname_check,
} from "../../components/api/auth/validators";
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import router from "next/router";
export default function Register() {
  function inlineAlert(field, alert) {
    alert = "* " + alert;
    var a = document.querySelector(`[data-alert="${field}"]`);
    if (a.dataset.current_alert == alert) return;
    if (a.dataset.current_alert == "null" || !a.dataset.current_alert)
      a.style.opacity = 100;
    a.innerHTML = alert;

    a.previousSibling.style.border = "solid #ff005a 1px";
    a.dataset.current_alert = alert;
  }
  function inlineClear(field) {
    var a = document.querySelector(`[data-alert="${field}"]`);
    a.style.opacity = 0;
    a.previousElementSibling.style.border = "none";
    a.dataset.current_alert = "null";
  }
  function verifyEmail() {
    var email_valid = email_check(
      document.getElementById("email").value.trim()
    );
    if (!email_valid) {
      inlineAlert("email", "Please enter a valid email", verifyEmail);
      return false;
    }
    inlineClear("email");
    return true;
  }
  function verifyUsername(onButtonPress) {
    var uname_valid = uname_check(
      document.getElementById("username").value,
      onButtonPress
    );
    if (uname_valid != undefined) {
      inlineAlert("username", uname_valid, verifyUsername);
      return false;
    }
    inlineClear("username");
    return true;
  }
  function verifyPassword(onButtonPress) {
    var passwd_valid = passwd_check(
      document.getElementById("passwd").value,
      onButtonPress
    );
    if (passwd_valid !== undefined) {
      inlineAlert("passwd", passwd_valid, verifyPassword);
      return false;
    }
    inlineClear("passwd");
    return true;
  }
  function verifyRePassword() {
    if (
      !(
        document.getElementById("passwd").value ==
        document.getElementById("re-passwd").value
      )
    ) {
      inlineAlert("re-passwd", "Passwords do not match", verifyRePassword);
      return false;
    }
    inlineClear("re-passwd");
    return true;
  }
  function verifyValues(onButtonPress) {
    /**
     * Verifies entered email and password
     * @returns boolean True if all are valid
     */
    let valid = true;
    if (!verifyEmail()) valid = false;
    if (!verifyUsername(onButtonPress)) valid = false;
    if (!verifyPassword(onButtonPress)) valid = false;
    if (!verifyRePassword()) valid = false;
    return valid;
  }

  function register() {
    if (!verifyValues(true)) return;
    /// Triggered on login button click

    var formData = new FormData();

    formData.set("email", document.getElementById("email").value.trim());
    formData.set("username", document.getElementById("username").value.trim());
    formData.set("passwd", document.getElementById("passwd").value);

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
          var response = JSON.parse(ajax.responseText);
          if (response.msg == "success") router.replace(`/auth/login#verify`);
          if (response.msg == "exists") {
            inlineAlert(
              response.reason[0],
              `This ${response.reason[0]} is already in use`
            );
            if (response.reason[1] != undefined)
              inlineAlert(
                response.reason[1],
                `This ${response.reason[1]} is already in use`
              );
          }
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
    const emailForm = document.getElementById("email");
    emailForm.addEventListener("focusout", (event) => {
      if (emailForm.value == "") return inlineClear("email");

      verifyEmail();
    });
    document.addEventListener("input", (event) => {
      let n = event.target.name;
      let f = document.getElementById(n);
      if (f.value == "") return inlineClear(n);
      if (n == "username") verifyUsername();
      if (n == "passwd") verifyPassword();
      if (n == "re-passwd") verifyRePassword();
    });
  });

  return (
    <>
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
              id="username"
              name="username"
              autoComplete="off"
              placeholder="username"
              className={styles["text-input"]}
            />
            <p data-alert="username" className={styles["field-alert"]}></p>
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
          <Link className="other-method" href="/auth/login">
            login
          </Link>
        </div>
      </div>
    </>
  );
}
