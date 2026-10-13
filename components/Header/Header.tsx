import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<Link className={styles.brand} href="/" aria-label="LearnLingo home">
				<span className={styles.brandMark} aria-hidden="true" />
				<span>LearnLingo</span>
			</Link>
			<nav className={styles.navigation} aria-label="Main navigation">
				<a href="#home">Home</a>
				<a href="#teachers">Teachers</a>
			</nav>
			<div className={styles.account}>
				<a className={styles.login} href="#login">
					<svg className={styles.loginIcon} aria-hidden="true">
						<use href="/icons/sprite.svg#icon-log-in" />
					</svg>
					<span>Log in</span>
				</a>
				<a className={styles.registration} href="#registration">Registration</a>
			</div>
		</header>
	);
}
