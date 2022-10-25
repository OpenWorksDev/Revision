import "../styles/globals.css";
let db = require("../middleware/db");
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
