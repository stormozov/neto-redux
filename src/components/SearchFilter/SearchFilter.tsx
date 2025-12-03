import { useServices } from "@hooks";
import { useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Button, Input } from "../ui";
import styles from "./SearchFilter.module.scss";

interface SearchFilterProps {
	className?: string;
}

export default function SearchFilter({ className = "" }: SearchFilterProps) {
	const { searchTerm, setSearchTerm, clearSearch } = useServices();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleClear = () => {
		clearSearch();
		inputRef.current?.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") handleClear();
	};

	return (
		<div className={`${styles["search-filter"]} ${className}`}>
			<div className={styles["search-filter__input-wrapper"]}>
				<Input
					type="text"
					className={styles["search-filter__input"]}
					id="service-search"
					placeholder="Поиск услуг..."
					value={searchTerm}
					ref={inputRef}
					fullWidth
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				{searchTerm && (
					<Button
						className={styles["search-filter__clear"]}
						appearance="text"
						aria-label="Очистить поиск"
						title="Очистить поиск"
						onClick={handleClear}
					>
						<LiaTimesSolid />
					</Button>
				)}
			</div>
		</div>
	);
}
