import styles from "../styles/layout.module.css";

import Image from "next/image";
import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className={styles["main-header"]}>
        <div className={styles["header-image"]}>
          <Image alt="fav" src="/favicon.ico" height="40px" width="40px" />
        </div>
        <div className={styles["header-item"]}>
          <Link href="/home">Home</Link>
        </div>
        <div className={styles["header-item"]}>
          <Link href="/library">Library</Link>
        </div>
        <div className={styles.spacer} /> {/* Spacer */}
        <div className={styles["header-item"]}>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>

      {children}

      <div className={styles["layout-footer"]}>
        <div>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
