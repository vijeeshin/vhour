import { call, put, takeLatest } from "redux-saga/effects";
import { permissionsApi } from "../services/commonServices";
import directus from "@/shared/utils/apiInterface";
import { permissionsReceived, permissionsRequestFailed } from "./permissionsSlice";
import { logout } from "@/features/auth/store/authSlice";

const TOKEN_EXPIRED_CODE = "TOKEN_EXPIRED";

const handlePermissionsRequest = function* () {
  try {
    const response = yield call(permissionsApi);
    yield put(permissionsReceived(response));
  } catch (error) {
    const code = error?.errors?.[0]?.extensions?.code;
    if (code === TOKEN_EXPIRED_CODE) {
      try {
        yield call([directus, directus.refresh]);
        const newToken = yield call([directus, directus.getToken]);
        if (newToken) localStorage.setItem("access_token", newToken);
        const response = yield call(permissionsApi);
        yield put(permissionsReceived(response));
      } catch {
        localStorage.removeItem("access_token");
        yield put(logout());
      }
      return;
    }
    yield put(permissionsRequestFailed(error.message));
    console.error("Error fetching permissions:", error);
  }
}


function* permissionsSaga() {
  yield takeLatest("permissions/permissionsRequested", handlePermissionsRequest);
}

export default permissionsSaga;