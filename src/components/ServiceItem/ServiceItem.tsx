import type { Service } from "@shared/interfaces";
import { formatNumberWithSpaces } from "@utils";
import { FaTimes } from "react-icons/fa";
import { Button } from "../ui";
import styles from "./ServiceItem.module.scss";

/**
 * Интерфейс, описывающий свойства компонента ServiceItem.
 */
interface IServiceItemProps {
	service: Service;
	handleEdit: (service: Service) => void;
	handleDelete: (id: string, name: string) => void;
}

/**
 * Компонент, представляющий отдельную услугу.
 */
export default function ServiceItem({
	service,
	handleEdit,
	handleDelete,
}: IServiceItemProps) {
	const { id, name, price } = service;
	return (
		<div className={styles["service-item"]}>
			<div className={styles["service-item__content"]}>
				<span className={styles["service-item__name"]}>{name}</span>
				<div className={styles["service-item__divider"]}></div>
				<span className={styles["service-item__price"]}>
					{formatNumberWithSpaces(price)} руб.
				</span>
			</div>

			<div className={styles["service-item__actions"]}>
				<Button
					appearance="ghost"
					importance="secondary"
					size="small"
					onClick={() => handleEdit(service)}
				>
					Редактировать
				</Button>

				<Button
					appearance="ghost"
					importance="secondary"
					intent="danger"
					size="small"
					title="Удалить услугу"
					aria-label="Удалить услугу"
					iconOnly
					onClick={() => handleDelete(id, name)}
				>
					<FaTimes />
				</Button>
			</div>
		</div>
	);
}
