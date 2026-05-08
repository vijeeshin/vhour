import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
};

const projectAssignmentSlice = createSlice({
  name: "projectAssignments",
  initialState,
  reducers: {
    projectAssignmentsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    projectAssignmentsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    projectAssignmentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  projectAssignmentsRequest,
  projectAssignmentsSuccess,
  projectAssignmentsFailure,
} = projectAssignmentSlice.actions;
export default projectAssignmentSlice.reducer;
