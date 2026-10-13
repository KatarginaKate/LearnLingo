import { readFile } from "node:fs/promises";

const apiKey = process.env.FIREBASE_API_KEY;
const databaseUrl = process.env.FIREBASE_DATABASE_URL;
const email = process.env.FIREBASE_SEED_EMAIL;
const password = process.env.FIREBASE_SEED_PASSWORD;

if (!apiKey || !databaseUrl || !email || !password) {
	throw new Error("Set FIREBASE_API_KEY, FIREBASE_DATABASE_URL, FIREBASE_SEED_EMAIL, and FIREBASE_SEED_PASSWORD.");
}

const loginResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ email, password, returnSecureToken: true }),
});

if (!loginResponse.ok) throw new Error(`Firebase sign-in failed: ${await loginResponse.text()}`);
const { idToken } = await loginResponse.json();
const teacherList = JSON.parse(await readFile(new URL("../data/teachers.json", import.meta.url), "utf8"));
const teachers = Object.fromEntries(teacherList.map(({ id, ...teacher }) => [id, teacher]));
const databaseResponse = await fetch(`${databaseUrl.replace(/\/$/, "")}/teachers.json?auth=${idToken}`, {
	method: "PUT",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(teachers),
});

if (!databaseResponse.ok) throw new Error(`Teacher import failed: ${await databaseResponse.text()}`);
console.log(`Imported ${teacherList.length} teachers to Realtime Database.`);