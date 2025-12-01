/**
 * Форматирует число с пробелами в качестве разделителей тысяч.
 * 
 * @param {number} value - число для форматирования
 * @returns {string} отформатированная строка, например: 15500 → "15 500"
 */
export const formatNumberWithSpaces = (value: number): string => {
	if (!Number.isFinite(value)) {
		throw new Error("Input must be a finite number");
	}

	// Преобразуем число в строку без дробной части (если она нулевая)
	const [integerPart, decimalPart] = value.toString().split(".");

	// Форматируем целую часть, добавляя пробелы каждые 3 цифры справа налево
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	// Если была дробная часть — добавляем её обратно
	return decimalPart !== undefined
		? `${formattedInteger}.${decimalPart}`
		: formattedInteger;
}
