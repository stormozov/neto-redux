import type { RootState } from "@/shared/storeTypes";

export const selectServicesItems = (state: RootState) => state.services.items;
export const selectForm = (state: RootState) => state.form;
export const selectTotal = (state: RootState) => state.services.items.length;
