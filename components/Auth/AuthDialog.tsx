"use client";

import Modal from "../Modal/Modal";
import type { AuthMode } from "../../providers/AuthProvider";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import styles from "./AuthDialog.module.css";

type AuthDialogProps = {
	mode: AuthMode;
	notice: string;
	onModeChange: (mode: AuthMode) => void;
	onClose: () => void;
};

export default function AuthDialog({ mode, notice, onModeChange, onClose }: AuthDialogProps) {
	return (
		<Modal title={mode === "login" ? "Log in" : "Registration"} onClose={onClose} className={styles.modal}>
			{notice && <p className={styles.notice}>{notice}</p>}
			{mode === "login" ? (
				<LoginForm onSuccess={onClose} onRegister={() => onModeChange("register")} />
			) : (
				<RegisterForm onSuccess={onClose} onLogin={() => onModeChange("login")} />
			)}
		</Modal>
	);
}