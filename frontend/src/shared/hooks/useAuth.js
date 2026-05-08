import { useSelector } from "react-redux";
import { isTokenValid } from "@/shared/utils/tokenValidator";

const useAuth = () => {
  // Subscribe to auth state so components re-render immediately after logout
  useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("access_token");
  const isLoggedIn = isTokenValid(token);
  return { isLoggedIn };
};

export default useAuth;