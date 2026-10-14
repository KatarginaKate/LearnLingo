"use client";

import { Link } from "react-router-dom";
import TeacherDirectory from "../../components/TeacherDirectory/TeacherDirectory";
import { useAuth } from "../../providers/AuthProvider";

export default function FavoritesPage() {
	const { user, loading, openAuthDialog } = useAuth();

	if (loading) return <main className="route-main"><p>Loading your account...</p></main>;
	if (!user) {
		return (
			<main className="route-main private-state">
				<h1>Favorites are for signed-in learners</h1>
				<p>Log in to save teachers and find them here later.</p>
				<button type="button" onClick={() => openAuthDialog("login", "Sign in to access your favorites.")}>Log in</button>
				<Link to="/teachers">Browse teachers</Link>
			</main>
		);
	}

	return <main className="route-main"><TeacherDirectory favoritesOnly /></main>;
}
