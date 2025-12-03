import { createSelector } from "reselect";
import type { RootState, Service } from "@/shared/storeTypes";

export const selectServicesItems = (state: RootState) => state.services.items;
export const selectForm = (state: RootState) => state.form;
export const selectTotal = (state: RootState) => state.services.items.length;
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;

export const selectFilteredServices = createSelector(
	[selectServicesItems, selectSearchTerm],
	(services, searchTerm) => {
		if (!searchTerm.trim()) return services;
		const term = searchTerm.toLowerCase();
		return services.filter((service: Service) =>
			service.name.toLowerCase().includes(term),
		);
	},
);

// Селектор для статистики
export const selectFilterStats = createSelector(
	[selectFilteredServices, selectServicesItems],
	(filteredServices, allServices) => ({
		found: filteredServices.length,
		total: allServices.length,
	}),
);

// Селектор для пустого результата
export const selectIsEmptyResult = createSelector(
	[selectFilteredServices, selectSearchTerm],
	(filteredServices, searchTerm) => {
		return searchTerm.trim() !== "" && filteredServices.length === 0;
	},
);

// Селектор для проверки активного поиска
export const selectHasActiveSearch = createSelector(
	[selectSearchTerm],
	(searchTerm) => searchTerm.trim() !== "",
);
