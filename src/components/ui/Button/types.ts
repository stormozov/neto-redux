import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Внешний вид кнопки, определяющий её визуальный стиль.
 */
export type ButtonAppearance = "filled" | "outlined" | "ghost" | "text";

/**
 * Роль кнопки, определяющая её иерархическую важность в интерфейсе.
 */
export type ButtonRoles = "primary" | "secondary" | "tertiary";

/**
 * Цветовая семантика кнопки, отражающая её назначение или состояние.
 */
export type ButtonIntents = "neutral" | "danger" | "success" | "warning";

/**
 * Размер кнопки.
 */
export type ButtonSizes = "small" | "medium" | "large";

/**
 * Выравнивание содержимого внутри кнопки по горизонтали.
 */
export type ButtonContentPositions = "start" | "center" | "end";

/**
 * Интерфейс, описывающий свойства компонента Button.
 *
 * Компонент наследует все стандартные HTML-атрибуты кнопки.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Внешний вид кнопки.
	 * @default "filled"
	 */
	appearance?: ButtonAppearance;

	/**
	 * Роль (важность) кнопки в интерфейсе.
	 * @default "primary"
	 */
	importance?: ButtonRoles;

	/**
	 * Цветовая семантика (намерение) кнопки.
	 * @default "neutral"
	 */
	intent?: ButtonIntents;

	/**
	 * Размер кнопки.
	 * @default "medium"
	 */
	size?: ButtonSizes;

	/**
	 * Позиция содержимого внутри кнопки (для горизонтального выравнивания).
	 * @default "center"
	 */
	position?: ButtonContentPositions;

	/**
	 * Указывает, что кнопка содержит только иконку (без текста).
	 * Может повлиять на отступы и размеры.
	 * @default false
	 */
	iconOnly?: boolean;

	/**
	 * Дочерние элементы кнопки (текст, иконки и т.д.).
	 */
	children?: ReactNode;
}
