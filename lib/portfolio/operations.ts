import { createAsyncThunk } from "@reduxjs/toolkit";
import { portfolioApi } from "../service/configApi";

interface CreatePortfolioItem {
  title: string;
  description: string;
}

interface UpdatePortfolioItem {
  title: string;
  description: string;
}

interface CreatePortfolioCardItem {
  _id: string;
  title: string;
  description: string;
  demoLink: string;
  codeLink: string;
  image: File;
}

export const getPortfolioData = createAsyncThunk(
  "portfolio/getPortfolioData",
  async (_arg, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get("/portfolio");
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createPortfolioItem = createAsyncThunk(
  "portfolio/createPortfolioItem",
  async (body: CreatePortfolioItem, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post("/portfolio", body);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updatePortfolioItem = createAsyncThunk(
  "portfolio/updatePortfolioItem",
  async (
    {
      portfolioId,
      portfolioData,
    }: { portfolioId: string; portfolioData: UpdatePortfolioItem },
    thunkAPI,
  ) => {
    try {
      const { data } = await portfolioApi.patch(
        `/portfolio/${portfolioId}`,
        portfolioData,
      );
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deletePortfolioItem = createAsyncThunk(
  "portfolio/deletePortfolioItem",
  async ({ _id }: { _id: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(`/portfolio/${_id}`);
      return _id;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createPortfolioCardItem = createAsyncThunk(
  "portfolio/createPortfolioCardItem",
  async (
    { portfolioId, formData }: { portfolioId: string; formData: FormData },
    thunkAPI,
  ) => {
    try {
      const { data } = await portfolioApi.post(
        `/portfolio/${portfolioId}/card`,
        formData,
      );

      return { portfolioId: portfolioId, card: data.data };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updatePortfolioCardItem = createAsyncThunk(
  "portfolio/updatePortfolioCardItem",
  async (
    {
      portfolioId,
      cardId,
      formData,
    }: { portfolioId: string; cardId: string; formData: FormData },
    thunkAPI,
  ) => {
    try {
      const { data } = await portfolioApi.patch(
        `/portfolio/${portfolioId}/card/${cardId}`,
        formData,
      );

      return { portfolioId: portfolioId, cardId: cardId, dataCard: data.data };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deletePortfolioCardItem = createAsyncThunk(
  "portfolio/deletePortfolioCardItem",
  async (body: { portfolioId: string; cardId: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(
        `/portfolio/${body.portfolioId}/card/${body.cardId}`,
      );
      return { portfolioId: body.portfolioId, cardId: body.cardId };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
