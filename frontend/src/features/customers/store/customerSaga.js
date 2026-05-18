import { all, call, put, takeLatest } from "redux-saga/effects";
import { customersFailure, customersRequest, customersSuccess, customerRequest, customerSuccess, customerFailure } from "@/features/customers/store/customerSlice";
import { customersApi, customersCountApi, customerApi } from "@/features/customers/services/customerService";

function* handleCustomersRequest(action) {
  try {
    const query = action?.payload ?? {};
    const [data, total] = yield all([
      call(customersApi, query),
      call(customersCountApi, { filter: query.filter, search: query.search }),
    ]);
    yield put(customersSuccess({ data, total }));
  } catch (err) {
    yield put(customersFailure(err.message));
  }
}

function* handleCustomerRequest(action) {
  try {
    const data = yield call(customerApi, action.payload);
    yield put(customerSuccess(data));
  } catch (err) {
    yield put(customerFailure(err.message));
  }
}

function* customerSaga() {
  yield takeLatest(customersRequest.type, handleCustomersRequest);
  yield takeLatest(customerRequest.type, handleCustomerRequest);
}

export default customerSaga;
