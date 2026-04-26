import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  getAboutData,
  createAboutData,
  updateAboutData,
  deleteAboutData,
} from "./operations";

const initialState = {
  aboutTotal: 0,
  aboutItems: [] as any[],
  loading: false,
  error: false,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutData.fulfilled, (state, action) => {
        state.aboutTotal = action.payload.length;
        state.aboutItems = action.payload;
      })
      .addCase(createAboutData.fulfilled, (state, action) => {
        state.aboutItems = [...state.aboutItems, action.payload];
      })
      .addCase(updateAboutData.fulfilled, (state, action) => {
        console.log("About item updated:", action.payload);
        state.aboutItems = state.aboutItems.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(deleteAboutData.fulfilled, (state, action) => {
        state.aboutItems = state.aboutItems.filter(
          (item) => item._id !== action.payload.id,
        );
      })
      .addMatcher(
        isAnyOf(
          getAboutData.pending,
          createAboutData.pending,
          updateAboutData.pending,
          deleteAboutData.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getAboutData.fulfilled,
          createAboutData.fulfilled,
          updateAboutData.fulfilled,
          deleteAboutData.fulfilled,
        ),
        (state) => {
          state.loading = false;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getAboutData.rejected,
          createAboutData.rejected,
          updateAboutData.rejected,
          deleteAboutData.rejected,
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        },
      );
  },
});

export const aboutReducer = aboutSlice.reducer;
