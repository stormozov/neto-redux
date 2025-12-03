import type { FormFields } from "@hooks/useServices";
import type {
	ADD_SERVICE,
	CANCEL_EDITING,
	CLEAR_FORM,
	CLEAR_SEARCH,
	DELETE_ALL_SERVICES,
	DELETE_SERVICE,
	SET_FORM_FIELD,
	SET_SEARCH_TERM,
	SET_VALIDATION_ERROR,
	START_EDITING,
	UPDATE_SERVICE,
} from "@/store/actions";

/**
 * Интерфейс, описывающий услугу
 */
export interface Service {
	id: string;
	name: string;
	price: number;
}

/**
 * Интерфейс, описывающий состояние формы
 */
export interface FormState {
	name: string;
	price: string;
	editingId: string | null;
	errors: {
		name?: string;
		price?: string;
	};
}

export interface FilterState {
	searchTerm: string;
}

/**
 * Интерфейс, описывающий состояние услуг
 */
export interface ServicesState {
	items: Service[];
}

/**
 * Интерфейс, описывающий глобальное состояние
 */
export interface RootState {
	services: ServicesState;
	form: FormState;
	filter: FilterState;
}

/**
 * Экшен для добавления новой услуги.
 * Генерируется при вызове {@link addServiceAction}.
 */
export interface AddServiceAction {
	type: typeof ADD_SERVICE;
	payload: {
		name: string;
		price: number;
	};
}

/**
 * Экшен для обновления существующей услуги.
 * Генерируется при вызове {@link updateServiceAction}.
 */
export interface UpdateServiceAction {
	type: typeof UPDATE_SERVICE;
	payload: {
		id: string;
		name: string;
		price: number;
	};
}

/**
 * Экшен для удаления услуги по идентификатору.
 * Генерируется при вызове {@link deleteServiceAction}.
 */
export interface DeleteServiceAction {
	type: typeof DELETE_SERVICE;
	payload: {
		id: string;
	};
}

/**
 * Экшен для удаления всех услуг.
 * Генерируется при вызове {@link deleteAllServicesAction}.
 */
export interface DeleteAllServicesAction {
	type: typeof DELETE_ALL_SERVICES;
	// payload отсутствует
}

/**
 * Экшен для обновления одного из полей формы (название или цена).
 * Сбрасывает ошибку валидации для этого поля.
 * Генерируется при вызове {@link setFormFieldAction}.
 */
export interface SetFormFieldAction {
	type: typeof SET_FORM_FIELD;
	payload: {
		field: FormFields;
		value: string;
	};
}

/**
 * Экшен для запуска режима редактирования услуги.
 * Заполняет форму данными указанной услуги.
 * Генерируется при вызове {@link startEditingAction}.
 */
export interface StartEditingAction {
	type: typeof START_EDITING;
	payload: {
		service: Service;
	};
}

/**
 * Экшен для отмены редактирования и сброса формы.
 * Генерируется при вызове {@link cancelEditingAction}.
 */
export interface CancelEditingAction {
	type: typeof CANCEL_EDITING;
	// payload отсутствует
}

/**
 * Экшен для полного сброса формы (очистка полей и ошибок).
 * Генерируется при вызове {@link clearFormAction}.
 */
export interface ClearFormAction {
	type: typeof CLEAR_FORM;
	// payload отсутствует
}

/**
 * Экшен для установки или сброса ошибки валидации поля формы.
 * Генерируется при вызове {@link setValidationErrorAction}.
 */
export interface SetValidationErrorAction {
	type: typeof SET_VALIDATION_ERROR;
	payload: {
		field: string;
		error: string;
	};
}

export interface SetSearchTermAction {
	type: typeof SET_SEARCH_TERM;
	payload: {
		searchTerm: string;
	};
}

export interface ClearSearchAction {
	type: typeof CLEAR_SEARCH;
	// payload отсутствует
}

/**
 * Объединённый тип всех экшенов, связанных с управлением услугами и формой
 * редактирования.
 *
 * Используется в редьюсерах {@link servicesReducer} и {@link formReducer}
 * для обеспечения типобезопасного обновления состояния.
 */
export type ServicesFormAction =
	| AddServiceAction
	| UpdateServiceAction
	| DeleteServiceAction
	| DeleteAllServicesAction
	| SetFormFieldAction
	| StartEditingAction
	| CancelEditingAction
	| ClearFormAction
	| SetValidationErrorAction
	| SetSearchTermAction
	| ClearSearchAction;
