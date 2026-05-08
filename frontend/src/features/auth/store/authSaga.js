import { call, put, takeLatest } from "redux-saga/effects";
import { loginFailure, loginRequest, loginSuccess } from "@/features/auth/store/authSlice";
import { loginApi } from "@/features/auth/services/authService";
import directus from "@/shared/utils/apiInterface";

function* handleLogin(action) {
  try {
    const user = yield call(loginApi, action?.payload);
    yield put(loginSuccess(user));
    localStorage.setItem("access_token", user?.access_token);
    yield call([directus, directus.setToken], user?.access_token);
  } catch (err) {
    yield put(loginFailure(err.message));
  }
}

function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;