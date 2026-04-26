import { createAsyncThunk } from "@reduxjs/toolkit";
import { portfolioApi } from "../service/configApi";

interface HomeDataCreate {
  title: string;
  description: string;
  link: string;
  image: File;
}

interface HomeDataUpdate {
  _id: string;
  title: string;
  description: string;
  link: string;
  image: File;
}

export const getHomeData = createAsyncThunk(
  "home/gethomeData",
  async (_arg, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get(`/home`);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createHomeData = createAsyncThunk<HomeDataCreate, HomeDataCreate>(
  "home/createHomeData",
  async (body, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post(`/home`, body);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateHomeData = createAsyncThunk<HomeDataUpdate, HomeDataUpdate>(
  "home/updateHomeData",
  async (
    { homeId, formData }: { homeId: string; formData: FormData },
    thunkAPI,
  ) => {
    try {
      const { data } = await portfolioApi.patch(`/home/${homeId}`, formData);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteHomeData = createAsyncThunk(
  "home/deleteHomeData",
  async ({ _id }: { _id: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(`/home/${_id}`);
      return _id;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
