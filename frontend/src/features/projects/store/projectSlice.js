import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
  project: null,
  projectLoading: false,
  projectError: null,
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
    },
    projectRequest(state) {
      state.projectLoading = true;
      state.projectError = null;
      state.project = null;
    },
    projectSuccess(state, action) {
      state.projectLoading = false;
      state.project = action.payload;
    },
    projectFailure(state, action) {
      state.projectLoading = false;
      state.projectError = action.payload;
    },
  },
});

export const {
  projectsRequest,
  projectsSuccess,
  projectsFailure,
  projectRequest,
  projectSuccess,
  projectFailure,
} = projectSlice.actions;
export default projectSlice.reducer;
