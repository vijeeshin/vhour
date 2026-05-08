import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  projectAssignmentsFailure,
  projectAssignmentsRequest,
  projectAssignmentsSuccess,
} from "@/features/projectAssignments/store/projectAssignmentSlice";
import {
  projectAssignmentsApi,
  projectAssignmentsCountApi,
} from "@/features/projectAssignments/services/projectAssignmentService";

function* handleProjectAssignmentsRequest(action) {
  try {
    const query = action?.payload ?? {};
    const [data, total] = yield all([
      call(projectAssignmentsApi, query),
      call(projectAssignmentsCountApi, { filter: query.filter, search: query.search }),
    ]);
    yield put(projectAssignmentsSuccess({ data, total }));
  } catch (err) {
    yield put(projectAssignmentsFailure(err.message));
  }
}

function* projectAssignmentSaga() {
  yield takeLatest(projectAssignmentsRequest.type, handleProjectAssignmentsRequest);
}

export default projectAssignmentSaga;
