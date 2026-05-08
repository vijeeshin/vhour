import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
};

const assignmentTypeSlice = createSlice({
  name: "assignmentTypes",
  initialState,
  reducers: {
    assignmentTypesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    assignmentTypesSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    assignmentTypesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { assignmentTypesRequest, assignmentTypesSuccess, assignmentTypesFailure } =
  assignmentTypeSlice.actions;
export default assignmentTypeSlice.reducer;
