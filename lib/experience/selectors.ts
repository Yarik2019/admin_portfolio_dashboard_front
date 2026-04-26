
import type { RootState } from "@/lib/store";

export const selectExperienceTotal = (state: RootState) => state.experience.experienceTotal;
export const selectExperienceItems = (state: RootState) => state.experience.experienceItems;
export const selectExperienceLoading = (state: RootState) => state.experience.loading;
export const selectExperienceError = (state: RootState) => state.experience.error;