import type {RootState} from "@/lib/store";
 
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.user.isRefreshing;
export const selectIsAuthInitialized = (state: RootState) => state.user.isAuthInitialized;
export const selectAccessToken = (state: RootState) => state.user.token;
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;