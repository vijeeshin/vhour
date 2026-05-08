import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
};
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    projectsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    projectsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
   
  },
});

export const { projectsRequest, projectsSuccess, projectsFailure } = projectSlice.actions;
export default projectSlice.reducer;
