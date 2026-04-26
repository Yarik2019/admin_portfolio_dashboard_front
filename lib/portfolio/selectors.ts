import type { RootState } from "@/lib/store";

export const selectPortfolioItems = (state: RootState) => state.portfolio.portfolioItems;
export const selectPortfolioTotal = (state: RootState) => state.portfolio.portfolioTotal;
export const selectPortfolioLoading = (state: RootState) => state.portfolio.loading;
export const selectPortfolioError = (state: RootState) => state.portfolio.error;



