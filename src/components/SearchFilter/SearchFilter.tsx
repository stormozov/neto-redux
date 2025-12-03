import { useDebouncedSearch } from "@hooks";
import { useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { Button, Input } from "../ui";
import styles from "./SearchFilter.module.scss";

interface SearchFilterProps {
	className?: string;
	delay?: number;
}

function SearchFilter({ className = "", delay = 300 }: SearchFilterProps) {
	const { inputValue, handleChange, handleClear, isSearching } =
		useDebouncedSearch(delay);

	const inputRef = useRef<HTMLInputElement>(null);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e.target.value);
	};

	const onClearClick = () => {
		handleClear();
		inputRef.current?.focus();
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") onClearClick();
	};

	return (
		<div className={`${styles["search-filter"]} ${className}`}>
			<div className={styles["search-filter__input-wrapper"]}>
				<Input
					type="text"
					className={styles["search-filter__input"]}
					id="service-search"
					placeholder="Поиск услуг..."
					value={inputValue}
					ref={inputRef}
					fullWidth
					onChange={onInputChange}
					onKeyDown={onKeyDown}
				/>

				{isSearching && (
					<div className={styles["search-filter__spinner-wrapper"]}>
						<AiOutlineLoading3Quarters
							className={styles["search-filter__spinner"]}
						/>
					</div>
				)}

				{inputValue && !isSearching && (
					<Button
						className={styles["search-filter__clear"]}
						appearance="text"
						aria-label="Очистить поиск"
						title="Очистить поиск"
						onClick={onClearClick}
					>
						<LiaTimesSolid />
					</Button>
				)}
			</div>
		</div>
	);
}

export default SearchFilter;
