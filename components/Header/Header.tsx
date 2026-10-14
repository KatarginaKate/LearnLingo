"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";
import { logOut } from "../../services/auth";
import styles from "./Header.module.css";

export default function Header() {
	const { user, openAuthDialog } = useAuth();
	const pathname = usePathname();

	return (
		<header className={styles.header}>
			<Link className={styles.brand} href="/" aria-label="LearnLingo home">
				<span className={styles.brandMark} aria-hidden="true" />
				<span>LearnLingo</span>
			</Link>
			<nav className={styles.navigation} aria-label="Main navigation">
				<Link href="/" className={pathname === "/" ? styles.active : undefined} aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
				<Link href="/teachers" className={pathname === "/teachers" ? styles.active : undefined} aria-current={pathname === "/teachers" ? "page" : undefined}>Teachers</Link>
				{user && <Link href="/favorites" className={pathname === "/favorites" ? styles.active : undefined} aria-current={pathname === "/favorites" ? "page" : undefined}>Favorites</Link>}
			</nav>
			<div className={styles.account}>
				{user ? (
					<button className={`${styles.login} ${styles.logout}`} type="button" onClick={() => void logOut()}>
						<span>{user.displayName ?? "Account"}</span>
						<span>Log out</span>
					</button>
				) : <>
				<a className={styles.login} href="#login" onClick={(event) => { event.preventDefault(); openAuthDialog("login"); }}>
					<svg className={styles.loginIcon} aria-hidden="true">
						<use href="/icons/sprite.svg#icon-log-in" />
					</svg>
					<span>Log in</span>
				</a>
				<button className={styles.registration} type="button" onClick={() => openAuthDialog("register")}>Registration</button>
				</>}
			</div>
		</header>
	);
}
