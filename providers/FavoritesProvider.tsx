"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";
import { getFavoriteIds, getLocalFavorites, saveFavoriteIds, saveLocalFavorites } from "../services/favorites";

type FavoritesContextValue = {
	favoriteIds: Set<string>;
	ready: boolean;
	toggleFavorite: (teacherId: string) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const { user, loading: authLoading } = useAuth();
	const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
	const [loadedUid, setLoadedUid] = useState<string | null>(null);
	const ready = !authLoading && (!user || loadedUid === user.uid);

	useEffect(() => {
		if (authLoading) return;
		let active = true;
		if (!user) {
			Promise.resolve().then(() => {
				if (active) setFavoriteIds(new Set());
			});
			return () => { active = false; };
		}

		const hydrate = async () => {
			const local = getLocalFavorites(user.uid);
			try {
				const remote = await getFavoriteIds(user.uid);
				const merged = new Set([...local, ...remote]);
				if (active) {
					setFavoriteIds(merged);
					saveLocalFavorites(user.uid, [...merged]);
				}
			} catch {
				if (active) setFavoriteIds(new Set(local));
			} finally {
				if (active) setLoadedUid(user.uid);
			}
		};
		void hydrate();

		return () => { active = false; };
	}, [authLoading, user]);

	const toggleFavorite = useCallback(async (teacherId: string) => {
		if (!user) return;
		const next = new Set(favoriteIds);
		if (next.has(teacherId)) next.delete(teacherId);
		else next.add(teacherId);
		setFavoriteIds(next);
		saveLocalFavorites(user.uid, [...next]);
		try {
			await saveFavoriteIds(user.uid, [...next]);
		} catch {
			return;
		}
	}, [favoriteIds, user]);

	return <FavoritesContext.Provider value={{ favoriteIds, ready, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
	return context;
}