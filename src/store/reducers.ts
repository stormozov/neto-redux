import type {
	FilterState,
	FormState,
	Service,
	ServicesFormAction,
	ServicesState,
} from "@shared/storeTypes";
import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import {
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
} from "./actions";

// Инициализация состояний
const initialServicesState: ServicesState = {
	items: [],
};

const initialFormState: FormState = {
	name: "",
	price: "",
	editingId: null,
	errors: {},
};

const initialFilterState: FilterState = {
	searchTerm: "",
};

// Редьюсеры состояний
const servicesReducer = (
	state = initialServicesState,
	action: ServicesFormAction,
): ServicesState => {
	switch (action.type) {
		case ADD_SERVICE: {
			const { name, price } = action.payload;
			return {
				...state,
				items: [...state.items, { id: uuidv4(), name, price }],
			};
		}

		case UPDATE_SERVICE: {
			const { id, name, price } = action.payload;
			return {
				...state,
				items: state.items.map((item: Service) => {
					return item.id === id ? { ...item, name, price } : item;
				}),
			};
		}

		case DELETE_SERVICE:
			return {
				...state,
				items: state.items.filter(
					(item: Service) => item.id !== action.payload.id,
				),
			};

		case DELETE_ALL_SERVICES:
			return { ...state, items: [] };

		default:
			return state;
	}
};

// Редьюсеры состояний
const formReducer = (
	state = initialFormState,
	action: ServicesFormAction,
): FormState => {
	switch (action.type) {
		case SET_FORM_FIELD: {
			const { field, value } = action.payload;
			return {
				...state,
				[field]: value,
				errors: { ...state.errors, [field]: undefined },
			};
		}

		case START_EDITING: {
			const { id: editingId, name, price } = action.payload.service;
			return { ...state, name, price: price.toString(), editingId };
		}

		case CANCEL_EDITING:
		case CLEAR_FORM:
			return initialFormState;

		case SET_VALIDATION_ERROR: {
			const { field, error } = action.payload;
			return { ...state, errors: { ...state.errors, [field]: error } };
		}

		default:
			return state;
	}
};

const filterReducer = (
	state = initialFilterState,
	action: ServicesFormAction,
): FilterState => {
	switch (action.type) {
		case SET_SEARCH_TERM:
			return {
				...state,
				searchTerm: action.payload.searchTerm,
			};

		case CLEAR_SEARCH:
			return {
				...state,
				searchTerm: "",
			};

		default:
			return state;
	}
};

// Объединение редьюсеров
export const rootReducer = combineReducers({
	services: servicesReducer,
	form: formReducer,
	filter: filterReducer,
});
