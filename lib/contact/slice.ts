import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getContactData,
  createContactData,
  updateContactData,
  deleteContactData,
} from "./operations";

interface ContactInitialState {
  totalContact: number;
  contactItems: any[];
  loading: boolean;
  error: boolean;
}

const initialState: ContactInitialState = {
  totalContact: 0,
  contactItems: [],
  loading: false,
  error: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactData.fulfilled, (state, action) => {
        state.totalContact = action.payload.length;
        state.contactItems = action.payload;
      })
      .addCase(createContactData.fulfilled, (state, action) => {
        state.contactItems = [...state.contactItems, action.payload];
      })
      .addCase(updateContactData.fulfilled, (state, action) => {
        state.contactItems = state.contactItems.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(deleteContactData.fulfilled, (state, action) => {
        state.contactItems = state.contactItems.filter(
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

export const contactReducer = contactSlice.reducer;
