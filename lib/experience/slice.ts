import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  createExperienceData,
  createExperienceDataCard,
  deleteExperienceData,
  deleteExperienceDataCard,
  getExperienceData,
  updateExperienceData,
  updateExperienceDataCard,
} from "./operactions";

interface ExperienceState {
  experienceTotal: number;
  experienceItems: any[];
  loading: boolean;
  error: boolean;
}

const initialState: ExperienceState = {
  experienceTotal: 0,
  experienceItems: [],
  loading: false,
  error: false,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExperienceData.fulfilled, (state, action) => {
        state.experienceTotal = action.payload.length;
        state.experienceItems = action.payload;
      })
      .addCase(createExperienceData.fulfilled, (state, action) => {
        state.experienceItems = [...state.experienceItems, action.payload];
      })
      .addCase(updateExperienceData.fulfilled, (state, action) => {
        state.experienceItems = state.experienceItems.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(deleteExperienceData.fulfilled, (state, action) => {
        state.experienceItems = state.experienceItems.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(createExperienceDataCard.fulfilled, (state, action) => {
        state.experienceItems = state.experienceItems.map((item) => {
          return item._id === action.payload.experienceId
            ? { ...item, cards: [...(item.cards || []), action.payload.card] }
            : item;
        });
      }).addCase(updateExperienceDataCard.fulfilled, (state, action) => {
        console.log("Experience data card updated:", action.payload);
        state.experienceItems = state.experienceItems.map((item) =>
          item._id === action.payload.experienceId
            ? {
                ...item,
                cards: item.cards.map((card) =>
                  card._id === action.payload.cardId ? action.payload.card : card,
                ),
              }
            : item,
        );
      })
      .addCase(deleteExperienceDataCard.fulfilled, (state, action) => {
        state.experienceItems = state.experienceItems.map((item) =>
          item._id === action.payload?.experienceId
            ? {
                ...item,
                cards: item.cards.filter(
                  (card) => card._id !== action.payload?.cardId,
                ),
              }
            : item,
        );
      })
      .addMatcher(
        isAnyOf(
          getExperienceData.pending,
          createExperienceData.pending,
          updateExperienceData.pending,
          deleteExperienceData.pending,
          createExperienceDataCard.pending,
          updateExperienceDataCard.pending,
          deleteExperienceDataCard.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getExperienceData.fulfilled,
          createExperienceData.fulfilled,
          updateExperienceData.fulfilled,
          deleteExperienceData.fulfilled,
          createExperienceDataCard.fulfilled,
          updateExperienceDataCard.fulfilled,
          deleteExperienceDataCard.fulfilled,
        ),
        (state) => {
          state.loading = false;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getExperienceData.rejected,
          createExperienceData.rejected,
          updateExperienceData.rejected,
          deleteExperienceData.rejected,
          createExperienceDataCard.rejected,
          updateExperienceDataCard.rejected,
          deleteExperienceDataCard.rejected,
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        },
      );
  },
});

export const experienceReducer = experienceSlice.reducer;
