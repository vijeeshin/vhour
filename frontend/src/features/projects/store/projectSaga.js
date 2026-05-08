import { all, call, put, takeLatest } from "redux-saga/effects";
import { projectsFailure, projectsRequest, projectsSuccess, projectRequest, projectSuccess, projectFailure } from "@/features/projects/store/projectSlice";
import { projectsApi, projectsCountApi, customersApi, projectApi } from "@/features/projects/services/projectService";

function* handleProjectsRequest(action) {
  try {
    const query = action?.payload ?? {};
    const [data, total, customers] = yield all([
      call(projectsApi, query),
      call(projectsCountApi, { filter: query.filter, search: query.search }),
      call(customersApi),
    ]);

    const customerMap = Object.fromEntries(
      customers.map((c) => [c.CUSTOMER_ID, c.NAME])
    );

    const enriched = data.map((row) => ({
      ...row,
      CUSTOMER_ID: typeof row.CUSTOMER_ID === "string"
        ? { CUSTOMER_ID: row.CUSTOMER_ID, NAME: customerMap[row.CUSTOMER_ID] ?? null }
        : row.CUSTOMER_ID,
    }));

    yield put(projectsSuccess({ data: enriched, total }));
  } catch (err) {
    yield put(projectsFailure(err.message));
  }
}

function* handleProjectRequest(action) {
  try {
    const data = yield call(projectApi, action.payload);
    yield put(projectSuccess(data));
  } catch (err) {
    yield put(projectFailure(err.message));
  }
}

function* projectSaga() {
  yield takeLatest(projectsRequest.type, handleProjectsRequest);
  yield takeLatest(projectRequest.type, handleProjectRequest);
}

export default projectSaga;
