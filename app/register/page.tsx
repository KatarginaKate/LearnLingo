"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";
import styles from "./page.module.css";

export default function RegisterPage() {
	const router = useRouter();

	return (
		<main className={styles.page}>
			<RegisterForm
				onSuccess={() => router.replace("/")}
				onLogin={() => router.push("/login")}
			/>
		</main>
	);
}
