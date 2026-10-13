import { db } from "../firebase";
import { ref, get } from "firebase/database";

export async function getTeachers() {
  const teachersRef = ref(db, "teachers");
  const snapshot = await get(teachersRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(typeof teacher === "object" && teacher !== null ? teacher : {})
  }));
}
