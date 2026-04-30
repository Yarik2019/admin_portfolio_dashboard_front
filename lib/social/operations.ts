import { createAsyncThunk } from "@reduxjs/toolkit";
import { portfolioApi } from "../service/configApi";

interface SocialDataCreate {
  name: string;
  icon: string;
  link: string;
}

export const getSocialData = createAsyncThunk(
  "social/getSocialData",
  async (_arg, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get(`/social`);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createSocialData = createAsyncThunk(
  "social/createSocialData",
  async (body: SocialDataCreate, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post(`/social`, body);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateSocialData = createAsyncThunk(
  "social/updateSocialData",
  async ({ socialId, socialData }: { socialId: string; socialData: Partial<SocialDataCreate> }, thunkAPI) => {
    try {
      const { data } = await portfolioApi.patch(`/social/${socialId}`, socialData);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteSocialData = createAsyncThunk(
  "social/deleteSocialData",
  async ({ _id }: { _id: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(`/social/${_id}`);
      return _id;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
