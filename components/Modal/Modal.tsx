"use client";

import { useEffect, type ReactNode } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
	children: ReactNode;
	title: string;
	onClose: () => void;
	className?: string;
};

export default function Modal({ children, title, onClose, className }: ModalProps) {
	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return (
		<div
			className={styles.backdrop}
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<section
				className={`${styles.dialog} ${className ?? ""}`}
				role="dialog"
				aria-modal="true"
				aria-label={title}
			>
				<button className={styles.close} type="button" onClick={onClose} aria-label="Close dialog">
					<svg aria-hidden="true"><use href="/icons/sprite.svg#icon-close" /></svg>
				</button>
				{children}
			</section>
		</div>
	);
}