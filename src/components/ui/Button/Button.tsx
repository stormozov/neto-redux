import classNames from "classnames";
import "./Button.scss";
import type { ButtonProps } from "./types";

/**
 * Универсальный компонент кнопки с поддержкой различных стилей, ролей,
 * размеров и состояний.
 *
 * Компонент генерирует семантически корректную HTML-кнопку с расширенной
 * кастомизацией через CSS-классы. Поддерживает все стандартные атрибуты
 * HTML-кнопки (`type`, `disabled`, `onClick` и т.д.).
 *
 * @example
 * ```tsx
 * <Button intent="success" size="large">
 *   Подтвердить
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button appearance="outlined" importance="secondary" iconOnly>
 *   <CloseIcon />
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
	className,
	type = "button",
	appearance = "filled",
	importance = "primary",
	intent = "neutral",
	size = "medium",
	position = "center",
	iconOnly = false,
	children,
	...rest
}) => {
	const buttonClass = classNames(
		"btn",
		`btn--appearance-${appearance}`,
		`btn--importance-${importance}`,
		intent !== "neutral" && `btn--intent-${intent}`,
		`btn--size-${size}`,
		`btn--position-${position}`,
		{
			"btn--icon-only": iconOnly,
		},
		className,
	);

	return (
		<button className={buttonClass} {...rest} type={type}>
			{children}
		</button>
	);
};
