import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createPortfolioItem,
  deletePortfolioCardItem,
  createPortfolioCardItem,
  deletePortfolioItem,
  getPortfolioData,
  updatePortfolioItem,
  updatePortfolioCardItem,
} from "../portfolio/operations";

interface PortfolioInitialState {
  portfolioItems: any[];
  portfolioTotal: number;
  loading: boolean;
  error: boolean;
}

const initialState: PortfolioInitialState = {
  portfolioItems: [],
  portfolioTotal: 0,
  loading: false,
  error: false,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolioData.fulfilled, (state, action) => {
        state.portfolioTotal = action.payload.length;
        state.portfolioItems = action.payload;
      })
      .addCase(createPortfolioItem.fulfilled, (state, action) => {
        state.portfolioItems = [...state.portfolioItems, action.payload];
      })
      .addCase(updatePortfolioItem.fulfilled, (state, action) => {
        state.portfolioItems = state.portfolioItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item,
        );
      })
      .addCase(createPortfolioCardItem.fulfilled, (state, action) => {
        state.portfolioItems = state.portfolioItems.map((item) =>
          item._id === action.payload.portfolioId
            ? { ...item, cards: [...(item.cards || []), action.payload.card] }
            : item,
        );
      })
      .addCase(updatePortfolioCardItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.portfolioItems = state.portfolioItems.map((item) => {
         return item._id === action.payload.portfolioId
            ? {
                ...item,
                cards: item.cards.map((card) =>
                  card._id === action.payload.cardId
                    ? { ...card, ...action.payload.dataCard }
                    : card
                ),
              }
            : item;
        });
      })
      .addCase(deletePortfolioCardItem.fulfilled, (state, action) => {
        state.portfolioItems = state.portfolioItems.map((item) =>
          item._id === action.payload.portfolioId
            ? {
                ...item,
                cards: item.cards.filter(
                  (card) => card._id !== action.payload.cardId,
                ),
              }
            : item,
        );
      })
      .addMatcher(
        isAnyOf(
          getPortfolioData.pending,
          createPortfolioItem.pending,
          updatePortfolioItem.pending,
          deletePortfolioItem.pending,
          createPortfolioCardItem.pending,
          updatePortfolioCardItem.pending,
          deletePortfolioCardItem.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getPortfolioData.fulfilled,
          createPortfolioItem.fulfilled,
          updatePortfolioItem.fulfilled,
          deletePortfolioItem.fulfilled,
          createPortfolioCardItem.fulfilled,
          updatePortfolioCardItem.fulfilled,
          deletePortfolioCardItem.fulfilled,
        ),
        (state) => {
          state.loading = false;
          state.error = false;
        },
      )
      .addMatcher(
        isAnyOf(
          getPortfolioData.rejected,
          createPortfolioItem.rejected,
          updatePortfolioItem.rejected,
          deletePortfolioItem.rejected,
          createPortfolioCardItem.rejected,
          updatePortfolioCardItem.rejected,
          deletePortfolioCardItem.rejected,
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        },
      );
  },
});

export const portfolioReducer = portfolioSlice.reducer;
