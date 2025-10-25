import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axiosInstance.get("/user/auth", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.error.message;
        localStorage.removeItem("token");
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
