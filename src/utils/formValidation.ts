import { store } from "../store";
import { setValidationError } from "../store/actions";

export const validateForm = (name: string, price: string): boolean => {
	let isValid = true;
	const dispatch = store.dispatch;

	// Clear previous errors
	dispatch(setValidationError("name", ""));
	dispatch(setValidationError("price", ""));

	// Validate name
	if (!name.trim()) {
		dispatch(setValidationError("name", "Название услуги обязательно"));
		isValid = false;
	} else if (name.trim().length < 2) {
		dispatch(
			setValidationError("name", "Название должно содержать минимум 2 символа"),
		);
		isValid = false;
	}

	// Validate price
	if (!price.trim()) {
		dispatch(setValidationError("price", "Цена обязательна"));
		isValid = false;
	} else {
		const priceNum = parseFloat(price);
		if (Number.isNaN(priceNum) || priceNum <= 0) {
			dispatch(setValidationError("price", "Цена должна быть числом больше 0"));
			isValid = false;
		}
	}

	return isValid;
};
