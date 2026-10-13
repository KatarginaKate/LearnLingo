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
				<select value={language} onChange={(event) => onLanguageChange(event.target.value)}>
					<option value="all">All languages</option>
					{languages.map((item) => <option key={item}>{item}</option>)}
				</select>
			</label>
			<label>
				Level
				<select value={level} onChange={(event) => onLevelChange(event.target.value)}>
					<option value="all">All levels</option>
					{levels.map((item) => <option key={item}>{item}</option>)}
				</select>
			</label>
			<label>
				Price
				<select value={maxPrice} onChange={(event) => onMaxPriceChange(event.target.value)}>
					<option value="all">Any price</option>
					<option value="25">Up to $25</option>
					<option value="30">Up to $30</option>
					<option value="40">Up to $40</option>
				</select>
			</label>
		</div>
	);
}
