import type { ReactNode } from "react";

/**
 * Тип элемента, поддерживающий фокус.
 */
export type FocusableElement =
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLAnchorElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

/**
 * Интерфейс, описывающий свойства компонента Modal.
 */
export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;

  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  "aria-label"?: string;

  onClose: () => void;
}
