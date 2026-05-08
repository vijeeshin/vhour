import { all, fork } from "redux-saga/effects";
import authSaga from "@/features/auth/store/authSaga";
import permissionsSaga from "@/shared/store/permissionsSaga";
import profileSaga from "@/shared/store/profileSaga";
import projectSaga from "@/features/projects/store/projectSaga";
import customerSaga from "@/features/customers/store/customerSaga";
import assignmentTypeSaga from "@/features/assignmentTypes/store/assignmentTypeSaga";
import projectAssignmentSaga from "@/features/projectAssignments/store/projectAssignmentSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(permissionsSaga), fork(profileSaga), fork(projectSaga), fork(customerSaga), fork(assignmentTypeSaga), fork(projectAssignmentSaga)]);
}
