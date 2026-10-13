"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { FavoritesProvider } from "./FavoritesProvider";

export default function Providers({ children }: { children: ReactNode }) {
	return <AuthProvider><FavoritesProvider>{children}</FavoritesProvider></AuthProvider>;
}