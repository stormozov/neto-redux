import { Button, Modal, ServiceForm, ServiceList } from "@components";
import { useServices } from "@hooks";
import type { Service } from "@shared/storeTypes";
import { useState } from "react";
import styles from "./ReduxCrudDemoPage.module.scss";

/**
 * Компонент, представляющий страницу с демонстрацией работы Redux с CRUD.
 */
export default function ReduxCrudDemoPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { total, clearForm, startEditing, deleteAllServices } = useServices();

	const openModalForAdd = () => {
		clearForm();
		setIsModalOpen(true);
	};

	const openModalForEdit = (service: Service) => {
		startEditing(service);
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const handleDeleteAllServices = () => {
		if (!window.confirm("Вы уверены, что хотите удалить все услуги?")) return;
		deleteAllServices();
	};

	return (
		<div className={styles["demo-page"]}>
			<div className="container">
				<header className={styles["demo-page__header"]}>
					<h1 className={styles["demo-page-title"]}>
						Redux CRUD Demo. Управление услугами
					</h1>
				</header>

				<main className={styles["demo-page__main"]}>
					<div className={styles["demo-page__actions"]}>
						<Button onClick={openModalForAdd}>Добавить услугу</Button>
						{total > 0 && (
							<Button importance="secondary" onClick={handleDeleteAllServices}>
								Очистить список
							</Button>
						)}
					</div>

					<div className={styles.services}>
						<header className={styles.services__header}>
							<h2 className={styles.services__title}>Список услуг</h2>
							<div className={styles.services__divider}></div>
							<div className={styles["services__total-wrapper"]}>
								<span className={styles.services__total}>Всего: {total}</span>
							</div>
						</header>
						<ServiceList onEdit={openModalForEdit} />
					</div>
				</main>
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ServiceForm onClose={closeModal} />
			</Modal>
		</div>
	);
}
