import classNames from "classnames";
import { PiCheckCircleFill, PiInfoFill, PiWarningFill } from "react-icons/pi";
import { v4 as uuid4 } from "uuid";
import "./Input.scss";
import type { InputProps } from "./types";

/**
 * Универсальный компонент поля ввода с поддержкой различных стилей, ролей,
 * размеров и состояний.
 *
 * Поддерживает:
 * - разные визуальные варианты (`variant`),
 * - семантические состояния (`intent` и `error`),
 * - размеры (`size`),
 * - префиксы и суффиксы (`startAdornment`, `endAdornment`),
 * - подписи (`label`) и вспомогательные сообщения (`helperText`).
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Введите email"
 *   variant="outlined"
 *   intent="success"
 *   helperText="Адрес подтверждён"
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
	className,
	id,
	type = "text",
	variant = "default",
	role = "primary",
	intent = "neutral",
	size = "medium",
	label,
	helperText,
	error = false,
	startAdornment,
	endAdornment,
	fullWidth = true,
	...rest
}) => {
	const effectiveIntent = error ? "danger" : intent;

	const inputClass = classNames(
		"input",
		`input--variant-${variant}`,
		`input--role-${role}`,
		effectiveIntent !== "neutral" && `input--intent-${effectiveIntent}`,
		`input--size-${size}`,
		{
			"input--full-width": fullWidth,
			"input--with-start": !!startAdornment,
			"input--with-end": !!endAdornment,
		},
		className,
	);

	const wrapperClass = classNames("input-wrapper", {
		"input-wrapper--with-label": !!label,
	});

	const inputId = id || (label ? `input-${uuid4()}` : undefined);

	const getHelperIcon = () => {
		const iconClass = "input-helper__icon";

		switch (effectiveIntent) {
			case "danger":
				return <PiWarningFill className={iconClass} />;
			case "success":
				return <PiCheckCircleFill className={iconClass} />;
			case "warning":
				return <PiInfoFill className={iconClass} />;
			default:
				return null;
		}
	};

	return (
		<div className={wrapperClass}>
			{label && (
				<label htmlFor={inputId} className="input-label">
					{label}
				</label>
			)}

			<div className="input-adornment-container">
				{startAdornment && (
					<span className="input-adornment input-adornment--start">
						{startAdornment}
					</span>
				)}

				<input id={inputId} className={inputClass} type={type} {...rest} />

				{endAdornment && (
					<span className="input-adornment input-adornment--end">
						{endAdornment}
					</span>
				)}
			</div>

			{helperText && (
				<div
					className={classNames("input-helper", {
						[`input-helper--${effectiveIntent}`]: effectiveIntent !== "neutral",
					})}
				>
					{getHelperIcon()}
					<p className="input-helper__text">{helperText}</p>
				</div>
			)}
		</div>
	);
};
