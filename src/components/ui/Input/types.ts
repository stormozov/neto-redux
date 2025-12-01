import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Возможные визуальные варианты отображения поля ввода.
 */
export type InputVariants = "default" | "filled" | "outlined" | "underlined";

/**
 * Доступные размеры поля ввода.
 */
export type InputSizes = "small" | "medium" | "large";

/**
 * Цветовые стили поля ввода, отражающие его семантическое состояние.
 */
export type InputIntents = "neutral" | "danger" | "success" | "warning";

/**
 * Роли поля ввода, определяющие его визуальную иерархию в интерфейсе.
 */
export type InputRoles = "primary" | "secondary" | "tertiary";

/**
 * Интерфейс, описывающий свойства компонента Input.
 *
 * Расширяет стандартные атрибуты HTML-элемента `<input>`, за исключением
 * `size`, который переопределен для использования внутренней типизации.
 */
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/**
	 * Визуальный стиль поля ввода.
	 *
	 * @default "default"
	 */
	variant?: InputVariants;

	/**
	 * Роль компонента в интерфейсе (влияет на визуальную иерархию).
	 *
	 * @default "primary"
	 */
	role?: InputRoles;

	/**
	 * Семантическое состояние поля (например, ошибка, успех и т.д.).
	 * Если задано свойство `error`, оно имеет приоритет над этим значением.
	 *
	 * @default "neutral"
	 */
	intent?: InputIntents;

	/**
	 * Размер поля ввода.
	 *
	 * @default "medium"
	 */
	size?: InputSizes;

	/**
	 * Подпись к полю ввода. Автоматически связывается с `input` через `htmlFor`
	 * (если `id` не задан явно).
	 */
	label?: ReactNode;

	/**
	 * Вспомогательный текст, отображаемый под полем ввода.
	 * Может сопровождаться иконкой в зависимости от `intent` или `error`.
	 */
	helperText?: string;

	/**
	 * Флаг, указывающий на наличие ошибки.
	 * При значении `true` поле ввода отображается в состоянии "danger",
	 * независимо от значения `intent`.
	 *
	 * @default false
	 */
	error?: boolean;

	/**
	 * Элемент, отображаемый слева от поля ввода (например, иконка).
	 */
	startAdornment?: ReactNode;

	/**
	 * Элемент, отображаемый справа от поля ввода (например, иконка или кнопка).
	 */
	endAdornment?: ReactNode;

	/**
	 * Если `true`, поле ввода растягивается на всю ширину контейнера.
	 *
	 * @default true
	 */
	fullWidth?: boolean;
}
