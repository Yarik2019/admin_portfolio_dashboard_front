import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { getHomeData, createHomeData, deleteHomeData, updateHomeData } from "./operations";

interface HomeInitialState {
  totalHome: number;
  homeItems: any[];
  loading: boolean;
  error: boolean;
}

const initialState: HomeInitialState = {
  totalHome: 0,
  homeItems: [],
  loading: false,
  error: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeData.fulfilled, (state, action) => {
        state.homeItems = action.payload;
        state.totalHome = action.payload.length;
      })
      .addCase(createHomeData.fulfilled, (state, action) => {
        state.homeItems = [...state.homeItems, action.payload];
      })
      .addCase(updateHomeData.fulfilled, (state, action) => {
        state.homeItems = state.homeItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(deleteHomeData.fulfilled, (state, action) => {
        state.homeItems = state.homeItems.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addMatcher(
        isAnyOf(getHomeData.pending, createHomeData.pending, updateHomeData.pending, deleteHomeData.pending),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(getHomeData.fulfilled, createHomeData.fulfilled, updateHomeData.fulfilled, deleteHomeData.fulfilled),
        (state) => {
          state.loading = false;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(getHomeData.rejected, createHomeData.rejected, updateHomeData.rejected, deleteHomeData.rejected),
        (state) => {
          state.error = true;
          state.loading = false;
        },
      );
  },
});

export const homeReducer = homeSlice.reducer;
