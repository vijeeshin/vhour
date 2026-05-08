import { all, call, put, takeLatest } from "redux-saga/effects";
import { customersFailure, customersRequest, customersSuccess } from "@/features/customers/store/customerSlice";
import { customersApi, customersCountApi } from "@/features/customers/services/customerService";

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

function* customerSaga() {
  yield takeLatest(customersRequest.type, handleCustomersRequest);
}

export default customerSaga;
