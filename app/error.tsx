"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>500</p>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.description}>
          An unexpected error occurred. Please try again.
        </p>
        <div className={styles.actions}>
          <button className={styles.retryButton} type="button" onClick={reset}>
            Try again
          </button>
          <Link className={styles.homeLink} href="/">
            Go to home
          </Link>
        </div>
      </div>
    </main>
  );
}
