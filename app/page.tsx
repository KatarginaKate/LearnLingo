import Hero from "../components/Hero/Hero";
import styles from "./page.module.css";

export const instant = false;

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <section className={styles.statistics} aria-label="LearnLingo in numbers">
          <div className={styles.statistic}>
            <strong>32,000 +</strong>
            <span>Experienced<br />tutors</span>
          </div>
          <div className={styles.statistic}>
            <strong>300,000 +</strong>
            <span>5-star tutor<br />reviews</span>
          </div>
          <div className={styles.statistic}>
            <strong>120 +</strong>
            <span>Subjects<br />taught</span>
          </div>
          <div className={styles.statistic}>
            <strong>200 +</strong>
            <span>Tutor<br />nationalities</span>
          </div>
        </section>
      </main>
    </div>
  );
}
