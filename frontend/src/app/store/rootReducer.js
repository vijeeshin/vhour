import { combineReducers } from "@reduxjs/toolkit";

// feature reducers
import authReducer from "@/features/auth/store/authSlice";
import permissionsReducer from "@/shared/store/permissionsSlice";
import profileReducer from "@/shared/store/profileSlice";
import projectReducer from "@/features/projects/store/projectSlice";
import customerReducer from "@/features/customers/store/customerSlice";
import assignmentTypeReducer from "@/features/assignmentTypes/store/assignmentTypeSlice";
import projectAssignmentReducer from "@/features/projectAssignments/store/projectAssignmentSlice";

// combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  permissions: permissionsReducer,
  profile: profileReducer,
  projects: projectReducer,
  customers: customerReducer,
  assignmentTypes: assignmentTypeReducer,
  projectAssignments: projectAssignmentReducer,
});

export default rootReducer;
