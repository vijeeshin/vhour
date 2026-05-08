import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileRequested: (state) => {
      state.loading = true;
    },
    profileReceived: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    profileRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load profile";
    },
  },
});

export const { profileRequested, profileReceived, profileRequestFailed } = profileSlice.actions;
export default profileSlice.reducer;
