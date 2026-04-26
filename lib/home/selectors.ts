import  type {RootState} from "@/lib/store";

export const selectTotalHome = (state: RootState) => state.home.totalHome; 
export const selectHomeItems = (state: RootState) => state.home.homeItems;
export const selectHomeLoading = (state: RootState) => state.home.loading;
export const selectHomeError = (state: RootState) => state.home.error;
