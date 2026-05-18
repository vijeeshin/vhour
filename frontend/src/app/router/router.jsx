import LoginPage from "@/features/auth/pages/LoginPage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import ProjectPage from "@/features/projects/pages/ProjectPage";
import CustomersPage from "@/features/customers/pages/CustomersPage";
import CustomerPage from "@/features/customers/pages/CustomerPage";
import CustomerProjectsPage from "@/features/customers/pages/CustomerProjectsPage";
import AssignmentTypesPage from "@/features/assignmentTypes/pages/AssignmentTypesPage";
import AssignmentTypePage from "@/features/assignmentTypes/pages/AssignmentTypePage";
import ProjectAssignmentsPage from "@/features/projectAssignments/pages/ProjectAssignmentsPage";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import useAuth from "@/shared/hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";

function AppRouter() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<div className="text-[#484848] font-semibold">Dashboard</div>} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/:customerId" element={<CustomerPage />} />
        <Route path="customers/:customerId/projects" element={<CustomerProjectsPage />} />
        <Route path="assignment-types" element={<AssignmentTypesPage />} />
        <Route path="assignment-types/:assignmentTypeId" element={<AssignmentTypePage />} />
        <Route path="project-assignments" element={<ProjectAssignmentsPage />} />
        <Route path="settings" element={<div className="text-[#484848] font-semibold">Settings</div>} />
        <Route path="time-logs" element={<div className="text-[#484848] font-semibold">Time Logs</div>} />
        <Route path="schedule" element={<div className="text-[#484848] font-semibold">Schedule</div>} />
        <Route path="team" element={<div className="text-[#484848] font-semibold">Team</div>} />
        <Route path="reports" element={<div className="text-[#484848] font-semibold">Reports</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="login" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
