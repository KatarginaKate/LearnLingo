"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../providers/AuthProvider";
import { useFavorites } from "../../providers/FavoritesProvider";
import type { Teacher } from "../../types/teacher";
import BookingModal from "../BookingModal/BookingModal";
import styles from "./TeacherCard.module.css";

function Icon({ name, className = "" }: { name: string; className?: string }) {
	return <svg className={className} aria-hidden="true"><use href={`/icons/sprite.svg#icon-${name}`} /></svg>;
}

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
	const [expanded, setExpanded] = useState(false);
	const [bookingOpen, setBookingOpen] = useState(false);
	const [avatarFailed, setAvatarFailed] = useState(false);
	const { user, openAuthDialog } = useAuth();
	const { favoriteIds, toggleFavorite } = useFavorites();
	const isFavorite = favoriteIds.has(teacher.id);
	const reviewCount = teacher.reviews?.length ?? 0;

	const handleFavorite = () => {
		if (!user) {
			openAuthDialog("login", "Sign in to save teachers to your favorites.");
			return;
		}
		void toggleFavorite(teacher.id);
	};

	return (
		<article className={`${styles.card} ${expanded ? styles.cardExpanded : ""}`}>
			<div className={styles.cardLayout}>
				<aside className={styles.photoColumn} aria-label={`${teacher.name} ${teacher.surname}`}>
				<div className={styles.avatarWrap}>
					<span className={styles.avatarFallback} aria-hidden="true">
						{teacher.name[0]}{teacher.surname[0]}
					</span>
					{!avatarFailed ? (
						<Image className={styles.avatar} src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} width={96} height={96} unoptimized onError={() => setAvatarFailed(true)} />
					) : null}
					<span className={styles.online} aria-label="Online">
						<Icon name="avatar" />
					</span>
				</div>
				</aside>
				<div className={styles.cardContent}>
					<div className={styles.cardHeader}>
						<div className={styles.teacherName}>
							<span className={styles.eyebrow}>Languages</span>
							<h2>{teacher.name} {teacher.surname}</h2>
						</div>
						<div className={styles.metrics}>
							<span><Icon name="book-open" /> Lessons online</span>
							<span>Lessons done: <strong>{teacher.lessons_done}</strong></span>
							<span><Icon name="star" className={styles.star} /> Rating: <strong>{teacher.rating.toFixed(1)}</strong> ({reviewCount})</span>
							<span>Price / 1 hour: <strong className={styles.price}>${teacher.price_per_hour}</strong></span>
						</div>
						<button className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ""}`} type="button" onClick={handleFavorite} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} aria-pressed={isFavorite}>
							<Icon name="heart" />
						</button>
					</div>

				<div className={styles.details}>
				<p className={styles.detailLine}><span>Speaks:</span> {teacher.languages.map((language, index) => <span key={language}>{index > 0 && ", "}{language}</span>)}</p>
				<p className={styles.detailLine}><span>Lesson Info:</span> {teacher.lesson_info}</p>
				<p className={styles.detailLine}><span>Conditions:</span> {teacher.conditions.join(". ")}</p>
				{expanded && (
					<div className={styles.expanded}>
						<p>{teacher.experience}</p>
						{(teacher.reviews ?? []).map((review, index) => {
							const reviewer = review.reviewer?.trim() || "Student";
							return (
							<blockquote className={styles.review} key={`${reviewer}-${index}`}>
								<div className={styles.reviewTop}>
									<div className={styles.reviewerAvatar}>{reviewer.slice(0, 1)}</div>
									<div className={styles.reviewHeader}>
										<strong>{reviewer}</strong>
										<span><Icon name="star" className={styles.star} /> 5.0</span>
									</div>
								</div>
								<p>{review.comment ?? ""}</p>
							</blockquote>
							);
						})}
					</div>
				)}
				<button className={styles.readMore} type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
					{expanded ? "Read less" : "Read more"}
				</button>
				</div>

				<div className={styles.cardFooter}>
				<div className={styles.levels} aria-label="Teaching levels">
					{teacher.levels.map((level, index) => <span className={index === 0 ? styles.levelActive : ""} key={level}>#{level}</span>)}
				</div>
				{expanded && <button className={styles.bookButton} type="button" onClick={() => setBookingOpen(true)}>Book trial lesson</button>}
				</div>
			</div>
			</div>
			{bookingOpen && <BookingModal teacher={teacher} onClose={() => setBookingOpen(false)} />}
		</article>
	);
}
