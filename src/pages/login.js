import styles from "../login.Module.css";

export default function Login() {
  function verifyValues() {
    /// Verifies entered email and password
    ///
    /// :returns (bool) - true if all are valid

    // TODO: Better alerts and messages
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        document.getElementById("email").textContent.trim()
      )
    ) {
      alert("Not a valid email");
      return false;
    }

    if (
      !"^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$".test(
        document.getElementById("passwd").textContent.trim()
      )
    ) {
      alert("Password does not contain enough characters");
      return false;
    }

    return true;
  }

  function login() {
    /// Triggered on login button click

    if (!verifyValues()) return;
    var formData = new FormData();

    formData.set("email", document.getElementById("email").textContent.trim());
    formData.set(
      "passwd",
      document.getElementById("passwd").textContent.trim()
    );

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = async () => {
      if (ajax.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(ajax.responseText);
        // TODO: Get a success or a faliure from the server and react accordingly

        window.location.replace(`/`);
      }
    };

    ajax.open("POST", "/api/login");
    ajax.send(formData);
  }

  return (
    <div className={styles["login-page"]}>
      <div className={styles["main-wrapper"]}>
        <h1 className={styles["title"]}>Login</h1>
        <form>
          <input
            type="text"
            id="email"
            name="email"
            className={styles["text-input"]}
          />
          <input
            type="password"
            id="passwd"
            name="passwd"
            autoComplete="off"
            placeholder="password"
            className={styles["text-input"]}
          />
        </form>
        <button className={styles["btn-submit"]} id="btnLogin" onClick={login}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
