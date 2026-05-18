import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
  total: 0,
  customer: null,
  customerLoading: false,
  customerError: null,
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
    customerRequest(state) {
      state.customerLoading = true;
      state.customerError = null;
      state.customer = null;
    },
    customerSuccess(state, action) {
      state.customerLoading = false;
      state.customer = action.payload;
    },
    customerFailure(state, action) {
      state.customerLoading = false;
      state.customerError = action.payload;
    },
  },
});

export const { customersRequest, customersSuccess, customersFailure, customerRequest, customerSuccess, customerFailure } = customerSlice.actions;
export default customerSlice.reducer;
