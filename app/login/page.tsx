"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import styles from "./page.module.css";

export default function LoginPage() {
	const router = useRouter();

	return (
		<main className={styles.page}>
			<LoginForm
				onSuccess={() => router.replace("/")}
				onRegister={() => router.push("/register")}
			/>
		</main>
	);
}
