import { all, call, put, takeLatest } from "redux-saga/effects";
import { projectsFailure, projectsRequest, projectsSuccess } from "@/features/projects/store/projectSlice";
import { projectsApi, projectsCountApi, customersApi } from "@/features/projects/services/projectService";

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

function* projectSaga() {
  yield takeLatest(projectsRequest.type, handleProjectsRequest);
}

export default projectSaga;
