import { createAsyncThunk } from "@reduxjs/toolkit";
import { portfolioApi } from "../service/configApi";

interface ContactDataCreate {
  name: string;
  icon: string;
  link: string;
}

export const getContactData = createAsyncThunk(
  "contact/getContactData",
  async (_arg, thunkAPI) => {
    try {
      const { data } = await portfolioApi.get(`/contact`);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createContactData = createAsyncThunk(
  "contact/createContactData",
  async (body: ContactDataCreate, thunkAPI) => {
    try {
      const { data } = await portfolioApi.post(`/contact`, body);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateContactData = createAsyncThunk(
  "contact/updateContactData",
  async ({ contactId, contactData }: { contactId: string; contactData: Partial<ContactDataCreate> }, thunkAPI) => {
    try {
      const { data } = await portfolioApi.patch(`/contact/${contactId}`, contactData);
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteContactData = createAsyncThunk(
  "contact/deleteContactData",
  async ({ _id }: { _id: string }, thunkAPI) => {
    try {
      await portfolioApi.delete(`/contact/${_id}`);
      return _id;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
