import styles from "../../styles/auth.module.css";
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";

export default function Login() {
  function login() {
    var formData = new FormData();

    formData.set("email", document.getElementById("email").value.trim());
    formData.set("password", document.getElementById("password").value);

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = async () => {
      if (ajax.readyState == XMLHttpRequest.DONE) {
        if (ajax.responseType == "") {
          return;
        }
        // TODO: Get a success or a failure from the server and react accordingly
        // If it is a success make sure all cookies are correctly set and redirect to home page

        var response = JSON.parse(ajax.responseText);
        console.log(response);
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
    <>
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
              id="password"
              name="password"
              autoComplete="off"
              placeholder="password"
              className={styles["text-input"]}
            />
            <p data-alert="password" className={styles["field-alert"]}></p>
          </form>
          <button
            className={styles["btn-submit"]}
            id="btnLogin"
            onClick={login}
          >
            LOGIN
          </button>
          <Link className="other-method" href="/auth/register">
            register
          </Link>
        </div>
      </div>
    </>
  );
}
