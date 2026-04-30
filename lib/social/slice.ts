import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getContactData,
  createContactData,
  updateContactData,
  deleteContactData,
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
      .addCase(getContactData.fulfilled, (state, action) => {
        state.totalSocial = action.payload.length;
        state.socialItems = action.payload;
      })
      .addCase(createContactData.fulfilled, (state, action) => {
        state.socialItems = [...state.socialItems, action.payload];
      })
      .addCase(updateContactData.fulfilled, (state, action) => {
        state.socialItems = state.socialItems.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(deleteContactData.fulfilled, (state, action) => {
        state.socialItems = state.socialItems.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addMatcher(
        isAnyOf(
          getContactData.pending,
          createContactData.pending,
          updateContactData.pending,
          deleteContactData.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getContactData.fulfilled,
          createContactData.fulfilled,
          updateContactData.fulfilled,
          deleteContactData.fulfilled,
        ),
        (state) => {
          state.loading = false;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getContactData.rejected,
          createContactData.rejected,
          updateContactData.rejected,
          deleteContactData.rejected,
        ),
        (state) => {
          state.error = true;
          state.loading = false;
        },
      );
  },
});

export const socialReducer = socialSlice.reducer;
