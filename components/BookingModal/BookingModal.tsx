"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Teacher } from "../../types/teacher";
import Modal from "../Modal/Modal";
import styles from "./BookingModal.module.css";

const schema = yup.object({
	name: yup.string().trim().min(2, "Enter your name").required("Name is required"),
	email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
	phone: yup.string().trim().min(7, "Enter a valid phone number").required("Phone number is required"),
	goal: yup.string().required("Choose a lesson goal"),
});

type FormValues = yup.InferType<typeof schema>;

export default function BookingModal({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
	const [submitted, setSubmitted] = useState(false);
	const [avatarFailed, setAvatarFailed] = useState(false);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: { goal: "" },
	});

	const submit = handleSubmit(async () => {
		setSubmitted(true);
	});

	return (
		<Modal title="Book a trial lesson" onClose={onClose} className={styles.modal}>
			{submitted ? (
				<div className={styles.success}>
					<h2>Request received</h2>
					<p>We will contact you to arrange a trial lesson with {teacher.name}.</p>
					<button className={styles.submit} type="button" onClick={onClose}>Done</button>
				</div>
			) : (
				<>
					<h2 className={styles.title}>Book trial lesson</h2>
					<p className={styles.description}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>
					<div className={styles.teacher}>
						<div className={styles.teacherAvatar}>
							{!avatarFailed && teacher.avatar_url ? (
								<Image src={teacher.avatar_url} alt="" width={44} height={44} unoptimized onError={() => setAvatarFailed(true)} />
							) : <span>{teacher.name[0]}{teacher.surname[0]}</span>}
						</div>
						<div><span>Your teacher</span><strong>{teacher.name} {teacher.surname}</strong></div>
					</div>
					<form className={styles.form} onSubmit={submit} noValidate>
						<fieldset className={styles.goals}>
							<legend>What is your main reason for learning English?</legend>
							{[
								["career", "Career and business"],
								["kids", "Lesson for kids"],
								["abroad", "Living abroad"],
								["exams", "Exams and coursework"],
								["culture", "Culture, travel or hobby"],
							].map(([value, label]) => (
								<label className={styles.goal} key={value}>
									<input type="radio" value={value} {...register("goal")} />
									<span>{label}</span>
								</label>
							))}
							{errors.goal && <small className={styles.goalError}>{errors.goal.message}</small>}
						</fieldset>
						<label className={styles.field}>
							<span className={styles.visuallyHidden}>Full name</span>
							<input autoComplete="name" placeholder="Full Name" aria-invalid={!!errors.name} {...register("name")} />
							{errors.name && <small>{errors.name.message}</small>}
						</label>
						<label className={styles.field}>
							<span className={styles.visuallyHidden}>Email</span>
							<input type="email" autoComplete="email" placeholder="Email" aria-invalid={!!errors.email} {...register("email")} />
							{errors.email && <small>{errors.email.message}</small>}
						</label>
						<label className={styles.field}>
							<span className={styles.visuallyHidden}>Phone number</span>
							<input type="tel" autoComplete="tel" placeholder="Phone number" aria-invalid={!!errors.phone} {...register("phone")} />
							{errors.phone && <small>{errors.phone.message}</small>}
						</label>
						<button className={styles.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? "Booking..." : "Book"}</button>
					</form>
				</>
			)}
		</Modal>
	);
}
