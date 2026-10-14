"use client";

import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";
import styles from "./page.module.css";

export default function RegisterPage() {
	const navigate = useNavigate();

	return (
		<main className={styles.page}>
			<RegisterForm
				onSuccess={() => navigate("/", { replace: true })}
				onLogin={() => navigate("/login")}
			/>
		</main>
	);
}
