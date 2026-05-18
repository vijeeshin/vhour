import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  assignmentTypesFailure,
  assignmentTypesRequest,
  assignmentTypesSuccess,
  assignmentTypeRequest,
  assignmentTypeSuccess,
  assignmentTypeFailure,
} from "@/features/assignmentTypes/store/assignmentTypeSlice";
import {
  assignmentTypesApi,
  assignmentTypesCountApi,
  assignmentTypeApi,
} from "@/features/assignmentTypes/services/assignmentTypeService";

function* handleAssignmentTypesRequest(action) {
  try {
    const query = action?.payload ?? {};
    const [data, total] = yield all([
      call(assignmentTypesApi, query),
      call(assignmentTypesCountApi, { filter: query.filter, search: query.search }),
    ]);
    yield put(assignmentTypesSuccess({ data, total }));
  } catch (err) {
    yield put(assignmentTypesFailure(err.message));
  }
}

function* handleAssignmentTypeRequest(action) {
  try {
    const data = yield call(assignmentTypeApi, action.payload);
    yield put(assignmentTypeSuccess(data));
  } catch (err) {
    yield put(assignmentTypeFailure(err.message));
  }
}

function* assignmentTypeSaga() {
  yield takeLatest(assignmentTypesRequest.type, handleAssignmentTypesRequest);
  yield takeLatest(assignmentTypeRequest.type, handleAssignmentTypeRequest);
}

export default assignmentTypeSaga;
