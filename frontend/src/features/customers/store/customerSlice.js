import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    customersSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    customersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { customersRequest, customersSuccess, customersFailure } = customerSlice.actions;
export default customerSlice.reducer;
