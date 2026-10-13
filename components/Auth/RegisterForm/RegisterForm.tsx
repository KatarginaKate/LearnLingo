"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../../services/auth";
import styles from "./RegisterForm.module.css";

const schema = yup.object({
	name: yup.string().trim().min(2, "Name must contain at least 2 characters").required("Name is required"),
	email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
	password: yup.string().min(6, "Password must contain at least 6 characters").required("Password is required"),
});

type FormValues = yup.InferType<typeof schema>;

type RegisterFormProps = {
	onSuccess: () => void;
	onLogin: () => void;
};

function authMessage(error: unknown) {
	const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
	if (code.includes("email-already-in-use")) return "An account with this email already exists.";
	if (code.includes("weak-password")) return "Choose a stronger password.";
	if (code.includes("operation-not-allowed")) return "Email/password sign-up is not enabled in Firebase yet.";
	return "Could not create your account. Check your connection and try again.";
}

export default function RegisterForm({ onSuccess, onLogin }: RegisterFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: yupResolver(schema) });

	const submit = handleSubmit(async ({ name, email, password }) => {
		setSubmitError("");
		try {
			const result = await registerUser(name, email, password);
			if (!result.profileSynced) {
				setSubmitError("Account created. Profile sync is unavailable until Firebase database rules are configured.");
			}
			onSuccess();
		} catch (error) {
			setSubmitError(authMessage(error));
		}
	});

	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Registration</h1>
			<p className={styles.description}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
			<form className={styles.form} onSubmit={submit} noValidate>
				<label className={styles.field}>
					<span className={styles.visuallyHidden}>Name</span>
					<input type="text" autoComplete="name" placeholder="Name" aria-invalid={!!errors.name} {...register("name")} />
					{errors.name && <span className={styles.error}>{errors.name.message}</span>}
				</label>
				<label className={styles.field}>
					<span className={styles.visuallyHidden}>Email</span>
					<input type="email" autoComplete="email" placeholder="Email" aria-invalid={!!errors.email} {...register("email")} />
					{errors.email && <span className={styles.error}>{errors.email.message}</span>}
				</label>
				<label className={styles.field}>
					<span className={styles.visuallyHidden}>Password</span>
					<input type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Password" aria-invalid={!!errors.password} {...register("password")} />
					<button className={styles.visibility} type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
						<svg aria-hidden="true"><use href={`/icons/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`} /></svg>
					</button>
					{errors.password && <span className={styles.error}>{errors.password.message}</span>}
				</label>
				{submitError && <p className={styles.submitError} role="alert">{submitError}</p>}
				<button className={styles.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Sign Up"}</button>
			</form>
			<p className={styles.switch}>Already have an account? <button type="button" onClick={onLogin}>Log in</button></p>
		</div>
	);
}