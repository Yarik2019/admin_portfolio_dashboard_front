import  type {RootState} from "@/lib/store";

export const selectContactTotal = (state: RootState) => state.contact.totalContact;
export const selectContactItems = (state: RootState) => state.contact.contactItems;
export const selectContactLoading = (state: RootState) => state.contact.loading;
export const selectContactError = (state: RootState) => state.contact.error;