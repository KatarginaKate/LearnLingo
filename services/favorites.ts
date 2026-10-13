import { get, ref, set } from "firebase/database";
import { db } from "../firebase";

function storageKey(uid: string) {
	return `learnlingo:favorites:${uid}`;
}

export function getLocalFavorites(uid: string): string[] {
	try {
		const value: unknown = JSON.parse(localStorage.getItem(storageKey(uid)) ?? "[]");
		return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
	} catch {
		return [];
	}
}

export function saveLocalFavorites(uid: string, ids: string[]) {
	localStorage.setItem(storageKey(uid), JSON.stringify(ids));
}

export async function getFavoriteIds(uid: string): Promise<string[]> {
	const snapshot = await get(ref(db, `users/${uid}/favorites`));
	return snapshot.exists() ? Object.keys(snapshot.val() as Record<string, unknown>) : [];
}

export async function saveFavoriteIds(uid: string, ids: string[]) {
	const favorites = Object.fromEntries(ids.map((id) => [id, true]));
	await set(ref(db, `users/${uid}/favorites`), favorites);
}
