"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Filters.module.css";

type FiltersProps = {
	languages: string[];
	levels: string[];
	language: string;
	level: string;
	maxPrice: string;
	onLanguageChange: (value: string) => void;
	onLevelChange: (value: string) => void;
	onMaxPriceChange: (value: string) => void;
};

type FilterOption = { value: string; label: string };

type FilterDropdownProps = {
	label: string;
	value: string;
	options: FilterOption[];
	onChange: (value: string) => void;
};

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const controlRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const listId = useId();
	const selectedOption = options.find((option) => option.value === value);
	const orderedOptions = [
		...options.filter((option) => option.value === value),
		...options.filter((option) => option.value !== value),
	];

	useEffect(() => {
		if (!open) return;
		const handleOutsidePointer = (event: PointerEvent) => {
			if (!controlRef.current?.contains(event.target as Node)) setOpen(false);
		};
		document.addEventListener("pointerdown", handleOutsidePointer);
		return () => document.removeEventListener("pointerdown", handleOutsidePointer);
	}, [open]);

	useEffect(() => {
		if (open) optionRefs.current[activeIndex]?.focus();
	}, [activeIndex, open]);

	const openList = () => {
		setActiveIndex(0);
		setOpen(true);
	};

	const chooseOption = (optionValue: string) => {
		onChange(optionValue);
		setOpen(false);
		triggerRef.current?.focus();
	};

	return (
		<div className={`${styles.dropdownControl} ${open ? styles.dropdownControlOpen : ""}`} ref={controlRef}>
			<button
				className={styles.dropdownTrigger}
				type="button"
				aria-label={`${label}: ${selectedOption?.label ?? ""}`}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				ref={triggerRef}
				onClick={() => open ? setOpen(false) : openList()}
				onKeyDown={(event) => {
					if (event.key === "ArrowDown" || event.key === "ArrowUp") {
						event.preventDefault();
						openList();
					}
				}}
			>
				<span className={styles.dropdownValue}>{selectedOption?.label ?? ""}</span>
				<svg className={styles.dropdownChevron} aria-hidden="true" viewBox="0 0 32 32">
					<use href="/icons/sprite.svg#icon-chevron-down" />
				</svg>
			</button>
			{open && (
				<div className={styles.dropdownMenu} id={listId} role="listbox" aria-label={`${label} options`}>
					{orderedOptions.map((option, index) => (
						<button
							className={`${styles.dropdownOption} ${option.value === value ? styles.dropdownOptionSelected : ""}`}
							key={option.value}
							ref={(element) => { optionRefs.current[index] = element; }}
							type="button"
							role="option"
							aria-selected={option.value === value}
							tabIndex={index === activeIndex ? 0 : -1}
							onClick={() => chooseOption(option.value)}
							onKeyDown={(event) => {
							if (event.key === "ArrowDown" || event.key === "ArrowUp") {
								event.preventDefault();
								const direction = event.key === "ArrowDown" ? 1 : -1;
								setActiveIndex((index + direction + orderedOptions.length) % orderedOptions.length);
							} else if (event.key === "Escape") {
								event.preventDefault();
								setOpen(false);
								triggerRef.current?.focus();
							}
						}}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

export default function Filters({
	languages,
	levels,
	language,
	level,
	maxPrice,
	onLanguageChange,
	onLevelChange,
	onMaxPriceChange,
}: FiltersProps) {
	return (
		<div className={styles.filters} aria-label="Filter teachers">
			<label>
				Language
				<FilterDropdown
					label="Language"
					value={language}
					options={[
						{ value: "all", label: "All languages" },
						...languages.map((item) => ({ value: item, label: item })),
					]}
					onChange={onLanguageChange}
				/>
			</label>
			<label>
				Level
				<FilterDropdown
					label="Level"
					value={level}
					options={[
						{ value: "all", label: "All levels" },
						...levels.map((item) => ({ value: item, label: item })),
					]}
					onChange={onLevelChange}
				/>
			</label>
			<label>
				Price
				<FilterDropdown
					label="Price"
					value={maxPrice}
					options={[
						{ value: "all", label: "All prices" },
						{ value: "10", label: "10$" },
						{ value: "20", label: "20$" },
						{ value: "30", label: "30$" },
						{ value: "40", label: "40$" },
					]}
					onChange={onMaxPriceChange}
				/>
			</label>
		</div>
	);
}
