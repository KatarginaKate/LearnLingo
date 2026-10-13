import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero} id="home" aria-labelledby="hero-title">
			<div className={styles.copy}>
				<h1 id="hero-title">
					Unlock your potential with the best <em>language</em> tutors
				</h1>
				<p>
					Embark on an Exciting Language Journey with Expert Language Tutors:
					Elevate your language proficiency to new heights by connecting with
					highly qualified and experienced tutors.
				</p>
				<a className={styles.callToAction} href="#teachers">Get started</a>
			</div>
			<div className={styles.visual}>
				<Image
					src="/images/hero.webp"
					alt="A cheerful language learner studying at a laptop"
					fill
					priority
					sizes="(max-width: 700px) 100vw, 42vw"
					className={styles.image}
				/>
			</div>
		</section>
	);
}
