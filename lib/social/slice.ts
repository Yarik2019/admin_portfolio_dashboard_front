import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getSocialData,
  createSocialData,
  updateSocialData,
  deleteSocialData,
} from "./operations";

interface SocialInitialState {
  totalSocial: number;
  socialItems: any[];
  loading: boolean;
  error: boolean;
}

const initialState: SocialInitialState = {
  totalSocial: 0,
  socialItems: [],
  loading: false,
  error: false,
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSocialData.fulfilled, (state, action) => {
        state.totalSocial = action.payload.length;
        state.socialItems = action.payload;
      })
      .addCase(createSocialData.fulfilled, (state, action) => {
        state.socialItems = [...state.socialItems, action.payload];
      })
      .addCase(updateSocialData.fulfilled, (state, action) => {
        state.socialItems = state.socialItems.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(deleteSocialData.fulfilled, (state, action) => {
        state.socialItems = state.socialItems.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addMatcher(
        isAnyOf(
          getSocialData.pending,
          createSocialData.pending,
          updateSocialData.pending,
          deleteSocialData.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getSocialData.fulfilled,
          createSocialData.fulfilled,
          updateSocialData.fulfilled,
          deleteSocialData.fulfilled,
        ),
        (state) => {
          state.loading = false;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getSocialData.rejected,
          createSocialData.rejected,
          updateSocialData.rejected,
          deleteSocialData.rejected,
        ),
        (state) => {
          state.error = true;
          state.loading = false;
        },
      );
  },
});

export const socialReducer = socialSlice.reducer;
