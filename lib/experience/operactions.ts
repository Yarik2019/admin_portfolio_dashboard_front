import { createAsyncThunk } from "@reduxjs/toolkit";
import { portfolioApi } from "../service/configApi";

interface CreateExperienceData {
  title: string;
  name: string;
  styles: string;
  image: File;
}
interface UpdateExperienceData {
  title: string;
  description: string;
}
export const getExperienceData = createAsyncThunk(
  "experience/getExperienceData",
  async (_arg, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get("/experience");
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const createExperienceData = createAsyncThunk(
  "experience/createExperienceData",
  async (experienceData: CreateExperienceData, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post("/experience", experienceData);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateExperienceData = createAsyncThunk(
  "experience/updateExperienceData",
  async (
    {
      experienceId,
      experienceData,
    }: { experienceId: string; experienceData: UpdateExperienceData },
    thunkAPI,
  ) => {
    try {
      const { data } = await portfolioApi.patch(
        `/experience/${experienceId}`,
        experienceData,
      );
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteExperienceData = createAsyncThunk(
  "experience/deleteExperienceData",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(`/experience/${id}`);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const createExperienceDataCard = createAsyncThunk(
  "experience/createExperienceDataCard",
  async (
    { experienceId, formData }: { experienceId: string; formData: FormData },
    thunkAPI,
  ) => {
    try {
      const { data } = await portfolioApi.post(
        `/experience/${experienceId}/cards`,
        formData,
      );
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateExperienceDataCard = createAsyncThunk(
  "experience/updateExperienceDataCard",
  async (
    {
      experienceId,
      cardId,
      formData,
    }: { experienceId: string; cardId: string; formData: FormData },
    thunkAPI,
  ) => {
    try {
      const {data} = await portfolioApi.patch(`/experience/${experienceId}/cards/${cardId}`, formData);
      return {experienceId, cardId, card: data.data};
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteExperienceDataCard = createAsyncThunk(
  "experience/deleteExperienceDataCard",
  async (body: { experienceId: string; cardId: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(
        `/experience/${body.experienceId}/cards/${body.cardId}`,
      );
      return { experienceId: body.experienceId, cardId: body.cardId };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      thunkAPI.rejectWithValue(message);
    }
  },
);
