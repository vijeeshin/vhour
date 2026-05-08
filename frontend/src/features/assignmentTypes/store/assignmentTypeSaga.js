import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  assignmentTypesFailure,
  assignmentTypesRequest,
  assignmentTypesSuccess,
} from "@/features/assignmentTypes/store/assignmentTypeSlice";
import {
  assignmentTypesApi,
  assignmentTypesCountApi,
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

function* assignmentTypeSaga() {
  yield takeLatest(assignmentTypesRequest.type, handleAssignmentTypesRequest);
}

export default assignmentTypeSaga;
