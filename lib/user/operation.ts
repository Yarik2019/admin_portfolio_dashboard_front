import { createAsyncThunk } from "@reduxjs/toolkit";

import { portfolioApi } from "../service/configApi";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}
interface SignInData {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData: SignUpData, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post("/users/register", userData);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (credentials: SignInData, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post("/users/login", credentials);
      return data.data.accessToken;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
  try {
    await portfolioApi.post("/users/logout");
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get("/users/info");
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post("/users/refresh");
      return data.data.accessToken;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
