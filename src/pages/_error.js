import styles from "../styles/404.module.css";

import MainLayout from "../components/layout";

import Head from "next/head";
import Link from "next/link";

/// Component to be placed whenever a url page is not found
export default function Error404() {
  return (
    <MainLayout>
      <Head>
        <title>Page not found</title>
      </Head>
      <div className={styles["notfound-wrapper"]}>
        <div className={styles["notfound"]}>
          <div className={styles["notfound-404"]}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link href="/">Click to go home</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

