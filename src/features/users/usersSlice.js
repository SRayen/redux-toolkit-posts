import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: true,
};

const url = "https://jsonplaceholder.typicode.com/users";

export const getUsers = createAsyncThunk("cart/getUsers", async () => {
  try {
    const resp = await axios(url);
  
    return resp.data;
    
  } catch (error) {
    console.log(error.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;

      })
      .addCase(getUsers.rejected, (state, action) => {
       
        state.isLoading = false;
      });
  },
});

export default usersSlice.reducer;
