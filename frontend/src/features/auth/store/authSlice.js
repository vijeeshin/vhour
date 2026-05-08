import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  access_token: null,
  expires: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.access_token = action.payload.access_token;
      state.expires = action.payload.expires;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.access_token = null;
      state.expires = null;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
