"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { logIn } from "../../../services/auth";
import styles from "./LoginForm.module.css";

const schema = yup.object({
	email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
	password: yup.string().required("Password is required"),
});

type FormValues = yup.InferType<typeof schema>;

type LoginFormProps = {
	onSuccess: () => void;
	onRegister: () => void;
};

function authMessage(error: unknown) {
	const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
	if (code.includes("invalid-credential") || code.includes("wrong-password")) return "Email or password is incorrect.";
	if (code.includes("too-many-requests")) return "Too many attempts. Please try again later.";
	return "Could not log in. Check your connection and try again.";
}

export default function LoginForm({ onSuccess, onRegister }: LoginFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: yupResolver(schema) });

	const submit = handleSubmit(async ({ email, password }) => {
		setSubmitError("");
		try {
			await logIn(email, password);
			onSuccess();
		} catch (error) {
			setSubmitError(authMessage(error));
		}
	});

	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Log In</h1>
			<p className={styles.description}>Welcome back! Please enter your credentials to access your account and continue your search for a teacher.</p>
			<form className={styles.form} onSubmit={submit} noValidate>
				<label className={styles.field}>
					<span className={styles.visuallyHidden}>Email</span>
					<input type="email" autoComplete="email" placeholder="Email" aria-invalid={!!errors.email} {...register("email")} />
					{errors.email && <span className={styles.error}>{errors.email.message}</span>}
				</label>
				<label className={styles.field}>
					<span className={styles.visuallyHidden}>Password</span>
					<input type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Password" aria-invalid={!!errors.password} {...register("password")} />
					<button className={styles.visibility} type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
						<svg aria-hidden="true"><use href={`/icons/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`} /></svg>
					</button>
					{errors.password && <span className={styles.error}>{errors.password.message}</span>}
				</label>
				{submitError && <p className={styles.submitError} role="alert">{submitError}</p>}
				<button className={styles.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Log In"}</button>
			</form>
			<p className={styles.switch}>New to LearnLingo? <button type="button" onClick={onRegister}>Create an account</button></p>
		</div>
	);
}