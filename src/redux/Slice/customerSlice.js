import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const fetchData = createAsyncThunk("auth/fetchData", async () => {
  try {
    const response = await api.get("https://api.example.com/data");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const editCustomer = createAsyncThunk(
  "auth/edituser",
  async (userData ,id) => {
    try {
      const response = await api.post(
        `https://api.example.com/api/customer/edit/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getByIdCustomer = createAsyncThunk(
  "auth/edituser",
  async (id) => {
    try {
      const response = await api.post(
        `https://api.example.com/api/customer/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getByIdCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(editCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
