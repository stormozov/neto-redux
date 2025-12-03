import classNames from "classnames";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import "./Modal.scss";
import { Button } from "../Button";
import type { ModalProps } from "./types";

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
	const dialogRef = useRef<HTMLDialogElement>(null);
	const previousFocusedElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		previousFocusedElement.current = document.activeElement as HTMLElement;

		const dialog = dialogRef.current;
		if (dialog) {
			dialog.showModal();
			document.body.style.overflow = "hidden";
		}

		return () => {
			dialog?.close();
			document.body.style.overflow = "";
			previousFocusedElement.current?.focus();
		};
	}, [isOpen]);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (closeOnOverlayClick && e.target === dialogRef.current) {
			onClose();
		}
	};

	const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
		if (e.key === "Escape") {
			e.preventDefault();
			onClose();
		}
	};

	if (!isOpen) return null;

	return createPortal(
		<dialog
			ref={dialogRef}
			className={classNames("modal-dialog", overlayClassName)}
			onKeyDown={handleDialogKeyDown}
			onClick={handleOverlayClick}
			onClose={onClose}
			aria-label={ariaLabel}
		>
			<div className={"modal-overlay"}></div>
			<div className={classNames("modal-content", contentClassName)}>
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
		</dialog>,
		document.body,
	);
}
