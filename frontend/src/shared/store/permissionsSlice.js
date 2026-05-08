import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    permissionsRequested: (state) => {
      state.loading = true;
    },
    permissionsReceived: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    permissionsRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load permissions";
    },
  },
});

export const { permissionsRequested, permissionsReceived, permissionsRequestFailed } = permissionsSlice.actions;
export default permissionsSlice.reducer;
