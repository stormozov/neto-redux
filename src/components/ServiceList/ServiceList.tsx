import { useServices } from "@hooks";
import type { Service } from "@shared/storeTypes";
import { ServiceItem } from "../ServiceItem";
import styles from "./ServiceList.module.scss";

/**
 * Интерфейс, описывающий свойства компонента ServiceList.
 */
interface IServiceListProps {
	onEdit: (service: Service) => void;
}

/**
 * Компонент, представляющий список услуг.
 */
export default function ServiceList({ onEdit }: IServiceListProps) {
	const { filteredItems, total, editingId, clearForm, deleteService } =
		useServices();

	const handleDelete = (id: string, name: string) => {
		const confirm = window.confirm(`Удалить услугу «${name}»?`);
		if (!confirm) return;
		deleteService(id);
		if (editingId === id) clearForm?.();
	};

	
	if (total === 0) {
		return (
			<p className={styles["service-list-empty"]}>Нет добавленных услуг</p>
		);
	}
	
	if (filteredItems.length === 0) {
		return (
			<p className={styles["service-list-empty"]}>
				Нет услуг, соответствующих фильтру
			</p>
		);
	}
	
	return (
		<div className={styles["service-list"]}>
			<ul className={styles["service-list__list"]}>
				{filteredItems.map((service) => (
					<li key={service.id} className={styles["service-list__item"]}>
						<ServiceItem
							service={service}
							handleEdit={onEdit}
							handleDelete={handleDelete}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
