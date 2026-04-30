import  type {RootState} from "@/lib/store";

export const selectSocialTotal = (state: RootState) => state.social.totalSocial;
export const selectSocialItems = (state: RootState) => state.social.socialItems;
export const selectSocialLoading = (state: RootState) => state.social.loading;
export const selectSocialError = (state: RootState) => state.social.error;