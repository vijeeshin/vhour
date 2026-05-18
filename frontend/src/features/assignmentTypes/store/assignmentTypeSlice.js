import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
  assignmentType: null,
  assignmentTypeLoading: false,
  assignmentTypeError: null,
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
    assignmentTypeRequest(state) {
      state.assignmentTypeLoading = true;
      state.assignmentTypeError = null;
      state.assignmentType = null;
    },
    assignmentTypeSuccess(state, action) {
      state.assignmentTypeLoading = false;
      state.assignmentType = action.payload;
    },
    assignmentTypeFailure(state, action) {
      state.assignmentTypeLoading = false;
      state.assignmentTypeError = action.payload;
    },
  },
});

export const {
  assignmentTypesRequest,
  assignmentTypesSuccess,
  assignmentTypesFailure,
  assignmentTypeRequest,
  assignmentTypeSuccess,
  assignmentTypeFailure,
} = assignmentTypeSlice.actions;
export default assignmentTypeSlice.reducer;
