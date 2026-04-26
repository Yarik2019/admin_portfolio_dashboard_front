
import type { RootState } from "@/lib/store";

export const selectAboutTotal = (state: RootState) => state.about.aboutTotal;
export const selectAboutItems = (state: RootState) => state.about.aboutItems;
export const selectAboutLoading = (state: RootState) => state.about.loading;
export const selectAboutError = (state: RootState) => state.about.error;
