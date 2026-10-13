import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	type User,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";

export function subscribeToAuthChanges(onChange: (user: User | null) => void) {
	return onAuthStateChanged(auth, onChange);
}

export async function logIn(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}

export async function registerUser(name: string, email: string, password: string) {
	const credential = await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(credential.user, { displayName: name });

	let profileSynced = true;
	try {
		await set(ref(db, `users/${credential.user.uid}/profile`), { name, email });
	} catch {
		profileSynced = false;
	}

	return { user: credential.user, profileSynced };
}

export async function logOut() {
	return signOut(auth);
}
