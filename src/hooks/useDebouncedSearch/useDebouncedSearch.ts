import { useCallback, useEffect, useRef, useState } from "react";
import { useServices } from "../useServices";
import type { UseDebouncedSearchReturn } from "./types";

/**
 * Кастомный React хук для управления поиском с debounce (задержкой).
 *
 * @remarks
 * Хук предоставляет механизм отложенного обновления поискового запроса в Redux
 * хранилище, что позволяет оптимизировать производительность при частых
 * изменениях ввода пользователя.
 *
 * ## Принцип работы
 * 1. Пользователь вводит текст → `inputValue` обновляется мгновенно
 * 2. Запускается/перезапускается таймер debounce
 * 3. Когда пользователь прекращает ввод на указанное время → `searchTerm`
 * обновляется в Redux
 * 4. Компоненты, подписанные на `searchTerm`, получают обновленное значение
 * и перерисовываются
 *
 * @param {number} delay - Время задержки в миллисекундах перед обновлением
 * Redux состояния. По умолчанию 300 мс.
 * @returns {@link UseDebouncedSearchReturn} Объект с состоянием и обработчиками
 * для управления поиском
 *
 * @see {@link useServices} Кастомный хук-контроллер для работы с Redux
 * состоянием
 *
 * ## Примеры использования
 * @example
 * const SearchComponent = () => {
 *   const { inputValue, handleChange, handleClear, isSearching } =
 * 		useDebouncedSearch(300);
 *
 *   return (
 *     <div>
 *       <input
 *         value={inputValue}
 *         onChange={(e) => handleChange(e.target.value)}
 *         placeholder="Поиск..."
 *       />
 *       {isSearching && <span>Идет поиск...</span>}
 *       {inputValue && <button onClick={handleClear}>×</button>}
 *     </div>
 *   );
 * };
 *
 * @example
 * // Базовое использование с задержкой 300мс (по умолчанию)
 * const { inputValue, handleChange } = useDebouncedSearch();
 *
 * @example
 * // Использование с кастомной задержкой
 * const { inputValue, handleChange } = useDebouncedSearch(500);
 */
export const useDebouncedSearch = (
	delay: number = 300,
): UseDebouncedSearchReturn => {
	const { searchTerm, setSearchTerm, clearSearch } = useServices();

	// Используем derived state вместо useEffect для синхронизации
	const [lastSyncedSearchTerm, setLastSyncedSearchTerm] = useState(searchTerm);
	const [inputValue, setInputValue] = useState(searchTerm);
	const [isSearching, setIsSearching] = useState(false);
	const timerRef = useRef<number | null>(null);

	// Синхронизируем inputValue с searchTerm, если searchTerm изменился извне
	if (searchTerm !== lastSyncedSearchTerm) {
		setLastSyncedSearchTerm(searchTerm);
		setInputValue(searchTerm);
		setIsSearching(false);
	}

	// Очистка таймера при размонтировании
	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	// Debounced обновление Redux
	const updateSearchTerm = useCallback(
		(value: string) => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}

			setIsSearching(true);

			timerRef.current = window.setTimeout(() => {
				setSearchTerm(value);
			}, delay);
		},
		[setSearchTerm, delay],
	);

	// Обработчик изменения значения
	const handleChange = useCallback(
		(value: string) => {
			setInputValue(value);
			updateSearchTerm(value);
		},
		[updateSearchTerm],
	);

	// Обработчик очистки
	const handleClear = useCallback(() => {
		setInputValue("");

		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}

		setIsSearching(false);
		clearSearch();
	}, [clearSearch]);

	return {
		inputValue,
		searchTerm,
		isSearching,
		handleChange,
		handleClear,
	};
};
