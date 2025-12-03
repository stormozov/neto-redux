import type { FormFields } from "@hooks/useServices";
import type { Service } from "@shared/storeTypes";

// Список услуг
export const ADD_SERVICE = "ADD_SERVICE";
export const UPDATE_SERVICE = "UPDATE_SERVICE";
export const DELETE_SERVICE = "DELETE_SERVICE";
export const DELETE_ALL_SERVICES = "DELETE_ALL_SERVICES";
// Форма
export const SET_FORM_FIELD = "SET_FORM_FIELD";
export const START_EDITING = "START_EDITING";
export const CANCEL_EDITING = "CANCEL_EDITING";
export const CLEAR_FORM = "CLEAR_FORM";
export const SET_VALIDATION_ERROR = "SET_VALIDATION_ERROR" as const;
// Поиск
export const SET_SEARCH_TERM = "SET_SEARCH_TERM" as const;
export const CLEAR_SEARCH = "CLEAR_SEARCH" as const;

// Actions: Список услуг
export const addService = (name: string, price: number) => ({
	type: ADD_SERVICE,
	payload: { name, price },
});

export const updateService = (id: string, name: string, price: number) => ({
	type: UPDATE_SERVICE,
	payload: { id, name, price },
});

export const deleteService = (id: string) => ({
	type: DELETE_SERVICE,
	payload: { id },
});

export const deleteAllServices = () => ({
	type: DELETE_ALL_SERVICES,
	payload: { id: "" },
});

// Actions: Форма
export const setFormField = (field: FormFields, value: string) => ({
	type: SET_FORM_FIELD,
	payload: { field, value },
});

export const startEditing = (service: Service) => ({
	type: START_EDITING,
	payload: { service },
});

export const cancelEditing = () => ({
	type: CANCEL_EDITING,
});

export const clearForm = () => ({
	type: CLEAR_FORM,
});

export const setValidationError = (field: string, error: string) => ({
	type: SET_VALIDATION_ERROR,
	payload: { field, error },
});

// Actions: Поиск
export const setSearchTerm = (searchTerm: string) => ({
	type: SET_SEARCH_TERM,
	payload: { searchTerm },
});

export const clearSearch = () => ({
	type: CLEAR_SEARCH,
});
