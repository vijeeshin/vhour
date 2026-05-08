import { call, put, takeLatest } from "redux-saga/effects";
import { profileApi } from "@/shared/services/commonServices";
import directus from "@/shared/utils/apiInterface";
import {
  profileReceived,
  profileRequested,
  profileRequestFailed,
} from "@/shared/store/profileSlice";
import { logout } from "@/features/auth/store/authSlice";

const TOKEN_EXPIRED_CODE = "TOKEN_EXPIRED";

const handleProfileRequest = function* () {
  try {
    const response = yield call(profileApi);
    yield put(profileReceived(response));
  } catch (error) {
    const code = error?.errors?.[0]?.extensions?.code;
    if (code === TOKEN_EXPIRED_CODE) {
      try {
        yield call([directus, directus.refresh]);
        const newToken = yield call([directus, directus.getToken]);
        if (newToken) localStorage.setItem("access_token", newToken);
        const response = yield call(profileApi);
        yield put(profileReceived(response));
      } catch {
        localStorage.removeItem("access_token");
        yield put(logout());
      }
      return;
    }
    yield put(profileRequestFailed(error.message));
    console.error("Error fetching profile:", error);
  }
};

function* profileSaga() {
  yield takeLatest(profileRequested.type, handleProfileRequest);
}

export default profileSaga;
