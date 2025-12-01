import classNames from "classnames";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import "./Modal.scss";
import type { FocusableElement, ModalProps } from "./types";
import { Button } from "../Button";

export const FOCUSABLE_SELECTOR =
	'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Компонент, предоставляющий модальное окно.
 */
export default function Modal({
	isOpen,
	onClose,
	children,
	className,
	overlayClassName,
	contentClassName,
	closeOnOverlayClick = true,
	showCloseButton = true,
	"aria-label": ariaLabel = "Modal dialog",
}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const previousFocusedElement = useRef<HTMLElement | null>(null);

	// Управление прокруткой и фокусом
	useEffect(() => {
		if (!isOpen) return;

		previousFocusedElement.current = document.activeElement as HTMLElement;
		document.body.style.overflow = "hidden";

		// Фокус на первый фокусируемый элемент внутри модального окна
		if (modalRef.current) {
			const focusableElements =
				modalRef.current.querySelectorAll<FocusableElement>(FOCUSABLE_SELECTOR);
			if (focusableElements.length > 0) {
				(focusableElements[0] as HTMLElement).focus();
			} else {
				// Если нет фокусируемых — сам контейнер получает фокус
				modalRef.current.focus();
			}
		}

		return () => {
			document.body.style.overflow = "";
			if (previousFocusedElement.current) {
				previousFocusedElement.current.focus();
			}
		};
	}, [isOpen]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") onClose();
	};

	if (!isOpen) return null;

	return createPortal(
		<div
			className={classNames("modal-overlay", overlayClassName)}
			onClick={closeOnOverlayClick ? () => onClose() : undefined}
			aria-hidden="true"
		>
			{/* Семантически корректный диалог */}
			<div
				ref={modalRef}
				{...{
					role: "dialog",
					"aria-modal": "true",
					"aria-label": ariaLabel,
					className: classNames("modal-content", contentClassName),
					onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
					onKeyDown: handleKeyDown,
					tabIndex: -1,
				}}
			>
				{showCloseButton && (
					<Button
						className="modal-close-button"
						onClick={onClose}
						aria-label="Закрыть модальное окно"
						title="Закрыть модальное окно"
						iconOnly
					>
						<FaTimes />
					</Button>
				)}
				<div className={classNames("modal-body", className)}>{children}</div>
			</div>
		</div>,
		document.body,
	);
}
