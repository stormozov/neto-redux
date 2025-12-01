import { useServices } from "@hooks";
import { validateForm } from "@utils";
import { Button, Input } from "../ui";
import styles from "./ServiceForm.module.scss";

/**
 * Интерфейс, описывающий свойства компонента ServiceForm.
 */
interface IServiceFormProps {
	onClose?: () => void;
}

/**
 * Компонент, предоставляющий форму для добавления/редактирования услуги.
 */
export default function ServiceForm({ onClose }: IServiceFormProps) {
	const { items, name, price, editingId, errors } = useServices();
	const { addService, updateService, cancelEditing, clearForm, setFormField } =
		useServices();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm(name, price)) return;

		const priceNum = parseFloat(price);

		if (editingId) {
			updateService(editingId, name.trim(), priceNum);
		} else {
			addService(name.trim(), priceNum);
		}

		clearForm();
		onClose?.();
	};

	const handleCancel = () => {
		cancelEditing();
		onClose?.();
	};

	const editingService = editingId
		? items.find((item) => item.id === editingId)
		: null;

	return (
		<form onSubmit={handleSubmit} className={styles["service-form"]}>
			<h2>{editingId ? "Редактирование услуги" : "Добавление услуги"}</h2>

			{editingService && (
				<div className={styles["service-form__editing"]}>
					Редактирование: {editingService.name}
				</div>
			)}

			<Input
				id="input-name"
				label="Название услуги"
				value={name}
				placeholder="UI-дизайн"
				helperText={errors.name}
				error={!!errors.name}
				onChange={(e) => setFormField("name", e.target.value)}
			/>

			<Input
				type="number"
				id="input-price"
				label="Цена"
				value={price}
				step="0.01"
				min="0"
				placeholder="10 000"
				helperText={errors.price}
				error={!!errors.price}
				onChange={(e) => setFormField("price", e.target.value)}
			/>

			<div className={styles["service-form__actions"]}>
				{editingId && (
					<Button
						appearance="filled"
						importance="secondary"
						onClick={handleCancel}
					>
						Отменить
					</Button>
				)}
				<Button type="submit">{editingId ? "Сохранить" : "Добавить"}</Button>
			</div>
		</form>
	);
}
