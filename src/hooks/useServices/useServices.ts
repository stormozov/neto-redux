import type { Service } from "@shared/storeTypes";
import { useDispatch, useSelector } from "react-redux";
import {
	addService as addServiceAction,
	cancelEditing as cancelEditingAction,
	clearForm as clearFormAction,
	clearSearch as clearSearchAction,
	deleteAllServices as deleteAllServicesAction,
	deleteService as deleteServiceAction,
	setFormField as setFormFieldAction,
	setSearchTerm as setSearchTermAction,
	setValidationError as setValidationErrorAction,
	startEditing as startEditingAction,
	updateService as updateServiceAction,
} from "@/store/actions";
import {
	selectFilteredServices,
	selectFilterStats,
	selectForm,
	selectHasActiveSearch,
	selectIsEmptyResult,
	selectSearchTerm,
	selectServicesItems,
	selectTotal,
} from "@/store/selectors";
import type { FormFields, UseServicesReturn } from "./types";

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
	const { name, price, editingId, errors } = useSelector(selectForm);
	const total = useSelector(selectTotal);
	const filteredItems = useSelector(selectFilteredServices);
	const { found } = useSelector(selectFilterStats);
	const searchTerm = useSelector(selectSearchTerm);
	const isEmptyResult = useSelector(selectIsEmptyResult);
	const hasActiveSearch = useSelector(selectHasActiveSearch);

	const data = {
		// Список услуг
		items,
		filteredItems,
		// Форма
		name,
		price,
		editingId,
		errors,
		// Фильтрация
		total,
		found,
		searchTerm,
		isEmptyResult,
		hasActiveSearch,
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

	const deleteAllServices = () => {
		dispatch(deleteAllServicesAction());
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

	const setFormField = (field: FormFields, value: string) => {
		dispatch(setFormFieldAction(field, value));
	};

	const setValidationError = (field: string, error: string) => {
		dispatch(setValidationErrorAction(field, error));
	};

	const setSearchTerm = (term: string) => {
		dispatch(setSearchTermAction(term));
	};

	const clearSearch = () => {
		dispatch(clearSearchAction());
	};

	const actions = {
		addService,
		updateService,
		deleteService,
		deleteAllServices,
		startEditing,
		cancelEditing,
		clearForm,
		setFormField,
		setValidationError,
		setSearchTerm,
		clearSearch,
	};

	return { ...data, ...actions };
};
