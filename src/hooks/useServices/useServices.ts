import type { Service } from "@shared/storeTypes";
import { useDispatch, useSelector } from "react-redux";
import {
	selectForm,
	selectServicesItems,
	selectTotal,
} from "@/store/selectors";
import {
	addService as addServiceAction,
	cancelEditing as cancelEditingAction,
	clearForm as clearFormAction,
	deleteService as deleteServiceAction,
	setFormField as setFormFieldAction,
	setValidationError as setValidationErrorAction,
	startEditing as startEditingAction,
	updateService as updateServiceAction,
} from "../../store/actions";
import type { UseServicesReturn } from "./types";

/**
 * Кастомный React-хук для управления списком услуг и связанной формой
 * редактирования.
 *
 * Предоставляет как данные (список услуг, состояние формы, общее количество),
 * так и методы для взаимодействия с Redux-состоянием (создание, обновление,
 * удаление и т.д.).
 *
 * Использует селекторы и экшены из Redux-слоя, инкапсулируя всю логику работы
 * с услугами и делая компоненты независимыми от прямой работы с `useDispatch`
 * и `useSelector`.
 *
 * @example
 * ```tsx
 * const { items, total, addService, deleteService } = useServices();
 *
 * const handleAdd = () => addService("Новая услуга", 1000);
 *
 * return (
 *   <div>
 *     <p>Всего услуг: {total}</p>
 *     <button onClick={handleAdd}>Добавить</button>
 *     {items.map(item => (
 *       <ServiceItem key={item.id} service={item} onDelete={deleteService} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useServices = (): UseServicesReturn => {
	const dispatch = useDispatch();

	// Данные
	const items = useSelector(selectServicesItems);
	const form = useSelector(selectForm);
	const total = useSelector(selectTotal);

	const data = {
		items,
		...form,
		total,
	};

	// Методы для управления
	const addService = (name: string, price: number) => {
		dispatch(addServiceAction(name, price));
	};

	const updateService = (id: string, name: string, price: number) => {
		dispatch(updateServiceAction(id, name, price));
	};

	const deleteService = (id: string) => {
		dispatch(deleteServiceAction(id));
	};

	const startEditing = (service: Service) => {
		dispatch(startEditingAction(service));
	};

	const cancelEditing = () => {
		dispatch(cancelEditingAction());
	};

	const clearForm = () => {
		dispatch(clearFormAction());
	};

	const setFormField = (field: "name" | "price", value: string) => {
		dispatch(setFormFieldAction(field, value));
	};

	const setValidationError = (field: string, error: string) => {
		dispatch(setValidationErrorAction(field, error));
	};

	const actions = {
		addService,
		updateService,
		deleteService,
		startEditing,
		cancelEditing,
		clearForm,
		setFormField,
		setValidationError,
	};

	return { ...data, ...actions };
};
