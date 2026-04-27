import { createAsyncThunk } from "@reduxjs/toolkit";
import { portfolioApi } from "../service/configApi";
import type { RootState } from "../store";

interface AboutDataCreate {
  title: string;
  subTitle: string;
  description: string;
}

interface AboutItem {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
}

interface AboutUpdatePayload {
  title?: string;
  subTitle?: string;
  description?: string;
}

interface AboutUpdateRequest {
  title?: string;
  subTitle?: string;
  description?: string;
}
export const getAboutData = createAsyncThunk(
  "about/getAboutData",
  async (_arg, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get("/about");
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createAboutData = createAsyncThunk<
  AboutDataCreate,
  AboutDataCreate
>("about/createAboutData", async (body: Partial<AboutDataCreate>, thunkAPI) => {
  console.log("Creating about item:", body);
  try {
    const { data } = await portfolioApi.post(`/about`, body);
    return data.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(message);
  }
});
////////////////////////////////////////////////////////
export const updateAboutData = createAsyncThunk<
  AboutItem,
  {
    aboutId: string;
    aboutData: AboutUpdateRequest;
  },
  {
    state: RootState;
  }
>("about/updateAboutData", async ({ aboutId, aboutData }, thunkAPI) => {
  if (!aboutId) {
    return thunkAPI.rejectWithValue("No ID provided");
  }
  try {
    const { data } = await portfolioApi.patch(`/about/${aboutId}`, aboutData);
    return data.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return thunkAPI.rejectWithValue(message);
  }
}); ///////////////////////////////////////////////////////////////////

export const deleteAboutData = createAsyncThunk<{ id: string }, { id: string }>(
  "about/deleteAboutData",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(`/about/${id}`);
      return { id: id };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
