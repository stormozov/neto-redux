/**
 * Интерфейс, описывающий возврат хука {@link useDebouncedSearch}.
 */
export interface UseDebouncedSearchReturn {
	/** Текущее значение в поле ввода (без задержки) */
	inputValue: string;
	/** Фактический поисковый запрос в Redux (с debounce) */
	searchTerm: string;
	/** Флаг, что идет поиск (debounce активен) */
	isSearching: boolean;
	/** Обновить значение поиска */
	handleChange: (value: string) => void;
	/** Очистить поиск */
	handleClear: () => void;
}
