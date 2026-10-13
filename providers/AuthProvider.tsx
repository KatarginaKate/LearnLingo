"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import { subscribeToAuthChanges } from "../services/auth";
import AuthDialog from "../components/Auth/AuthDialog";

export type AuthMode = "login" | "register";

type AuthContextValue = {
	user: User | null;
	loading: boolean;
	openAuthDialog: (mode: AuthMode, notice?: string) => void;
	closeAuthDialog: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [dialogMode, setDialogMode] = useState<AuthMode | null>(null);
	const [notice, setNotice] = useState("");

	useEffect(() => subscribeToAuthChanges((nextUser) => {
		setUser(nextUser);
		setLoading(false);
	}), []);

	const openAuthDialog = useCallback((mode: AuthMode, message = "") => {
		setNotice(message);
		setDialogMode(mode);
	}, []);
	const closeAuthDialog = useCallback(() => setDialogMode(null), []);

	return (
		<AuthContext.Provider value={{ user, loading, openAuthDialog, closeAuthDialog }}>
			{children}
			{dialogMode && (
				<AuthDialog mode={dialogMode} notice={notice} onModeChange={openAuthDialog} onClose={closeAuthDialog} />
			)}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}