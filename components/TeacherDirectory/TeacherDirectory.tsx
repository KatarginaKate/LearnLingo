"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import teacherFixture from "../../data/teachers.json";
import { useFavorites } from "../../providers/FavoritesProvider";
import { getTeacherPage } from "../../services/teachers";
import type { Teacher } from "../../types/teacher";
import Filters from "../Filters/Filters";
import TeacherCard from "../TeacherCard/TeacherCard";
import styles from "./TeacherDirectory.module.css";

const PAGE_SIZE = 4;
const fallbackTeachers = teacherFixture as Teacher[];

type TeacherDirectoryProps = {
	favoritesOnly?: boolean;
};

export default function TeacherDirectory({ favoritesOnly = false }: TeacherDirectoryProps) {
	const { favoriteIds, ready: favoritesReady } = useFavorites();
	const [teachers, setTeachers] = useState<Teacher[]>(favoritesOnly ? fallbackTeachers : fallbackTeachers.slice(0, PAGE_SIZE));
	const [cursor, setCursor] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(true);
	const [usingFallback, setUsingFallback] = useState(false);
	const [fallbackOffset, setFallbackOffset] = useState(PAGE_SIZE);
	const [sourceReady, setSourceReady] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState("");
	const [language, setLanguage] = useState("all");
	const [level, setLevel] = useState("all");
	const [maxPrice, setMaxPrice] = useState("all");

	useEffect(() => {
		let active = true;
		const load = async () => {
			try {
				const page = await getTeacherPage(favoritesOnly ? 100 : PAGE_SIZE);
				if (!active) return;
				if (page.items.length) {
					setTeachers(page.items);
					setCursor(page.cursor);
					setHasMore(favoritesOnly ? false : page.hasMore);
					setUsingFallback(false);
					setError("");
				} else {
					setUsingFallback(true);
					setHasMore(favoritesOnly ? false : fallbackTeachers.length > PAGE_SIZE);
					setError("Showing sample teachers. Connect the Firebase database to load live records.");
				}
			} catch {
				if (!active) return;
				setUsingFallback(true);
				setFallbackOffset(PAGE_SIZE);
				setHasMore(favoritesOnly ? false : fallbackTeachers.length > PAGE_SIZE);
				setError("Showing sample teachers. Connect the Firebase database to load live records.");
			} finally {
				if (active) setSourceReady(true);
			}
		};
		void load();
		return () => { active = false; };
	}, [favoritesOnly]);

	const availableLanguages = useMemo(() => [...new Set(teachers.flatMap((teacher) => teacher.languages))].sort(), [teachers]);
	const availableLevels = useMemo(() => [...new Set(teachers.flatMap((teacher) => teacher.levels))].sort(), [teachers]);
	const visibleTeachers = useMemo(() => teachers.filter((teacher) => {
		if (favoritesOnly && !favoriteIds.has(teacher.id)) return false;
		if (language !== "all" && !teacher.languages.includes(language)) return false;
		if (level !== "all" && !teacher.levels.includes(level)) return false;
		if (maxPrice !== "all" && teacher.price_per_hour > Number(maxPrice)) return false;
		return true;
	}), [favoriteIds, favoritesOnly, language, level, maxPrice, teachers]);

	const loadMore = async () => {
		setLoadingMore(true);
		try {
			if (usingFallback) {
				const next = fallbackTeachers.slice(fallbackOffset, fallbackOffset + PAGE_SIZE);
				setTeachers((current) => [...current, ...next]);
				setFallbackOffset((current) => current + next.length);
				setHasMore(fallbackOffset + PAGE_SIZE < fallbackTeachers.length);
				return;
			}
			const page = await getTeacherPage(PAGE_SIZE, cursor);
			setTeachers((current) => [...current, ...page.items]);
			setCursor(page.cursor);
			setHasMore(page.hasMore);
		} catch {
			setUsingFallback(true);
			const next = fallbackTeachers.filter((teacher) => !teachers.some((loaded) => loaded.id === teacher.id)).slice(0, PAGE_SIZE);
			setTeachers((current) => [...current, ...next]);
			setHasMore(false);
			setError("Database access is unavailable. Remaining sample teachers are shown instead.");
		} finally {
			setLoadingMore(false);
		}
	};

	if (favoritesOnly && !favoritesReady) {
		return <div className={styles.state} role="status">Loading teachers...</div>;
	}

	return (
		<section className={styles.directory}>
			<div className={styles.heading}>
				<div>
					<p className={styles.eyebrow}>{favoritesOnly ? "YOUR COLLECTION" : "LEARN WITH THE RIGHT TEACHER"}</p>
					<h1>{favoritesOnly ? "Favorite teachers" : "Find your language teacher"}</h1>
				</div>
					{favoritesOnly && <Link className={styles.backLink} to="/teachers">Browse teachers</Link>}
			</div>
			{!favoritesOnly && (
				<Filters
					languages={availableLanguages}
					levels={availableLevels}
					language={language}
					level={level}
					maxPrice={maxPrice}
					onLanguageChange={setLanguage}
					onLevelChange={setLevel}
					onMaxPriceChange={setMaxPrice}
				/>
			)}
			{error && <p className={styles.notice} role="status">{error}</p>}
			{visibleTeachers.length ? (
				<div className={styles.list}>{visibleTeachers.map((teacher) => <TeacherCard teacher={teacher} key={teacher.id} />)}</div>
			) : (
				<div className={styles.empty}>
					<p>{favoritesOnly ? "No favorite teachers yet." : "No teachers match these filters."}</p>
					{favoritesOnly && <Link to="/teachers">Explore teachers</Link>}
				</div>
			)}
			{!favoritesOnly && hasMore && <button className={styles.loadMore} type="button" onClick={loadMore} disabled={loadingMore || !sourceReady}>{loadingMore ? "Loading..." : "Load more"}</button>}
		</section>
	);
}