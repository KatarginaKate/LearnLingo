"use client";

import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import styles from "./page.module.css";

export default function LoginPage() {
	const navigate = useNavigate();

	return (
		<main className={styles.page}>
			<LoginForm
				onSuccess={() => navigate("/", { replace: true })}
				onRegister={() => navigate("/register")}
			/>
		</main>
	);
}
