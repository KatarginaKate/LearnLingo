import { get, limitToFirst, orderByKey, query, ref, startAfter } from "firebase/database";
import { db } from "../firebase";
import type { Teacher } from "../types/teacher";

export type TeacherPage = {
  items: Teacher[];
  cursor: string | null;
  hasMore: boolean;
};

function normalizeTeacher(id: string, value: unknown): Teacher | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Omit<Teacher, "id">;
  if (!data.name || !data.surname) return null;
  const rawReviews = Array.isArray(data.reviews)
    ? data.reviews
    : data.reviews && typeof data.reviews === "object"
      ? Object.values(data.reviews)
      : [];
  const reviews = rawReviews.flatMap((value) => {
    if (!value || typeof value !== "object") return [];
    const review = value as Record<string, unknown>;
    const reviewer = [review.reviewer, review.name, review.author].find(
      (candidate): candidate is string => typeof candidate === "string" && candidate.trim().length > 0,
    );
    const comment = [review.comment, review.text].find(
      (candidate): candidate is string => typeof candidate === "string",
    );
    return [{ reviewer: reviewer?.trim() ?? "Student", comment: comment ?? "" }];
  });
  return { ...data, id, reviews };
}

export async function getTeacherPage(pageSize = 4, cursor?: string | null): Promise<TeacherPage> {
  const constraints = [orderByKey()];
  if (cursor) constraints.push(startAfter(cursor));
  constraints.push(limitToFirst(pageSize + 1));
  const snapshot = await get(query(ref(db, "teachers"), ...constraints));
  const entries = snapshot.exists() ? Object.entries(snapshot.val() as Record<string, unknown>) : [];
  const hasMore = entries.length > pageSize;
  const items = entries.slice(0, pageSize).flatMap(([id, value]) => {
    const teacher = normalizeTeacher(id, value);
    return teacher ? [teacher] : [];
  });
  return { items, cursor: items.at(-1)?.id ?? cursor ?? null, hasMore };
}
