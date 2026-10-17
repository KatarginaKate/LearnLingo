"use client";

import { useSyncExternalStore } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import FavoritesPage from "../app/favorites/page";
import HomePage from "../app/page";
import LoginPage from "../app/login/page";
import RegisterPage from "../app/register/page";
import TeachersPage from "../app/teachers/page";
import Header from "./Header/Header";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function AppRoutes() {
	return (
		<>
			<Header />
			<div className="route-content">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/teachers" element={<TeachersPage />} />
					<Route path="/favorites" element={<FavoritesPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/booking" element={<Navigate to="/teachers" replace />} />
					<Route path="*" element={
						<main className="route-main private-state">
							<h1>Page not found</h1>
							<Link to="/">Go home</Link>
						</main>
					} />
				</Routes>
			</div>
		</>
	);
}

export default function AppRouter() {
	const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
	if (!mounted) return null;

	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}